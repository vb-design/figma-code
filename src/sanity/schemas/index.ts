// ─────────────────────────────────────────────────────────────────────────────
// RUNWAY MEDIA — Sanity Studio Schemas
//
// HOW TO USE:
//   1. Create a new Sanity project at https://sanity.io
//   2. Run: npm create sanity@latest -- --project YOUR_PROJECT_ID --dataset production
//   3. Copy the contents of each schema file below into your studio's /schemas folder
//   4. Import and add all schemas to your sanity.config.ts
//   5. Run the Studio and add your content
// ─────────────────────────────────────────────────────────────────────────────

export const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton — only one document of this type
  fields: [
    { name: "heroHeadline", title: "Hero Headline",  type: "string",
      description: "Main headline on the homepage. Wrap italic word in <em> tags." },
    { name: "heroSubtext",  title: "Hero Subtext",   type: "array", of: [{ type: "block" }],
      description: "Supports bold, italic, links. Shown beneath the hero headline." },
    { name: "email",        title: "Contact Email",  type: "string" },
    { name: "phone",        title: "Contact Phone",  type: "string" },
    { name: "address",      title: "Office Address", type: "text", rows: 3 },
    { name: "aboutQuote",   title: "About Page Quote", type: "array", of: [{ type: "block" }] },
    { name: "aboutBody1",   title: "About Body — Paragraph 1", type: "array", of: [{ type: "block" }] },
    { name: "aboutBody2",   title: "About Body — Paragraph 2", type: "array", of: [{ type: "block" }] },
    // ── About page ───────────────────────────────────────────────────────────
    { name: "aboutHeroHeadline", title: "About Page — Hero Headline", type: "string",
      description: "Large heading shown in the full-width hero section at the very top of the About page." },
    { name: "aboutHeroBody", title: "About Page — Hero Subtext", type: "text", rows: 2,
      description: "Short paragraph beneath the hero headline." },
    { name: "aboutStoryHeadline", title: "About Page — Story Section Headline", type: "string",
      description: "Heading shown in the two-column story section (next to the founder photo). Can differ from the hero headline." },
    { name: "philosophyHeadline", title: "About Page — Philosophy Headline", type: "string",
      description: "Dark section heading. E.g. \"Fewer clients. Better work. Measurable results.\"" },
    { name: "philosophyBody", title: "About Page — Philosophy Body", type: "text", rows: 4,
      description: "Paragraph beneath the philosophy headline." },
    {
      name: "philosophyStats", title: "About Page — Philosophy Stats (3 cards)",
      type: "array",
      description: "3 stat cards shown on the right side of the Philosophy section.",
      of: [{
        type: "object",
        fields: [
          { name: "stat", title: "Stat / Number (e.g. 16+)", type: "string" },
          { name: "text", title: "Description",              type: "string" },
        ],
        preview: { select: { title: "stat", subtitle: "text" } },
      }],
    },
    // ── Homepage Services ─────────────────────────────────────────────────────
    { name: "servicesHeadline", title: "Homepage Services — Headline", type: "text", rows: 4,
      description: "Multi-line heading. Each line break becomes a new line. First line renders in purple, rest in dark. E.g. line 1: 'Strategic' / line 2: 'communications,' / line 3: 'built around' / line 4: 'your story.'" },
    { name: "servicesSubtext", title: "Homepage Services — Subtext", type: "text", rows: 2,
      description: "Short paragraph shown to the right of the heading." },
    { name: "homeAboutHeadline", title: "Homepage About — Headline", type: "string",
      description: "The large heading. E.g. \"Don't become another dead post on social media.\"" },
    { name: "homeAboutHighlight", title: "Homepage About — Headline Highlight Phrase", type: "string",
      description: "The exact phrase within the headline to render in italic purple. E.g. \"dead post\"" },
    { name: "homeAboutSubtext", title: "Homepage About — Subtext", type: "text", rows: 2,
      description: "Short paragraph below the headline. E.g. \"People remember brands that give them something worth talking about.\"" },
    { name: "homeAboutPoints", title: "Homepage About — Numbered Points",
      type: "array", of: [{ type: "string" }],
      description: "3 numbered reasons shown with dividers. E.g. \"A founder with a point of view\"" },
    { name: "homeAboutCta", title: "Homepage About — CTA Text", type: "string",
      description: "Purple call-to-action line below the numbered list. E.g. \"That's where you need Runway Media.\"" },
    {
      name: "heroStats", title: "Hero Stats (3 items)",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "num",   title: "Number (e.g. 180+)", type: "string" },
          { name: "label", title: "Label",              type: "string" },
        ],
        preview: { select: { title: "num", subtitle: "label" } },
      }],
    },
    {
      name: "statsBar", title: "Stats Bar (4 items — above case studies)",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "num",   title: "Number (e.g. 100+)",  type: "string" },
          { name: "label", title: "Label",               type: "string" },
        ],
        preview: { select: { title: "num", subtitle: "label" } },
      }],
    },
        {
      name: 'mediaOutlets',
      title: 'Media Outlets (logo strip)',
      type: 'array',
      description: 'Upload a logo image, or just enter the name for styled text.',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Name (e.g. FORBES)', type: 'string' },
          {
            name: 'logo',
            title: 'Logo Image (optional)',
            type: 'image',
            description: 'Transparent PNG. Leave blank to show the name as text.',
            options: { hotspot: false },
          },
        ],
        preview: { select: { title: 'name' } },
      }],
    },

    // Footer
    {
      name: 'footerTagline',
      title: 'Footer — Tagline',
      type: 'text',
      rows: 2,
    },
    {
      name: 'footerCopyright',
      title: 'Footer — Copyright Text',
      type: 'string',
    },

    // Social Links
    {
      name: 'socialLinkedIn',
      title: 'Social — LinkedIn URL',
      type: 'url',
    },
    {
      name: 'socialTwitter',
      title: 'Social — Twitter/X URL',
      type: 'url',
    },
    {
      name: 'socialInstagram',
      title: 'Social — Instagram URL',
      type: 'url',
    },
  ],
};

export const service = {
  name: "service",
  title: "Service",
  type: "document",
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    { name: "number",      title: "Number (e.g. 01)", type: "string" },
    { name: "title",       title: "Title",            type: "string" },
    { name: "description", title: "Description",      type: "array", of: [{ type: "block" }],
      description: "Supports bold, italic, links." },
    {
      name: "deliverables", title: "Deliverables",
      type: "array", of: [{ type: "string" }],
    },
    { name: "order", title: "Display Order", type: "number" },
  ],
  preview: { select: { title: "title", subtitle: "number" } },
};

export const caseStudy = {
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    // ── Core identity ─────────────────────────────────────────────────────────
    { name: "slug", title: "Slug (URL key)", type: "slug",
      options: { source: "title", maxLength: 96 },
      description: "Auto-generated from title. Used in the URL: /work/your-slug" },
    { name: "tag",       title: "Category Tag (e.g. Fintech Launch)", type: "string" },
    { name: "title",     title: "Client Name / Title",                type: "string" },
    { name: "shortDesc", title: "Short Description",                  type: "text", rows: 2,
      description: "Plain text — shown in work cards and as the subtitle in Fold 1 left panel." },
    { name: "fullDesc",  title: "Full Description",                   type: "array", of: [{ type: "block" }],
      description: "Shown in Fold 1 right panel below the sub-headline. Supports bold, italic, links." },

    // ── Cover ─────────────────────────────────────────────────────────────────
    { name: "coverImage", title: "Cover Image", type: "image",
      options: { hotspot: true },
      description: "Used in the banner, scroll section, and work cards. Overlays the gradient when set." },
    { name: "gradient",  title: "Card Gradient CSS (fallback)",  type: "string",
      description: "E.g. linear-gradient(135deg, #0d0c10, #4b21b3) — shown when no cover image is uploaded." },

    // ── Fold 1 ────────────────────────────────────────────────────────────────
    { name: "foldOneSubheadline", title: "Fold 1 — Sub-headline (right panel)", type: "string",
      description: "Optional heading shown above the full description in the white right panel." },
    { name: "firstFoldContent", title: "Fold 1 — Additional Content", type: "array", of: [{ type: "block" }],
      description: "Free rich text editor for any extra content shown in Fold 1 right panel below the full description." },

    // ── Fold 1 optional fields ────────────────────────────────────────────────
    { name: "challenge", title: "The Challenge (optional)", type: "array", of: [{ type: "block" }],
      description: "If filled, shown on the Fold 1 left panel below the short description." },
    { name: "executionChecklist", title: "Execution Checklist (optional)",
      type: "array", of: [{ type: "string" }],
      description: "Numbered steps shown in the Fold 1 right panel below additional content. E.g. 'Pitched beauty publications'" },

    // ── Fold 2 ────────────────────────────────────────────────────────────────
    { name: "foldTwoCount", title: "Fold 2 — Count / Number", type: "string",
      description: "Big stat displayed prominently on the left panel. E.g. '25+'. Optional." },
    { name: "foldTwoHeadline", title: "Fold 2 — Headline", type: "string",
      description: "Headline shown below the count. Optional." },
    { name: "foldTwoSubheadline", title: "Fold 2 — Subheadline", type: "string",
      description: "Smaller supporting text below the headline. Optional." },
    { name: "secondFoldContent", title: "Fold 2 — Additional Content", type: "array", of: [{ type: "block" }],
      description: "Free rich text editor for any extra content shown in the Fold 2 left panel." },
    {
      name: "foldTwoBreakdown", title: "Fold 2 — Category Breakdown",
      type: "array",
      description: "Rows shown at the bottom of the left panel — label on left, value on right. E.g. 'Beauty & skincare' / '12'.",
      of: [{
        type: "object",
        fields: [
          { name: "label", title: "Category Label (e.g. Beauty & skincare)", type: "string" },
          { name: "value", title: "Value / Number (e.g. 12)",                type: "string" },
        ],
        preview: { select: { title: "label", subtitle: "value" } },
      }],
    },
    {
      name: "mediaOutlets", title: "Fold 2 — Media Coverage Cards",
      type: "array",
      description: "Each card shows an outlet title and a description/pull quote. Displayed as a 2-column grid in the Fold 2 right panel.",
      of: [{
        type: "object",
        fields: [
          { name: "title",       title: "Outlet Title (e.g. Vogue)",        type: "string" },
          { name: "description", title: "Description / Pull Quote",          type: "text", rows: 2 },
        ],
        preview: { select: { title: "title", subtitle: "description" } },
      }],
    },

    { name: "order", title: "Display Order", type: "number" },
  ],
  preview: { select: { title: "title", subtitle: "tag" } },
};

export const testimonial = {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    { name: "initial", title: "Avatar Initial (e.g. M)", type: "string", validation: (R: any) => R.max(1) },
    { name: "quote",   title: "Quote",                   type: "text", rows: 4 },
    { name: "name",    title: "Name",                    type: "string" },
    { name: "role",    title: "Role / Company",          type: "string" },
    { name: "order",   title: "Display Order",           type: "number" },
  ],
  preview: { select: { title: "name", subtitle: "role" } },
};

export const teamMember = {
  name: "teamMember",
  title: "Team Member",
  type: "document",
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    { name: "photo",   title: "Headshot", type: "image", options: { hotspot: true } },
    { name: "initial", title: "Avatar Initial (fallback)", type: "string", validation: (R: any) => R.max(1) },
    { name: "name",    title: "Full Name",       type: "string" },
    { name: "role",    title: "Job Title",       type: "string" },
    { name: "bio",     title: "Bio",             type: "text", rows: 3 },
    { name: "order",   title: "Display Order",   type: "number" },
  ],
  preview: { select: { title: "name", subtitle: "role" } },
};

export const aboutPoint = {
  name: "aboutPoint",
  title: "About Point",
  type: "document",
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    { name: "mark",  title: "Letter Mark (e.g. A)", type: "string", validation: (R: any) => R.max(1) },
    { name: "title", title: "Title",                type: "string" },
    { name: "body",  title: "Body",                 type: "text", rows: 2 },
    { name: "order", title: "Display Order",        type: "number" },
  ],
  preview: { select: { title: "title", subtitle: "mark" } },
};

export const processStep = {
  name: "processStep",
  title: "Process Step",
  type: "document",
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    { name: "number", title: "Step Number (e.g. 01)", type: "string" },
    { name: "title",  title: "Title",                 type: "string" },
    { name: "body",   title: "Body",                  type: "text", rows: 3 },
    { name: "order",  title: "Display Order",         type: "number" },
  ],
  preview: { select: { title: "title", subtitle: "number" } },
};

// ── sanity.config.ts (copy this to your studio root) ─────────────────────────
//
// import { defineConfig } from 'sanity'
// import { structureTool } from 'sanity/structure'
// import { visionTool } from '@sanity/vision'
// import { siteSettings, service, caseStudy, testimonial, teamMember, aboutPoint, processStep } from './schemas'
//
// export default defineConfig({
//   name: 'runway-media',
//   title: 'Runway Media',
//   projectId: 'YOUR_PROJECT_ID',
//   dataset: 'production',
//   plugins: [structureTool(), visionTool()],
//   schema: {
//     types: [siteSettings, service, caseStudy, testimonial, teamMember, aboutPoint, processStep],
//   },
// })
