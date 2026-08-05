"use client";

import { ArrowDown, ArrowUp, Copy, Eye, EyeOff, X } from "lucide-react";

/**
 * Reorder + show/hide the sections of a page that renders from a `sectionOrder`
 * block map (currently only the Home page reads this — see `HOME_DEFAULT_SECTION_ORDER`).
 * `sectionDefs`: [{id, label}]. `layout`: {sectionOrder?, hiddenSections?}.
 */
export function SectionsPanel({ sectionDefs, layout, onChange }) {
  const order = Array.isArray(layout?.sectionOrder) && layout.sectionOrder.length > 0
    ? layout.sectionOrder.filter((id) => sectionDefs.some((s) => s.id === id))
    : sectionDefs.map((s) => s.id);
  for (const def of sectionDefs) {
    if (!order.includes(def.id)) order.push(def.id);
  }
  const hidden = new Set(Array.isArray(layout?.hiddenSections) ? layout.hiddenSections : []);

  function labelFor(id) {
    return sectionDefs.find((s) => s.id === id)?.label ?? id;
  }

  function move(index, dir) {
    const next = [...order];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange({ sectionOrder: next, hiddenSections: [...hidden] });
  }

  function toggleHidden(id) {
    const nextHidden = new Set(hidden);
    if (nextHidden.has(id)) nextHidden.delete(id);
    else nextHidden.add(id);
    onChange({ sectionOrder: order, hiddenSections: [...nextHidden] });
  }

  function duplicate(index) {
    const next = [...order];
    next.splice(index + 1, 0, order[index]);
    onChange({ sectionOrder: next, hiddenSections: [...hidden] });
  }

  function remove(index) {
    const next = order.filter((_, i) => i !== index);
    onChange({ sectionOrder: next, hiddenSections: [...hidden] });
  }

  const occurrenceIndex = new Map();

  return (
    <div className="space-y-2">
      {order.map((id, index) => {
        const isHidden = hidden.has(id);
        const occurrence = (occurrenceIndex.get(id) ?? 0) + 1;
        occurrenceIndex.set(id, occurrence);
        return (
          <div
            key={`${id}-${index}`}
            className={`flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 ${
              isHidden ? "opacity-50" : ""
            }`}
          >
            <span className="flex-1 text-sm text-white/85">
              {labelFor(id)}
              {occurrence > 1 ? <span className="ml-1.5 text-xs text-white/35">(copy {occurrence - 1})</span> : null}
            </span>
            <button
              type="button"
              onClick={() => move(index, -1)}
              disabled={index === 0}
              aria-label={`Move ${labelFor(id)} up`}
              className="rounded p-1 text-white/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => move(index, 1)}
              disabled={index === order.length - 1}
              aria-label={`Move ${labelFor(id)} down`}
              className="rounded p-1 text-white/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => toggleHidden(id)}
              aria-label={isHidden ? `Show ${labelFor(id)}` : `Hide ${labelFor(id)}`}
              className="rounded p-1 text-white/40 hover:text-white"
            >
              {isHidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => duplicate(index)}
              aria-label={`Duplicate ${labelFor(id)}`}
              className="rounded p-1 text-white/40 hover:text-white"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => remove(index)}
              aria-label={`Remove this ${labelFor(id)} instance`}
              className="rounded p-1 text-white/40 hover:text-rose-400"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
      <p className="pt-1 text-xs text-white/30">
        Reorder with the arrows, hide a section without deleting its content, or duplicate it to repeat that block
        further down the page.
      </p>
    </div>
  );
}
