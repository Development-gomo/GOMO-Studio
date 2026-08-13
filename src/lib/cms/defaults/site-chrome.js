import { STUDIO_LOGIN_PATH, MARKETING_CONTACT_PATH } from "@/lib/app-urls";
import { SITE_ROUTES } from "@/lib/site-links";
import { TERMS_OF_SERVICE_PATH, PRIVACY_POLICY_PATH } from "@/lib/legal-urls";

export const DEFAULT_NAVBAR_CONFIG = {
  links: [
    {
      label: "Platform",
      href: "#",
      children: [
        { label: "AI Content Generation", href: SITE_ROUTES.capabilities.aiContent, description: "Generate and rewrite page copy with AI" },
        { label: "Visual Editor & Preview", href: SITE_ROUTES.capabilities.visualEditor, description: "Edit sections and preview the live page" },
        { label: "Publishing Workflow", href: SITE_ROUTES.capabilities.publishingWorkflow, description: "Track drafts and publish instantly" },
      ],
    },
    { label: "Pricing", href: SITE_ROUTES.pricing },
    { label: "Features", href: SITE_ROUTES.features },
    { label: "About", href: SITE_ROUTES.about },
    {
      label: "Resources",
      href: "#",
      children: [
        { label: "Integrations", href: SITE_ROUTES.integrations, description: "Connect with your favorite tools" },
        { label: "Blog", href: SITE_ROUTES.blogs, description: "Guides on AI content and quick CMS workflows" },
        { label: "Careers", href: SITE_ROUTES.careers, description: "Join the GOMO Group team" },
      ],
    },
  ],
  loginLabel: "Login",
  loginHref: STUDIO_LOGIN_PATH,
  primaryCtaLabel: "Start free",
  primaryCtaHref: STUDIO_LOGIN_PATH,
};

export const DEFAULT_FOOTER_CONFIG = {
  email: "hello@gomostudio.app",
  columns: [
    {
      title: "Company",
      links: [
        { label: "Home", href: SITE_ROUTES.home },
        { label: "Features", href: SITE_ROUTES.features },
        { label: "About Us", href: SITE_ROUTES.about },
        { label: "Pricing", href: SITE_ROUTES.pricing },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: SITE_ROUTES.blogs },
        { label: "Integrations", href: SITE_ROUTES.integrations },
        { label: "Careers", href: SITE_ROUTES.careers },
        { label: "Documentation", href: "/documentation" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Support Center", href: SITE_ROUTES.contact },
        { label: "Contact Us", href: SITE_ROUTES.contact },
        { label: "FAQs", href: SITE_ROUTES.faq },
      ],
    },
    {
      title: "Platform",
      links: [
        { label: "AI Content Generation", href: SITE_ROUTES.capabilities.aiContent },
        { label: "Visual Editor & Preview", href: SITE_ROUTES.capabilities.visualEditor },
        { label: "Publishing Workflow", href: SITE_ROUTES.capabilities.publishingWorkflow },
        { label: "Brand assets", href: SITE_ROUTES.brand },
      ],
    },
  ],
  socialLinks: [],
  legalLinks: [
    { label: "Terms", href: TERMS_OF_SERVICE_PATH },
    { label: "Privacy", href: PRIVACY_POLICY_PATH },
    { label: "Cookies", href: SITE_ROUTES.cookies },
  ],
  copyrightText: "© 2026 GOMO Group. All rights reserved.",
};
