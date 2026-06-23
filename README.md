# Harshal Balar — Portfolio (2025 Edition)

Animated, AI-flavoured portfolio built with **Next.js 14 (App Router)**, **Tailwind CSS**,
**Framer Motion**, and **Lenis** smooth scroll. Projects are pulled **live from your GitHub
stars** — star a repo and it shows up automatically (refreshed hourly, no redeploy).

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Edit your content

Everything you'll want to change lives in **`lib/data.js`**:

- `profile` — name, role, GitHub username, email, locations, the hero **agent-log** lines.
- `education` — your India → Germany timeline (warm = India, cool = Germany).
- `skillGroups` — the skill chips, grouped by category.
- `featured` — pinned demos shown first (your Streamlit / Render apps, TurtleBot repo, etc.).
- `socials` — your links.

The **project list** = `featured` (pinned) + your public **GitHub starred repos**.
To feature a repo on the site, just ⭐ it on GitHub.

The **project source** is set in `lib/data.js` (`projectSource.mode`). Default is
**`notion`** — manage projects in a Notion table (see **NOTION_SETUP.md**). Other modes:
`topic` / `repos` / `starred` (GitHub). Until Notion is configured, `manualProjects`
from `lib/data.js` is shown.

> Optional: set a `GITHUB_TOKEN` env var to raise the GitHub API rate limit. Not required.

## Deploy to Vercel (recommended — zero config)

1. Push this folder to a new GitHub repo:
   ```bash
   git init && git add . && git commit -m "portfolio"
   git branch -M main
   git remote add origin https://github.com/harshalbalar/portfolio.git
   git push -u origin main
   ```
2. Go to <https://vercel.com/new>, **Import** the repo, click **Deploy**. Done.
3. (Optional) Add your `harshalbalar.vercel.app` domain / custom domain in
   **Project → Settings → Domains**.

After step 2, every `git push` auto-deploys. You don't need the GitHub Action below.

## Optional: deploy via GitHub Actions instead

If you'd rather drive deploys from CI, the workflow in `.github/workflows/deploy.yml`
is ready. Add these repo **secrets** (Settings → Secrets → Actions):
`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`. Otherwise delete that file.

## Stack notes

- `app/page.jsx` is a server component; it fetches stars (`lib/github.js`) with
  `revalidate = 3600` (ISR).
- Animations (cursor, typed hero log, scroll reveals, marquee) are client components.
- Respects `prefers-reduced-motion` and hides the custom cursor on touch devices.
