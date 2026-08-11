"use client";

/**
 * GO MO Group home page, rebuilt against the Claude Design export
 * ("Home - Section 1 Nav+Hero.html" from the go-mo-group-design-system project).
 * Self-contained: renders its own nav + footer instead of the global SiteChrome (see SiteChrome.jsx).
 * Content is backend-driven via `content/cms/pages/home.json` (edited in Studio) — see `content` prop.
 */
import { Fragment } from "react";
import { merriweather } from "@/lib/marketing-fonts";
import { MainNav } from "@/components/home/main/MainNav";
import { MainFooter } from "@/components/home/main/MainFooter";
import { Hero } from "@/components/home/main/sections/Hero";
import { ProofSection } from "@/components/home/main/sections/ProofSection";
import { IcpSegments } from "@/components/home/main/sections/IcpSegments";
import { BeyondSection } from "@/components/home/main/sections/BeyondSection";
import { ServicesCarousel } from "@/components/home/main/sections/ServicesCarousel";
import { AiWorkflowEngineering } from "@/components/home/main/sections/AiWorkflowEngineering";
import { BehindTheWorkSection } from "@/components/home/main/sections/BehindTheWorkSection";
import { CaseStudySpotlight } from "@/components/home/main/sections/CaseStudySpotlight";
import { InsightsSection } from "@/components/home/main/sections/InsightsSection";
import { HOME_DEFAULT_SECTION_ORDER } from "@/lib/cms/home-section-order";
import { normalizeSectionOrder as resolveSectionOrder, applyHiddenSections } from "@/lib/cms/section-order";

export function MainHome({ content, sectionOrder, hiddenSections }) {
  const resolvedOrder = resolveSectionOrder(sectionOrder, HOME_DEFAULT_SECTION_ORDER) ?? [...HOME_DEFAULT_SECTION_ORDER];
  const order = applyHiddenSections(resolvedOrder, hiddenSections);

  const blocks = {
    hero: <Hero content={content} />,
    proof: <ProofSection content={content} />,
    icpSegments: <IcpSegments content={content} />,
    beyond: <BeyondSection content={content} />,
    services: <ServicesCarousel content={content} />,
    aiWorkflow: <AiWorkflowEngineering content={content} />,
    behindTheWork: <BehindTheWorkSection content={content} />,
    caseStudies: <CaseStudySpotlight content={content} />,
    insights: <InsightsSection content={content} />,
  };

  return (
    <div className={`${merriweather.variable} relative min-h-dvh w-full overflow-x-clip bg-[#070C11] text-white`}>
      <MainNav />
      {order.map((id, index) => (
        <Fragment key={`${id}-${index}`}>{blocks[id]}</Fragment>
      ))}
      <MainFooter content={content} />
    </div>
  );
}
