"use client";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#c9ff33]/50";

function Field({ label, hint, children }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-white/50">{label}</span>
      {children}
      {hint ? <span className="block text-[11px] text-white/30">{hint}</span> : null}
    </label>
  );
}

/** CmsSeoFields: title, description, keywords[], canonical, ogTitle, ogDescription, ogImage, ogImageAlt, indexable */
export function SeoFieldsForm({ seo, onChange }) {
  const value = seo ?? {};
  const set = (key, v) => onChange({ ...value, [key]: v });

  return (
    <div className="space-y-4">
      <Field label="SEO title" hint="Shown in the browser tab and search results (~50–60 characters).">
        <input
          type="text"
          value={value.title ?? ""}
          onChange={(e) => set("title", e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="Meta description" hint="Shown under the title in search results (~140–160 characters).">
        <textarea
          rows={3}
          value={value.description ?? ""}
          onChange={(e) => set("description", e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="Keywords" hint="Comma-separated.">
        <input
          type="text"
          value={(value.keywords ?? []).join(", ")}
          onChange={(e) =>
            set(
              "keywords",
              e.target.value
                .split(",")
                .map((k) => k.trim())
                .filter(Boolean),
            )
          }
          className={inputClass}
        />
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Open Graph title">
          <input
            type="text"
            value={value.ogTitle ?? ""}
            onChange={(e) => set("ogTitle", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Open Graph image URL">
          <input
            type="text"
            value={value.ogImage ?? ""}
            onChange={(e) => set("ogImage", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>
      <Field label="Open Graph description">
        <textarea
          rows={2}
          value={value.ogDescription ?? ""}
          onChange={(e) => set("ogDescription", e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="Canonical URL" hint="Leave blank to use the page's default path.">
        <input
          type="text"
          value={value.canonical ?? ""}
          onChange={(e) => set("canonical", e.target.value)}
          className={inputClass}
        />
      </Field>
      <label className="flex items-center gap-2.5 text-sm text-white/70">
        <input
          type="checkbox"
          checked={value.indexable ?? true}
          onChange={(e) => set("indexable", e.target.checked)}
          className="h-4 w-4 rounded border-white/20 bg-white/[0.03] accent-[#c9ff33]"
        />
        Allow search engines to index this page
      </label>
    </div>
  );
}
