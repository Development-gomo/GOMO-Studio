"use client";

import { usePathname } from "next/navigation";
import { isLegalDocumentPath } from "@/lib/legal-routes";
import { PageAmbient } from "@/components/visual/PageAmbient";
import { ScrollRevealInit } from "@/components/layout/ScrollRevealInit";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";

/**
 * Marketing chrome (nav / main / footer). Legal document pages render their own shell
 * and skip this wrapper UI.
 */
export function SiteChrome({ navbar, footer, children }) {
  const pathname = usePathname();
  const legal = isLegalDocumentPath(pathname);

  if (legal) {
    return <>{children}</>;
  }

  return (
    <>
      <PageAmbient />
      <ScrollRevealInit />
      <ScrollProgressBar />
      <div className="relative z-[1] flex min-h-dvh min-w-0 flex-1 flex-col overflow-x-clip">
        {navbar}
        <main className="min-h-0 w-full flex-1">{children}</main>
        {footer}
      </div>
    </>
  );
}
