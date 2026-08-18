"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Monitor, RefreshCw, Save, Smartphone, Tablet, Trash2, UploadCloud } from "lucide-react";
import { GenericContentForm } from "@/components/admin/GenericContentForm";
import { SeoFieldsForm } from "@/components/admin/SeoFieldsForm";
import { AiPanel } from "@/components/admin/AiPanel";
import { SectionsPanel } from "@/components/admin/SectionsPanel";
import { deepMerge } from "@/lib/cms/deep-merge";

const PREVIEW_HEIGHT = 640;

const DEVICE_PRESETS = {
  desktop: { label: "Desktop", width: 1440, Icon: Monitor },
  tablet: { label: "Tablet", width: 834, Icon: Tablet },
  mobile: { label: "Mobile", width: 390, Icon: Smartphone },
};

/** Renders the preview iframe at a fixed device width, scaled to fit the available panel width. */
function DevicePreviewFrame({ src, device }) {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { width: deviceWidth } = DEVICE_PRESETS[device];
  const scale = containerWidth > 0 ? Math.min(1, containerWidth / deviceWidth) : 1;
  const marginLeft = Math.max(0, (containerWidth - deviceWidth * scale) / 2);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-b-2xl border border-white/10 bg-white"
      style={{ height: PREVIEW_HEIGHT }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: marginLeft,
          width: deviceWidth,
          height: PREVIEW_HEIGHT / scale,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <iframe src={src} title="Live preview" className="h-full w-full" style={{ width: deviceWidth }} />
      </div>
    </div>
  );
}

function splitContent(entry, data) {
  if (entry.type === "robots") {
    return { seoPart: null, bodyPart: data ?? { body: "" }, layoutPart: null };
  }
  if (entry.type === "page") {
    return {
      seoPart: entry.hasSeo ? data?.seo ?? {} : null,
      bodyPart: data?.sections ?? {},
      layoutPart: entry.sections ? data?.layout ?? {} : null,
    };
  }
  // blog / chrome — flat shape, seo (if any) lives alongside other fields
  const { seo, ...rest } = data ?? {};
  return { seoPart: entry.hasSeo ? seo ?? {} : null, bodyPart: rest, layoutPart: null };
}

function mergeContent(entry, data, { seoPart, bodyPart, layoutPart }) {
  if (entry.type === "robots") return bodyPart;
  if (entry.type === "page") {
    return { ...data, seo: seoPart, sections: bodyPart, ...(layoutPart !== null ? { layout: layoutPart } : {}) };
  }
  return { ...bodyPart, ...(entry.hasSeo ? { seo: seoPart } : {}) };
}

export function StudioEditor({ id }) {
  const [loading, setLoading] = useState(true);
  const [entry, setEntry] = useState(null);
  const [data, setData] = useState(null);
  const [hasDraft, setHasDraft] = useState(false);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [previewNonce, setPreviewNonce] = useState(0);
  const [previewDevice, setPreviewDevice] = useState("desktop");

  useEffect(() => {
    if (status !== "success" || !message) return;
    const timer = setTimeout(() => setMessage(""), 4000);
    return () => clearTimeout(timer);
  }, [status, message]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const res = await fetch(`/api/admin/content/${id}`);
      if (!res.ok) {
        if (!cancelled) {
          setStatus("error");
          setMessage("Could not load this content.");
          setLoading(false);
        }
        return;
      }
      const json = await res.json();
      if (!cancelled) {
        setEntry(json.entry);
        setData(json.effective);
        setHasDraft(json.draft !== null);
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    return () => {
      if (previewOpen) {
        fetch("/api/admin/preview/disable", { method: "POST", keepalive: true });
      }
    };
  }, [previewOpen]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-white/40">Loading…</p>
      </div>
    );
  }

  if (!entry || data === null) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <p className="text-sm text-white/50">{message || "This content couldn't be found."}</p>
        <Link href="/admin" className="text-sm font-medium text-[#c9ff33]">
          Back to dashboard
        </Link>
      </div>
    );
  }

  const { seoPart, bodyPart, layoutPart } = splitContent(entry, data);

  function updateSeo(nextSeo) {
    setData(mergeContent(entry, data, { seoPart: nextSeo, bodyPart, layoutPart }));
  }

  function updateBody(nextBody) {
    setData(mergeContent(entry, data, { seoPart, bodyPart: nextBody, layoutPart }));
  }

  function updateLayout(nextLayout) {
    setData(mergeContent(entry, data, { seoPart, bodyPart, layoutPart: nextLayout }));
  }

  async function saveDraft(silent = false) {
    if (!silent) setStatus("saving");
    const ok = await persistDraft(data);
    if (!ok) return false;
    if (!silent) {
      setStatus("success");
      setMessage("Draft saved.");
    }
    return true;
  }

  async function persistDraft(nextData) {
    const res = await fetch(`/api/admin/content/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: nextData }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setStatus("error");
      setMessage(err.error || "Could not save draft.");
      return false;
    }
    setHasDraft(true);
    setPreviewNonce((n) => n + 1);
    return true;
  }

  async function applyAiSuggestion(suggestion) {
    const nextData = mergeContent(entry, data, { seoPart, bodyPart: deepMerge(bodyPart, suggestion), layoutPart });
    setData(nextData);
    // "Apply to draft" should actually land in the draft immediately, not just local form
    // state — save() reads `data` from the closure, which react hasn't updated yet here.
    const ok = await persistDraft(nextData);
    if (ok) {
      setStatus("success");
      setMessage("Applied to draft.");
    }
  }

  async function discardDraft() {
    setStatus("saving");
    await fetch(`/api/admin/content/${id}`, { method: "DELETE" });
    const res = await fetch(`/api/admin/content/${id}`);
    const json = await res.json();
    setData(json.effective);
    setHasDraft(false);
    setStatus("success");
    setMessage("Draft discarded.");
    setPreviewNonce((n) => n + 1);
  }

  async function publish() {
    setStatus("saving");
    const ok = await saveDraft(true);
    if (!ok) return;
    const res = await fetch(`/api/admin/publish/${id}`, { method: "POST" });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setStatus("error");
      setMessage(err.error || "Could not publish.");
      return;
    }
    setHasDraft(false);
    setStatus("success");
    setMessage("Published — your changes are live.");
    setPreviewNonce((n) => n + 1);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
      <Link href="/admin" className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-white/40 hover:text-white">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard
      </Link>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-white">{entry.label}</h1>
            {hasDraft ? (
              <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400">Draft</span>
            ) : (
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                Published
              </span>
            )}
          </div>
          {entry.path && !entry.path.startsWith("__") ? (
            <p className="text-xs text-white/30">{entry.path}</p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          {hasDraft ? (
            <button
              type="button"
              onClick={discardDraft}
              className="flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-white/60 hover:text-white"
            >
              <Trash2 className="h-3.5 w-3.5" /> Discard
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => saveDraft(false)}
            className="flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-white/80 hover:text-white"
          >
            <Save className="h-3.5 w-3.5" /> Save draft
          </button>
          <button
            type="button"
            onClick={publish}
            className="flex items-center gap-1.5 rounded-lg bg-[#c9ff33] px-3 py-2 text-xs font-semibold text-[#0f0f0f] active:scale-[0.98]"
          >
            <UploadCloud className="h-3.5 w-3.5" /> Publish
          </button>
        </div>
      </div>

      {message ? (
        <p
          className={`mb-6 rounded-lg px-3 py-2 text-sm ${
            status === "error"
              ? "border border-rose-500/30 bg-rose-500/10 text-rose-300"
              : "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
          }`}
        >
          {message}
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <AiPanel currentContent={bodyPart} pageLabel={entry.label} onApply={applyAiSuggestion} />

          {entry.sections ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <p className="mb-4 text-sm font-semibold text-white">Sections — order &amp; visibility</p>
              <SectionsPanel sectionDefs={entry.sections} layout={layoutPart} onChange={updateLayout} />
            </div>
          ) : null}

          {entry.type === "robots" ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <textarea
                rows={10}
                value={bodyPart.body ?? ""}
                onChange={(e) => updateBody({ ...bodyPart, body: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-xs text-white/90 outline-none focus:border-[#c9ff33]/50"
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <p className="mb-4 text-sm font-semibold text-white">Content</p>
              <GenericContentForm value={bodyPart} onChange={updateBody} />
            </div>
          )}

          {seoPart !== null ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <p className="mb-4 text-sm font-semibold text-white">SEO</p>
              <SeoFieldsForm seo={seoPart} onChange={updateSeo} />
            </div>
          ) : null}
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-2xl border border-b-0 border-white/10 bg-white/[0.03] px-4 py-2">
            <p className="text-xs font-medium text-white/50">Live preview (draft)</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-lg border border-white/10 p-0.5">
                {Object.entries(DEVICE_PRESETS).map(([key, preset]) => {
                  const Icon = preset.Icon;
                  const active = previewDevice === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      title={preset.label}
                      onClick={() => setPreviewDevice(key)}
                      className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                        active ? "bg-[#c9ff33] text-[#0f0f0f]" : "text-white/50 hover:text-white"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setPreviewNonce((n) => n + 1)}
                className="flex items-center gap-1 text-xs font-medium text-white/50 hover:text-white"
              >
                <RefreshCw className="h-3 w-3" /> Refresh
              </button>
            </div>
          </div>
          <DevicePreviewFrame
            key={previewNonce}
            src={`/api/admin/preview/${id}?t=${previewNonce}`}
            device={previewDevice}
          />
        </div>
      </div>
    </div>
  );
}
