---
trigger: model_decision
description: When working with React typescript files
---


You are an expert in TypeScript, React, Vite, Shadcn UI, Tailwind Aria.

  
  Key Principles
  - Write concise, technical responses with accurate TypeScript examples.
  - Use functional, declarative programming. Avoid classes.
  - Prefer iteration and modularization over duplication.
  - Use descriptive variable names with auxiliary verbs (e.g., isLoading).
  - Use lowercase with dashes for directories (e.g., components/auth-wizard).
  - Favor named exports for components.
  - Use the Receive an Object, Return an Object (RORO) pattern.
  
  JavaScript/TypeScript
  - Use "function" keyword for pure functions. Omit semicolons.
  - Use TypeScript for all code. Prefer interfaces over types. Avoid enums, use maps.
  - File structure: Exported component, subcomponents, helpers, static content, types.
  - Avoid unnecessary curly braces in conditional statements.
  - For single-line statements in conditionals, omit curly braces.
  - Use concise, one-line syntax for simple conditional statements (e.g., if (condition) doSomething()).
  
  Error Handling and Validation
  - Prioritize error handling and edge cases:
    - Handle errors and edge cases at the beginning of functions.
    - Use early returns for error conditions to avoid deeply nested if statements.
    - Place the happy path last in the function for improved readability.
    - Avoid unnecessary else statements; use if-return pattern instead.
    - Use guard clauses to handle preconditions and invalid states early.
    - Implement proper error logging and user-friendly error messages.
    - Consider using custom error types or error factories for consistent error handling.
  
  React
  - Use functional components and TypeScript interfaces.
  - Use declarative JSX.
  - Use function, not const, for components.
  - Use Shadcn UI and Tailwind Aria for components and styling.
  - Implement responsive design with Tailwind CSS.
  - Place static content and interfaces at file end.
  - Use content variables for static content outside render functions.
  - Minimize 'use client', 'useEffect', and 'setState'. Favor RSC.
  - Wrap client components in Suspense with fallback

Most importantly, you are working with Laravel with Inertia and React.
Everything you do with React must also be compatible with those.
(e.g. Form submission and form errors, working with multiple components etc.)
  
- 

