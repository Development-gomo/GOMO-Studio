/** Brand kit / guidelines page. */
import { Download } from "lucide-react";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildRouteMetadata } from "@/lib/cms/page-metadata";
import { SITE_PATHS } from "@/lib/site-paths";
import { SITE_ROUTES } from "@/lib/site-links";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";

const PAGE_TITLE = "GOMO Studio Brand Assets & Logo Guidelines";
const PAGE_DESCRIPTION =
  "Download GOMO Studio logos, brand colors, and typography guidelines for media, partners, and marketing materials. Official brand kit for the AI website editor.";

const colors = [
  { name: "Brand Ink", hex: "#0f0f0f", rgb: "15, 15, 15", usage: "Primary text, buttons, navigation" },
  { name: "Accent Lime", hex: "#c9ff33", rgb: "201, 255, 51", usage: "CTA labels, highlights, accents" },
  { name: "Accent Soft", hex: "#edf7c8", rgb: "237, 247, 200", usage: "Soft badges, callout backgrounds" },
  { name: "Elevated Dark", hex: "#1a1b1e", rgb: "26, 27, 30", usage: "Dark surfaces, hover states" },
  { name: "Shell Gray", hex: "#f0f1f5", rgb: "240, 241, 245", usage: "Page backgrounds" },
  { name: "Border", hex: "#e8eaef", rgb: "232, 234, 239", usage: "Cards, inputs, dividers" },
];

const logoVariants = [
  { name:"Full Logo – Dark bg",   description:"Primary usage on dark backgrounds", file:"/logo-white.png", filename:"gomo-studio-logo-white.png" },
  { name:"Full Logo – Light bg",  description:"Use on white or light backgrounds", file:"/logo.png", filename:"gomo-studio-logo.png" },
  { name:"Icon only – Color",     description:"App icon, favicon, small spaces", file:"/logo-icon.png", filename:"gomo-studio-icon.png" },
  { name:"Wordmark – Light",      description:"Tagline logo for light backgrounds", file:"/logo-tagline-light.png", filename:"gomo-studio-wordmark-light.png" },
];

const typography = [
  { name:"Nunito Sans", weight:"700 Bold",     usage:"Headings (H1–H3)",          sample:"GOMO Studio",                   size:"2rem",   fw:700 },
  { name:"Nunito Sans", weight:"600 SemiBold", usage:"Subheadings, UI labels",    sample:"AI Website Editor",          size:"1.25rem", fw:600 },
  { name:"Nunito Sans", weight:"400 Regular",  usage:"Body text, descriptions",   sample:"Ask your site to update itself.", size:"1rem", fw:400 },
];

function BrandFallback() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0C0C12] pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">Brand Assets</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            GOMO Studio <span style={{background:"linear-gradient(135deg,#c9ff33 0%,#b8eb2e 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Brand</span>
          </h1>
          <p className="text-gray-500 dark:text-white/65 text-lg max-w-2xl leading-relaxed">Official brand assets, guidelines, and resources for media, partners, and press. Please follow these guidelines when representing GOMO Studio.</p>
        </div>

        {/* Logo */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Logo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            {logoVariants.map(v=>(
              <div key={v.name} className="rounded-2xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-[#14141B] overflow-hidden shadow-sm">
                <div className="h-36 flex items-center justify-center bg-[#f0f1f5] dark:bg-[#0C0C12]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl brand-ink-badge flex items-center justify-center shadow-lg shadow-brand-500/30">
                      <span className="text-white font-black text-base">G</span>
                    </div>
                    <span className="text-gray-900 dark:text-white font-semibold text-xl tracking-tight">GOMO Studio</span>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 dark:text-white text-sm font-semibold">{v.name}</p>
                    <p className="text-gray-400 dark:text-white/40 text-xs mt-0.5">{v.description}</p>
                  </div>
                  <a href={v.file} download={v.filename} className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 text-xs font-semibold hover:text-brand-300 dark:hover:text-brand-300 transition-colors" aria-label={`Download ${v.name}`}>
                    <Download className="w-3.5 h-3.5" aria-hidden/> PNG
                  </a>
                </div>
              </div>
            ))}
          </div>
          <a href={`${SITE_ROUTES.contact}?topic=brand`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border-2 border-gray-200 dark:border-white/20 text-gray-700 dark:text-white/80 bg-white dark:bg-white/[0.04] hover:border-brand-400 dark:hover:border-brand-400/50 hover:bg-brand-50 dark:hover:bg-brand-600/5 transition-all" aria-label="Request full brand kit — contact us">
            <Download className="w-4 h-4" aria-hidden/> Request full brand kit
          </a>
        </section>

        {/* Colors */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Color Palette</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {colors.map(color=>(
              <div key={color.name} className="rounded-2xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-[#14141B] overflow-hidden shadow-sm">
                <div className="h-20 w-full" style={{background:color.hex}}/>
                <div className="p-4">
                  <p className="text-gray-900 dark:text-white font-semibold text-sm">{color.name}</p>
                  <p className="text-gray-500 dark:text-white/50 text-xs font-mono mt-1">{color.hex}</p>
                  <p className="text-gray-400 dark:text-white/35 text-xs mt-0.5">RGB: {color.rgb}</p>
                  <p className="text-gray-400 dark:text-white/45 text-xs mt-2">{color.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Typography</h2>
          <div className="space-y-4">
            {typography.map((type,i)=>(
              <div key={i} className="rounded-2xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-[#14141B] p-6 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm">
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white mb-2" style={{fontWeight:type.fw, fontSize:type.size}}>{type.sample}</p>
                  <p className="text-gray-400 dark:text-white/40 text-xs">{type.name} · {type.weight}</p>
                </div>
                <div className="shrink-0">
                  <p className="text-gray-500 dark:text-white/55 text-sm">{type.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Guidelines */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Usage Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/5 p-6">
              <h3 className="text-emerald-700 dark:text-emerald-300 font-bold mb-4">✓ Do</h3>
              <ul className="space-y-2 text-gray-600 dark:text-white/65 text-sm">
                <li>Use the logo with adequate clear space around it</li>
                <li>Use approved color variations on appropriate backgrounds</li>
                <li>Maintain the logo proportions when resizing</li>
                <li>Use the brand name &quot;GOMO Studio&quot; with capital G, O, M, O</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/5 p-6">
              <h3 className="text-red-600 dark:text-red-400 font-bold mb-4">✗ Don&apos;t</h3>
              <ul className="space-y-2 text-gray-600 dark:text-white/65 text-sm">
                <li>Don&apos;t stretch or distort the logo</li>
                <li>Don&apos;t change the logo colors outside approved variants</li>
                <li>Don&apos;t place the logo on cluttered backgrounds</li>
                <li>Don&apos;t use the brand to imply endorsement without permission</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact strip */}
        <div className="rounded-2xl bg-brand-50 dark:bg-brand-600/10 border border-brand-100 dark:border-brand-500/20 p-8 text-center">
          <h3 className="text-gray-900 dark:text-white font-bold text-xl mb-2">Need something specific?</h3>
          <p className="text-gray-500 dark:text-white/60 mb-6 leading-relaxed">For press inquiries, partnership assets, or custom brand requests, reach out to us directly.</p>
          <a href="mailto:admin@gomostudio.app"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold btn-brand-primary shadow-xl shadow-brand-600/25 transition-all duration-200 hover:scale-[1.03]">
            Contact Brand Team
          </a>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata() {
  return buildRouteMetadata(SITE_PATHS.company.brand, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  });
}

export default async function BrandPage() {
  const overlay = await getPublishedPageOverlay(SITE_PATHS.company.brand);

  return (
    <>
      <MarketingPageStructuredData
        path={SITE_PATHS.company.brand}
        pageTitle={overlay?.seo?.title ?? PAGE_TITLE}
        pageDescription={overlay?.seo?.description ?? PAGE_DESCRIPTION}
      />
      <BrandFallback />
    </>
  );
}
