import React from "react";
import { useTheme, serif, sans } from "../theme";
import { useTestimonials, useSiteSettings } from "../../sanity/hooks";
import { PageHero, Eyebrow, StatsBar, CtaSection } from "../components";

export function Clients() {
  const T            = useTheme();
  const testimonials = useTestimonials();
  const settings     = useSiteSettings();

  return (
    <div style={{ color: T.ink }}>
      <PageHero eyebrow="Client Stories"
        heading="Trusted by the brands that lead their categories."
        body="From Series A startups to global enterprises — here's what our clients say about working with us." />

      <StatsBar items={settings.statsBar} />

      {/* Testimonials */}
      <section style={{ padding: "100px 0 120px", background: T.bgDark }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ marginBottom: 64 }}>
            <Eyebrow light>In Their Words</Eyebrow>
            <h2 style={{ ...serif, fontSize: "clamp(30px,3.6vw,46px)", color: "#fff", maxWidth: 600, lineHeight: 1.15 }}>
              Trusted by founders, CMOs, and communications leads.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: 24, marginBottom: 28 }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: T.darkCardBg, border: `1px solid ${T.darkCardBorder}`, borderRadius: 20, padding: "34px 30px", display: "flex", flexDirection: "column" }}>
                <div style={{ color: "#b794ff", fontSize: 14, letterSpacing: 3, marginBottom: 20 }}>★★★★★</div>
                <p style={{ ...sans, fontSize: 15, fontWeight: 300, color: "#e7e3ee", marginBottom: 28, flex: 1, lineHeight: 1.7 }}>"{t.quote}"</p>
                <div className="flex items-center" style={{ gap: 14, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.08)" }}>
                  <div className="flex items-center justify-center flex-shrink-0"
                       style={{ ...serif, width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${T.purple}, #9c6bff)`, color: "#fff", fontWeight: 700, fontSize: 15 }}>
                    {t.initial}
                  </div>
                  <div>
                    <div style={{ ...sans, fontSize: 14, fontWeight: 600, color: "#fff" }}>{t.name}</div>
                    <div style={{ ...sans, fontSize: 12, color: "#a39db0" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured in */}
      <section style={{ padding: "80px 0", background: T.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <Eyebrow>Featured In</Eyebrow>
          <h2 style={{ ...serif, fontSize: "clamp(26px,3vw,38px)", color: T.ink, marginBottom: 48, lineHeight: 1.15 }}>Our clients have been covered by</h2>
          <div className="flex items-center flex-wrap" style={{ gap: "24px 48px" }}>
            {[...settings.mediaOutlets.map((o: any) => o.name ?? o), "The Guardian", "Reuters", "Inc.", "Entrepreneur"].map((name, i) => (
              <div key={`${name}-${i}`} style={{ ...serif, fontSize: "clamp(18px,2.2vw,26px)", color: T.grayL, fontWeight: 600, letterSpacing: ".02em", opacity: 0.55 }}>{name}</div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection email={settings.email} />
    </div>
  );
}
