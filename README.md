# Tushar Rathod — Portfolio

A brutalist + sci-fi developer portfolio with an interactive Linux terminal,
a live WebGL hero scene, recruiter mode, custom cursor, sound FX, live GitHub
stats, and a working contact form.

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — brutalist concrete + neon design system
- **Framer Motion** + **GSAP** + **Lenis** (smooth scroll) — animations
- **Three.js / React Three Fiber / drei / postprocessing** — WebGL hero
- **Resend** — contact form email delivery
- Live GitHub stats via the GitHub REST API + contribution heatmap

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file in the project root:

```bash
# Contact form (optional). Without it, the form falls back to a mailto: link.
# Get a free key at https://resend.com
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# Optional: a verified sender. Defaults to Resend's onboarding address,
# which can only deliver to the email tied to your Resend account.
CONTACT_FROM="Portfolio <onboarding@resend.dev>"
```

> The live GitHub stats (`/api/github`) require **no** API key.

## Content

All résumé-driven content lives in `src/content/` — edit `site.ts`
(identity, links, nav) and `resume.ts` (experience, projects, skills,
achievements, about).

## Scripts

```bash
npm run dev     # start dev server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Deploy on Vercel

Push to GitHub and import the repo on [Vercel](https://vercel.com/new).
Add `RESEND_API_KEY` (and optionally `CONTACT_FROM`) under
**Settings → Environment Variables**. No other configuration is required.

> The previous Create React App version is preserved on the
> `legacy-cra-backup` git branch.
