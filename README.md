# Dennis Darko Portfolio (Next.js + Sanity + Vercel)

Production portfolio for an AI Engineer / LLMOps / MLOps / Educator, built with:

- Next.js App Router (Vercel-ready)
- TypeScript + Tailwind CSS
- Sanity CMS (Studio in `/sanity`)
- ISR + on-demand revalidation

The site is CMS-driven in production (projects, teaching posts, playbooks, site settings, resume file, featured projects, architecture images). A local fallback content layer remains in place so the Next app can still build before Sanity environment variables are configured.

## Architecture

- `Next.js app` (`/`) serves the public portfolio.
- `Sanity Studio` (`/sanity`) provides the admin UI for content editing.
- `Sanity dataset` stores content (recommended dataset: `production`).
- `ISR` refreshes list/detail pages every 60s.
- `Webhook -> /api/revalidate` triggers immediate revalidation on publish.

## Main Routes

- `/`
- `/projects`
- `/projects/[slug]`
- `/teaching`
- `/teaching/[slug]`
- `/playbooks`
- `/playbooks/[slug]`
- `/architecture`
- `/about`
- `/recruiter`
- `/contact`
- `/resume`
- `/api/revalidate` (webhook endpoint)

## Phase 0: Install Dependencies

### Next app

```bash
npm install
```

### Sanity Studio

```bash
cd sanity
npm install
```

## Environment Variables

Create `.env.local` in the Next app root using `.env.example`.

Required for CMS mode:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-25
REVALIDATE_SECRET=replace-with-a-long-random-string
```

Optional:

```bash
SANITY_API_READ_TOKEN=...   # drafts/private dataset reads (preview use cases)
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

Create `sanity/.env` (or `sanity/.env.local`) from `sanity/.env.example`:

```bash
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

## Sanity Project / Dataset Setup

This repo includes a fully configured Studio and schemas, but you still need to connect it to your own Sanity project/dataset.

Use one of these approaches:

1. Create a Sanity project in the Sanity dashboard, note the `projectId`, and create/use the `production` dataset.
2. Or run interactive initialization inside `/sanity`:

```bash
cd sanity
npx sanity init
```

Then update the environment variables in both the Next app and the Studio.

## Running Locally

### 1) Run the Next.js portfolio app

```bash
npm run dev
```

Open `http://localhost:3000`.

### 2) Run Sanity Studio

```bash
cd sanity
npm run dev
```

Sanity Studio runs on its own local port (typically `3333`).

## Build + Production Start (Next.js)

```bash
npm run build
npm run start
```

This app is no longer static-export-only. It is intended for Vercel (or any Node-capable Next.js host) with ISR.

## Sanity Schemas Included

- `siteSettings` (singleton)
- `project`
- `teachingPost`
- `playbook`
- `testimonial` (optional)

### `siteSettings` supports:

- name, headline, description, url, email, location
- links (github, linkedin)
- keywords array
- resumeFile (PDF upload)
- featuredProjects (references)
- announcement (enabled + text)

### `project` supports:

- title, slug, stage, featured, date, impact
- tags, categories, proof
- repo, externalUrl
- architectureImage, gallery
- caseStudy, body
- relevanceScore

### `teachingPost` supports:

- title, slug, excerpt, date, topics, body, heroImage

### `playbook` supports:

- title, slug, excerpt, body, updatedAt

## CMS -> Next.js Data Flow

The Next app uses:

- `src/lib/sanity/client.ts`
- `src/lib/sanity/queries.ts`
- `src/lib/sanity/image.ts`
- `src/lib/cms.ts`

`src/lib/cms.ts` is the CMS adapter layer. It:

- fetches Sanity data when env vars are configured
- maps Sanity documents into the existing UI shapes
- falls back to local JSON/MDX content if Sanity is not configured (helpful for initial development and build verification)

## ISR + New Slugs

List and slug pages use:

- `export const revalidate = 60`
- `generateStaticParams()` from Sanity slugs (when configured)

New content slugs published in Sanity can be served without code changes. They appear after revalidation (or immediately via webhook-triggered revalidation).

## On-Demand Revalidation (Webhook)

Next route:

- `POST /api/revalidate?secret=<REVALIDATE_SECRET>`

Implemented in:

- `src/app/api/revalidate/route.ts`

### Suggested Sanity webhook setup

Create a Sanity webhook for publish events and point it to:

```text
https://your-domain.com/api/revalidate?secret=YOUR_SECRET
```

Recommended webhook payload fields:

- `_type`
- `slug`

The route revalidates:

- `/`
- list pages (`/projects`, `/teaching`, `/playbooks`, `/architecture`, `/resume`)
- relevant slug page (`/projects/[slug]`, `/teaching/[slug]`, `/playbooks/[slug]`) when provided
- identity pages when `siteSettings` changes

## Vercel Deployment

1. Push this repo to GitHub.
2. Import the repo into Vercel.
3. Set environment variables in Vercel:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `REVALIDATE_SECRET`
   - optionally `SANITY_API_READ_TOKEN`
4. Deploy.
5. Configure the Sanity webhook to call `/api/revalidate`.

## Content Management (No Code Edits for New Content)

Once Sanity is configured:

- Add a new `project` in Sanity -> it appears in `/projects` (and `/projects/[slug]` if `caseStudy` + body content are present)
- Add `teachingPost` -> appears in `/teaching`
- Add `playbook` -> appears in `/playbooks`
- Upload a resume PDF in `siteSettings.resumeFile` -> `/resume` and Home CTA use it
- Update `featuredProjects` in `siteSettings` -> Home featured section order updates

## Notes on Legacy Local Content

Legacy repo content still exists:

- `src/data/projects.json`
- `content/projects/*.mdx`
- `content/teaching/*.mdx`
- `content/playbooks/*.mdx`

These are used as a fallback when Sanity env vars are missing. In production CMS mode, Sanity content takes precedence.

## Useful Paths

- Next app routes: `src/app/`
- CMS adapter: `src/lib/cms.ts`
- Sanity client/query/image helpers: `src/lib/sanity/`
- Sanity Studio config: `sanity/sanity.config.ts`
- Sanity schemas: `sanity/schemaTypes/`
- Revalidation endpoint: `src/app/api/revalidate/route.ts`
