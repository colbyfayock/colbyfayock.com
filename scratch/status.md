# Migration Status Report

**Branch:** `feature/story-6-4-migrate-pages`  
**Base:** `main` (commit `cc3954b`)  
**Last Commit on Branch:** `55a823c` - Next.js 16 + React 19 upgrade with Sass fixes  
**Report Date:** February 6, 2026

---

## Executive Summary

This branch is performing a **major migration from Next.js Pages Router to App Router**. The migration is approximately **60-70% complete** for the core pages, but the build is currently failing due to:

1. **Missing `fetchAPI` import** in `src/lib/site.js`
2. **WordPress API rate limiting/timeouts** during static generation

The Pages Router (`src/pages/`) has been completely removed, and all routes are now in the App Router (`src/app/`).

---

## Current Build Status

```
BUILD FAILING
```

**Primary Errors:**

1. `fetchAPI is not defined` in `src/lib/site.js:13`
   - The `getSiteMetadata()` function calls `fetchAPI()` but doesn't import it
   - This causes all pages to fail during static generation

2. WordPress Gateway Timeout during pre-rendering
   - Static generation of ~193 pages hitting rate limits
   - Posts like `/posts/how-to-use-google-tag-manager...` timing out

---

## Migration Progress

### Completed App Router Pages (Staged)

| Route                    | File                                  | Status   |
| ------------------------ | ------------------------------------- | -------- |
| `/`                      | `src/app/page.js`                     | Migrated |
| `/posts`                 | `src/app/posts/page.js`               | Migrated |
| `/posts/[slug]`          | `src/app/posts/[slug]/page.js`        | Migrated |
| `/posts/page/[page]`     | `src/app/posts/page/[page]/page.js`   | Migrated |
| `/newsletter`            | `src/app/newsletter/page.js`          | Migrated |
| `/event-notes`           | `src/app/event-notes/page.js`         | Migrated |
| `/uses`                  | `src/app/uses/page.js`                | Migrated |
| `/talks/[...talkSlug]`   | `src/app/talks/[...talkSlug]/page.js` | Migrated |
| `/[...slug]` (catch-all) | `src/app/[...slug]/page.js`           | Migrated |

### New App Router Pages (Untracked - In Progress)

| Route                          | File                                          | Status  |
| ------------------------------ | --------------------------------------------- | ------- |
| `/api/feed.xml`                | `src/app/api/feed.xml/route.js`               | Created |
| `/api/sitemap`                 | `src/app/api/sitemap/route.js`                | Created |
| `/api/wp-search.json`          | `src/app/api/wp-search.json/route.js`         | Created |
| `/authors/[slug]`              | `src/app/authors/[slug]/page.js`              | Created |
| `/categories`                  | `src/app/categories/page.js`                  | Created |
| `/categories/[slug]`           | `src/app/categories/[slug]/page.js`           | Created |
| `/course`                      | `src/app/course/page.js`                      | Created |
| `/course-confirm`              | `src/app/course-confirm/page.js`              | Created |
| `/course-success`              | `src/app/course-success/page.js`              | Created |
| `/course-unsubscribe`          | `src/app/course-unsubscribe/page.js`          | Created |
| `/event-notes/[eventNoteSlug]` | `src/app/event-notes/[eventNoteSlug]/page.js` | Created |
| `/podcasts`                    | `src/app/podcasts/page.js`                    | Created |
| `/podcasts/[podcastSlug]`      | `src/app/podcasts/[podcastSlug]/page.js`      | Created |
| `/projects`                    | `src/app/projects/page.js`                    | Created |
| `/search`                      | `src/app/search/page.js`                      | Created |
| `/unsubscribe`                 | `src/app/unsubscribe/page.js`                 | Created |

### Deleted Pages Router Files

The entire `src/pages/` directory has been removed, including:

- `_app.js` and `_document.js`
- `index.js` (home page)
- `404.js`
- All page routes (posts, categories, authors, podcasts, etc.)
- Some files moved to `src/pages.disabled/` and `src/posts.disabled.bak/`

### Deleted Library Files

| File                           | Reason                           |
| ------------------------------ | -------------------------------- |
| `src/lib/apollo-client.js`     | Replaced with native fetch       |
| `src/lib/posts.js`             | Consolidated into `wordpress.js` |
| `src/lib/categories.js`        | Consolidated into `wordpress.js` |
| `src/lib/users.js`             | Consolidated into `wordpress.js` |
| `src/lib/podcasts.js`          | Consolidated into `wordpress.js` |
| `src/lib/projects.js`          | Consolidated into `wordpress.js` |
| `src/lib/event-notes.js`       | Consolidated into `wordpress.js` |
| `src/lib/featured-features.js` | Consolidated into `wordpress.js` |

### New/Modified Library Files

| File                   | Changes                                                                   |
| ---------------------- | ------------------------------------------------------------------------- |
| `src/lib/wordpress.js` | **NEW** - Centralized WordPress API with native fetch (~1152 lines added) |
| `src/lib/site.js`      | Modified to use native fetch (but missing import)                         |
| `src/lib/json-ld.js`   | Updated for App Router compatibility                                      |

### Component Updates

| Component                 | Changes                        |
| ------------------------- | ------------------------------ |
| `Layout.js`               | Refactored for App Router      |
| `Nav.js`                  | Added `'use client'` directive |
| `Footer.js`               | Minor updates                  |
| `Masthead.js`             | Minor updates                  |
| `Logo.js`                 | Minor updates                  |
| `ErrorBoundary.js`        | Added `'use client'` directive |
| `FormSignupNewsletter.js` | Added `'use client'` directive |
| `Pagination.js`           | Updated for App Router routing |
| `PostCard.js`             | Minor updates                  |
| `Metadata.js`             | Minor updates                  |
| `PdfSlider.js`            | Added `'use client'` directive |
| `Video.js`                | Added `'use client'` directive |

### Hook Updates

| Hook            | Changes                                                |
| --------------- | ------------------------------------------------------ |
| `use-site.js`   | Added `'use client'` directive                         |
| `use-search.js` | Added `'use client'` directive, updated for App Router |

---

## Blocking Issues

### Issue 1: Missing `fetchAPI` Import (CRITICAL)

**File:** `src/lib/site.js`  
**Line:** 13  
**Error:** `fetchAPI is not defined`

**Solution:** Add import at top of file:

```javascript
import { fetchAPI } from './wordpress';
```

### Issue 2: WordPress Rate Limiting (MEDIUM)

Static generation of 193 pages is causing WordPress API timeouts.

**Solutions:**

1. Reduce number of pre-rendered pages in `generateStaticParams`
2. Add retry logic with exponential backoff
3. Implement local caching during build
4. Use `dynamic = 'force-dynamic'` for less critical pages

---

## Files Changed Summary

```
71 files changed
+2,627 insertions
-3,448 deletions
```

**Breakdown:**

- Staged changes: 38 files (+2,028 / -501)
- Unstaged changes: 71 files (+2,627 / -3,448)
- Untracked (new pages): 12 directories

---

## Next Steps

### Immediate (Fix Build)

1. [ ] Fix `fetchAPI` import in `src/lib/site.js`
2. [ ] Verify build compiles successfully
3. [ ] Address any remaining import/reference errors

### Short-term (Complete Migration)

4. [ ] Stage and commit new App Router pages (untracked files)
5. [ ] Test all migrated routes manually
6. [ ] Verify API routes work (`/api/feed.xml`, `/api/sitemap`, `/api/wp-search.json`)
7. [ ] Test client-side navigation and search functionality

### Medium-term (Cleanup)

8. [ ] Remove `.disabled` and `.bak` files
9. [ ] Remove unused dependencies (react-helmet, Apollo Client if not needed)
10. [ ] Update `package.json` scripts if needed
11. [ ] Run full test suite

### Pre-merge Checklist

- [ ] Build passes (`npm run build`)
- [ ] Dev server works (`npm run dev`)
- [ ] All pages render correctly
- [ ] API routes return expected data
- [ ] Search functionality works
- [ ] SEO metadata renders correctly
- [ ] No console errors in production

---

## Reference: Story Progress (from stories.md)

| Story                                      | Status                             |
| ------------------------------------------ | ---------------------------------- |
| 6.1: Create App Router Directory Structure | COMPLETE                           |
| 6.2: Migrate Home Page                     | COMPLETE (needs testing)           |
| 6.3: Migrate Posts Pages                   | COMPLETE                           |
| 6.4: Migrate Other Pages                   | COMPLETE                           |
| 6.5: Migrate API Routes                    | COMPLETE                           |
| 6.6: Update Data Layer                     | IN PROGRESS (wordpress.js created) |
| 6.7: Migrate Metadata Management           | PARTIAL                            |
| 6.8: Update Navigation and Routing         | PARTIAL                            |
| 6.9: Migrate Styles                        | PENDING                            |
| 6.10: Cleanup Pages Router                 | IN PROGRESS (pages deleted)        |
| 6.11: Post-Migration Verification          | PENDING                            |

---

## Technical Notes

### Architecture Changes

**Before (Pages Router):**

```
src/pages/
├── _app.js          # App wrapper with providers
├── _document.js     # HTML document with GA scripts
├── index.js         # Home page
├── posts/           # Posts routes
├── [slugParent]/    # Dynamic pages
└── api/             # API routes (none existed)
```

**After (App Router):**

```
src/app/
├── layout.js        # Root layout with metadata
├── providers.js     # Client-side providers wrapper
├── page.js          # Home page (Server Component)
├── posts/           # Posts routes (Server Components)
├── [..slug]/        # Catch-all dynamic pages
└── api/             # API Route Handlers
```

### Data Fetching Changes

**Before:** Apollo Client with GraphQL queries in `getStaticProps`/`getServerSideProps`

**After:** Native `fetch` with `fetchAPI()` helper in `src/lib/wordpress.js`, direct async data fetching in Server Components

### Key Patterns Used

1. **Server Components** - All page components are async Server Components by default
2. **`generateMetadata()`** - For dynamic SEO metadata
3. **`generateStaticParams()`** - Replaces `getStaticPaths`
4. **`'use client'`** - Added to interactive components and hooks
5. **ISR** - Using `revalidate` export for Incremental Static Regeneration
