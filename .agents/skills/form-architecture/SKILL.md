---
name: form-architecture
description: "Trigger: create form, add inputs, form validation, form submit. Implement the Smart Form / Dumb Fields architectural pattern."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Activation Contract

Apply this pattern when:
- Creating a new form that requires validation or API submission.
- Refactoring a large, monolithic form into maintainable pieces.
- Adding fields to an existing complex form.

Do not use this pattern for a simple single-input UI component (like a navbar search bar).

## Hard Rules

- The architecture splits forms into two strict layers: `Form` (Smart) and `Fields` (Dumb).
- **1. Form (Smart Container)**: 
  - Located in `[scope]components/form/Form[Name].tsx|jsx`.
  - Responsibilities: Initialize form state/validation (e.g., custom `useForm`), call API mutations, handle `onSubmit`, and render the `<form>` wrapper and the submit/action buttons.
- **2. Fields (Dumb Presentation)**:
  - Located in `[scope]components/fields/Fields[Name].tsx|jsx`.
  - Responsibilities: Render the inputs (`AInput`, `ASelect`, `ATextarea`), wrappers (`AFormField`), and handle the internal grid layout/margins between inputs.
  - **Constraint**: `Fields` components MUST NOT contain complex logic, API calls, or submit buttons. They receive `getFieldProps`, `getFieldError`, and any necessary display state as pure props.
- **[scope] Definition**: Refer to `module-architecture` to resolve `[scope]` based on whether the project uses Feature-based or Vertical Slice mode.

## Decision Gates

| Need | Action |
|------|--------|
| API submission, validation state, submit button | Do it in the **Form** component |
| Rendering an input, setting up a 2-column grid | Do it in the **Fields** component |
| Connecting inputs to form state | Pass props (`getFieldProps`, `getFieldError`) from Form to Fields |

## Execution Steps

1. Create the `Fields[Name]` component in `[scope]components/fields/`. Design the layout using grids/flexbox and atomic inputs. Expose props to accept field controllers from the parent.
2. Create the `Form[Name]` component in `[scope]components/form/`. Initialize the form hook with initial values and validators.
3. Inside `Form[Name]`, return the `<form>` wrapper, render the `Fields[Name]` (passing the necessary props), and place the action buttons at the bottom.
4. Hook up the `onSubmit` to the API mutation hook and handle loading/success states in the `Form`.

## Output Contract

Return:
- The created/modified `Form` and `Fields` components.
- A brief explanation verifying that the `Fields` component remains purely presentational.

## References

- Example Form (Smart): `src/modules/url-shortening/features/create-link/components/form/FormDashboardUrl.jsx`
- Example Fields (Dumb): `src/modules/settings/features/profile/components/fields/FieldsProfileSettings.jsx`
