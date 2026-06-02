# Proposal: add-testing

> SDD Change Proposal for adding frontend testing infrastructure and coverage to Shortly.

## Intent

Shortly has zero automated test coverage. Every change is validated manually, which means:
- No regression safety net — a fix in the shortener can silently break auth
- No confidence when refactoring — the architecture is clean but untested
- No documentation of behavior — tests serve as executable specs

The goal is to establish a sustainable testing practice using the `testing-library-course` skill as the guiding standard: user-centric queries, accessible selectors, mock at the I/O boundary, and AAA pattern.

## Scope

### IN scope
- Test infrastructure: Vitest, Testing Library, MSW, Fishery + Faker, happy-dom
- Section integration tests (highest ROI per the pyramid)
- Component tests for stateful/interactive components
- Provider unit tests for localStorage-based providers
- Service integration tests with MSW for HTTP-based providers
- Accessibility checks (vitest-axe) on every integration test

### OUT of scope
- E2E tests (Playwright) — deferred, happy paths only in a future phase
- Snapshot tests — banned per skill rules
- Legacy code refactoring — write tests for what exists, don't rebuild
- Store unit tests in isolation — stores are tested implicitly through sections
- Zod schema validation — doesn't exist in the project, adding it is a separate change

## Approach

### Phased Strategy

Four phases ordered by ROI:

| Phase | What | Why this order |
|-------|------|----------------|
| **1** | Infrastructure + SectionShortenUrl + FormLogin | Validate infra, cover core value prop + auth gate |
| **2** | Remaining Sections (Register, Dashboard, Metrics) | Broaden coverage to all user flows |
| **3** | Core Components (Modal, Card, List items) | Polish coverage on reusable pieces |
| **4** | MSW Service Integration + Provider unit tests | Deep coverage on I/O boundaries |

### Mock Boundary

Mock at the **service layer** (`service-*.js`) for Section integration tests, exactly as the testing-library-course skill prescribes. Providers are implementation details — the tests should not break if we swap localStorage for fetch or vice versa.

MSW is used in Phase 4 for HTTP-based providers where the service is too thin to mock meaningfully (the service literally calls `provider(options)`).

### Test Data

Fishery + Faker factories for domain entities:
- `user` — id, name, email, role
- `link` — id, url, slug, createdAt (for management) / url, urlShortened (for shortener)
- `link-stats` — totalLinks, totalClicks, mostPopular

Simple primitives stay inline — no factory for a single string.

### Accessibility

Every integration test includes `vitest-axe` check. The skill says: "If it has user interaction or non-trivial composition, test accessibility."

## Phases Detail

### Phase 1 — Foundation + Critical Flows

**Infrastructure:**
- [ ] Install 9 devDependencies: vitest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, happy-dom, msw, fishery, @faker-js/faker, vitest-axe
- [ ] Create `vitest.config.js` with happy-dom environment, @ alias, globals, restoreMocks
- [ ] Create `tests/vitest-setup.js` with jest-dom matchers, store resets, localStorage cleanup, matchMedia mock
- [ ] Create `tests/test-utils.jsx` with `renderWithProviders` (MemoryRouter + Toaster)

**Factories:**
- [ ] Create `tests/factories/user.js` — `generateUser(overrides)`, `generateUserList(count)`
- [ ] Create `tests/factories/link.js` — `generateLink(overrides)`, `generateLinkList(count)`

**Section Tests:**
- [ ] `SectionShortenUrl.integration.test.jsx`
  - Scenarios: shorten URL successfully → appears in list, duplicate URL detection, empty URL validation, API error handling
- [ ] `FormLogin.integration.test.jsx`
  - Scenarios: valid credentials → session created, wrong credentials → error message, empty fields → validation errors

### Phase 2 — Remaining Sections

- [ ] `FormRegister.integration.test.jsx` — registration flow, password match validation, duplicate email
- [ ] `SectionLinksTimeline.integration.test.jsx` — load links, copy to clipboard, edit, delete with modal
- [ ] `SectionMetrics.integration.test.jsx` — loading state, data display, empty state
- [ ] `FormDashboardUrl.integration.test.jsx` — create link from dashboard

### Phase 3 — Core Components

- [ ] `BModal.test.jsx` — show/hide, ESC close, backdrop close, action buttons
- [ ] `CModalDanger.test.jsx` — composition with BModal, danger variant
- [ ] `CardLink.test.jsx` — display modes, edit toggle, copy button, status badges
- [ ] `ListShortenedUrlsItem.test.jsx` — copy feedback, timeout revert

### Phase 4 — MSW + Providers

- [ ] Create `tests/mocks/server.js` (MSW server)
- [ ] Create `tests/mocks/handlers.js` (auth + links API handlers)
- [ ] `provider-links-fetch.integration.test.js` — CRUD via HTTP, schema mismatch, errors
- [ ] `provider-url-shortener-fetch.integration.test.js` — external API calls
- [ ] `provider-auth-localstorage.unit.test.js` — login, register, verify, refresh
- [ ] `provider-url-shortener-localstorage.unit.test.js` — read, save, empty

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| localStorage in Zustand persist | Clear in `afterEach` in vitest-setup; Zustand stores use sessionStorage/localStorage under the hood |
| `window.navigator.clipboard` undefined in happy-dom | Mock with `Object.assign(navigator, { clipboard: { writeText: vi.fn() } })` per test |
| `window.matchMedia` not implemented in happy-dom | Define `Object.defineProperty(window, 'matchMedia', ...)` in vitest-setup |
| Simulated delays in auth provider (800ms) | Mock the service — the delay never runs |
| `sileo` toast library needs DOM presence | Include `<Toaster />` in renderWithProviders wrapper |
| DaisyUI + Tailwind 4 CSS-only | happy-dom renders classes, no special handling |

## Delivery Strategy

The full scope (Phase 1-4) is estimated at **800+ lines of new code** (tests + config + factories). Per the chosen review budget of 800 lines:

**Recommendation**: Execute **Phase 1** as the first PR (~300-400 lines). This validates infrastructure and covers the two most critical flows. Phase 2-4 can follow as chained PRs once Phase 1 is merged and patterns are proven.

This keeps each review under the 800-line budget while delivering immediate value.
