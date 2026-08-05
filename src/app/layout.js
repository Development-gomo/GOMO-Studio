/**
 * Root layout: Nunito Sans typography site-wide, metadata, providers.
 */
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SiteStructuredData } from "@/components/seo/SiteStructuredData";
import { MotionConfigProvider } from "@/components/layout/MotionConfigProvider";
import { SITE_ORIGIN, allowSearchIndexing } from "@/lib/seo-config";
import { buildThemeInitScript } from "@/lib/theme";
import { getDefaultThemeSetting } from "@/lib/cms/theme-settings";

const seoIndexable = allowSearchIndexing();

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
};

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "GOMO Studio — AI-Powered Website Editor & Quick CMS",
    template: "%s",
  },
  description:
    "GOMO Studio is a quick CMS and AI-powered website editor: generate and rewrite copy with AI, edit every section in a structured visual editor, preview safely, and publish instantly.",
  keywords: [
    "AI website editor",
    "quick CMS",
    "AI content generation",
    "visual website editor",
    "no-code CMS",
    "draft and publish workflow",
    "headless CMS",
    "content management system",
  ],
  authors: [{ name: "GOMO Studio", url: SITE_ORIGIN }],
  creator: "GOMO Studio",
  publisher: "GOMO Studio",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_ORIGIN,
    siteName: "GOMO Studio",
    title: "GOMO Studio — Your Website's AI-Powered Backend",
    description:
      "Manage pages, generate copy with AI, preview changes safely, and publish instantly — no dev deploy required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GOMO Studio — AI-Powered Website Editor & Quick CMS",
    description:
      "Generate and rewrite website copy with AI, edit visually, preview safely, and publish instantly.",
    creator: "@gomostudio",
  },
  robots: seoIndexable
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
};

export default async function RootLayout({ children }) {
  const defaultTheme = await getDefaultThemeSetting();
  return (
    <html
      lang="en"
      className={`${defaultTheme === "light" ? "" : "dark"} ${nunitoSans.variable} ${nunitoSans.className} h-full font-sans`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: buildThemeInitScript(defaultTheme) }} />
      </head>
      <body
        className="min-h-full flex flex-col overflow-x-clip bg-[var(--bg)] font-sans text-[var(--fg)] antialiased"
        suppressHydrationWarning
      >
        <SiteStructuredData />
        <ThemeProvider>
          <MotionConfigProvider>{children}</MotionConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
