# Spec: add-testing

> Delta specs for adding frontend testing infrastructure and test coverage to Shortly.

---

## 1. Infrastructure Spec

### Dependencies (devDependencies)

| Package | Version (approx) | Purpose |
|---------|------------------|---------|
| `vitest` | ^3 | Test runner, Vite-native |
| `@testing-library/react` | ^16 | Component rendering in tests |
| `@testing-library/jest-dom` | ^6 | Semantic matchers (`toBeInTheDocument`, `toBeVisible`, `toBeDisabled`) |
| `@testing-library/user-event` | ^14 | Realistic user interaction simulation |
| `happy-dom` | ^17 | Test environment (faster than jsdom) |
| `msw` | ^2 | Network-level request interception for service integration tests |
| `fishery` | ^2 | Declarative test data factories with sequences |
| `@faker-js/faker` | ^9 | Random data generation for factories |
| `vitest-axe` | ^1 | Automated accessibility violation checks |

### Config: `vitest.config.js`

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

Requirements:
- `environment: 'happy-dom'` — fast, no browser dependency
- `setupFiles` pointing to `./tests/vitest-setup.js`
- `include` pattern: `src/**/*.{test,spec}.{js,jsx}`
- `globals: false` — every test file MUST explicitly import `describe`, `it`, `expect`, `vi`, `beforeEach`, `afterEach`, etc. from `vitest`
- `restoreMocks: true` — auto-restore mocks between tests (prevents leakage)
- `@` alias matching the Vite config

### Config: `tests/vitest-setup.js`

Requirements:
- Import `@testing-library/jest-dom/vitest` to register semantic matchers
- Reset Zustand stores in `afterEach`:
  - `useSessionStore.setState({ user: null })`
  - `useUrlStore.setState({ urlList: [] })`
- Clear `localStorage` and `sessionStorage` in `afterEach`
- Define `window.matchMedia` mock for happy-dom compatibility
- Set `process.env.TIME_SCALE_FACTOR = 0` for animation acceleration

### Test Utility: `tests/test-utils.jsx`

Requirements:
- Export custom `renderWithProviders` that wraps RTL's `render` with:
  - `<MemoryRouter>` (from react-router) with configurable `initialEntries`
  - `<Toaster />` from `sileo` for toast notifications
- Re-export everything from `@testing-library/react` (screen, waitFor, etc.)
- Accept `{ route = '/' }` options parameter
- Export `axe` and `toHaveNoViolations` from `vitest-axe` with `expect.extend`

### Factories

#### `tests/factories/user.js`
- Fields: `id` (auto-sequence), `name` (faker person.fullName), `email` (faker internet.email), `role` (faker helper from ['user', 'admin'])
- Export `generateUser(overrides)` and `generateUserList(count = 3)`

#### `tests/factories/link.js`
- Fields for management links: `id` (auto-sequence), `originalUrl` (faker internet.url), `shortUrl` (faker internet.url), `createdAt` (ISO date), `clicks` (random int), `status` (from ['active', 'inactive', 'expired'])
- Fields for shortener links: `url` (faker internet.url), `urlShortened` (faker internet.url)
- Export `generateLink(overrides)` and `generateLinkList(count = 3)`

---

## 2. Test Specs — Phase 1 (Foundation)

### SectionShortenUrl — Integration Test

**File**: `src/modules/links/features/shortener/components/section/SectionShortenUrl.integration.test.jsx`

**Mock boundary**: mock `service-url-shortener` module at the service layer.

**Scenarios:**

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Successful URL shortening | Empty urlList | User types a valid URL and submits | Shortened URL appears in the list and FormUrl clears |
| 2 | Duplicate URL detection | urlList already contains a URL | User submits the same URL again | URL is not duplicated in the list |
| 3 | Shortening API error | service returns null/undefined | User submits a URL | No item added, no crash |
| 4 | Loading state during shortening | isPending=true | Component renders | Submit button shows loading indicator |
| 5 | Empty state | No URLs shortened yet | Component renders | List is hidden or shows empty message |

**Accessibility**: `axe(container)` + `toHaveNoViolations` on the rendered section.

**Store state**: `useUrlStore` should pre-populate with `urlList` for scenarios that need existing data. Reset in `afterEach`.

### FormLogin — Integration Test

**File**: `src/modules/auth/features/login/components/form/FormLogin.integration.test.jsx`

**Mock boundary**: mock `service-auth.login` at the service layer.

**Scenarios:**

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Successful login | Valid email and password | User submits the form | `useSessionStore` has user data; navigates away or shows success |
| 2 | Wrong credentials | service throws error | User submits with bad credentials | Error message is displayed in the alert |
| 3 | Empty email field | Email field is empty | User submits | Validation error for email shown |
| 4 | Empty password field | Password field is empty | User submits | Validation error for password shown |
| 5 | Loading state | Mutation is pending | Submit button clicked | Button shows loading/disabled state |

**Accessibility**: `axe(container)` + `toHaveNoViolations`.

**Store state**: Verify `useSessionStore.getState().user` is populated after successful login. Reset in `afterEach`.

---

## 3. Test Specs — Phase 2 (Remaining Sections)

### FormRegister — Integration Test

**File**: `src/modules/auth/features/register/components/form/FormRegister.integration.test.jsx`

**Mock boundary**: mock `service-auth.register`.

**Scenarios:**
| # | Scenario | Acceptance |
|---|----------|------------|
| 1 | Successful register | User created, session store populated, redirected |
| 2 | Password mismatch | `confirmPassword !== password` → validation error |
| 3 | Duplicate email | service throws "Email is already registered" → error alert |
| 4 | Empty fields | Each required field empty → validation errors |
| 5 | Invalid email format | Malformed email → validation error |

### SectionLinksTimeline — Integration Test

**File**: `src/modules/links/features/management/components/section/SectionLinksTimeline.integration.test.jsx`

**Mock boundary**: mock `service-links` (getLinks, updateLink, deleteLink).

**Requires**: `useSessionStore` pre-set with logged-in user.

**Scenarios:**
| # | Scenario | Acceptance |
|---|----------|------------|
| 1 | Load and display links | Links grouped by date in timeline |
| 2 | Copy link URL | `navigator.clipboard.writeText` called with correct URL |
| 3 | Edit link inline | Edit mode toggles, save updates the link, cancel reverts |
| 4 | Delete link with confirmation | Modal appears, confirm deletes, cancel dismisses |
| 5 | Empty state | No links → empty message |
| 6 | Loading state | Skeleton/loading shown while fetching |

### SectionMetrics — Integration Test

**File**: `src/modules/links/features/management/components/section/SectionMetrics.integration.test.jsx`

**Mock boundary**: mock `service-links.getLinkStats`.

**Scenarios:**
| # | Scenario | Acceptance |
|---|----------|------------|
| 1 | Display stats | totalLinks, totalClicks, mostPopular rendered |
| 2 | Loading state | Loading indicator while fetching |
| 3 | Empty state | Zero values displayed gracefully |
| 4 | API error | Error state handled without crash |

---

## 4. Test Specs — Phase 3 (Core Components)

### BModal — Component Test

**File**: `src/modules/_core/components/base/BModal/BModal.test.jsx`

**Scenarios:**
| # | Scenario | Acceptance |
|---|----------|------------|
| 1 | Open modal | `isOpen=true` renders modal content visible |
| 2 | Close modal | `isOpen=false` removes modal from DOM |
| 3 | ESC key closes | Pressing ESC calls `onClose` callback |
| 4 | Backdrop click closes | Clicking backdrop calls `onClose` callback |
| 5 | Primary action fires | Clicking primary button fires `onConfirm` callback |
| 6 | Secondary action fires | Clicking secondary/second button fires `onCancel` callback |

### CardLink — Component Test

**File**: src/modules/links/features/management/components/card/CardLink.test.jsx

**Scenarios:**
| # | Scenario | Acceptance |
|---|----------|------------|
| 1 | Display mode | Shows URL, clicks count, status badge |
| 2 | Toggle edit mode | Clicking edit shows input fields |
| 3 | Save edit | Save updates displayed values |
| 4 | Cancel edit | Cancel reverts to original values |
| 5 | Copy button | Click copies URL to clipboard |
| 6 | Status variants | Each status (active/inactive/expired) shows correct badge |

### ListShortenedUrlsItem — Component Test

**File**: `src/modules/links/features/shortener/components/list/ListShortenedUrlsItem.test.jsx`

**Scenarios:**
| # | Scenario | Acceptance |
|---|----------|------------|
| 1 | Copy button click | Changes text to "Copied!" and reverts after timeout |
| 2 | Renders URL and shortened URL | Both values displayed |

---

## 5. Test Specs — Phase 4 (MSW + Providers)

### MSW Infrastructure

**Files**: `tests/mocks/server.js`, `tests/mocks/handlers.js`

**Handlers required:**
- `GET */api/links` → returns link list
- `POST */api/links` → creates link
- `PUT */api/links/:id` → updates link
- `DELETE */api/links/:id` → deletes link
- `GET */api/links/stats` → returns stats
- `POST */api/url-shortener` → returns shortened URL (external API)

**Server config:**
- `setupServer(...handlers)` exported as `server`
- `onUnhandledRequest: 'error'` to catch missing handlers
- `server.listen()` in `beforeAll`
- `server.resetHandlers()` in `afterEach`
- `server.close()` in `afterAll`

### provider-links-fetch — Integration Test

**File**: `tests/providers/provider-links-fetch.integration.test.js`

**Scenarios (MSW):**
| # | Scenario | MSW response | Acceptance |
|---|----------|-------------|------------|
| 1 | GET happy path | 200 + valid link list | Returns parsed links |
| 2 | GET HTTP 500 | 500 + error message | Throws/returns error |
| 3 | GET network error | `HttpResponse.error()` | Throws connection error |
| 4 | POST create link | 201 + created link | Returns created link |
| 5 | PUT update link | 200 + updated link | Returns updated link |
| 6 | DELETE link | 204 no content | Returns success |

### provider-auth-localstorage — Unit Test

**File**: `tests/providers/provider-auth-localstorage.unit.test.js`

**Scenarios:**
| # | Scenario | Setup | Acceptance |
|---|----------|-------|------------|
| 1 | Login success | User exists in localStorage | Returns { user, accessToken, refreshToken } |
| 2 | Login wrong password | Wrong password | Throws error |
| 3 | Login user not found | No matching user | Throws error |
| 4 | Register success | New email | Creates user, returns tokens |
| 5 | Register duplicate email | Email already exists | Throws "Email is already registered" |
| 6 | Verify valid token | Token not expired | Returns user |
| 7 | Verify expired token | Token past expiry | Throws error |
| 8 | Refresh expired token | Refresh token expired | Throws error |

### provider-url-shortener-localstorage — Unit Test

**File**: `tests/providers/provider-url-shortener-localstorage.unit.test.js`

**Scenarios:**
| # | Scenario | Setup | Acceptance |
|---|----------|-------|------------|
| 1 | Read existing list | URLs stored in localStorage | Returns array of links |
| 2 | Read empty list | No stored URLs | Returns empty array |
| 3 | Save URL list | New array of links | Stored in correct localStorage key |

---

## Acceptance Criteria (Global)

1. ✅ `pnpm test` runs all tests and passes
2. ✅ All integration tests include `axe(container)` check with 0 violations
3. ✅ No test uses `fireEvent` — all user interactions via `userEvent`
4. ✅ No test uses `container.querySelector` or `data-test-id` (unless last resort with comment)
5. ✅ No test uses `toMatchSnapshot` or `toMatchInlineSnapshot`
6. ✅ Store state is reset in `afterEach` — no test leakage
7. ✅ All queries follow the priority pyramid: `*ByRole` > `*ByLabelText` > `*ByText` > `*ByTestId` (last resort)
8. ✅ Every test file explicitly imports `describe`, `it`, `expect`, `vi`, `beforeEach`, `afterEach` from `vitest` — no globals
