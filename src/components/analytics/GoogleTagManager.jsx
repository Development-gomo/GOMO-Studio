import Script from "next/script";
import { GTM_HEAD_SCRIPT, GTM_ID } from "@/lib/gtm";

/** GTM head snippet — `beforeInteractive` injects early in `<head>` on marketing routes only. */
export function GoogleTagManagerHead() {
  return (
    <Script id="google-tag-manager" strategy="beforeInteractive">
      {GTM_HEAD_SCRIPT}
    </Script>
  );
}

/** GTM noscript fallback — place at the start of the page body. */
export function GoogleTagManagerBody() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
