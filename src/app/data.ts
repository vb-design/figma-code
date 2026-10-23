export const NAV_LINKS = [
  { label: "Services", path: "/services"  },
  { label: "Work",     path: "/work"       },
  { label: "About",    path: "/about"      },
  { label: "Clients",  path: "/clients"    },
  { label: "Contact",  path: "/contact"    },
];

export const HERO_STATS = [
  { num: "180+", label: "Campaigns Launched" },
  { num: "2.4B", label: "Media Impressions"  },
  { num: "96%",  label: "Client Retention"   },
];

export const STATS_BAR = [
  { num: "100+",  label: "Brands Worked With"     },
  { num: "500+",  label: "Creator Collaborations" },
  { num: "1000+", label: "Media Placements"       },
  { num: "16+",   label: "Years of Experience"    },
];

export const MEDIA_OUTLETS: { name: string; logoUrl?: string }[] = [
  { name: "FORBES" },
  { name: "TechCrunch" },
  { name: "Bloomberg" },
  { name: "Fast Company" },
  { name: "WIRED" },
];

export const SERVICES = [
  {
    num: "01",
    title: "Media Relations",
    description: "We build relationships with the journalists and outlets that matter to your industry, securing coverage that builds credibility.",
    deliverables: ["Press release writing & distribution", "Journalist outreach & relationship building", "Media list curation", "Interview prep & spokesperson coaching", "Coverage tracking & reporting"],
  },
  {
    num: "02",
    title: "Brand Strategy",
    description: "We define the narrative, voice, and positioning that sets your brand apart from everyone competing for attention.",
    deliverables: ["Brand positioning workshops", "Messaging architecture", "Tone of voice guidelines", "Competitive narrative analysis", "Brand story development"],
  },
  {
    num: "03",
    title: "Crisis Communications",
    description: "When the unexpected happens, we move fast to protect your reputation with clear, calm, and decisive messaging.",
    deliverables: ["Crisis response playbook", "24/7 rapid response team", "Stakeholder communication plans", "Media monitoring & escalation", "Post-crisis reputation recovery"],
  },
  {
    num: "04",
    title: "Content & Thought Leadership",
    description: "We ghostwrite bylines, op-eds, and executive commentary that position your leadership as the voice of the industry.",
    deliverables: ["Executive bylines & op-eds", "LinkedIn content strategy", "Podcast booking & preparation", "Speaking opportunity sourcing", "Ghostwriting & editorial support"],
  },
  {
    num: "05",
    title: "Influencer & Partnerships",
    description: "We connect your brand with creators and partners whose audiences align with where you want to grow.",
    deliverables: ["Creator identification & vetting", "Partnership negotiation", "Campaign briefing & oversight", "Performance measurement", "Long-term ambassador programs"],
  },
  {
    num: "06",
    title: "Event & Launch PR",
    description: "From product launches to funding announcements, we engineer moments that earn attention and drive momentum.",
    deliverables: ["Launch strategy & sequencing", "Embargo & exclusive management", "Event media logistics", "Press kit development", "Post-launch amplification"],
  },
];

export type CaseStudyData = {
  id: number;
  slug: string;
  tag: string;
  title: string;
  shortDesc: string;
  fullDesc: any;          // string (static) or Portable Text array (Sanity)
  gradient: string;
  coverImage?: string;
  // Fold 1
  foldOneSubheadline?: string;
  firstFoldContent?: any; // string or Portable Text array
  challenge?: any;        // string or Portable Text array (optional)
  executionChecklist?: string[];
  // Fold 2
  foldTwoCount?: string;
  foldTwoHeadline?: string;
  foldTwoSubheadline?: string;
  secondFoldContent?: any; // string or Portable Text array
  foldTwoBreakdown?: { label: string; value: string }[];
  mediaOutlets?: { title: string; description?: string }[];
};

export const CASE_STUDIES: CaseStudyData[] = [
  {
    id: 1,
    slug: "northbeam-capital",
    tag: "Fintech Launch",
    title: "Northbeam Capital",
    shortDesc: "Series B announcement covered across 40+ outlets, including a Bloomberg feature within 48 hours of launch.",
    fullDesc: "Northbeam Capital came to us six weeks before their $42M Series B with one goal: dominate the fintech news cycle within 48 hours. We developed a sequenced outreach strategy targeting tier-one financial and tech media first — delivering exclusive angles to Bloomberg, TechCrunch, and the FT simultaneously under embargo.",
    gradient: "linear-gradient(135deg, #0d0c10, #4b21b3)",
    foldOneSubheadline: "The challenge",
    challenge: "The fintech funding space is saturated — dozens of rounds announce every week. Standing out required a story angle that went beyond the numbers and gave journalists a distinctive narrative.",
    firstFoldContent: "We repositioned the announcement around the founder's contrarian market thesis rather than the funding amount. Journalists got a more compelling story to build around — and Northbeam got coverage that lasted weeks, not days.",
    foldTwoCount: "40+",
    foldTwoHeadline: "Outlets Covered",
    foldTwoSubheadline: "Including Bloomberg, TechCrunch, and the Financial Times within 48 hours.",
    mediaOutlets: [
      { title: "Bloomberg", description: "Featured the founder's contrarian market thesis in the Tech section." },
      { title: "TechCrunch", description: "Exclusive funding announcement covered within the first 12 hours." },
      { title: "Financial Times", description: "Op-ed placement timed to coincide with the announcement." },
      { title: "Forbes", description: "Founder profile ran two weeks post-announcement, sustaining coverage." },
    ],
  },
  {
    id: 2,
    slug: "atlas-wellness",
    tag: "Brand Repositioning",
    title: "Atlas Wellness",
    shortDesc: "A full narrative overhaul that repositioned a legacy brand for a new generation of customers.",
    fullDesc: "Atlas Wellness had a 15-year track record in B2B corporate wellness but was struggling to break into the DTC market. Their brand felt clinical and dated. We rebuilt their narrative from the ground up — turning a trusted institutional name into a modern, aspirational wellness partner for ambitious professionals.",
    gradient: "linear-gradient(135deg, #0f0820, #2d1b69)",
    foldOneSubheadline: "The positioning challenge",
    challenge: "Pivoting an established B2B brand to consumer without alienating their existing corporate client base required surgical messaging precision across every channel.",
    firstFoldContent: "We ran parallel narrative tracks — preserving Atlas's clinical credibility for institutional audiences while building a more personal voice for consumer channels and media.",
    foldTwoCount: "3×",
    foldTwoHeadline: "DTC Revenue Growth",
    foldTwoSubheadline: "Achieved within 12 months of the repositioned brand going live.",
    mediaOutlets: [
      { title: "Well+Good", description: "Feature on the rebrand and what it means for the wellness category." },
      { title: "Fast Company", description: "Innovation by Design shortlist — brand identity coverage." },
      { title: "Healthline", description: "Expert commentary from Atlas leadership on workplace wellbeing." },
    ],
  },
  {
    id: 3,
    slug: "ferro-logistics",
    tag: "Crisis Response",
    title: "Ferro Logistics",
    shortDesc: "Rapid-response messaging that protected stakeholder trust during a high-pressure supply disruption.",
    fullDesc: "When a critical port disruption threatened to derail Ferro Logistics' Q3 operations, their CEO had 72 hours to brief shareholders, reassure customers, and get ahead of the story. We deployed our crisis response team within four hours of the first call.",
    gradient: "linear-gradient(135deg, #0d0c10, #1a3a4a)",
    foldOneSubheadline: "A narrow window",
    challenge: "Supply chain crises are inherently messy — partial information, scared stakeholders, and journalists already working sources. The window to control the narrative was extremely narrow.",
    firstFoldContent: "We established a single source of truth with a tiered stakeholder communication plan: board and major clients first, then proactive media outreach with a prepared spokesperson.",
    foldTwoCount: "72h",
    foldTwoHeadline: "Full Response Window",
    foldTwoSubheadline: "Zero negative tier-1 stories published during the disruption period.",
    mediaOutlets: [
      { title: "Supply Chain Dive", description: "Proactive statement positioned Ferro as a model for transparent crisis comms." },
      { title: "FreightWaves", description: "CEO interview ran the day of the disruption — shaping early coverage." },
    ],
  },
  {
    id: 4,
    slug: "solace-health",
    tag: "Thought Leadership",
    title: "Solace Health",
    shortDesc: "Twelve-month op-ed program that established the CEO as a recognized voice in digital health policy.",
    fullDesc: "Dr. Maya Chen, CEO of Solace Health, had deep expertise in digital mental health policy but zero public presence. Over 12 months we built a systematic thought leadership program — placing her commentary in the publications that shape healthcare regulation and attract the investors who fund it.",
    gradient: "linear-gradient(135deg, #0a1628, #1e3a5f)",
    foldOneSubheadline: "Building a credible voice",
    challenge: "Healthcare is a credentialed space. Publications want real expertise paired with a compelling point of view — not generic commentary.",
    firstFoldContent: "We identified three underserved angles in digital mental health policy and built the editorial calendar around those gaps, making Dr. Chen the go-to expert commentator when those issues surfaced in the news.",
    foldTwoCount: "22",
    foldTwoHeadline: "Op-Eds Published",
    foldTwoSubheadline: "Across 8 tier-1 publications over a 12-month program.",
    mediaOutlets: [
      { title: "STAT News", description: "Recurring column on digital therapeutics and regulatory policy." },
      { title: "Health Affairs", description: "Peer-reviewed commentary cited by two Senate briefing documents." },
      { title: "Forbes Health", description: "Quarterly feature establishing Dr. Chen as a go-to industry expert." },
      { title: "TIME", description: "Included in the 2024 Health Innovators list with a full profile piece." },
    ],
  },
  {
    id: 5,
    slug: "wishcare",
    tag: "Beauty & Skincare",
    title: "WishCare",
    shortDesc: "A PR engine that turned one product launch into 25+ earned media pieces across Vogue, Femina, Hindustan Times, and more.",
    fullDesc: "When WishCare partnered with Runway Media, the goal wasn't just to launch another sunscreen. It was to build a PR engine that could support the brand's long-term growth. Because before a brand earns headlines, it needs a story worth telling.",
    gradient: "linear-gradient(135deg, #2d1060, #7c3aed)",
    foldOneSubheadline: "Before a brand earns headlines",
    challenge: "Before we reached out to a single journalist, we built the foundation. WishCare needed a complete PR infrastructure — not just a press release — before any outreach could land meaningfully with beauty editors.",
    firstFoldContent: "Our first major campaign: the launch of WishCare's Daily Tinted Fluid Sunscreen — positioned around SPF 50 PA++++, 12 shades for Indian skin tones, and the rare combination of skincare and makeup in one lightweight formula.",
    executionChecklist: [
      "Pitched beauty, skincare, and lifestyle publications",
      "Executed two rounds of journalist gifting to 60+ beauty editors",
      "Built founder-led narratives for long-form feature angles",
      "Pitched multiple WishCare products beyond the launch",
      "Identified award opportunities and editorial collaborations",
      "Supported participation in Femina Beauty Awards",
    ],
    foldTwoCount: "25+",
    foldTwoHeadline: "Earned Media Pieces",
    foldTwoSubheadline: "Across national dailies, beauty titles, and lifestyle digital — from a single product launch.",
    secondFoldContent: "What started as one product launch became an ongoing PR partnership. From media strategy and founder positioning to journalist relationships and brand-building opportunities, Runway Media helped create a PR engine that continues to grow with WishCare.",
    foldTwoBreakdown: [
      { label: "Beauty & skincare",    value: "12" },
      { label: "Lifestyle & culture",  value: "8"  },
      { label: "Founder-led features", value: "5"  },
    ],
    mediaOutlets: [
      { title: "Vogue India", description: "Feature on the 12-shade range and the whitespace in Indian sunscreen." },
      { title: "Femina", description: "Beauty Awards shortlist coverage + founder interview." },
      { title: "Hindustan Times", description: "Product of the week in the Weekend supplement." },
      { title: "Lifestyle Asia", description: "SPF roundup feature with WishCare as the lead product." },
      { title: "Tweak India", description: "Founder story and the science behind the formulation." },
      { title: "Hauterrfly", description: "Deep-dive review and gifting campaign coverage." },
    ],
  },
];

export const ABOUT_POINTS = [
  { mark: "A", title: "Editorial Instinct",  body: "We think like journalists first, marketers second."              },
  { mark: "B", title: "Senior-Led Teams",    body: "No juniors running your account. Ever."                          },
  { mark: "C", title: "Measurable Impact",   body: "Reporting tied to reach, sentiment, and share of voice."         },
  { mark: "D", title: "Global Reach",        body: "Press relationships across North America, EMEA, and APAC."       },
];

export const TEAM = [
  { initial: "S", name: "Sarah Reeves",   role: "Founder & CEO",             bio: "Former editor at Wired and the FT. 16 years shaping how ambitious companies talk to the world."          },
  { initial: "M", name: "Marcus Cole",    role: "Head of Strategy",           bio: "Ex-McCann global strategy director. Obsessive about brand positioning and the stories that stick."       },
  { initial: "P", name: "Priya Shah",     role: "Head of Media Relations",    bio: "Built media programs for five unicorns. If a journalist matters to your industry, she knows them."      },
  { initial: "J", name: "James O'Brien",  role: "Crisis & Issues Director",   bio: "Former Bloomberg reporter. Has navigated 30+ high-stakes situations for publicly traded companies."     },
];

export const TESTIMONIALS = [
  {
    initial: "M",
    quote: "Runway Media rewrote the way our category talks about itself. The coverage quality — not just quantity — has been transformative.",
    name: "Maya Lindqvist",
    role: "CMO, Northbeam Capital",
  },
  {
    initial: "D",
    quote: "They handled a sensitive moment for us with a level of calm and precision I haven't seen from any other agency.",
    name: "David Osei",
    role: "CEO, Ferro Logistics",
  },
  {
    initial: "S",
    quote: "Within six months, our founder went from unknown to a regularly cited voice in three major trade publications.",
    name: "Sana Whitfield",
    role: "Head of Comms, Atlas Wellness",
  },
];

export const PROCESS_STEPS = [
  { num: "01", title: "Discovery",  body: "We audit your current brand narrative, competitive landscape, and media coverage to find the gaps worth owning."    },
  { num: "02", title: "Strategy",   body: "We define your positioning, messaging hierarchy, and the publications and journalists that matter most."             },
  { num: "03", title: "Execution",  body: "We write, pitch, and place — working every angle until your story is in front of the right audiences."              },
  { num: "04", title: "Reporting",  body: "We track every placement, measure reach and sentiment, and report against KPIs that tie back to business outcomes." },
];
