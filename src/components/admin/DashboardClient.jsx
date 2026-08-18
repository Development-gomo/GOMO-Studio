"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Copy, Search } from "lucide-react";

const TYPE_LABELS = {
  page: "Page",
  blog: "Blog post",
  chrome: "Site chrome",
  robots: "Robots.txt",
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "draft", label: "Drafts" },
  { id: "published", label: "Published" },
];

function DuplicateAction({ item, items, router }) {
  const [open, setOpen] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [busy, setBusy] = useState(false);

  const candidates = items.filter((i) => i.type === item.type && i.id !== item.id);
  if (candidates.length === 0) return null;

  async function handleCopy() {
    if (!targetId) return;
    setBusy(true);
    const res = await fetch(`/api/admin/content/${item.id}/duplicate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetId }),
    });
    setBusy(false);
    if (res.ok) {
      setOpen(false);
      router.push(`/admin/studio/${targetId}`);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Duplicate ${item.label} to another ${TYPE_LABELS[item.type] ?? item.type}`}
        className="rounded-lg p-1.5 text-white/30 hover:bg-white/[0.06] hover:text-white"
        title="Duplicate content to another entry"
      >
        <Copy className="h-3.5 w-3.5" />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
      <select
        value={targetId}
        onChange={(e) => setTargetId(e.target.value)}
        className="rounded-md border border-white/15 bg-[#14141b] px-2 py-1 text-xs text-white outline-none focus:border-[#c9ff33]/50"
      >
        <option value="">Copy to…</option>
        {candidates.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={handleCopy}
        disabled={!targetId || busy}
        className="rounded-md bg-[#c9ff33] px-2 py-1 text-xs font-semibold text-[#0f0f0f] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {busy ? "…" : "Copy"}
      </button>
      <button type="button" onClick={() => setOpen(false)} className="text-xs text-white/40 hover:text-white">
        Cancel
      </button>
    </div>
  );
}

export function DashboardClient({ items }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const draftCount = items.filter((item) => item.hasDraft).length;

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (filter === "draft" && !item.hasDraft) return false;
      if (filter === "published" && item.hasDraft) return false;
      if (!query.trim()) return true;
      const needle = query.trim().toLowerCase();
      return item.label.toLowerCase().includes(needle) || item.id.toLowerCase().includes(needle);
    });
  }, [items, query, filter]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
      <div className="mb-8 flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-white">Content</h1>
        <p className="text-sm text-white/50">
          {items.length} items · {draftCount} draft{draftCount === 1 ? "" : "s"} waiting to publish
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages and posts…"
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#c9ff33]/50"
          />
        </div>
        <div className="flex gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === f.id ? "bg-[#c9ff33] text-[#0f0f0f]" : "text-white/60 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] py-16 text-center">
          <p className="text-sm text-white/50">No content matches your search.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-white/40">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Type</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-white/[0.03]">
                  <td className="px-4 py-3">
                    <Link href={`/admin/studio/${item.id}`} className="font-medium text-white hover:text-[#c9ff33]">
                      {item.label}
                    </Link>
                  </td>
                  <td className="hidden px-4 py-3 text-white/50 sm:table-cell">{TYPE_LABELS[item.type] ?? item.type}</td>
                  <td className="px-4 py-3">
                    {item.hasDraft ? (
                      <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400">
                        Draft
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                        Published
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end">
                      <DuplicateAction item={item} items={items} router={router} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
