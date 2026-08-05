import { Analytics } from "@vercel/analytics/next";
import { GoogleTagManagerBody, GoogleTagManagerHead } from "@/components/analytics/GoogleTagManager";
import { HashScrollRestorer } from "@/components/layout/HashScrollRestorer";
import { AsyncSiteChrome } from "@/components/layout/AsyncSiteChrome";

/** Marketing site layout (nav, footer, GTM). */
export default function MarketingLayout({ children }) {
  return (
    <>
      <GoogleTagManagerHead />
      <GoogleTagManagerBody />
      <HashScrollRestorer />
      <AsyncSiteChrome>{children}</AsyncSiteChrome>
      <Analytics />
    </>
  );
}
