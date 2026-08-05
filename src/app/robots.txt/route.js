/**
 * Serves /robots.txt from CMS or site defaults.
 */
import { buildRobotsTxt } from "@/lib/robots-txt";

export const dynamic = "force-dynamic";

export async function GET() {
  const body = await buildRobotsTxt();
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
