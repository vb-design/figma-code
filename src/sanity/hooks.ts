import { useState, useEffect } from "react";
import { sanityClient, isConfigured } from "./client";
import { QUERIES } from "./queries";
import {
  SERVICES        as STATIC_SERVICES,
  CASE_STUDIES    as STATIC_CASE_STUDIES,
  TESTIMONIALS    as STATIC_TESTIMONIALS,
  TEAM            as STATIC_TEAM,
  ABOUT_POINTS    as STATIC_ABOUT_POINTS,
  PROCESS_STEPS   as STATIC_PROCESS_STEPS,
  HERO_STATS      as STATIC_HERO_STATS,
  STATS_BAR       as STATIC_STATS_BAR,
  MEDIA_OUTLETS   as STATIC_MEDIA_OUTLETS,
} from "../app/data";

function useSanity<T>(query: string, fallback: T): T {
  const [data, setData] = useState<T>(fallback);

  useEffect(() => {
    if (!isConfigured || !sanityClient) return;
    sanityClient.fetch<T>(query)
      .then(result => { if (result != null) setData(result); })
      .catch(() => {
        // Keep the static fallback if Sanity is unavailable.
      });
  }, [query]);

  return data;
}

export const useServices     = () => useSanity(QUERIES.services,     STATIC_SERVICES)     ?? STATIC_SERVICES;
export const useCaseStudies = () => {
  const raw = useSanity(QUERIES.caseStudies, STATIC_CASE_STUDIES) ?? STATIC_CASE_STUDIES;
  return raw.map((c: any) => ({
    ...c,
    slug: c.slug && typeof c.slug === "object" ? c.slug.current : (c.slug ?? ""),
  }));
};
export const useTestimonials = () => useSanity(QUERIES.testimonials, STATIC_TESTIMONIALS) ?? STATIC_TESTIMONIALS;
export const useTeamMembers  = () => useSanity(QUERIES.teamMembers,  STATIC_TEAM)         ?? STATIC_TEAM;
export const useAboutPoints  = () => useSanity(QUERIES.aboutPoints,  STATIC_ABOUT_POINTS) ?? STATIC_ABOUT_POINTS;
export const useProcessSteps = () => useSanity(QUERIES.processSteps, STATIC_PROCESS_STEPS) ?? STATIC_PROCESS_STEPS;

export const useSiteSettings = () => {
  const fallback = {
    heroHeadline:  "We turn brands into headlines that matter.",
    heroSubtext:   "Runway Media helps growing brands get noticed, remembered, and talked about. Through PR, creator partnerships, founder positioning, and brand experiences, we help your brand show up in the right places, with the right people, at the right time",
    email:         "hello@runwaymedia.com",
    phone:         "+91 000-000-0000",
    address:       "Mumbai",
    heroStats:     STATIC_HERO_STATS,
    statsBar:      STATIC_STATS_BAR,
    mediaOutlets:  STATIC_MEDIA_OUTLETS,
    aboutQuote:    "We don't chase headlines — we engineer the moments worth covering.",
    aboutBody1:    "Founded by former newsroom editors and brand strategists, Runway Media bridges the gap between corporate messaging and the stories people actually want to read.",
    aboutBody2:    "Our team of 40+ strategists, designers, and media specialists works as an integrated unit — so every project gets the whole of Runway, not just a slice of it.",
    homeAboutHeadline:  "Don't become another dead post on social media.",
    homeAboutHighlight: "dead post",
    homeAboutSubtext:   "People remember brands that give them something worth talking about.",
    homeAboutPoints: [
      "A founder with a point of view",
      "A product with a story",
      "A brand that consistently shows up where people are already paying attention",
    ],
    homeAboutCta: "That's where you need Runway Media.",
    servicesHeadline: "Strategic\ncommunications,\nbuilt around\nyour story.",
    servicesSubtext:  "From media relations to crisis response, we offer a full suite of services to elevate how the world sees you.",
    aboutHeroHeadline:  "A small agency with an outsized media footprint.",
    aboutHeroBody:      "Founded by former newsroom editors and brand strategists, we bridge the gap between corporate messaging and the stories people actually want to read.",
    aboutStoryHeadline: "A small agency with an outsized media footprint.",
    philosophyHeadline: "Fewer clients. Better work. Measurable results.",
    philosophyBody:     "We cap our client roster deliberately. When you work with Runway, you get the founders' attention — not a team of coordinators. Every engagement includes share of voice tracking, sentiment analysis, and reporting tied back to business outcomes.",
    philosophyStats: [
      { stat: "16+",    text: "Years running lean, senior-led teams" },
      { stat: "100%",   text: "Senior staff on every account — no exceptions" },
      { stat: "30-day", text: "Notice period. We earn your business every month." },
    ],
  };
  const raw = useSanity(QUERIES.siteSettings, fallback);
  return {
    ...raw,
    heroStats:       raw.heroStats       ?? STATIC_HERO_STATS,
    statsBar:        raw.statsBar        ?? STATIC_STATS_BAR,
    mediaOutlets:    raw.mediaOutlets    ?? STATIC_MEDIA_OUTLETS,
    homeAboutPoints: raw.homeAboutPoints ?? fallback.homeAboutPoints,
    philosophyStats: raw.philosophyStats ?? fallback.philosophyStats,
  };
};

const CONTACT_FALLBACK = {
  heroEyebrow: "Get in Touch",
  heroHeadline: "Tell us about your brand.",
  heroBody: "We'll get back to you within one business day with thoughts on how Runway Media can help.",
  nameLabel: "Full Name *",
  namePlaceholder: "Sarah Chen",
  companyLabel: "Company",
  companyPlaceholder: "Northbeam Capital",
  emailLabel: "Email Address *",
  emailPlaceholder: "sarah@northbeam.com",
  serviceLabel: "Service Interest",
  servicePlaceholder: "Select a service…",
  serviceOptions: ["Media Relations", "Brand Strategy", "Crisis Communications", "Content & Thought Leadership", "Influencer & Partnerships", "Event & Launch PR", "Not sure yet"],
  messageLabel: "Your Message *",
  messagePlaceholder: "Tell us about your brand, your goals, and any timelines we should know about…",
  submitLabel: "Send Message →",
  replyNote: "We'll reply within one business day.",
  successHeadline: "Message received.",
  successBody: "Thanks for reaching out. A senior member of our team will be in touch within one business day.",
  contactInfoTitle: "Contact Info",
  officeHoursTitle: "Office Hours",
  officeHours: "Monday – Friday\n9:00 AM – 6:00 PM EST",
  crisisNote: "Crisis clients: 24/7 on-call support included with all retainers.",
  followTitle: "Follow Us",
};

export const useContactSettings = () =>
  useSanity(QUERIES.contactSettings, CONTACT_FALLBACK) ?? CONTACT_FALLBACK;

export const useCaseStudy = (id: number) => {
  const all = useCaseStudies();
  return all.find(c => c.id === id) ?? null;
};
