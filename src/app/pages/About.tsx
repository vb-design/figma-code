import React from "react";
import founderPhoto from "@/imports/App/721a699587c72404ae357ef36522e23eb3d31a0d.png";
import { useTheme, serif, sans } from "../theme";
import { useAboutPoints, useTeamMembers, useSiteSettings } from "../../sanity/hooks";
import { PageHero, Eyebrow, BtnPrimary, CtaSection, RichText } from "../components";

export function About() {
  const T           = useTheme();
  const settings    = useSiteSettings();
  const aboutPoints = useAboutPoints();
  const team        = useTeamMembers();

  return (
    <div style={{ color: T.ink }}>
      <PageHero eyebrow="About Runway Media"
        heading={settings.aboutHeroHeadline ?? "A small agency with an outsized media footprint."}
        body={settings.aboutHeroBody ?? "Founded by former newsroom editors and brand strategists, we bridge the gap between corporate messaging and the stories people actually want to read."} />

      {/* Story — Figma layout */}
      <section style={{ padding: "0 0 120px", background: T.bg }}>
        <div className="grid grid-cols-1 lg:grid-cols-[452px_1fr] items-start"
             style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", gap: 72 }}>

          {/* Left — founder photo card */}
          <div className="relative overflow-hidden flex-shrink-0"
               style={{ borderRadius: 24, background: "#0d0c10", aspectRatio: "1/1", maxWidth: 452 }}>
            {/* Purple radial gradients matching Figma */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1,
              backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 452.2 452.2' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -49.587 -49.587 0 339.15 90.439)'><stop stop-color='rgba(108,60,224,0.55)' offset='0'/><stop stop-color='rgba(0,0,0,0)' offset='0.55'/></radialGradient></defs></svg>"), url("data:image/svg+xml;utf8,<svg viewBox='0 0 452.2 452.2' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -52.783 -52.783 0 90.439 384.37)'><stop stop-color='rgba(108,60,224,0.35)' offset='0'/><stop stop-color='rgba(0,0,0,0)' offset='0.5'/></radialGradient></defs></svg>")`,
            }} />
            {/* Founder photo */}
            <img src={founderPhoto} alt="Anagha Nabar Batus"
                 className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
            {/* Bottom scrim */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2,
              background: "linear-gradient(to bottom, rgba(0,0,0,0) 55%, rgba(0,0,0,0.72) 100%)" }} />
            {/* Name / title overlay */}
            <div className="absolute z-10" style={{ bottom: 28, left: 28, right: 28, zIndex: 3 }}>
              <p style={{ ...serif, fontSize: 19, color: "#fff", fontWeight: 700, lineHeight: 1.4, marginBottom: 2 }}>
                Anagha Nabar Batus
              </p>
              <p style={{ ...serif, fontSize: 15, color: "rgba(255,255,255,.8)", fontStyle: "italic", lineHeight: 1.4, margin: 0 }}>
                Founder, Runway Media | PR Expert
              </p>
            </div>
          </div>

          {/* Right — text */}
          <div style={{ paddingTop: 8 }}>
            <Eyebrow>About Runway Media</Eyebrow>
            <h2 style={{ ...serif, fontSize: "clamp(30px,3.6vw,46px)", color: T.ink, marginBottom: 0, lineHeight: 1.15, fontWeight: 500, maxWidth: 612 }}>
              {settings.aboutStoryHeadline ?? "A small agency with an outsized media footprint."}
            </h2>
            <RichText value={settings.aboutBody1}
                      style={{ ...sans, color: T.gray, fontWeight: 300, fontSize: 16, marginTop: 24, marginBottom: 20, maxWidth: 520, lineHeight: 1.7 }} />
            <RichText value={settings.aboutBody2}
                      style={{ ...sans, color: T.gray, fontWeight: 300, fontSize: 16, marginBottom: 36, maxWidth: 520, lineHeight: 1.7 }} />
            <BtnPrimary to="/about#team">Meet the Team →</BtnPrimary>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "120px 0", background: T.bgAlt }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ maxWidth: 560, marginBottom: 64 }}>
            <Eyebrow>The Team</Eyebrow>
            <h2 style={{ ...serif, fontSize: "clamp(30px,3.6vw,46px)", color: T.ink, lineHeight: 1.15 }}>The people behind the press.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 24 }}>
            {team.map(member => (
              <div key={member.name} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, overflow: "hidden" }}>
                <div style={{ height: 200, background: `linear-gradient(135deg, ${T.isDark ? "#1c1a2e" : "#0d0c10"}, ${T.purpleD})`, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {(member as any).photo ? (
                    <img src={(member as any).photo} alt={member.name}
                         style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
                  ) : (
                    <div style={{ ...serif, width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg, ${T.purple}, #9c6bff)`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700 }}>
                      {member.initial}
                    </div>
                  )}
                </div>
                <div style={{ padding: "24px 24px 28px" }}>
                  <h3 style={{ ...serif, fontSize: 20, color: T.ink, marginBottom: 4 }}>{member.name}</h3>
                  <div style={{ ...sans, fontSize: 11, color: T.purple, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>{member.role}</div>
                  <p style={{ ...sans, fontSize: 13, color: T.gray, fontWeight: 300, lineHeight: 1.65 }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section style={{ padding: "120px 0", background: T.bgDark }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 80, alignItems: "center" }}>
            <div>
              <Eyebrow light>Our Philosophy</Eyebrow>
              <h2 style={{ ...serif, fontSize: "clamp(30px,3.6vw,46px)", color: "#fff", lineHeight: 1.15, marginBottom: 28 }}>
                {settings.philosophyHeadline ?? "Fewer clients. Better work. Measurable results."}
              </h2>
              <p style={{ ...sans, color: "#a39db0", fontWeight: 300, fontSize: 16, lineHeight: 1.75, marginBottom: 40 }}>
                {settings.philosophyBody ?? "We cap our client roster deliberately. When you work with Runway, you get the founders' attention — not a team of coordinators. Every engagement includes share of voice tracking, sentiment analysis, and reporting tied back to business outcomes."}
              </p>
              <BtnPrimary to="/contact">Work With Us →</BtnPrimary>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {(settings.philosophyStats ?? [
                { stat: "16+",    text: "Years running lean, senior-led teams" },
                { stat: "100%",   text: "Senior staff on every account — no exceptions" },
                { stat: "30-day", text: "Notice period. We earn your business every month." },
              ]).map((item: { stat: string; text: string }) => (
                <div key={item.stat} style={{ display: "flex", alignItems: "center", gap: 28, padding: "28px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 16 }}>
                  <div style={{ ...serif, fontSize: 36, color: T.purple, fontWeight: 700, flexShrink: 0, minWidth: 90 }}>{item.stat}</div>
                  <p style={{ ...sans, fontSize: 16, color: "#e7e3ee", fontWeight: 300, margin: 0, lineHeight: 1.5 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection email={settings.email} />
    </div>
  );
}
