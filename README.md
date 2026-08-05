# GOMO Studio

An AI-powered website backend editor and quick CMS — manage, edit, generate, preview, and publish website content from a simple admin interface.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router, RSC) |
| Language | JavaScript |
| Styling | Tailwind CSS v4 |
| Content | `content/cms/*.json` overlays merged over React component defaults |
| AI | Anthropic Claude (`@anthropic-ai/sdk`) |

## Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Copy the env template and fill in values
cp .env.local.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the marketing site, and [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the Studio admin.

Full architecture, workflow, and setup docs live in-app at **`/documentation`**.

## Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
ANTHROPIC_API_KEY=
RESEND_API_KEY=
RESEND_FROM=
CAREERS_APPLICATION_TO=
NEWSLETTER_NOTIFY_TO=
```

## Scripts

```bash
npm run dev      # start dev server
npm run build    # production build
npm run start    # run production build
npm run lint     # lint
```
