// All GROQ queries — one per content type, ordered by the `order` field
// Description fields are fetched as plain values so they work whether the
// Studio schema stores them as text (legacy) or block arrays (rich text).
// The RichText component in components.tsx handles both shapes.

export const QUERIES = {
  siteSettings: `*[_type == "siteSettings"][0]{
    heroHeadline,
    heroSubtext,
    email,
    phone,
    address,
    heroStats[]{ num, label },
    statsBar[]{ num, label },
    mediaOutlets[]{ name, "logoUrl": logo.asset->url },
    footerTagline,
    footerCopyright,
    socialLinkedIn,
    socialTwitter,
    socialInstagram,
    aboutQuote,
    aboutBody1,
    aboutBody2,
    homeAboutHeadline,
    homeAboutHighlight,
    homeAboutSubtext,
    homeAboutPoints,
    homeAboutCta,
    servicesHeadline,
    servicesSubtext,
    aboutHeroHeadline,
    aboutHeroBody,
    aboutStoryHeadline,
    philosophyHeadline,
    philosophyBody,
    philosophyStats[]{ stat, text }
  }`,

  contactSettings: `*[_type == "contactSettings"][0]{
    heroEyebrow,
    heroHeadline,
    heroBody,
    nameLabel,
    namePlaceholder,
    companyLabel,
    companyPlaceholder,
    emailLabel,
    emailPlaceholder,
    serviceLabel,
    servicePlaceholder,
    serviceOptions,
    messageLabel,
    messagePlaceholder,
    submitLabel,
    replyNote,
    successHeadline,
    successBody,
    contactInfoTitle,
    officeHoursTitle,
    officeHours,
    crisisNote,
    followTitle
  }`,

  services: `*[_type == "service"] | order(order asc){
    "num": number,
    title,
    description,
    deliverables
  }`,

  caseStudies: `*[_type == "caseStudy"] | order(order asc){
    "id": order,
    slug,
    tag,
    title,
    shortDesc,
    fullDesc,
    "coverImage": coverImage.asset->url,
    gradient,
    foldOneSubheadline,
    firstFoldContent,
    challenge,
    executionChecklist,
    foldTwoCount,
    foldTwoHeadline,
    foldTwoSubheadline,
    secondFoldContent,
    foldTwoBreakdown[]{ label, value },
    mediaOutlets[]{ title, description }
  }`,

  testimonials: `*[_type == "testimonial"] | order(order asc){
    initial,
    quote,
    name,
    role
  }`,

  teamMembers: `*[_type == "teamMember"] | order(order asc){
    "photo": photo.asset->url,
    initial,
    name,
    role,
    bio
  }`,

  aboutPoints: `*[_type == "aboutPoint"] | order(order asc){
    mark,
    title,
    body
  }`,

  processSteps: `*[_type == "processStep"] | order(order asc){
    "num": number,
    title,
    body
  }`,
};