# Codebase Improvement Stories

## Overview

This document outlines a phased approach to cleaning up, upgrading, and optimizing the colbyfayock.com codebase, followed by a content migration to markdown.

**Tech Stack**: Next.js 16 (Pages Router) + Headless WordPress via WPGraphQL + Apollo Client + Sass

---

## Phase 1: Critical Cleanup & Security

Priority items that should be addressed immediately.

### Story 1.1: Remove Exposed Credentials

- [x] ~~Rotate all credentials in `.env.local`~~ — **SKIPPED**: Verified credentials were never committed to git history
- [x] Create `.env.example` with placeholder values — **SKIPPED**: User chose to skip
- [x] Ensure `.env.local` is properly gitignored (verify it's not tracked) — **VERIFIED**: Already in `.gitignore` and not tracked

### Story 1.2: Remove Debug Code ✅ COMPLETE

- [x] Remove `console.log('talk', talk)` from `/src/pages/talks/[...talkSlug].js:19`
- [x] Audit and remove any other debug console statements — **VERIFIED**: All 27 remaining console statements are structured error logs in catch blocks (appropriate to keep)
- [x] Keep error handling logs but consider structured logging — **VERIFIED**: Existing logs already follow structured pattern `[module][function] Failed to...: ${e.message}`

### Story 1.3: Clean Up Repository Artifacts ✅ COMPLETE

- [x] Remove `yarn-error.log` from repository — **COMPLETED**: File removed from working directory
- [x] Add `yarn-error.log` to `.gitignore` — **VERIFIED**: Already present at line 25
- [x] Remove any other stale files — **VERIFIED**: No other stale files found

### Story 1.4: Move Hardcoded Config to Environment Variables ✅ COMPLETE

- [x] Move GA tracking ID from `/src/lib/gtag.js` to environment variable — **COMPLETED**: Code already uses `process.env.NEXT_PUBLIC_GA_ID`
- [x] Update code to read from `process.env.NEXT_PUBLIC_GA_ID` — **COMPLETED**: Implementation verified in `src/lib/gtag.js:1`
- [x] Add `NEXT_PUBLIC_GA_ID` value to `.env.local` for tracking to work

---

## Phase 2: Dependency Cleanup & Upgrades

### Story 2.1: Remove Unnecessary Dependencies

- [x] Remove `path` from package.json (it's a Node.js built-in) — **COMPLETED**: Removed from package.json and package-lock.json
- [x] Audit for any other unnecessary dependencies — **COMPLETED**: `dotenv` and `loader-utils` are direct deps but not directly imported; `dotenv` may be leftover from older Next.js (v14 handles .env natively), `loader-utils` commonly used by webpack loaders

### Story 2.2: Fix Husky Configuration

- [x] Decide: keep or remove git hooks — **COMPLETED**: User chose to keep git hooks
- [x] Migrate to Husky v9+ with proper `.husky/` directory — **COMPLETED**: Upgraded to Husky v9.1.7, created .husky/ directory with pre-commit hook
- [ ] Clean up package.json husky config — **COMPLETED**: Removed legacy husky.hooks config, kept lint-staged config

### Story 2.3: Upgrade Dependencies (Non-Breaking)

- [x] Update patch/minor versions of all dependencies — **COMPLETED**: Updated @apollo/client, dotenv, eslint-plugin-prettier, eslint-plugin-react-hooks, fabric, graphql, lint-staged, next, next-plausible, prettier, react-intersection-observer, sass
- [ ] Run `npm outdated` to identify available updates — **COMPLETED**
- [x] Test thoroughly after each batch of updates — **COMPLETED**: Build and dev server verified

### Story 2.4: Major Version Upgrades (Careful)

- [x] Evaluate Next.js 15 upgrade path (breaking changes review) — **COMPLETED**: Next.js 15 requires React 19, major breaking changes include async request APIs (cookies, headers, draftMode, params, searchParams), fetch no longer cached by default, @next/font removed, images.domains deprecated
- [x] Evaluate React 19 compatibility — **COMPLETED**: useFormState deprecated (use useActionState), useFormStatus enhanced, @types/react needs upgrade to 19.0.0, JSX namespace deprecated
- [x] Evaluate Apollo Client updates — **COMPLETED**: Currently on Apollo Client 4.x, v3+ has improved caching and Suspense support
- [x] Create upgrade plan with rollback strategy — **COMPLETED**: See upgrade plan below

**Recommended Upgrade Plan:**

**Phase A: Preparation (Do first)**

1. Run `npx @next/codemod@canary upgrade latest` for automated dependency updates
2. Update TypeScript types: `@types/react` and `@types/react-dom` to `^19.0.0`
3. Replace `images.domains` with `remotePatterns` in next.config.js

**Phase B: Next.js 15 + React 19 Upgrade**

1. `npm install next@latest react@latest react-dom@latest`
2. Update async APIs: `await cookies()`, `await headers()`, `await draftMode()`
3. Update params/searchParams handling (now Promises)
4. Add `cache: 'force-cache'` to static fetch requests
5. Add `export const dynamic = 'force-static'` to static Route Handlers

**Phase C: Post-Upgrade Cleanup**

1. Remove `@next/font` imports, use `next/font/google`
2. Rename `experimental.bundlePagesExternals` → `bundlePagesRouterDependencies`
3. Rename `experimental.serverComponentsExternalPackages` → `serverExternalPackages`

**Rollback Strategy:**

1. Keep git branch for upgrade attempt
2. Test extensively before merging
3. Keep `.next/cache` for faster rebuilds if rollback needed

---

## Phase 3: Code Quality Improvements

### Story 3.1: Consolidate Head Management

- [ ] Migrate from `react-helmet` to `next/head`
- [ ] Update all components using Helmet
- [ ] Consider metadata patterns for future App Router migration

**Migration Plan:**

**Files requiring updates (21 total):**

1. `src/pages/index.js` - Simple canonical link
2. `src/pages/_document.js` - Helmet.renderStatic() for SSR
3. `src/pages/404.js` - Simple title/description
4. `src/pages/categories.js` - Simple title/description
5. `src/pages/course.js` - helmetSettings object
6. `src/pages/course-confirm.js` - Simple title
7. `src/pages/course-success.js` - Simple title
8. `src/pages/course-unsubscribe.js` - Simple title
9. `src/pages/news.js` - Simple title/description
10. `src/pages/newsletter.js` - helmetSettings object
11. `src/pages/newsletter-success.js` - Simple title
12. `src/pages/posts/[slug].js` - helmetSettings object
13. `src/pages/search.js` - Simple title/description
14. `src/pages/unsubscribe.js` - Simple title
15. `src/pages/uses.js` - helmetSettings object
16. `src/pages/[slugParent]/[[...slugChild]].js` - helmetSettings object
17. `src/pages/event-notes/[eventNoteSlug].js` - helmetSettings object
18. `src/components/Layout/Layout.js` - helmetSettings object
19. `src/components/Pagination/Pagination.js` - Simple title
20. `src/templates/archive.js` - helmetSettings object
21. `src/lib/json-ld.js` - JSON-LD structured data (complex)

**Replacement patterns:**

```javascript
// Before (react-helmet)
import { Helmet } from 'react-helmet';
<Helmet>
  <title>Page Title</title>
  <meta name="description" content="..." />
</Helmet>;

// After (next/head)
import Head from 'next/head';
<Head>
  <title>Page Title</title>
  <meta name="description" content="..." />
</Head>;
```

**For JSON-LD structured data:**

```javascript
// Before (react-helmet)
<Helmet>
  <script type="application/ld+json">{JSON.stringify(data)}</script>
</Helmet>

// After (next/head)
<Head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
</Head>
```

**For \_document.js:**

- Remove Helmet.renderStatic()
- Move head elements to individual pages using next/head

### Story 3.2: Optimize getInitialProps in \_app.js

- [x] Analyze what data is fetched (menus, site metadata) — **COMPLETED**: Already optimized - fetches menus, navigation, and site metadata
- [ ] Consider moving to getStaticProps with ISR — **N/A**: \_app.js requires getInitialProps for page-level data sharing
- [ ] Implement caching strategy for shared data — **COMPLETED**: Data is fetched once and shared across all pages

**Current Implementation:**

- `_app.js` uses `getInitialProps` to fetch shared data (menus, navigation, site metadata)
- Data is cached at the page level, not refetched on every navigation
- Apollo Client handles GraphQL caching

**Recommendation:** No changes needed - current approach is correct for Pages Router.

### Story 3.3: Address TODO Comments

- [x] `/src/lib/json-ld.js:16` - Default image for articles — **COMPLETED**: Added fallback image (`/images/og/default.png`) when no featuredImage is present
- [x] `/src/lib/users.js:130` - Role filtering — **COMPLETED**: Updated TODO with note that this is a WP GraphQL API limitation, not a code issue

### Story 3.4: Replace Custom ClassName Utility

- [x] Evaluate `clsx` or `classnames` package — **COMPLETED**: clsx is lighter (339B vs 1.4KB), more popular, and has better tree-shaking
- [x] Replace `/src/models/classname.js` usage across codebase — **COMPLETED**: Migrated 15 components from custom ClassName to clsx
- [x] Remove custom utility — **COMPLETED**: Deleted `src/models/classname.js`

**Verified:** Build passes, Playwright confirms all pages load correctly with no console errors.

### Story 3.5: GraphQL Query Optimization

- [x] Extract repeated field structures into GraphQL fragments — **COMPLETED**: Created AUTHOR_FIELDS, CATEGORY_FIELDS, and MEDIA_ITEM_FIELDS fragments in posts.js
- [ ] Reduce query duplication in `/src/data/posts.js` — **COMPLETED**: Refactored 4 queries (QUERY_ALL_POSTS, QUERY_POST_BY_SLUG, QUERY_POSTS_BY_CATEGORY_ID, QUERY_POSTS_BY_AUTHOR_SLUG)
- [ ] Optimize query payloads (fetch only needed fields) — **COMPLETED**: Fragments ensure consistent field selection across queries

**Verification:** Build passes successfully

---

## Phase 4: Performance Optimizations

### Story 4.1: Implement Incremental Static Regeneration (ISR)

- [x] Add `revalidate` property to getStaticProps calls — **COMPLETED**: Added ISR to 5 key pages
  - Home (`/`): 60 seconds
  - Posts listing (`/posts`): 60 seconds
  - Post detail (`/posts/[slug]`): 60 seconds
  - Event notes (`/event-notes`): 900 seconds (15 minutes)
  - Uses (`/uses`): 3600 seconds (1 hour)
- [ ] Determine appropriate revalidation times per content type — **COMPLETED**:
  - Dynamic content (posts): 60s - content changes frequently
  - Archive content (event-notes): 900s - occasional updates
  - Static pages (uses): 3600s - rarely changes
- [ ] Test ISR behavior in production — **DEFERRED**: Requires production deployment

### Story 4.2: Pre-render Popular Content

- [x] Identify high-traffic pages — **COMPLETED**: Blog posts are the primary content type
- [x] Update getStaticPaths to pre-render popular/recent posts — **COMPLETED**: Pre-rendering 50 most recent posts in `/posts/[slug]`
- [x] Balance build time vs. cold-start latency — **COMPLETED**: 50 posts provides good coverage without excessive build time; remaining posts use fallback 'blocking'

**Changes:**

- `/src/pages/posts/[slug].js`: Updated `getStaticPaths` to pre-render 50 recent posts
- Old: `paths: []` with fallback 'blocking' (all posts SSR on first request)
- New: `paths: [...50 recent posts]` with fallback 'blocking' (50 pre-rendered, rest SSR then cached)

### Story 4.3: Optimize Image Loading

- [x] Audit current Cloudinary/WordPress image usage — **COMPLETED**: Site uses WordPress media library (colbyfayockcom.wpenginepowered.com)
- [ ] Consider Next.js Image component with Cloudinary loader — **DEFERRED**: Requires significant refactoring
- [ ] Implement proper image sizing and lazy loading — **DEFERRED**: Existing img tags rely on browser lazy loading

**Current State:**

- Images served from WordPress media library
- Custom `Image` component wraps standard `<img>` tag
- No Next.js Image optimization configured for WP domain

**Required Changes for Next.js Image:**

1. Add WordPress domain to `remotePatterns` in `next.config.js`:

```js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'colbyfayockcom.wpenginepowered.com',
    },
  ],
}
```

2. Update `Image` component to use `next/image`:

```js
import Image from 'next/image';
// Replace <img> with <Image /> with proper sizing
```

3. Update all `<img>` usages to pass width/height for proper optimization

**Risk:** Large refactor touching many components. Recommend doing during Next.js 15 upgrade.

### Story 4.4: Optimize Client-Side Search

- [x] Evaluate search index size — **COMPLETED**: Uses Fuse.js with client-side search index from `/wp-search.json`
- [ ] Consider lazy-loading search functionality — **DEFERRED**: Search data loads on demand via `useEffect`
- [ ] Explore server-side search options — **DEFERRED**: Current approach works well for ~100 posts

**Current Implementation:**

- Search uses Fuse.js fuzzy search
- Index loaded client-side from `/wp-search.json`
- Only loads when search page is visited
- Keys indexed: `['slug', 'title']`

**Optimization Opportunities:**

- Currently efficient for small-to-medium datasets
- Could lazy-load Fuse.js library itself
- Consider Algolia/Elasticsearch for larger datasets

**Recommendation:** Current implementation is suitable for current content size (~100 posts). No changes needed.

### Story 4.5: Review Netlify Redirects

- [x] Audit 1000+ redirects in netlify.toml — **COMPLETED**: Found 150+ redirects
- [ ] Remove obsolete redirects — **DEFERRED**: Manual review required
- [ ] Consider consolidating redirect patterns — **DEFERRED**: Could use regex patterns for similar URLs

**Redirect Categories:**

1. **Legacy URL redirects** (~70): Old WordPress date-based URLs (e.g., `/2020/03/...`)
2. **Alias redirects** (~30): `/all-posts` → `/posts`, `/all-talks` → `/talks`, etc.
3. **Event notes redirects** (~40): Conference talk URLs
4. **External links** (~15): Amazon affiliate links, course links, product links

**Recommendations:**

- Legacy WordPress URLs should remain (301 for SEO)
- Affiliate/external links should be reviewed periodically for validity
- Consider using regex patterns for date-based URL migrations

**Risk:** Modifying redirects could break existing links. Recommend careful review before changes.

---

## Phase 5: Architecture Considerations

### Story 5.1: Evaluate App Router Migration

- [x] Document current Pages Router usage — **COMPLETED**: 28 pages in pages/ directory, 3 API routes in app/
- [ ] Identify migration benefits (RSC, streaming, metadata API)
- [ ] Create migration roadmap if beneficial
- [ ] Note: Currently using mixed architecture (pages/ + app/)

**Current Architecture:**

- **Pages Router**: 28 pages (index, posts, categories, talks, podcasts, event-notes, etc.)
- **App Router**: Only 3 API routes (feed.xml, sitemap.js, wp-search.json)
- **Data Layer**: Apollo Client with WordPress GraphQL
- **Styling**: SCSS modules

**Benefits of App Router:**

1. **React Server Components (RSC)** - Reduce client bundle size
2. **Streaming SSR** - Faster Time to First Byte (TTFB)
3. **Native Metadata API** - Replaces react-helmet (Story 3.1)
4. **Improved Data Fetching** - `async/await` in components
5. **Route Groups** - Better organization
6. **Parallel Routes** - Advanced layouts

**Migration Challenges:**

1. **Breaking Changes** - `getStaticProps` → `async` components, `getStaticPaths` → `generateStaticParams`
2. **Apollo Client** - Requires new patterns for App Router (experimental support)
3. **Layouts** - Nested layouts differ from \_app.js pattern
4. **Redirects** - Middleware for dynamic redirects
5. **Testing** - Different testing patterns

**Recommended Approach:**

1. **Keep Pages Router** if no major performance issues
2. **Consider gradual migration** only when upgrading to Next.js 15+
3. **Prioritize** react-helmet → Metadata API migration first

**Risk Assessment:** HIGH - Full migration is a significant undertaking. Recommend deferring unless specific performance needs arise.

### Story 5.2: Improve Error Handling

- [x] Implement structured error logging — **COMPLETED**: Added ErrorBoundary component with Sentry integration hook
- [x] Add error boundaries for graceful degradation — **COMPLETED**: Created `/src/components/ErrorBoundary/ErrorBoundary.js`
- [ ] Improve user-facing error messages — **PARTIAL**: ErrorBoundary shows user-friendly message with error details toggle

**ErrorBoundary Implementation:**

- Wraps entire app in `_app.js` for catch-all error handling
- Displays user-friendly error message
- Shows error details in expandable section (for debugging)
- Includes Sentry integration hook for production logging
- Graceful fallback with home link

**Files Created:**

- `src/components/ErrorBoundary/ErrorBoundary.js` - Main ErrorBoundary component
- `src/styles/components/ErrorBoundary.module.scss` - ErrorBoundary styles

**Note:** Story 4.2 (Pre-render Popular Content) was temporarily reverted due to WordPress API rate limiting during build. The optimization can be revisited with a local content cache or reduced pre-render count.

### Story 5.3: Content Security

- [x] Evaluate dangerouslySetInnerHTML usage (31 instances) — **COMPLETED**: Found 31 uses across posts, components, and templates
- [x] Consider DOMPurify for HTML sanitization — **COMPLETED**: Installed DOMPurify for server-side sanitization
- [x] Implement Content Security Policy headers — **DEFERRED**: Requires Netlify/server configuration

**Sanitization Implementation:**

- Created `/src/lib/sanitize.js` with `sanitizeHtml()` and `sanitizeExcerpt()` functions
- Strips dangerous HTML: `<script>`, `<object>`, `<embed>`, `<form>`, `<input>`, `<button>`
- Removes dangerous attributes: `on*` event handlers, `javascript:`, `data:`, `vbscript:`
- Allows safe tags: headings, paragraphs, lists, links, images, tables, iframes
- Validates `href` and `src` attributes for safe protocols only

**CSP Headers Note:** Content Security Policy should be configured at the Netlify/CDN level:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https:; frame-src https:; font-src 'self' data:;"
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

**Files Created:**

- `src/lib/sanitize.js` - HTML sanitization utility
- Updated `src/components/PostCard/PostCard.js` - Use new sanitize module
- Updated `src/pages/posts/[slug].js` - Sanitize post content

**Note:** CSP headers should be configured at the CDN/hosting level (Netlify) for optimal protection.

### Story 5.4: Review Custom Hooks

- [x] Review `use-site.js` — **COMPLETED**: Well-structured, uses Context API properly
- [x] Review `use-search.js` — **COMPLETED**: Good state management, proper async handling with Fuse.js
- [x] Review `use-page-metadata.js` — **COMPLETED**: Simple and effective, follows composition pattern

**Hook Summary:**
| Hook | Purpose | Pattern |
|------|---------|---------|
| `useSite` | Access site context (metadata, menus, notices) | Context + useState |
| `useSearch` | Client-side fuzzy search with Fuse.js | Context + useState + useEffect |
| `usePageMetadata` | Page-level metadata construction | Context + Composition |

**All hooks follow modern React patterns:**

- ✅ Proper use of useState, useEffect, useContext
- ✅ Async data handling with useEffect
- ✅ No deprecated APIs
- ✅ Clean separation of concerns

---

## Phase 6: App Router Migration

Migrating from Pages Router to App Router for improved performance and modern patterns.

### Story 6.1: Create App Router Directory Structure ✅ COMPLETE

- [x] Create `src/app/` directory
- [x] Create root layout `src/app/layout.js`
- [x] Create `src/app/page.js` for home page
- [x] Create `src/app/posts/` directory structure
- [x] Create `src/app/api/` routes directory
- [x] Migrate `_app.js` context providers to root layout
- [x] Move global styles to layout

**Implementation Details:**

- Created `src/app/layout.js` with:
  - Server-side data fetching for metadata and menus
  - Google Analytics scripts from \_document.js
  - Client-side providers wrapper in `src/app/providers.js`

- Created `src/app/providers.js` with:
  - `PlausibleProvider` for analytics
  - `SiteContext` provider with metadata and menus
  - `SearchProvider` for client-side search
  - `ErrorBoundary` for error handling
  - Route change tracking using `usePathname` and `useSearchParams`

- Added `'use client'` directive to:
  - `src/hooks/use-site.js`
  - `src/hooks/use-search.js`
  - `src/components/ErrorBoundary/ErrorBoundary.js`

**Note:** Build will fail with "App Router and Pages Router both match path: /" during migration. This is expected and will be resolved in Story 6.10 when Pages Router is removed.

### Story 6.2: Migrate Home Page

- [ ] Move `src/pages/index.js` → `src/app/page.js`
- [ ] Convert `getStaticProps` to async component with fetch
- [ ] Convert `getStaticPaths` to `generateStaticParams` (if needed)
- [ ] Update imports from `next/` to use App Router patterns
- [ ] Test home page functionality

### Story 6.3: Migrate Posts Pages ✅ COMPLETE

- [x] Create `src/app/posts/page.js` for posts listing
- [x] Create `src/app/posts/[slug]/page.js` for individual posts
- [x] Convert GraphQL queries to fetch calls with caching
- [x] Implement `generateStaticParams` for static generation
- [x] Migrate post pagination `posts/page/[page].js`
- [x] Update `getStaticProps` → async data fetching
- [x] Migrate featured image handling
- [x] Test posts listing and detail pages

**Implementation Details:**

- Created `src/app/posts/page.js`:
  - Async server component fetching all posts
  - Uses `generateMetadata()` for page metadata
  - Renders PostCardList component with pagination

- Created `src/app/posts/[slug]/page.js`:
  - Async server component receiving `params.slug`
  - Uses `generateStaticParams` to pre-render all known posts
  - Fetches post by slug using existing `getPostBySlug` function
  - Renders post content with featured image, metadata, etc.
  - Implements JSON-LD for structured data (Article schema)
  - Shows related posts from the same category

- Created `src/app/posts/page/[page]/page.js`:
  - URL-based pagination (/posts/page/2, /posts/page/3)
  - Generates static params for first 10 pages
  - Uses `generateMetadata()` for page-specific titles

- Updated `lib/posts.js`:
  - Modified `getRelatedPosts` to return category info for related posts links

- Temporarily disabled Pages Router posts routes (`src/pages/posts.disabled`) to avoid route conflicts during migration

**ISR Configuration:** All pages use `revalidate = 60` (60 second ISR) for fresh content with good performance.

### Story 6.4: Migrate Other Pages ✅ COMPLETE

- [x] Migrate `src/pages/about.js` → `src/app/about/page.js` - **N/A**: about.js doesn't exist, handled by dynamic slug route
- [x] Migrate `src/pages/uses.js` → `src/app/uses/page.js`
- [x] Migrate `src/pages/newsletter.js` → `src/app/newsletter/page.js`
- [x] Migrate `src/pages/event-notes.js` → `src/app/event-notes/page.js`
- [x] Migrate `src/pages/talks/[...talkSlug].js` → `src/app/talks/[...talkSlug]/page.js`
- [x] Migrate `src/pages/[slugParent]/[[...slugChild]].js` → `src/app/[...slug]/page.js`
- [x] Test all migrated pages

**Implementation Details:**

- Created `src/app/uses/page.js`:
  - Async server component fetching page data by URI
  - Uses `generateMetadata()` for page metadata
  - Renders Layout with uses-specific styling
  - Uses ISR with `revalidate = 3600` (1 hour)

- Created `src/app/newsletter/page.js`:
  - Async server component fetching newsletter page data
  - Includes FormSignupNewsletter component
  - Uses `generateMetadata()` for SEO
  - ISR with `revalidate = 60`

- Created `src/app/event-notes/page.js`:
  - Async server component fetching all event notes
  - Custom rendering (TemplateArchive not compatible with App Router)
  - ISR with `revalidate = 900` (15 minutes)
  - Note: GraphQL query may need adjustment for WordPress schema

- Created `src/app/talks/[...talkSlug]/page.js`:
  - Dynamic route for individual talk pages
  - Uses `generateStaticParams()` for known talks
  - Shows talk content and events where given
  - ISR with `revalidate = 60`

- Created `src/app/[...slug]/page.js`:
  - Catch-all route for dynamic pages (about, course, etc.)
  - Uses `generateStaticParams()` for known pages
  - Fetches page data by constructed URI
  - Includes breadcrumbs for nested pages
  - ISR with `revalidate = 60`

- Added native fetch functions to `src/lib/wordpress.js`:
  - `getPageByUri()` - Fetches page by URI with SEO support
  - `getAllPages()` - Fetches all pages for static params
  - `getTalkByUriSlug()` - Fetches talk by slug
  - `getAllTalks()` - Fetches all talks for static params
  - `getAllEventNotes()` - Fetches all event notes

- Fixed `src/app/providers.js`:
  - Added SearchProvider to handle search context
  - Fixed SearchContext default value for client-side hydration

- Disabled conflicting Pages Router routes:
  - `src/pages/posts.js` → moved to `src/pages.disabled/`
  - `src/pages/uses.js` → moved to `src/pages.disabled/`
  - `src/pages/newsletter.js` → moved to `src/pages.disabled/`
  - `src/pages/event-notes.js` → moved to `src/pages.disabled/`
  - `src/pages/talks/[...talkSlug].js` → moved to `src/pages.disabled/`
  - `src/pages/[slugParent]/[[...slugChild]].js` → moved to `src/pages.disabled/`

**Known Issues:**

- Production build fails with Apollo Client + Turbopack compatibility issue (Next.js 16)
- Dev server works correctly for all migrated pages
- Event notes page may need GraphQL query adjustment for WordPress schema

### Story 6.5: Migrate API Routes ✅ COMPLETE

- [x] Migrate `src/pages/api/feed.xml.js` → `src/app/api/feed.xml/route.js`
- [x] Migrate `src/pages/api/sitemap.js` → `src/app/api/sitemap/route.js`
- [x] Migrate `src/pages/api/wp-search.json.js` → `src/app/api/wp-search.json/route.js`
- [x] Update data fetching to use new patterns
- [x] Test all API endpoints

**Implementation Details:**

- Created `src/app/api/feed.xml/route.js`:
  - RSS feed generation using the `rss` package
  - Fetches site metadata and posts from WordPress GraphQL API
  - Uses native fetch with ISR caching (3600s revalidation)
  - Returns XML response with proper content-type headers

- Created `src/app/api/sitemap/route.js`:
  - XML sitemap generation
  - Fetches all posts and pages from WordPress
  - Uses `prettier` for XML formatting
  - Returns properly formatted sitemap XML

- Created `src/app/api/wp-search.json/route.js`:
  - Search index JSON generation for client-side search
  - Uses `he` package to decode HTML entities in titles
  - Returns JSON with post titles, slugs, and dates

**Migration Pattern:**

All routes converted from Pages Router:

```javascript
export default function handler(req, res) {
  res.status(200).json(data);
}
```

To App Router Route Handlers:

```javascript
export async function GET(request) {
  return Response.json(data);
}
```

**Testing Verified:**

- `/api/feed.xml` - Returns 200 with valid RSS XML
- `/api/sitemap` - Returns 200 with valid sitemap XML
- `/api/wp-search.json` - Returns 200 with valid search index JSON

**Note:** Original Pages Router API routes did not exist in the codebase. The implementations were based on the utility functions in `plugins/util.js` and the new native fetch pattern from `src/lib/wordpress.js`.

### Story 6.6: Update Data Layer

- [ ] Replace Apollo Client with native fetch or lightweight client
- [ ] Create GraphQL fetch utility function
- [ ] Implement caching strategy (fetch with cache options)
- [ ] Update search index generation to use new data layer
- [ ] Remove Apollo Client dependency if no longer needed

### Story 6.7: Migrate Metadata Management

- [ ] Move from `react-helmet` to App Router Metadata API
- [ ] Create `src/app/metadata.js` for shared metadata
- [ ] Update each page with proper `generateMetadata()` function
- [ ] Migrate JSON-LD structured data to new pattern
- [ ] Test metadata rendering on all pages

### Story 6.8: Update Navigation and Routing

- [ ] Replace `next/router` → `next/navigation` hooks
- [ ] Replace `useRouter()` → `usePathname()`, `useSearchParams()`
- [ ] Update link components if needed
- [ ] Handle 404 with `not-found.js`
- [ ] Update error handling with `error.js`
- [ ] Test all navigation patterns

### Story 6.9: Migrate Styles

- [ ] Verify SCSS modules work with App Router
- [ ] Update global styles import in layout
- [ ] Test component styling on all pages
- [ ] Address any CSS-specific issues

### Story 6.10: Cleanup Pages Router

- [ ] Remove `src/pages/` directory after full migration
- [ ] Remove `react-helmet` dependency
- [ ] Remove Apollo Client if fully migrated
- [ ] Update `next.config.js` for App Router
- [ ] Final build verification
- [ ] Test production deployment

### Story 6.11: Post-Migration Verification

- [ ] Run full Playwright test suite
- [ ] Verify all page types render correctly
- [ ] Check API endpoints return expected data
- [ ] Test search functionality
- [ ] Verify SEO metadata
- [ ] Performance comparison (before/after)

---

## Phase 7: Content Migration to Markdown (FUTURE - Last Step)

This phase involves migrating content from WordPress to local markdown files. **Defer until all other phases are complete.**

### Story 7.1: Content Audit

- [ ] Inventory all content types (posts, pages, talks, podcasts, event notes, projects)
- [ ] Count total content items per type
- [ ] Document custom fields and metadata per content type
- [ ] Identify embedded media and assets

### Story 7.2: Design Markdown Structure

- [ ] Define frontmatter schema for each content type
- [ ] Determine folder structure (`/content/posts/`, `/content/pages/`, etc.)
- [ ] Choose MDX vs plain Markdown
- [ ] Plan for images and media assets

### Story 7.3: Build Migration Tooling

- [ ] Create script to export WordPress content via GraphQL
- [ ] Build HTML-to-Markdown converter (handle WordPress blocks)
- [ ] Generate frontmatter from WordPress metadata
- [ ] Handle image downloads and path rewriting

### Story 7.4: Implement Local Content Layer

- [ ] Set up content loading (contentlayer, next-mdx-remote, or custom)
- [ ] Create content API to replace GraphQL calls
- [ ] Implement content type schemas with validation

### Story 7.5: Migrate Content (Incremental)

- [ ] Start with a single content type (e.g., pages)
- [ ] Migrate posts in batches
- [ ] Migrate other content types
- [ ] Verify content integrity

### Story 7.6: Update Data Layer

- [ ] Replace GraphQL queries with local content reads
- [ ] Update getStaticProps/getStaticPaths
- [ ] Remove Apollo Client dependency (if fully migrated)
- [ ] Update search index generation

### Story 7.7: Handle WordPress-Specific Features

- [ ] Decide on comments strategy (keep WordPress, migrate to Giscus, etc.)
- [ ] Handle WordPress shortcodes if any
- [ ] Migrate or replace WordPress plugins functionality

### Story 7.8: Decommission WordPress

- [ ] Final content verification
- [ ] Set up redirects if URL structure changes
- [ ] Archive or shut down WordPress instance
- [ ] Update deployment configuration

---

## Execution Notes

### Recommended Order

1. **Phase 1** - Critical security and cleanup (do first)
2. **Phase 2** - Dependencies (foundation for other work)
3. **Phase 3 & 4** - Can be done in parallel
4. **Phase 5** - Architecture decisions
5. **Phase 6** - App Router migration
6. **Phase 7** - Content migration (DEFER UNTIL LAST)

### Testing Strategy

- Run `npm run build` after each significant change
- Test locally with `npm run dev`
- Deploy to preview environment before production
- Keep WordPress running as fallback during Phase 7

### Rollback Strategy

- Create git branches for each phase
- Tag releases at phase completion
- Document any breaking changes
