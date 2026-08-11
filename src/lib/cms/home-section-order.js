/** Default home page section order (matches `content/cms/pages/home.json` layout). */
export const HOME_DEFAULT_SECTION_ORDER = [
  "hero",
  "proof",
  "icpSegments",
  "beyond",
  "services",
  "aiWorkflow",
  "behindTheWork",
  "caseStudies",
  "insights",
];

/** Human labels for the Studio admin's section reorder/hide panel. Nav and footer are always-on chrome, not reorderable. */
export const HOME_SECTION_DEFS = [
  { id: "hero", label: "Hero" },
  { id: "proof", label: "Proof / trust bar / stats" },
  { id: "icpSegments", label: "ICP segment cards" },
  { id: "beyond", label: "Beyond Boundaries (Gen AI callout)" },
  { id: "services", label: "Services carousel" },
  { id: "aiWorkflow", label: "AI Workflow Engineering" },
  { id: "behindTheWork", label: "Behind the work (team)" },
  { id: "caseStudies", label: "Case studies spotlight" },
  { id: "insights", label: "Latest insights" },
];
