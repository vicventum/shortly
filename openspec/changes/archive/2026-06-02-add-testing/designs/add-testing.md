# Design: add-testing

> Technical design for the frontend testing infrastructure of Shortly.

---

## 1. Architecture Overview

```
tests/
├── vitest-setup.js        # Global setup: jest-dom, store resets, mocks
├── test-utils.jsx         # Custom renderWithProviders + re-exports
├── factories/
│   ├── user.js            # Fishery + Faker factory
│   └── link.js            # Fishery + Faker factory
├── mocks/                  # (Phase 4)
│   ├── server.js           # MSW setupServer
│   └── handlers.js         # HTTP request handlers

src/
└── modules/
    ├── auth/features/login/components/form/
    │   └── FormLogin.integration.test.jsx
    ├── auth/features/register/components/form/
    │   └── FormRegister.integration.test.jsx
    ├── links/features/shortener/components/section/
    │   └── SectionShortenUrl.integration.test.jsx
    ├── links/features/management/components/section/
    │   └── SectionLinksTimeline.integration.test.jsx
    │   └── SectionMetrics.integration.test.jsx
    └── _core/components/base/
        └── BModal/BModal.test.jsx
```

### Toolchain responsibilities

| Tool | Role |
|------|------|
| **Vitest** | Test runner, watch mode, coverage. Runs in happy-dom environment |
| **@testing-library/react** | Render components, query DOM (`screen.getByRole`, etc.) |
| **@testing-library/user-event** | Simulate realistic user interactions (`user.click()`, `user.type()`) |
| **@testing-library/jest-dom** | Semantic matchers (`toBeInTheDocument`, `toBeVisible`, `toBeDisabled`) |
| **vitest-axe** | Automated a11y violation detection on rendered output |
| **happy-dom** | Fast DOM environment — no browser, no jsdom |
| **msw** | Network-level interception for HTTP provider tests (Phase 4) |
| **fishery** | Declarative factories with auto-sequencing |
| **@faker-js/faker** | Random data generation (names, emails, URLs, dates) |

### Import strategy

**Vitest globals: false**. Every test file MUST explicitly import from `vitest`:

```js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
```

This means:
- No `describe`, `it`, `expect`, `vi`, `beforeEach`, `afterEach` without explicit import
- Vitest auto-import plugins are NOT used
- Explicit imports make dependencies clear and tooling (ESLint) happier

---

## 2. Test Infrastructure Design

### `vitest.config.js`

```js
import { defineConfig } from 'vitest/config'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    setupFiles: ['./tests/vitest-setup.js'],
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    globals: false,
    restoreMocks: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

Key decisions:
- `globals: false` — explicit imports required in every test file
- `restoreMocks: true` — auto-restore `vi.mock()` and `vi.fn()` between tests, preventing leakage
- `environment: 'happy-dom'` — faster than jsdom, no browser dependency
- `include: ['src/**/*.{test,spec}.{js,jsx}']` — tests alongside source code, not in a separate folder

### `tests/vitest-setup.js`

```js
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'

// ── Zustand store resets ──
import { useSessionStore } from '@/modules/auth/_shared/stores/store-session'
import { useUrlStore } from '@/modules/links/_shared/stores/store-url'

afterEach(() => {
  useSessionStore.setState({ user: null })
  useUrlStore.setState({ urlList: [] })

  // Clear browser storage to prevent leakage between tests
  localStorage.clear()
  sessionStorage.clear()
})

// ── happy-dom polyfills ──
// window.matchMedia is not implemented in happy-dom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})

// ── Animation acceleration ──
process.env.TIME_SCALE_FACTOR = 0
```

Design notes:
- `import { afterEach } from 'vitest'` — explicit import, no globals
- Store resets go FIRST to catch any state that previous test left behind
- `localStorage.clear()` and `sessionStorage.clear()` ensure Zustand persist middleware doesn't leak between tests
- `matchMedia` mock is required because DaisyUI/Tailwind use it for responsive queries

### `tests/test-utils.jsx`

```jsx
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { Toaster } from 'react-hot-toast'

/**
 * Custom render with all global providers.
 * Extend this as new providers are added to the app.
 */
function renderWithProviders(ui, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
      <Toaster />
    </MemoryRouter>
  )
}

// Re-export everything from Testing Library
export * from '@testing-library/react'
export { renderWithProviders }
```

Design notes:
- `MemoryRouter` from `react-router` (not `react-router-dom`) — the project uses react-router v7
- `<Toaster />` from `react-hot-toast` — renders toast notifications so tests can assert on them. Note: the project uses `sileo` as a toast adapter; verify actual toast component and update accordingly
- Not wrapping in `StrictMode` — the app doesn't use it in production; adding it would double-render and cause issues with some mocks
- Re-exporting everything from RTL means tests import `screen`, `waitFor`, `within`, etc. from `test-utils` instead of `@testing-library/react` directly

---

## 3. Factory Design

### `tests/factories/user.js`

```js
import { Factory } from 'fishery'
import { faker } from '@faker-js/faker'

const userFactory = Factory.define(({ sequence }) => ({
  id: `user-${sequence}`,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: faker.helpers.arrayElement(['user', 'admin']),
}))

export function generateUser(overrides = {}) {
  return userFactory.build(overrides)
}

export function generateUserList(count = 3) {
  return userFactory.buildList(count)
}
```

Design notes:
- `id` is a string (matching the app's `crypto.randomUUID()` pattern) with a sequence prefix
- `role` is randomized between 'user' and 'admin' to catch role-dependent bugs
- `password` is NOT included — the app strips it before storing in the session; factory should match what the store holds, not what the provider uses internally
- `generateUser()` produces random data every call — catches hardcoded-value blind spots

### `tests/factories/link.js`

```js
import { Factory } from 'fishery'
import { faker } from '@faker-js/faker'

// Management dashboard link (from provider-links-fetch API)
const managementLinkFactory = Factory.define(({ sequence }) => ({
  id: sequence.toString(),
  originalUrl: faker.internet.url(),
  shortUrl: `https://short.ly/${faker.string.alphanumeric(6)}`,
  createdAt: faker.date.recent().toISOString(),
  clicks: faker.number.int({ min: 0, max: 9999 }),
  status: faker.helpers.arrayElement(['active', 'inactive', 'expired']),
}))

// Shortener link (from provider-url-shortener-localstorage)
const shortenerLinkFactory = Factory.define(({ sequence }) => ({
  url: faker.internet.url(),
  urlShortened: `https://short.ly/${faker.string.alphanumeric(6)}`,
}))

export function generateLink(overrides = {}) {
  return managementLinkFactory.build(overrides)
}

export function generateLinkList(count = 3) {
  return managementLinkFactory.buildList(count)
}

export function generateShortenerLink(overrides = {}) {
  return shortenerLinkFactory.build(overrides)
}

export function generateShortenerLinkList(count = 3) {
  return shortenerLinkFactory.buildList(count)
}
```

Design notes:
- Two factories — management links (from HTTP API) have different fields than shortener links (from localStorage)
- `generateLink()` defaults to the management variant (more fields, used in dashboard)
- All fields are randomized — catches assumptions about data shape

---

## 4. Mock Strategy

### Service-layer mocking (Phase 1-3)

The core mock pattern for all Section integration tests:

```js
// File: SectionShortenUrl.integration.test.jsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// 1. Mock at the service layer (stable contract)
vi.mock('@/modules/links/_shared/api/services/service-url-shortener', () => ({
  shortUrl: vi.fn(),
}))

// 2. Factory helpers for mock return values
function createSuccessfulShortUrl() {
  return 'https://short.ly/abc123'
}

describe('SectionShortenUrl', () => {
  beforeEach(() => {
    // 3. Set up default mock in beforeEach
    const { shortUrl } = await import(
      '@/modules/links/_shared/api/services/service-url-shortener'
    )
    shortUrl.mockResolvedValue(createSuccessfulShortUrl())
  })

  afterEach(() => {
    // 4. No manual restore needed — restoreMocks: true in vitest.config
  })

  it('shortens a URL successfully', async () => {
    // ...
  })
})
```

**Key rules:**
- Mock at `vi.mock()` module level (hoisted by Vitest)
- Default return values in `beforeEach` using `mockResolvedValue` / `mockResolvedValueOnce`
- Override per-test with `mockResolvedValueOnce` or `mockImplementationOnce`
- `restoreMocks: true` in config handles cleanup — no manual `vi.restoreAllMocks()` needed
- Dynamic imports NOT needed for `vi.mock` — use `vi.importActual` if you need the real module inside mocked scope

**Mock return value patterns:**

```js
// Successful response — return what the service would return
shortUrl.mockResolvedValue('https://short.ly/abc123')

// Error response — reject with error
shortUrl.mockRejectedValue(new Error('API unavailable'))

// Null/empty response
shortUrl.mockResolvedValue(null)
```

**What NOT to mock:**
- ❌ Providers — implementation detail, interchangeable
- ❌ Child components — test exercises the real tree
- ❌ Zustand stores — they're populated naturally by the hooks/services
- ❌ Pure utility functions (validators, formatters) — use the real ones

### MSW Setup (Phase 4)

```js
// tests/mocks/server.js
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

```js
// tests/mocks/handlers.js
import { http, HttpResponse } from 'msw'

export const handlers = [
  // Management links API
  http.get('*/api/links', () => HttpResponse.json([])),
  http.post('*/api/links', () => HttpResponse.json({ id: '1', originalUrl: '', shortUrl: '', createdAt: '', clicks: 0, status: 'active' }), { status: 201 }),
  http.put('*/api/links/:id', () => HttpResponse.json({ id: '1', originalUrl: '', shortUrl: '', createdAt: '', clicks: 0, status: 'active' })),
  http.delete('*/api/links/:id', () => HttpResponse.json(null, { status: 204 })),

  // External URL shortener API
  http.post('*/api/url-shortener', () => HttpResponse.json({ shortUrl: 'https://short.ly/abc123' })),
]
```

Integration with vitest-setup.js:

```js
// In vitest-setup.js (Phase 4 addition)
import { server } from '../tests/mocks/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

---

## 5. Store Reset Strategy

### In vitest-setup.js (global)

```js
import { afterEach } from 'vitest'
import { useSessionStore } from '@/modules/auth/_shared/stores/store-session'
import { useUrlStore } from '@/modules/links/_shared/stores/store-url'

afterEach(() => {
  useSessionStore.setState({ user: null })
  useUrlStore.setState({ urlList: [] })
  localStorage.clear()
  sessionStorage.clear()
})
```

### Pre-setting store state for test scenarios

```js
// In a test, set up the store before rendering
useSessionStore.setState({ user: generateUser() })
useUrlStore.setState({ urlList: generateShortenerLinkList(2) })

renderWithProviders(<SectionShortenUrl />)
```

This is appropriate for synchronous store state (auth user, pre-existing data). For async data that comes from API hooks, mock the service instead and let the hook populate the store naturally.

---

## 6. Test Templates

### Section Integration Test Template

```jsx
import { describe, it, expect, vi } from 'vitest'
import { renderWithProviders, screen, waitFor } from 'tests/test-utils'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'vitest-axe'
expect.extend(toHaveNoViolations)

// Mock at service boundary — stable contract
vi.mock('@/modules/links/_shared/api/services/service-links', () => ({
  getLinks: vi.fn(),
  getLinkStats: vi.fn(),
  createLink: vi.fn(),
  updateLink: vi.fn(),
  deleteLink: vi.fn(),
}))

describe('SectionLinksTimeline', () => {
  function setup() {
    return userEvent.setup()
  }

  it('displays links grouped by date', async () => {
    const user = setup()
    renderWithProviders(<SectionLinksTimeline />)

    // Wait for async data
    const link = await screen.findByText(/example/)
    expect(link).toBeVisible()

    // Accessibility check
    const { container } = renderWithProviders(<SectionLinksTimeline />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
```

### Component Test Template (no service mocking)

```jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from 'tests/test-utils'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'vitest-axe'
expect.extend(toHaveNoViolations)

describe('BModal', () => {
  function setup() {
    return userEvent.setup()
  }

  it('renders content when open', () => {
    render(<BModal isOpen={true} onClose={() => {}} />)
    expect(screen.getByRole('dialog')).toBeVisible()
  })

  it('is hidden when closed', () => {
    render(<BModal isOpen={false} onClose={() => {}} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<BModal isOpen={true} onClose={() => {}} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
```

---

## 7. Scripts in package.json

Add to `package.json` scripts:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- `pnpm test` — single run, CI-friendly
- `pnpm test:watch` — watch mode for development
- No `--reporter` flag — Vitest default is human-friendly enough
- Coverage can be added later with `--coverage` and `@vitest/coverage-v8`

---

## 8. Design Decisions Summary

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Test runner | Vitest | Vite-native, same transform pipeline, fast |
| Test env | happy-dom | Faster than jsdom, no browser dependency |
| Globals | false | Explicit imports — clearer dependencies, ESLint compatible |
| Mock restore | restoreMocks: true | Auto-cleanup, no manual restore needed |
| Mock boundary | Service layer | Stable contract, providers are implementation detail |
| MSW | Phase 4 only | Services are thin pass-throughs; MSW adds value only for HTTP providers |
| Test data | Fishery + Faker | Random data per run catches edge cases |
| Store isolation | afterEach reset + clear localStorage | Full isolation, no test leakage |
| Accessibility | vitest-axe every integration test | Catch regressions automatically |
| Test location | Alongside source (`src/**/*.test.jsx`) | Co-location — easy to find, easy to maintain |
