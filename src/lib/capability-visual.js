/** CapabilityVisualVariant: "ai" | "editor" | "workflow" */
export function categoryToCapabilityVisual(category) {
  const lower = category.toLowerCase();
  if (lower.includes("editor") || lower.includes("preview")) return "editor";
  if (lower.includes("publish") || lower.includes("workflow")) return "workflow";
  return "ai";
}
