import { SITE_PATHS } from "@/lib/site-paths";
import { SITE_ORIGIN } from "@/lib/seo-config";

/**
 * GOMO Studio is its own product — the "app" is the /admin editor on this same site,
 * there is no separate hosted app subdomain to link out to.
 */
export const STUDIO_APP_PATH = "/admin";
export const STUDIO_LOGIN_PATH = "/admin/login";

/** Same-origin nav path for the contact page. */
export const MARKETING_CONTACT_PATH = SITE_PATHS.company.contact;

/** Absolute URL when linking from emails or off-site contexts. */
export const MARKETING_CONTACT_ABSOLUTE = `${SITE_ORIGIN}${SITE_PATHS.company.contact}`;
