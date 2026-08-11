/**
 * Shared color/motion tokens for the GO MO Group home page, matching the
 * Claude Design export's `_ds/.../tokens/colors.css` custom properties
 * (--gm-cyan, --gm-cyan-2, --gm-lime, --gm-coral, --gm-purple, --gm-magenta,
 * --gm-mint, --gm-pink, --gm-blue), confirmed against the rgb() literals
 * used directly in that file's inline styles.
 */
export const MC = {
  richBlack: "#070C11",
  blue: "#030CF4",
  blue2: "#268DE5",
  purple: "#8F38F8",
  magenta: "#BD27F6",
  cyan: "#00DEFF",
  cyan2: "#00DEFF",
  mint: "#5CFFD3",
  lime: "#EEFF41",
  pink: "#FF28BC",
  coral: "#FF5C7F",
  buttonGradient: "linear-gradient(90deg, rgb(143,56,248) 0%, rgb(38,141,229) 97%, rgb(40,4,222) 100%)",
  cardBorderGradient: "linear-gradient(180deg, rgb(143,56,248) 0%, #00DEFF 49%, rgb(3,12,244) 100%)",
  headingGradient: "linear-gradient(90deg, rgb(143,56,248), rgb(189,39,246))",
};

export const MC_EASE = [0.22, 1, 0.36, 1];

export const mcViewport = { once: true, amount: 0.2, margin: "0px 0px -10% 0px" };

export const mcFadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: MC_EASE } },
};

export const mcStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
