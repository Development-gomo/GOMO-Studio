/**
 * Server-only structured data for search engines (JSON-LD).
 * Keep payloads small — one graph per page type is enough.
 */
export function JsonLd({ id, data }) {
  return (
    <script
      type="application/ld+json"
      id={id}
      // eslint-disable-next-line react/no-danger -- JSON-LD requires a script blob; content is built from trusted app data only
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
