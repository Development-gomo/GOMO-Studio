import { SITE_PATHS } from "@/lib/site-paths";

/** Paths that use the legal-document chrome (no marketing nav/footer). */
export const LEGAL_DOCUMENT_PATHS = [SITE_PATHS.legal.privacy, SITE_PATHS.legal.terms];

export function isLegalDocumentPath(pathname) {
  if (!pathname) return false;
  return LEGAL_DOCUMENT_PATHS.includes(pathname);
}
