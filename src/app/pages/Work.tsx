import React, { useState } from "react";
import { useTheme } from "../theme";
import { useCaseStudies, useSiteSettings } from "../../sanity/hooks";
import { PageHero, StatsBar, WorkCard, CtaSection } from "../components";

const FILTERS = ["All", "Fintech Launch", "Brand Repositioning", "Crisis Response", "Thought Leadership"];

export function Work() {
  const T           = useTheme();
  const caseStudies = useCaseStudies();
  const settings    = useSiteSettings();
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? caseStudies : caseStudies.filter(c => c.tag === active);

  return (
    <div style={{ color: T.ink }}>
      <PageHero eyebrow="Selected Work"
        heading="Campaigns that made the front page."
        body="A selection of work where strategy met storytelling, and storytelling moved the needle." />

      <StatsBar items={settings.statsBar} />

      <section style={{ padding: "80px 0 120px", background: T.bgAlt }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          {/* Filters */}
          <div className="flex flex-wrap" style={{ gap: 8, marginBottom: 48 }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setActive(f)}
                      style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", padding: "10px 20px", borderRadius: 999, border: `1px solid ${active === f ? T.purple : T.border}`, background: active === f ? T.purple : "transparent", color: active === f ? "#fff" : T.gray, cursor: "pointer", transition: "all .25s ease" }}>
                {f}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 28 }}>
            {filtered.map(item => <WorkCard key={item.slug} item={item} linkTo={`/work/${item.slug}`} />)}
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
