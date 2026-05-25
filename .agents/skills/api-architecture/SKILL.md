---
name: api-architecture
description: "Trigger: create api endpoint, fetch data, mutation, api hook. Implement the 5-layer API architecture pattern (Client, Provider, Type, Service, Hook)."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Activation Contract

Apply this pattern when:
- Creating a new API endpoint integration.
- Creating data fetching hooks (TanStack Query) or mutations.
- Refactoring existing, coupled API calls into a scalable architecture.

Do not use this pattern for simple local state management or non-network side effects.

## Hard Rules

- The architecture consists of 5 strict layers. Never bypass them:
  1. **Clients**: Base configuration (fetch/axios) with interceptors. Located in `[scope]api/clients/client-[name].ts|js`. (Usually in `_core` module).
  2. **Providers**: Raw HTTP calls per endpoint. Located in `[scope]api/providers/provider-[end-point]-[client].ts|js`.
  3. **Types**: Response and payload types/interfaces. Located in `[scope]types/api/[TypeName].response.ts`.
  4. **Services**: Business logic layer. Consumes providers and validates data. Located in `[scope]api/services/service-[name].ts|js`.
  5. **Hooks**: React/TanStack wrapper. Consumes services. Located in `[scope]api/hooks/use-[method]-[service].ts|js`.
- **[scope] Definition**: Refer to `module-architecture` to resolve `[scope]` based on whether the project uses Feature-based or Vertical Slice mode.
- **Validation**: Services MUST validate responses. Use a utility like `util-check-response-schema(resp, schema)` with Zod/Yup to ensure structural integrity (Anti-Corruption Layer) before returning to the UI.
- Keep each layer pure: Hooks handle React state/cache (`useQuery`/`useMutation`). Services handle business logic and structural validation. Providers handle the raw HTTP request. Clients handle headers and auth interception.

## Decision Gates

| Need | Action |
|------|--------|
| Base URL, Headers, Refresh Token Logic | Modify or create a **Client** |
| Hitting a specific endpoint (`/users`) | Create a **Provider** |
| Structural typing of the response | Create a **Type / Schema** |
| Validating or transforming the response | Do it in the **Service** |
| Loading states, caching, UI reactivity | Do it in the **Hook** |

## Execution Steps

1. **Client**: Identify if an existing client (e.g. `client-fetch-auth`) can be reused. If not, create a new factory configuration.
2. **Provider**: Create the provider function. Example: `loginUser({ signal, payload })` calling the client.
3. **Type/Schema**: Define the Zod schema and export its inferred TypeScript type.
4. **Service**: Create the service function. It receives the provider as a parameter (Dependency Injection). Example: `await provider({ signal, payload })`. Pass the result through `utilCheckResponseSchema(result, MySchema)`.
5. **Hook**: Create the `useQuery` or `useMutation` hook. Inject the provider into the service inside the `queryFn` or `mutationFn`. Expose options parameter to allow UI overrides (like `onSuccess`).

## Output Contract

Return:
- The created/modified files for Client (if any), Provider, Type, Service, and Hook.
- A brief explanation of the structural validation added in the Service layer.

## References

- Use `src/modules/_core/utils/util-check-response-schema.ts` for schema validations.
