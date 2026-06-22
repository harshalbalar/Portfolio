# Connecting your projects to Notion

Manage projects in a Notion table — add a row, it appears on the site (within ~5 min).
Until you finish these steps, the site shows the `manualProjects` list from `lib/data.js`.

## 1. Create the database in Notion

Make a new **Table** (full-page database) in Notion with these columns (exact names):

| Column        | Type          | What it's for                                  |
|---------------|---------------|------------------------------------------------|
| `Name`        | Title         | Project name (already exists as the title)     |
| `Description` | Text          | 1–2 line summary shown on the card             |
| `Live URL`    | URL           | Deployed page — the **live ↗** button          |
| `Repo URL`    | URL           | GitHub repo — opens when the card is clicked   |
| `Language`    | Select        | e.g. Python, JavaScript (shows the colour dot) |
| `Tags`        | Multi-select  | Shown as chips on the card                     |
| `Order`       | Number        | Lower numbers show first                       |
| `Published`   | Checkbox      | Only checked rows appear                       |

(Only `Name` is strictly required; the rest are optional per row. If you rename a
column, mirror it in `lib/data.js` under `profile.notion.props`.)

## 2. Create an integration & get the token

1. Go to <https://www.notion.so/my-integrations> → **New integration** (internal).
2. Name it (e.g. "Portfolio"), submit, then copy the **Internal Integration Secret**
   (starts with `ntn_` / `secret_`). This is your `NOTION_TOKEN`.

## 3. Share the database with the integration

Open the database → top-right **•••** → **Connections** → add your integration.
(Without this, the API can't see the database.)

## 4. Get the database ID

Open the database as a full page. The ID is the 32-character chunk in the URL:
`https://www.notion.so/<workspace>/`**`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`**`?v=...`
That value is your `NOTION_DATABASE_ID`.

## 5. Set the environment variables

**Locally** — create `.env.local` in the project root:

```
NOTION_TOKEN=ntn_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**On Vercel** — Project → Settings → **Environment Variables** → add the same two,
then redeploy.

## Done

Add rows in Notion, check **Published**, set an **Order**. The Work section refreshes
every 5 minutes. To switch back to GitHub-based sources, change `projectSource.mode`
in `lib/data.js` to `"topic"`, `"repos"`, or `"starred"`.
