import { profile } from "./data";

const NOTION_VERSION = "2022-06-28";
const txt = (rich) => (rich || []).map((r) => r.plain_text).join("").trim();

// Reads projects from a Notion database. Returns null if not configured or on error,
// so the caller can fall back. Configure with env vars NOTION_TOKEN + NOTION_DATABASE_ID.
export async function getNotionProjects() {
  const token = process.env.NOTION_TOKEN;
  const db = process.env.NOTION_DATABASE_ID;
  if (!token || !db) return null;

  const P = {
    name: "Name",
    description: "Description",
    live: "Live URL",
    repo: "Repo URL",
    language: "Language",
    tags: "Tags",
    order: "Order",
    published: "Published",
    ...(profile.notion?.props || {}),
  };

  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${db}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page_size: 50 }),
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();

    const rows = (data.results || [])
      .map((page) => {
        const p = page.properties || {};
        return {
          name: txt(p[P.name]?.title),
          description: txt(p[P.description]?.rich_text),
          homepage: p[P.live]?.url || "",
          html_url: p[P.repo]?.url || "",
          language: p[P.language]?.select?.name || "",
          topics: (p[P.tags]?.multi_select || []).map((t) => t.name),
          stars: 0,
          _order: typeof p[P.order]?.number === "number" ? p[P.order].number : 9999,
          _published: p[P.published]?.checkbox,
        };
      })
      .filter((x) => x.name && x._published !== false) // show unless explicitly unchecked
      .sort((a, b) => a._order - b._order);

    return rows.map(({ _order, _published, ...rest }) => rest);
  } catch {
    return null;
  }
}
