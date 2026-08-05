import { MARKETING_CONTACT_PATH, STUDIO_LOGIN_PATH } from "@/lib/app-urls";

export const FREE_AI_CREDITS = 200;
export const FREE_AI_CREDITS_LABEL = "200";

export const PRICING_PLANS = [
  {
    id: "starter",
    name: "GOMO Studio Starter",
    badge: "Free forever",
    priceLabel: "$0",
    priceSubtext: "for a single site",
    description:
      "Everything you need to run a quick CMS on one site: structured editing, live preview, and AI content generation.",
    features: [
      `${FREE_AI_CREDITS_LABEL} AI content generations / month`,
      "1 website, unlimited pages",
      "Visual editor with structured forms",
      "Draft, preview, and publish workflow",
      "Basic SEO fields on every page",
      "Community support",
    ],
    cta: "Start free",
    ctaHref: STUDIO_LOGIN_PATH,
    featured: false,
    isEnterprise: false,
  },
  {
    id: "pro",
    name: "GOMO Studio Pro",
    badge: "Most popular",
    priceLabel: "From $29/mo",
    priceSubtext: "for growing teams",
    description:
      "For teams shipping content changes every week — more sites, unlimited AI generations, and team roles.",
    features: [
      "Unlimited AI content generations",
      "Up to 10 websites",
      "Custom domains",
      "Advanced SEO & structured data fields",
      "Team roles & shared login management",
      "Publish history",
      "Priority support",
    ],
    cta: "Start free",
    ctaHref: STUDIO_LOGIN_PATH,
    featured: true,
    isEnterprise: false,
  },
  {
    id: "enterprise",
    name: "GOMO Studio Enterprise",
    badge: null,
    priceLabel: "Custom",
    priceSubtext: "Tailored for your organization",
    description:
      "For teams that need dedicated infrastructure, custom integrations, security reviews, and hands-on onboarding.",
    features: [
      "Unlimited users",
      "Dedicated infrastructure",
      "Custom integrations",
      "White-label options",
      "SLA guarantee",
      "Dedicated account manager",
      "SSO / SAML",
      "On-premise deployment",
    ],
    cta: "Contact sales",
    ctaHref: MARKETING_CONTACT_PATH,
    featured: false,
    isEnterprise: true,
  },
];

export const AI_CREDITS_HOW_IT_WORKS = [
  {
    step: "01",
    title: "Sign up free",
    description:
      "Create your GOMO Studio account in minutes. No credit card required — you get " +
      FREE_AI_CREDITS_LABEL +
      " AI content generations a month to start.",
  },
  {
    step: "02",
    title: "Use AI as you edit",
    description:
      "Every prompt in the AI panel — a rewrite, a new section, a blog draft — uses one generation from your monthly balance.",
  },
  {
    step: "03",
    title: "Upgrade when you need more",
    description:
      "Move to Pro for unlimited AI generations, more sites, and team features whenever your workflow outgrows Starter.",
  },
];
