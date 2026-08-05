"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

function humanize(key) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (c) => c.toUpperCase());
}

function emptyLike(value) {
  if (typeof value === "string") return "";
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, emptyLike(v)]));
  }
  return "";
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#c9ff33]/50";

function Field({ label, children }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-white/50">{label}</span>
      {children}
    </label>
  );
}

/** Text input + button to add a new key to an object (camelCased automatically). */
function AddFieldControl({ existingKeys, onAdd }) {
  const [name, setName] = useState("");

  function toKey(raw) {
    const words = raw.trim().split(/[^a-zA-Z0-9]+/).filter(Boolean);
    if (words.length === 0) return "";
    return words
      .map((w, i) => (i === 0 ? w[0].toLowerCase() + w.slice(1) : w[0].toUpperCase() + w.slice(1)))
      .join("");
  }

  function handleAdd(e) {
    e.preventDefault();
    const key = toKey(name);
    if (!key || existingKeys.includes(key)) return;
    onAdd(key);
    setName("");
  }

  return (
    <form onSubmit={handleAdd} className="flex items-center gap-2 pt-1">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New field name, e.g. Hero Title"
        className={`${inputClass} text-xs`}
      />
      <button
        type="submit"
        disabled={!toKey(name) || existingKeys.includes(toKey(name))}
        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-white/70 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus className="h-3.5 w-3.5" /> Add field
      </button>
    </form>
  );
}

/** Renders a form for an arbitrary JSON value and calls onChange with the updated value. */
export function GenericContentForm({ value, onChange }) {
  if (typeof value === "string") {
    const long = value.length > 80 || value.includes("\n");
    return long ? (
      <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    ) : (
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    );
  }

  if (typeof value === "number") {
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={inputClass}
      />
    );
  }

  if (typeof value === "boolean") {
    return (
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 rounded-full transition-colors ${value ? "bg-[#c9ff33]" : "bg-white/15"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            value ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    );
  }

  if (Array.isArray(value)) {
    const allStrings = value.every((item) => typeof item === "string");
    return (
      <div className="space-y-2">
        {value.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="flex-1 rounded-lg border border-white/10 bg-white/[0.02] p-2">
              <GenericContentForm
                value={item}
                onChange={(next) => {
                  const copy = [...value];
                  copy[index] = next;
                  onChange(copy);
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => onChange(value.filter((_, i) => i !== index))}
              className="mt-2 shrink-0 text-white/30 hover:text-rose-400"
              aria-label="Remove item"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, allStrings ? "" : emptyLike(value[0] ?? {})])}
          className="flex items-center gap-1.5 text-xs font-medium text-white/50 hover:text-[#c9ff33]"
        >
          <Plus className="h-3.5 w-3.5" /> Add item
        </button>
      </div>
    );
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    return (
      <div className="space-y-4">
        {entries.length === 0 ? <p className="text-xs text-white/30">No fields yet — add one below.</p> : null}
        {entries.map(([key, fieldValue]) => (
          <Field key={key} label={humanize(key)}>
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <GenericContentForm
                  value={fieldValue}
                  onChange={(next) => onChange({ ...value, [key]: next })}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  const { [key]: _removed, ...rest } = value;
                  onChange(rest);
                }}
                className="mt-2 shrink-0 text-white/30 hover:text-rose-400"
                aria-label={`Remove ${humanize(key)}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </Field>
        ))}
        <AddFieldControl
          existingKeys={Object.keys(value)}
          onAdd={(key) => onChange({ ...value, [key]: "" })}
        />
      </div>
    );
  }

  return (
    <input
      type="text"
      value=""
      placeholder="(empty)"
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    />
  );
}
