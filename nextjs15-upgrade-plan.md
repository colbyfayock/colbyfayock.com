# Next.js 15 + React 19 Major Upgrade Plan

## Overview

Migrate colbyfayock.com from Next.js 14.2.35 + React 18.3.1 to Next.js 15 + React 19

## Breaking Changes to Address

### Next.js 15 Breaking Changes

1. **Async APIs** - `cookies()`, `headers()`, `params`, `searchParams` are now Promises
2. **Fetch caching** - No longer cached by default, requires `cache: 'force-cache'`
3. **Font optimization** - `@next/font` removed, use `next/font/google` instead
4. **Image config** - `images.domains` deprecated → `remotePatterns`
5. **getStaticPaths** → `generateStaticParams`
6. **getStaticProps** - params are now Promises

### React 19 Breaking Changes

1. `useFormState` deprecated → use `useActionState`
2. `@types/react` needs upgrade to 19.0.0
3. JSX namespace changes

## Tasks

### Phase A: Preparation

1. **Run automated codemod**: `npx @next/codemod@canary upgrade latest`
2. **Update TypeScript types**: `@types/react` and `@types/react-dom` to `^19.0.0`
3. **Update next.config.js**:
   - `images.domains` → `remotePatterns`
   - Check for deprecated config options

### Phase B: Core Next.js 15 Upgrades

4. **Install new packages**: `npm install next@latest react@latest react-dom@latest`
5. **Fix async cookies/headers**:
   - Update `src/pages/_app.js` getInitialProps if using cookies/headers
   - Update any API routes using cookies/headers
6. **Fix async params**:
   - Update dynamic routes to handle Promise params
7. **Fix fetch caching**:
   - Add `cache: 'force-cache'` to static fetch requests
   - Add `export const dynamic = 'force-static'` to static Route Handlers

### Phase C: React 19 Compatibility

8. **Replace useFormState** if used (check forms)
9. **Update @next/font imports** → `next/font/google`

### Phase D: Cleanup & Testing

10. **Test build**: `npm run build`
11. **Test dev server**: `npm run dev`
12. **Verify all pages** with Playwright
13. **Fix any remaining issues**

## Verification Steps

After each task:

- Run `npm run build` - must pass
- Run `npm run dev` - must start without errors
- Test homepage, posts listing, single post, about page

## Rollback Strategy

- Keep backup branch: `backup-pre-major-upgrade`
- If build fails repeatedly, stop and assess
- Can revert to Next.js 14 if needed
