/** Extract H2 headings from markdown for blog table of contents. */
export function extractMarkdownH2Headings(markdown) {
  const headings = [];
  const slugCounts = new Map();

  for (const line of markdown.split("\n")) {
    const match = /^##\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const text = match[1].replace(/\*\*/g, "").trim();
    const base = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    if (!base) continue;
    const count = slugCounts.get(base) ?? 0;
    slugCounts.set(base, count + 1);
    const id = count > 0 ? `${base}-${count}` : base;
    headings.push({ id, text });
  }
  return headings;
}

export function slugifyHeading(text, used) {
  const base = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
  let id = base;
  let n = 1;
  while (used.has(id)) {
    id = `${base}-${n++}`;
  }
  used.add(id);
  return id;
}
