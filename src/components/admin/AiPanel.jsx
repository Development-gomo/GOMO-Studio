"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

function preview(value) {
  const str = typeof value === "string" ? value : JSON.stringify(value);
  return str.length > 140 ? `${str.slice(0, 140)}…` : str;
}

export function AiPanel({ currentContent, pageLabel, onApply }) {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [suggestion, setSuggestion] = useState(null);

  async function handleGenerate(event) {
    event.preventDefault();
    if (!prompt.trim()) return;
    setStatus("loading");
    setError("");
    setSuggestion(null);

    try {
      const res = await fetch("/api/admin/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, content: currentContent, pageLabel }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setError(data.error || "AI request failed.");
        return;
      }
      setSuggestion(data.suggestion);
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Could not reach the AI service.");
    }
  }

  function applySuggestion() {
    if (!suggestion) return;
    onApply(suggestion);
    setSuggestion(null);
    setPrompt("");
    setStatus("idle");
  }

  return (
    <div className="rounded-2xl border border-[#c9ff33]/20 bg-[#c9ff33]/[0.04] p-4">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[#c9ff33]" />
        <p className="text-sm font-semibold text-white">AI content assistant</p>
      </div>

      <form onSubmit={handleGenerate} className="space-y-2">
        <textarea
          rows={2}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='e.g. "Make the headline punchier" or "Write a new FAQ about pricing"'
          className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#c9ff33]/50"
        />
        <button
          type="submit"
          disabled={status === "loading" || !prompt.trim()}
          className="rounded-lg bg-[#c9ff33] px-4 py-2 text-xs font-semibold text-[#0f0f0f] transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? "Generating…" : "Generate"}
        </button>
      </form>

      {error ? <p className="mt-3 text-xs text-rose-300">{error}</p> : null}

      {suggestion ? (
        <div className="mt-3 space-y-2 rounded-lg border border-white/10 bg-black/20 p-3">
          <p className="text-xs font-medium text-white/50">Suggested changes:</p>
          <ul className="space-y-1 text-xs text-white/70">
            {Object.entries(suggestion).map(([key, value]) => (
              <li key={key}>
                <span className="font-medium text-white/90">{key}:</span> {preview(value)}
              </li>
            ))}
          </ul>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={applySuggestion}
              className="rounded-lg bg-[#c9ff33] px-3 py-1.5 text-xs font-semibold text-[#0f0f0f]"
            >
              Apply to draft
            </button>
            <button
              type="button"
              onClick={() => setSuggestion(null)}
              className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white"
            >
              Discard
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
