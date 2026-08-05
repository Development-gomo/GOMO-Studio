"use client";

/** Blog article demo visual — picks one of the 3 capability demos, keyed by the post's cluster. */
import { AiContentDemo } from "@/components/visual/capability-demos/AiContentDemo";
import { VisualEditorDemo } from "@/components/visual/capability-demos/VisualEditorDemo";
import { PublishingWorkflowDemo } from "@/components/visual/capability-demos/PublishingWorkflowDemo";
import { clusterToCapabilityVisual } from "@/lib/blog-demo-variants";
import { cn } from "@/lib/utils";

const DEMOS = {
  ai: AiContentDemo,
  editor: VisualEditorDemo,
  workflow: PublishingWorkflowDemo,
};

export function BlogTopicDemo({ cluster, compact = true }) {
  const variant = clusterToCapabilityVisual(cluster);
  const Demo = DEMOS[variant];
  return (
    <div className={cn("h-full w-full", compact && "min-h-[140px]")} role="img" aria-label={`${variant} illustration`}>
      <Demo compact={compact} embedded />
    </div>
  );
}
