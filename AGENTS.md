# Agent Instructions

This document provides guidance for AI agents and developers working on this codebase.

## Project Overview

Personal portfolio/blog website built with:

- **Next.js 16** with App Router
- **React 19**
- **Headless WordPress** via WPGraphQL
- **Netlify** for hosting

## Development Setup

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

## Testing

### E2E Tests with Playwright

This project uses Playwright for end-to-end testing. Tests should be run manually before merging PRs.

**Run tests against local dev server:**

```bash
npm run dev  # In one terminal
npm run test:e2e  # In another terminal
```

**Run tests against a deploy preview:**

```bash
BASE_URL="https://deploy-preview-{PR_NUMBER}--colbyfayock.netlify.app" npm run test:e2e
```

**Run tests against production:**

```bash
BASE_URL="https://colbyfayock.com" npm run test:e2e
```

### Test Coverage

There are 73 E2E tests covering:

- Homepage functionality
- Blog post pages
- Newsletter pages
- Category/tag archives
- Social share dialogs
- Navigation and links
- SEO metadata

### Before Merging a PR

1. Ensure the Netlify deploy preview builds successfully
2. Run E2E tests against the deploy preview URL
3. Verify all 73 tests pass

## WordPress GraphQL

The site fetches content from a headless WordPress instance:

- **Endpoint:** `https://colbyfayockcom.wpenginepowered.com/graphql`

This is configured via `WORDPRESS_GRAPHQL_ENDPOINT` environment variable.

## Key Directories

```
src/
├── app/           # Next.js App Router pages
├── components/    # React components
├── lib/           # Utilities and data fetching
├── styles/        # CSS styles
└── templates/     # Page templates

tests/
└── e2e/           # Playwright E2E tests
```

## Common Tasks

### Adding a new page

Pages use the App Router convention in `src/app/`.

### Modifying GraphQL queries

Queries are in `src/lib/` - check `posts.js`, `pages.js`, etc.

### Updating components

Components are in `src/components/` - most are React Server Components.
