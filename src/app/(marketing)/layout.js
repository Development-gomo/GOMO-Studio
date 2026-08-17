import { draftMode } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import { GoogleTagManagerBody, GoogleTagManagerHead } from "@/components/analytics/GoogleTagManager";
import { HashScrollRestorer } from "@/components/layout/HashScrollRestorer";
import { AsyncSiteChrome } from "@/components/layout/AsyncSiteChrome";
import { DraftModeBanner } from "@/components/admin/DraftModeBanner";

/** Marketing site layout (nav, footer, GTM). */
export default async function MarketingLayout({ children }) {
  const { isEnabled: draftEnabled } = await draftMode();
  return (
    <>
      {draftEnabled ? <DraftModeBanner /> : null}
      <GoogleTagManagerHead />
      <GoogleTagManagerBody />
      <HashScrollRestorer />
      <AsyncSiteChrome>{children}</AsyncSiteChrome>
      <Analytics />
    </>
  );
}
