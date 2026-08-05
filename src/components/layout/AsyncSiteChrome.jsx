import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { getFooterConfig, getHeaderConfig } from "@/lib/cms/get-site-chrome";

export async function AsyncSiteChrome({ children }) {
  const headerConfig = await getHeaderConfig();
  const footerConfig = await getFooterConfig();

  return (
    <SiteChrome
      navbar={<Navbar config={headerConfig} />}
      footer={<Footer config={footerConfig} />}
    >
      {children}
    </SiteChrome>
  );
}
