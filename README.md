# Recruitment Task

A small React + Vite + TypeScript sample app used for a recruitment task. It demonstrates a simple user management UI with pages for listing users, viewing details, and creating/updating users. The app calls APIs through a central service module.

## Features

- List users
- View user details
- Create / edit user via a form
- Show user posts (component)

## Tech stack

- React + TypeScript
- Vite for bundling and dev server
- Minimal CSS (project-local)

## Prerequisites

- Node.js 16+ and npm

## Installation

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview production build:

```bash
npm run preview
```

## Tests

This project uses `Vitest` with `jsdom` for browser-like component testing.

Run the test suite with:

```bash
npm run test
```

If you want linting as part of local verification, also run:

```bash
npm run lint
```

## Deployment

The application is deployed at:

https://usermanagement.rycek033.workers.dev


## Project structure (key files)

- [index.html](index.html)
- [vite.config.ts](vite.config.ts)
- [src/main.tsx](src/main.tsx)
- [src/App.tsx](src/App.tsx)
- [src/pages/UserList.tsx](src/pages/UserList.tsx)
- [src/pages/UserDetails.tsx](src/pages/UserDetails.tsx)
- [src/pages/UserForm.tsx](src/pages/UserForm.tsx)
- [src/components/UserPosts.tsx](src/components/UserPosts.tsx)
- [src/services/api.ts](src/services/api.ts) — central API calls
- [src/types/index.ts](src/types/index.ts)

## How it works

The UI is organized into page components under `src/pages/`. API requests are encapsulated in `src/services/api.ts` so the UI code stays focused on rendering and state management. Types are declared under `src/types` to keep components type-safe.
