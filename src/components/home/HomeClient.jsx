"use client";

/**
 * GOMO Group home page — agency-style redesign (Figma: Home_Page_New_Design_6th_August_2026).
 * Content merges optional CMS overrides with defaults matching the Figma copy; sections are
 * independent, reusable blocks composed in the order defined by `sectionOrder`.
 */
import { Fragment } from "react";
import { AgencyNav } from "@/components/home/sections/agency/AgencyNav";
import { AgencyHero } from "@/components/home/sections/agency/AgencyHero";
import { AgentDisclosureBar } from "@/components/home/sections/agency/AgentDisclosureBar";
import { GrowthStats } from "@/components/home/sections/agency/GrowthStats";
import { IcpCards } from "@/components/home/sections/agency/IcpCards";
import { TransformationGallery } from "@/components/home/sections/agency/TransformationGallery";
import { ServiceMarquee } from "@/components/home/sections/agency/ServiceMarquee";
import { AiWorkflow } from "@/components/home/sections/agency/AiWorkflow";
import { TeamTestimonials } from "@/components/home/sections/agency/TeamTestimonials";
import { DigitalExperienceCaseStudy } from "@/components/home/sections/agency/DigitalExperienceCaseStudy";
import { InsightsGrid } from "@/components/home/sections/agency/InsightsGrid";
import { FooterCta } from "@/components/home/sections/agency/FooterCta";
import { HOME_DEFAULT_SECTION_ORDER } from "@/lib/cms/home-section-order";
import { normalizeSectionOrder as resolveSectionOrder, applyHiddenSections } from "@/lib/cms/section-order";

export function HomeClient({ content, sectionOrder, hiddenSections }) {
  const resolvedOrder = resolveSectionOrder(sectionOrder, HOME_DEFAULT_SECTION_ORDER) ?? [...HOME_DEFAULT_SECTION_ORDER];
  const order = applyHiddenSections(resolvedOrder, hiddenSections);

  const blocks = {
    hero: (
      <>
        <AgencyHero content={content} />
        <AgentDisclosureBar content={content} />
      </>
    ),
    growthStats: <GrowthStats content={content} />,
    icpCards: <IcpCards content={content} />,
    transformation: <TransformationGallery content={content} />,
    services: <ServiceMarquee content={content} />,
    aiWorkflow: <AiWorkflow content={content} />,
    team: <TeamTestimonials content={content} />,
    caseStudy: <DigitalExperienceCaseStudy content={content} />,
    insights: <InsightsGrid content={content} />,
    cta: <FooterCta content={content} />,
  };

  return (
    <div className="bg-black">
      <AgencyNav content={content} />
      {order.map((id, index) => (
        <Fragment key={`${id}-${index}`}>{blocks[id]}</Fragment>
      ))}
    </div>
  );
}
