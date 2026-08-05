/** Topic-specific animated demos for blog articles. BlogCluster: "ai" | "editor" | "workflow" */

export function clusterToCapabilityVisual(cluster) {
  if (cluster === "editor") return "editor";
  if (cluster === "workflow") return "workflow";
  return "ai";
}

export function categoryToCluster(category) {
  const lower = category.toLowerCase();
  if (lower.includes("editor") || lower.includes("preview")) return "editor";
  if (lower.includes("publish") || lower.includes("workflow")) return "workflow";
  return "ai";
}
