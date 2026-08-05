export default function manifest() {
  return {
    name: "GOMO Studio — AI Website Editor & Quick CMS",
    short_name: "GOMO Studio",
    description:
      "Manage pages, generate copy with AI, preview changes safely, and publish instantly with GOMO Studio.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f0f",
    theme_color: "#c9ff33",
    lang: "en-US",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
