/** Deep-merge plain objects; arrays and scalars from overlay replace base. */
export function deepMerge(base, overlay) {
  const out = { ...base };
  for (const key of Object.keys(overlay)) {
    const oVal = overlay[key];
    const bVal = out[key];
    if (
      oVal &&
      typeof oVal === "object" &&
      !Array.isArray(oVal) &&
      bVal &&
      typeof bVal === "object" &&
      !Array.isArray(bVal)
    ) {
      out[key] = deepMerge(bVal, oVal);
    } else if (oVal !== undefined) {
      out[key] = oVal;
    }
  }
  return out;
}
