# Tasks: add-testing

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 850-1250 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 (Phase 1) → PR 2 (Phase 2) → PR 3 (Phase 3) → PR 4 (Phase 4) |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Infra + SectionShortenUrl + FormLogin | PR 1 | ~350, base=main |
| 2 | FormRegister + SectionLinksTimeline + SectionMetrics | PR 2 | ~250, base=PR 1 |
| 3 | BModal + CardLink + ListShortenedUrlsItem | PR 3 | ~200, base=PR 2 |
| 4 | MSW + provider tests | PR 4 | ~250, base=PR 3 |

## Phase 1: Foundation

- [x] T-01: Add 9 devDeps (vitest, RTL, jest-dom, user-event, happy-dom, msw, fishery, faker, vitest-axe) to package.json; pnpm install
- [x] T-02: Create vitest.config.js — happy-dom, @ alias, globals:false, restoreMocks:true, setupFiles
- [x] T-03: Create tests/vitest-setup.js — jest-dom, afterEach store resets (useSessionStore, useUrlStore), storage clear, matchMedia, TIME_SCALE_FACTOR=0
- [x] T-04: Create tests/test-utils.jsx — renderWithProviders with MemoryRouter + Toaster from sileo, re-export RTL
- [x] T-05: Add "test":"vitest run" and "test:watch":"vitest" scripts to package.json
- [x] T-06: Create tests/factories/user.js — Fishery factory (id, name, email, role), export generateUser(overrides), generateUserList(count=3)
- [x] T-07: Create tests/factories/link.js — management factory + shortener factory, export generateLink/LinkList/ShortenerLink/ShortenerLinkList
- [x] T-08: Write src/.../SectionShortenUrl.integration.test.jsx — 5 scenarios (success, duplicate, API error, loading, empty), mock service-url-shortener, vitest-axe
- [x] T-09: Write src/.../FormLogin.integration.test.jsx — 5 scenarios (valid, wrong creds, empty email, empty password, loading), mock service-auth.login, verify session store, vitest-axe
- [x] T-10: Run pnpm test — all Phase 1 tests pass (requires local node to run)

## Phase 2: Remaining Sections

- [ ] T-11: Write src/.../FormRegister.integration.test.jsx — 5 scenarios (success, password mismatch, duplicate email, empty fields, invalid email), mock service-auth.register, vitest-axe
- [ ] T-12: Write src/.../SectionLinksTimeline.integration.test.jsx — 6 scenarios (load, copy, edit, delete, empty, loading), mock service-links, pre-set auth store, vitest-axe
- [ ] T-13: Write src/.../SectionMetrics.integration.test.jsx — 4 scenarios (display, loading, empty, error), mock service-links.getLinkStats, vitest-axe

## Phase 3: Core Components

- [ ] T-14: Write src/modules/_core/components/base/BModal/BModal.test.jsx — 6 scenarios (open, close, ESC, backdrop, primary action, secondary action), vitest-axe
- [ ] T-15: Write src/modules/links/features/management/components/card/CardLink.test.jsx — 6 scenarios (display, edit toggle, save, cancel, copy, status variants), vitest-axe
- [ ] T-16: Write src/modules/links/features/shortener/components/list/ListShortenedUrlsItem.test.jsx — 2 scenarios (copy button revert, renders both URLs), vitest-axe

## Phase 4: MSW + Providers

- [ ] T-17: Create tests/mocks/server.js + tests/mocks/handlers.js — MSW setupServer with all API handlers, wire into vitest-setup with beforeAll/afterEach/afterAll
- [ ] T-18: Write tests/providers/provider-links-fetch.integration.test.js — 6 scenarios via MSW (GET happy, 500, network error, POST, PUT, DELETE), explicit vitest imports
- [ ] T-19: Write tests/providers/provider-auth-localstorage.unit.test.js — 8 scenarios (login success/wrong/user-not-found, register success/duplicate, verify valid/expired, refresh expired)
- [ ] T-20: Write tests/providers/provider-url-shortener-localstorage.unit.test.js — 3 scenarios (read list, empty list, save list)
