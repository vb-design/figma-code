import React from "react";
import { Link, useParams } from "react-router";
import { useTheme, serif, sans } from "../theme";
import { useCaseStudies } from "../../sanity/hooks";
import { WorkCard, BtnPrimary, BtnOutline, RichText } from "../components";
import type { CaseStudyData } from "../data";

type FullStudy = CaseStudyData & { coverImage?: string };

export function CaseStudy() {
  const T           = useTheme();
  const { slug }    = useParams<{ slug: string }>();
  const caseStudies = useCaseStudies();
  const study       = caseStudies.find(c => c.slug === slug) as FullStudy | undefined;
  const others      = caseStudies.filter(c => c.slug !== slug).slice(0, 2);

  if (!study) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: T.bg, gap: 24 }}>
        <h1 style={{ ...serif, fontSize: "clamp(40px,5vw,72px)", color: T.ink }}>Case study not found.</h1>
        <BtnOutline to="/work">← Back to Work</BtnOutline>
      </div>
    );
  }

  const hasFold2 = !!(study.foldTwoCount || study.foldTwoHeadline || study.secondFoldContent || study.mediaOutlets?.length);

  return (
    <div style={{ color: T.ink, background: T.bg }}>

      {/* ── BANNER HEADER ── */}
      <section style={{ paddingTop: "clamp(100px,10vw,140px)", paddingBottom: 0 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px 40px" }}>
          <Link to="/work" style={{ ...sans, fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: T.purple, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
            ← All Work
          </Link>
        </div>

        {/* Full-bleed banner */}
        <div style={{ width: "100%", aspectRatio: "21/7", background: study.gradient ?? "#0d0c10", position: "relative", overflow: "hidden" }}>
          {study.coverImage && (
            <img src={study.coverImage} alt={study.title}
                 style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
          )}
          <div className="absolute inset-0" style={{ background: study.coverImage ? "linear-gradient(to bottom, rgba(0,0,0,.15) 0%, rgba(0,0,0,.5) 100%)" : "repeating-linear-gradient(115deg, rgba(255,255,255,.04) 0 2px, transparent 2px 32px)" }} />
          <div className="absolute inset-0 flex items-end justify-between" style={{ padding: "clamp(24px,4vw,48px)" }}>
            {study.tag && (
              <span style={{ ...sans, fontSize: 11, textTransform: "uppercase", letterSpacing: ".14em", color: "#fff", background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.25)", padding: "7px 16px", borderRadius: 999, fontWeight: 600 }}>
                {study.tag}
              </span>
            )}
            <span style={{ ...sans, fontSize: 12, textTransform: "uppercase", letterSpacing: ".14em", color: "rgba(255,255,255,.55)", fontWeight: 600 }}>Runway Media</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOLD 1 — Title · Description · Content
      ══════════════════════════════════════════════════════ */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr]" style={{ minHeight: "70vh" }}>

          {/* LEFT — dark panel: title + short desc + optional challenge */}
          <div style={{ background: "#151022", padding: "clamp(52px,6vw,88px) clamp(36px,4vw,56px)", display: "flex", flexDirection: "column" }}>

            {/* Tag eyebrow */}
            {study.tag && (
              <div style={{ ...sans, fontSize: 11, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 32 }}>
                {study.tag}
              </div>
            )}

            {/* Title */}
            <h1 style={{ ...serif, fontSize: "clamp(32px,3.5vw,52px)", color: "#fff", lineHeight: 1.1, fontWeight: 600, marginBottom: 28 }}>
              {study.title}
            </h1>

            {/* Short description */}
            <p style={{ ...sans, fontSize: 16, color: "rgba(255,255,255,.65)", fontWeight: 300, lineHeight: 1.75, marginBottom: 0, flexGrow: study.challenge ? 0 : 1 }}>
              {study.shortDesc}
            </p>

            {/* Optional: Challenge text */}
            {study.challenge && (
              <>
                <div style={{ height: 1, background: "rgba(255,255,255,.12)", margin: "36px 0" }} />
                <div>
                  <div style={{ ...sans, fontSize: 10, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", marginBottom: 16 }}>
                    The Challenge
                  </div>
                  <RichText value={study.challenge}
                            style={{ ...sans, fontSize: 15, color: "rgba(255,255,255,.55)", fontWeight: 300, lineHeight: 1.75 }} />
                </div>
              </>
            )}
          </div>

          {/* RIGHT — white panel: sub-headline + full desc + first fold content + optional checklist */}
          <div style={{ padding: "clamp(52px,6vw,88px) clamp(36px,4vw,64px)", background: T.bg }}>

            {/* Sub-headline */}
            {study.foldOneSubheadline && (
              <div style={{ ...sans, fontSize: 11, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: T.purple, marginBottom: 24 }}>
                {study.foldOneSubheadline}
              </div>
            )}

            {/* Full description */}
            <RichText value={study.fullDesc}
                      style={{ ...sans, fontSize: 17, color: T.gray, fontWeight: 300, lineHeight: 1.8 }} />

            {/* First fold additional content */}
            {study.firstFoldContent && (
              <div style={{ marginTop: 28 }}>
                <RichText value={study.firstFoldContent}
                          style={{ ...sans, fontSize: 16, color: T.gray, fontWeight: 300, lineHeight: 1.78 }} />
              </div>
            )}

            {/* Optional: Execution Checklist */}
            {study.executionChecklist && study.executionChecklist.length > 0 && (
              <div style={{ marginTop: 40 }}>
                <div style={{ ...sans, fontSize: 10, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: T.purple, marginBottom: 20 }}>
                  Execution
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {study.executionChecklist.map((item, i) => (
                    <div key={i} className="flex items-start" style={{ gap: 20, padding: "14px 0", borderBottom: `1px solid ${T.border}` }}>
                      <span style={{ ...sans, fontSize: 11, fontWeight: 700, color: T.grayL, flexShrink: 0, minWidth: 22, marginTop: 2 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span style={{ ...sans, fontSize: 15, color: T.ink, fontWeight: 400, lineHeight: 1.55 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOLD 2 — Stats · Media Coverage
      ══════════════════════════════════════════════════════ */}
      {hasFold2 && (
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr]" style={{ minHeight: "60vh" }}>

            {/* LEFT — lavender panel: count + headline + subheadline + content */}
            <div style={{ background: "#eeeaf7", padding: "clamp(52px,6vw,88px) clamp(36px,4vw,56px)", display: "flex", flexDirection: "column" }}>

              {/* Big count */}
              {study.foldTwoCount && (
                <div style={{ ...serif, fontSize: "clamp(64px,8vw,100px)", color: "#0d0c10", fontWeight: 700, lineHeight: 0.9, marginBottom: 16 }}>
                  {study.foldTwoCount}
                </div>
              )}

              {/* Headline */}
              {study.foldTwoHeadline && (
                <div style={{ ...serif, fontSize: "clamp(20px,2.2vw,28px)", color: "#0d0c10", fontWeight: 500, lineHeight: 1.3, marginBottom: study.foldTwoSubheadline ? 10 : 28 }}>
                  {study.foldTwoHeadline}
                </div>
              )}

              {/* Subheadline */}
              {study.foldTwoSubheadline && (
                <p style={{ ...sans, fontSize: 14, color: "#4a4258", fontWeight: 300, lineHeight: 1.65, marginBottom: 28 }}>
                  {study.foldTwoSubheadline}
                </p>
              )}

              {/* Additional content */}
              {study.secondFoldContent && (
                <>
                  {(study.foldTwoCount || study.foldTwoHeadline) && (
                    <div style={{ height: 1, background: "rgba(108,60,224,.18)", marginBottom: 28 }} />
                  )}
                  <RichText value={study.secondFoldContent}
                            style={{ ...sans, fontSize: 15, color: "#4a4258", fontWeight: 300, lineHeight: 1.75 }} />
                </>
              )}

              {/* Category breakdown rows */}
              {study.foldTwoBreakdown && study.foldTwoBreakdown.length > 0 && (
                <div style={{ marginTop: 32, borderTop: "1px solid rgba(108,60,224,.18)", paddingTop: 8 }}>
                  {study.foldTwoBreakdown.map((row, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid rgba(108,60,224,.12)" }}>
                      <span style={{ ...sans, fontSize: 14, color: "#2d2540", fontWeight: 400 }}>{row.label}</span>
                      <span style={{ ...sans, fontSize: 15, color: "#6c3ce0", fontWeight: 700 }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT — media outlet cards */}
            <div style={{ padding: "clamp(52px,6vw,88px) clamp(36px,4vw,64px)", background: "#f6f3fc" }}>
              {study.mediaOutlets && study.mediaOutlets.length > 0 && (
                <>
                  <div style={{ ...sans, fontSize: 10, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "#6c3ce0", marginBottom: 28 }}>
                    Media Coverage
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16 }}>
                    {study.mediaOutlets.map((item, i) => (
                      <div key={i} style={{ background: "#fff", border: "1px solid #e5e2ec", borderRadius: 16, padding: "28px 28px 32px" }}>
                        <div style={{ ...serif, fontSize: "clamp(18px,1.8vw,22px)", color: "#0d0c10", fontWeight: 600, marginBottom: item.description ? 16 : 0, lineHeight: 1.2 }}>
                          {item.title}
                        </div>
                        {item.description && (
                          <p style={{ ...sans, fontSize: 13, color: "#6b6873", fontWeight: 300, lineHeight: 1.65, fontStyle: "italic", margin: 0 }}>
                            "{item.description}"
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

          </div>
        </section>
      )}

      {/* ── MORE WORK ── */}
      {others.length > 0 && (
        <section style={{ padding: "80px 0 120px", background: T.bgAlt }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 48 }}>
              <h2 style={{ ...serif, fontSize: "clamp(30px,3.6vw,46px)", color: T.ink }}>More Work</h2>
              <Link to="/work" style={{ ...sans, fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: T.purple, textDecoration: "none" }}>All Projects →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 28 }}>
              {others.map(item => <WorkCard key={item.slug} item={item} linkTo={`/work/${item.slug}`} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{ padding: "120px 0", background: T.bg }}>
        <div className="relative overflow-hidden text-center"
             style={{ margin: "0 32px", borderRadius: 32, padding: "clamp(60px,8vw,90px) clamp(28px,6vw,60px)", background: "linear-gradient(120deg, #1a0e3a, #6c3ce0 60%, #8b5cf6)" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "repeating-linear-gradient(115deg, rgba(255,255,255,.05) 0 2px, transparent 2px 30px)" }} />
          <div className="relative z-10" style={{ maxWidth: 680, margin: "0 auto" }}>
            <h2 style={{ ...serif, fontSize: "clamp(30px,3.6vw,46px)", color: "#fff", marginBottom: 18, lineHeight: 1.15 }}>Ready to be the next success story?</h2>
            <p style={{ ...sans, color: "#e9defe", fontWeight: 300, marginBottom: 40, fontSize: 16, lineHeight: 1.65 }}>
              Tell us about your brand and goals — and we'll show you exactly how we'd approach it.
            </p>
            <div className="flex flex-wrap justify-center" style={{ gap: 18 }}>
              <BtnPrimary to="/contact">Start a Conversation →</BtnPrimary>
              <BtnOutline to="/work" white>More Case Studies</BtnOutline>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
