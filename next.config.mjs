/**
 * Next.js config: security/perf headers, image remote patterns, redirects.
 */
import { getLegacyMarketingRedirects } from "./src/lib/legacy-redirects.js";
import { allowSearchIndexing } from "./src/lib/seo-config.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async headers() {
    const noIndexHeader = { key: "X-Robots-Tag", value: "noindex, nofollow" };
    const cspHeader = {
      key: "Content-Security-Policy",
      value: "frame-ancestors 'self'",
    };

    const siteHeaders = [cspHeader];
    if (!allowSearchIndexing()) {
      siteHeaders.unshift(noIndexHeader);
    }

    return [
      { source: "/api/:path*", headers: [noIndexHeader] },
      { source: "/admin", headers: [noIndexHeader] },
      { source: "/admin/:path*", headers: [noIndexHeader] },
      {
        source: "/company/contact/thank-you",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Content-Type", value: "application/xml; charset=utf-8" },
          cspHeader,
        ],
      },
      {
        source: "/robots.txt",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }, cspHeader],
      },
      {
        source: "/email/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, immutable" },
          cspHeader,
        ],
      },
      {
        source: "/((?!sitemap\\.xml|robots\\.txt).*)",
        headers: siteHeaders,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.gomostudio.app" }],
        destination: "https://gomostudio.app/:path*",
        permanent: true,
      },
      { source: "/favicon.ico", destination: "/favicon.png", permanent: false },
      ...getLegacyMarketingRedirects(),
    ];
  },
};

export default nextConfig;
