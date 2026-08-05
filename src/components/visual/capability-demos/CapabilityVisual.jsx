"use client";

/** CapabilityVisualVariant: "ai" | "editor" | "workflow" */
import { AiContentDemo } from "@/components/visual/capability-demos/AiContentDemo";
import { VisualEditorDemo } from "@/components/visual/capability-demos/VisualEditorDemo";
import { PublishingWorkflowDemo } from "@/components/visual/capability-demos/PublishingWorkflowDemo";
import { BlogTopicDemo } from "@/components/visual/blog-demos/BlogTopicDemo";
import { cn } from "@/lib/utils";

export function CapabilityVisual({ variant, compact = false, embedded = false, className }) {
  const Demo =
    variant === "workflow" ? PublishingWorkflowDemo : variant === "editor" ? VisualEditorDemo : AiContentDemo;

  return (
    <div className={cn("h-full w-full", className)} role="img" aria-label={`${variant} capability preview`}>
      <Demo compact={compact} embedded={embedded} />
    </div>
  );
}

/** Blog listing card visual — fixed 16:9, centered, no overlap with category badge. */
export function BlogCardVisual({ cluster }) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0a0a0a]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(201,255,51,0.08),transparent_70%)]" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="h-full w-full max-w-[340px]">
          <BlogTopicDemo cluster={cluster} compact />
        </div>
      </div>
    </div>
  );
}

/** Blog article header visual — centered in sidebar column. */
export function BlogArticleHeroVisual({ cluster }) {
  return (
    <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] shadow-xl shadow-black/40 sm:aspect-[4/3] lg:aspect-auto lg:min-h-[280px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(201,255,51,0.1),transparent_70%)]" />
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-5">
        <div className="h-full w-full max-w-[300px] sm:max-w-[320px]">
          <BlogTopicDemo cluster={cluster} compact />
        </div>
      </div>
    </div>
  );
}

/** Featured blog hero visual — larger centered preview. */
export function BlogFeaturedVisual({ cluster }) {
  return (
    <div className="relative min-h-[220px] w-full overflow-hidden bg-[#0a0a0a] lg:min-h-[320px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(201,255,51,0.1),transparent_70%)]" />
      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
        <div className="h-full w-full max-w-md lg:max-w-lg">
          <BlogTopicDemo cluster={cluster} compact />
        </div>
      </div>
    </div>
  );
}
