# ThriveClip Productions

Next.js marketing site for ThriveClip Productions, a video content and marketing agency.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Sanity CMS (`next-sanity`, embedded Studio at `/studio`)
- Inline-style UI matching the original design handoff in `project/`

## Setup

```bash
npm install
cp .env.local.example .env.local
# fill NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site and [http://localhost:3000/studio](http://localhost:3000/studio) for Sanity Studio.

## Scripts

```bash
npm run dev     # start dev server (Turbopack)
npm run build   # production build
npm run start   # run production build
npm run lint    # eslint
npm test        # unit tests (lib/*.test.ts)
```

## Content model (Sanity)

| Type | Purpose |
| --- | --- |
| `project` | Portfolio items (image, uploaded video file and/or external video URL, tech/categories, links) |
| `blog` | Blog posts with portable text body |
| `skill` | Skills shown on About (`name`, `category`) |
| `team` | Team members on About (`fullName`, `role`, `profileImage`, LinkedIn). Founder and Co-Founder render above other roles |
| `siteSettings` | Singleton: hero copy, bio, resume URL, social links |

Agency chrome still in `lib/data.ts` (services, testimonials, process, booking, contact) until those schemas are added.

### Large project videos (local files)

Sanity file uploads have size limits. Oversized portfolio clips live in `public/videos/` and are mapped by project slug in `lib/local-projects.ts`:

| Slug | File |
| --- | --- |
| `sarodha-city-pushkar` | `/videos/sarodha-city-pushkar.mp4` |
| `2nd-final` | `/videos/2nd-final.mp4` |

Priority when resolving a project video: Sanity uploaded file → Sanity `videoUrl` → local file by slug. If no projects are published in Sanity yet, the local entries in `lib/local-projects.ts` are shown on the home and portfolio sections. To attach a local clip to a Sanity project, set the project slug to one of the keys above (or add a new entry in `LOCAL_PROJECT_VIDEOS` and drop the file in `public/videos/`).

Portfolio cards use a vertical **9:16 reel** layout (phone/short-form format) with muted autoplay previews. Detail pages render local/HTML5 clips in the same aspect ratio; landscape YouTube embeds stay 16:9.

### Publishing content

1. Create documents in Studio (`/studio`) and click **Publish** (drafts do not appear on the site).
2. Skills and team members render on `/about` (Founder and Co-Founder appear above other roles). Projects and blogs render on `/portfolio` and `/blog`.
3. In local dev, publishes show on the next page load. In production, content is cached for up to 60 seconds.

## Design reference

Original prototypes live in `project/` and design intent in `chats/`. See `CLAUDE.md` for architecture notes for coding agents.
