/**
 * Public legal pages — defaults reflect GOMO Studio's published business contact.
 * Override any field with NEXT_PUBLIC_LEGAL_* environment variables when needed.
 */
export const LEGAL_DOCUMENTS_LAST_UPDATED = "2026-08-04";

const DEFAULT_ENTITY = "GOMO Studio";
const DEFAULT_EMAIL = "hello@gomostudio.app";
/** Controller address (GDPR Art. 13/14) — multiline ok */
const DEFAULT_REGISTERED_ADDRESS = "GOMO Studio\nPune, Maharashtra 411006\nIndia";
const DEFAULT_GOVERNING_LAW = "India";
const DEFAULT_DISPUTE_VENUE = "Pune, Maharashtra, India";

export function getLegalEntityName() {
  return process.env.NEXT_PUBLIC_LEGAL_ENTITY_NAME?.trim() || DEFAULT_ENTITY;
}

export function getLegalContactEmail() {
  return process.env.NEXT_PUBLIC_LEGAL_CONTACT_EMAIL?.trim() || DEFAULT_EMAIL;
}

/** Full address of the data controller (required for GDPR Art. 13/14). */
export function getLegalRegisteredAddress() {
  return process.env.NEXT_PUBLIC_LEGAL_REGISTERED_ADDRESS?.trim() || DEFAULT_REGISTERED_ADDRESS;
}

/** Governing law for Terms (substantive law of this country, unless mandatory law applies elsewhere). */
export function getLegalGoverningLawJurisdiction() {
  return process.env.NEXT_PUBLIC_LEGAL_GOVERNING_LAW?.trim() || DEFAULT_GOVERNING_LAW;
}

/** Courts or region named for dispute venue (may differ from governing law in some setups). */
export function getLegalDisputeVenue() {
  return process.env.NEXT_PUBLIC_LEGAL_DISPUTE_VENUE?.trim() || DEFAULT_DISPUTE_VENUE;
}
