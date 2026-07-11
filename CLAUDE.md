# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The production Next.js implementation of the **ThriveClip Productions** marketing site — a video content/marketing agency. This codebase was bootstrapped from a Claude Design HTML/CSS/JS handoff bundle (see `project/*.dc.html` and `chats/chat1.md` for original design intent/prototypes). The `project/` directory holds the original static prototype files for reference only — it is not built or imported by the app.

## Commands

```bash
npm run dev     # start dev server (Turbopack)
npm run build   # production build (webpack; Turbopack breaks embedded Sanity Studio)
npm run start   # run production build
npm run lint    # eslint
npm test        # node:test unit tests (lib/*.test.ts)
```

## Architecture

- **Next.js 15 App Router**, React 19, TypeScript, Tailwind v4 (via `@tailwindcss/postcss`).
- Pages live in `app/` (`/`, `/about`, `/portfolio`, `/portfolio/[slug]`, `/blog`, `/blog/[slug]`, `/services`, `/studio`) — each renders shared components composed in sequence (see `app/page.tsx` for the home page assembly order: Loader → NavBar → Hero → LogoMarquee → ServicesPreview → PortfolioPreview → ProcessSection → Testimonials → Booking → ContactForm → Footer → SocialFabBar).
- **`/services`** is fully implemented from `project/Services.dc.html`: NavBar → ServicesHero → ServicesList → ServicesCta → Footer (plus ParticleField / CustomCursor chrome).
- **`/portfolio`** is fully implemented from `project/Portfolio.dc.html`: NavBar → PortfolioHero → PortfolioGrid (filterable masonry) → PortfolioCta → Footer. Project detail pages live at `/portfolio/[slug]`.
- **`/about`** is fully implemented from `project/About.dc.html`: NavBar → AboutHero → AboutStats (count-up) → AboutSkills → AboutProcess → AboutTeam → AboutCta → Footer.
- **`/blog`** lists Sanity blog posts; `/blog/[slug]` renders portable text bodies.
- **`/studio`** embeds Sanity Studio (`next-sanity/studio`) for content management.
- **Sanity CMS** is the source of truth for projects, blogs, skills, team members, and site settings (hero, bio, social links). Schemas live in `sanity/schemas/`; GROQ queries in `lib/queries.ts`; fetch helpers in `lib/content.ts` / `lib/sanity.ts` (no-store in dev; ISR `revalidate: 60` in production). Types are in `lib/sanity-types.ts`. Env: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` (see `.env.local.example`). Projects support uploaded video files (`video` file field) and optional external `videoUrl` (YouTube/Cloudinary); uploaded files take priority. Skills (`name`, `category`) and team (`fullName`, `role`, `profileImage`, LinkedIn) render on `/about` after Publish. Team hierarchy: Founder and Co-Founder render above other roles via `partitionTeamByHierarchy` / `sortTeamByHierarchy` in `lib/content-helpers.ts`.
- **Large portfolio videos** that exceed Sanity upload limits live in `public/videos/` and are mapped by project slug in `lib/local-projects.ts`. `getProjectVideoUrl` resolves Sanity file → `videoUrl` → local path. When Sanity has no published projects, `LOCAL_PROJECTS` is used as the portfolio fallback. Portfolio cards use a **9:16 reel** layout with muted autoplay video previews (`components/sanity/project-card.tsx`); grids are flex-centered, not masonry.
- **`lib/data.ts`** still holds static chrome/content not yet in Sanity (nav links, services, process steps, stats, testimonials, `BOOKING_PERKS`, contact). Prefer Sanity for CMS-managed types; edit `lib/data.ts` only for remaining static sections.
- **Booking (`/#booking`)** is wired to the **Cal.com v2 API**. `components/home/booking.tsx` fetches real availability and creates real bookings via server route handlers `app/api/cal/slots` and `app/api/cal/book`, which proxy to Cal through `lib/cal.ts`. The API key stays server-side — env: `CAL_API_KEY`, `CAL_EVENT_TYPE_ID`, optional `CAL_API_BASE_URL` (see `.env.local.example`). Slots use `cal-api-version: 2024-09-04`; bookings use `2026-02-25`.
- **`components/home/`** holds homepage-specific sections (hero, booking, contact form, testimonials, etc.); **`components/services/`**, **`components/portfolio/`**, and **`components/about/`** hold their page sections; `components/` root holds shared chrome (`nav-bar.tsx`, `footer.tsx`, `reveal.tsx`, `icons.tsx`).
- **`components/reveal.tsx`** provides the `useReveal` hook and `Reveal` wrapper component — an `IntersectionObserver`-based scroll-reveal animation used throughout. Use this instead of writing new scroll-observer logic.
- **Styling approach**: components use inline `style` objects (not Tailwind classes, not CSS modules) for nearly all layout/visual styling, matching the original design bundle's approach. `app/globals.css` only holds global resets, `@keyframes` animations, and CSS custom properties. Follow the existing inline-style pattern for new components in this codebase rather than introducing Tailwind utility classes, unless asked to migrate.
- **Fonts**: self-hosted via `next/font/local` in `app/layout.tsx` (Instrument Serif as `--font-display`, Space Grotesk as `--font-body`) — not loaded from Google Fonts, for reliability/CWV.
- **Color palette**: dark theme, background `#0A0908`, foreground `#F4EFE7`, accent gradient `#E0A65A → #F0D3A0`.
- Most interactive components (nav, cursor, particle field, reveal-based sections) are Client Components (`"use client"`).

## Design source of truth

When implementing or modifying UI to match the original design, read `project/Home.dc.html` (and the corresponding `.dc.html` file for other pages) and `chats/chat1.md` — these contain the pixel-level design spec and the client's stated intent. Match visual output; don't copy the prototype's DOM structure or vanilla-JS approach verbatim, since it's being re-implemented as React components.
