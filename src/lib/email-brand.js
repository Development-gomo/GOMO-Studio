import { SITE_ORIGIN } from "@/lib/seo-config";

/** Public 512×512 brand mark for email HTML and BIMI setup. */
export const EMAIL_LOGO_URL = `${SITE_ORIGIN}/email/logo-512.png`;

export const EMAIL_BIMI_LOGO_URL = `${SITE_ORIGIN}/email/bimi-logo.svg`;

function emailShell(innerHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>GOMO Studio</title>
</head>
<body style="margin:0;padding:0;background:#f0f1f5;font-family:Nunito Sans,system-ui,-apple-system,sans-serif;color:#0f0f0f">
  <div style="max-width:600px;margin:0 auto;padding:32px 20px">
    <a href="${SITE_ORIGIN}" style="text-decoration:none;display:block;margin-bottom:24px">
      <img src="${EMAIL_LOGO_URL}" width="64" height="64" alt="GOMO Studio" style="display:block;border:0;border-radius:12px"/>
    </a>
    <div style="background:#ffffff;border:1px solid #e8eaef;border-radius:16px;padding:24px;line-height:1.6;font-size:15px">
      ${innerHtml}
    </div>
    <p style="margin:20px 0 0;font-size:12px;color:#6b7280;text-align:center">
      <a href="${SITE_ORIGIN}" style="color:#5f8f00;text-decoration:none">gomostudio.app</a>
    </p>
  </div>
</body>
</html>`;
}

export function brandedEmailHtml(innerHtml) {
  return emailShell(innerHtml);
}
