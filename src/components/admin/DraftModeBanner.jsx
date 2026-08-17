"use client";

/** Shown site-wide whenever Next.js Draft Mode is on, so leaving it on by accident is never silent. */
export function DraftModeBanner() {
  async function exitPreview() {
    await fetch("/api/admin/preview/disable", { method: "POST" });
    window.location.reload();
  }

  return (
    <div className="sticky top-0 z-[100] flex items-center justify-center gap-3 bg-amber-500 px-4 py-2 text-xs font-medium text-black">
      <span>Draft preview mode — you&apos;re seeing unpublished changes.</span>
      <button
        type="button"
        onClick={exitPreview}
        className="rounded-full bg-black/80 px-3 py-1 font-semibold text-white hover:bg-black"
      >
        Exit preview
      </button>
    </div>
  );
}
