# User Management App

A React + TypeScript user management app built with Vite. It lets you browse users, view details, edit records, and inspect related posts.

## Features

- User list with navigation to individual details
- Create and edit user forms with validation
- User post display as a reusable component
- Responsive UI with project-local styling

## Tech Stack

- React 19
- TypeScript
- Vite
- React Hook Form + Zod
- React Router
- Tailwind CSS v4
- Vitest + Testing Library
- Cloudflare tooling for preview and deploy

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally through Wrangler:

```bash
npm run preview
```

## Scripts

- `npm run dev` - start Vite in development mode
- `npm run build` - type-check and build the app
- `npm run lint` - run ESLint
- `npm run test` - run Vitest in jsdom
- `npm run preview` - build and start Wrangler dev mode
- `npm run deploy` - build and deploy with Wrangler

## Testing

The test suite uses Vitest with jsdom for browser-like component tests.

Run all tests with:

```bash
npm run test
```

To include linting in local verification:

```bash
npm run lint
```

## Deployment

The app is configured for Cloudflare Workers deployment with Wrangler.

Production deployment:

```bash
npm run deploy
```

Current deployment target:

https://usermanagement.rycek033.workers.dev

## Project Structure

- [src/main.tsx](src/main.tsx) - app entry point
- [src/App.tsx](src/App.tsx) - top-level app shell and routing
- [src/pages/UserList.tsx](src/pages/UserList.tsx) - user list page
- [src/pages/UserDetails.tsx](src/pages/UserDetails.tsx) - user details page
- [src/pages/UserForm.tsx](src/pages/UserForm.tsx) - create/edit form page
- [src/components/UserPosts.tsx](src/components/UserPosts.tsx) - related posts component
- [src/services/api.ts](src/services/api.ts) - API layer
- [src/types/index.ts](src/types/index.ts) - shared TypeScript types

