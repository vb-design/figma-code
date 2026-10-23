import React, { useState } from "react";
import { useTheme, serif, sans } from "../theme";
import { useServices, useProcessSteps } from "../../sanity/hooks";
import { PageHero, Eyebrow, CtaSection, RichText } from "../components";
import svgPaths from "@/imports/App-1/svg-r0oxntpn6i";

export function Services() {
  const T        = useTheme();
  const services = useServices();
  const steps    = useProcessSteps();

  return (
    <div style={{ color: T.ink }}>
      <PageHero eyebrow="What We Do"
        heading={<>Strategic PR &amp; communications, built to move the needle.</>}
        body="Six integrated disciplines. One goal: make your brand impossible to ignore." />

      {/* Full services list — card grid */}
      <section style={{ padding: "0 0 120px", background: T.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 28 }}>
            {services.map(s => <ServiceCard key={s.num} service={s} T={T} />)}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: "120px 0", background: T.bgAlt }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ maxWidth: 560, marginBottom: 72 }}>
            <Eyebrow>How We Work</Eyebrow>
            <h2 style={{ ...serif, fontSize: "clamp(30px,3.6vw,46px)", color: T.ink, lineHeight: 1.15 }}>
              A process built for results, not just deliverables.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 28 }}>
            {steps.map(step => (
              <div key={step.num} style={{ padding: "36px 28px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 20 }}>
                <div style={{ ...sans, fontSize: 12, color: T.purple, fontWeight: 700, letterSpacing: ".1em", marginBottom: 20 }}>{step.num}</div>
                <div style={{ width: 32, height: 2, background: T.purple, marginBottom: 20 }} />
                <h3 style={{ ...serif, fontSize: 20, color: T.ink, marginBottom: 12 }}>{step.title}</h3>
                <p style={{ ...sans, fontSize: 16, color: T.gray, fontWeight: 300, lineHeight: 1.65 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}

function ServiceCard({ service, T }: { service: ReturnType<typeof useServices>[number]; T: any }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "linear-gradient(135deg, #1a1528, #3b1fa3)" : T.card,
        border: `1px solid ${hov ? "transparent" : T.border}`,
        borderRadius: 20,
        padding: "41px 33px",
        display: "flex",
        flexDirection: "column",
        transition: "background .3s ease, border-color .3s ease, box-shadow .3s ease",
        boxShadow: hov ? "0 20px 40px rgba(108,60,224,0.25)" : "none",
      }}
    >
      <svg width="39" height="39" viewBox="0 0 39 39" fill="none">
        <rect width="39" height="39" rx="10" fill={hov ? "rgba(255,255,255,0.12)" : T.purpleP} />
        <path d={svgPaths.p238abb00} fill={hov ? "#c4a8ff" : T.purple} />
      </svg>
      <h3 style={{ ...serif, fontSize: 22, color: hov ? "#fff" : T.ink, fontWeight: 500, lineHeight: 1.25, marginTop: 24, marginBottom: 14, transition: "color .3s ease" }}>
        {service.title}
      </h3>
      <RichText value={service.description} style={{ ...sans, fontSize: 14.5, color: hov ? "rgba(255,255,255,0.65)" : T.gray, fontWeight: 300, lineHeight: 1.65, transition: "color .3s ease" }} />
      {(service.deliverables ?? []).length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
          {(service.deliverables ?? []).map(d => (
            <li key={d} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: hov ? "rgba(196,168,255,0.7)" : T.purple, flexShrink: 0, marginTop: 7, transition: "background .3s ease" }} />
              <span style={{ ...sans, fontSize: 13, color: hov ? "rgba(255,255,255,0.55)" : T.gray, lineHeight: 1.5, transition: "color .3s ease" }}>{d}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
