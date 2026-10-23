import React from "react";
import { lightTheme, serif, sans } from "../theme";

const P = lightTheme.purple;
const INK = "#0d0c10";
const GRAY = "#6b6873";
const GRAY_L = "#9c99a3";
const LINE = "#ece9f2";
const PP = "#f3eefd";
const PD = "#4b21b3";

const ANIM_ROWS = [
  { comp: "Button / Primary",   trigger: "While Hovering",   prop: "background",   from: "#6c3ce0",       to: "#4b21b3",                              dur: "300ms" },
  { comp: "Button / Primary",   trigger: "While Hovering",   prop: "transform",    from: "translateY(0)", to: "translateY(−2px)",                     dur: "300ms" },
  { comp: "Button / Primary",   trigger: "While Hovering",   prop: "box-shadow",   from: "none",          to: "0 14px 30px −10px rgba(108,60,224,.55)",dur: "300ms" },
  { comp: "Button / Outline",   trigger: "While Hovering",   prop: "background",   from: "transparent",   to: "#0d0c10",                              dur: "300ms" },
  { comp: "Button / Outline",   trigger: "While Hovering",   prop: "color",        from: "#0d0c10",       to: "#ffffff",                              dur: "300ms" },
  { comp: "Nav Link",           trigger: "While Hovering",   prop: "::after width",from: "0%",            to: "100%",                                 dur: "300ms" },
  { comp: "Header",             trigger: "On Scroll > 10px", prop: "box-shadow",   from: "none",          to: "0 2px 12px rgba(0,0,0,.07)",           dur: "300ms" },
  { comp: "Service Card",       trigger: "While Hovering",   prop: "background",   from: "#ffffff",       to: "#0d0c10 / #9b6dff (dark mode)",        dur: "350ms" },
  { comp: "Service Card",       trigger: "While Hovering",   prop: "transform",    from: "translateY(0)", to: "translateY(−6px)",                     dur: "350ms" },
  { comp: "Service Card",       trigger: "While Hovering",   prop: "box-shadow",   from: "none",          to: "0 24px 50px −22px rgba(13,12,16,.35)", dur: "350ms" },
  { comp: "Service Card",       trigger: "While Hovering",   prop: "text colors",  from: "dark",          to: "white (3 props)",                      dur: "300ms" },
  { comp: "Work Card",          trigger: "While Hovering",   prop: "transform",    from: "translateY(0)", to: "translateY(−6px)",                     dur: "350ms" },
  { comp: "Work Card",          trigger: "While Hovering",   prop: "box-shadow",   from: "none",          to: "0 26px 50px −22px rgba(13,12,16,.25)", dur: "350ms" },
  { comp: "Work Card Arrow",    trigger: "While Hovering",   prop: "rotate",       from: "0deg",          to: "45deg",                                dur: "300ms" },
  { comp: "Social Icon",        trigger: "While Hovering",   prop: "background",   from: "transparent",   to: "#6c3ce0",                              dur: "300ms" },
  { comp: "Footer Link",        trigger: "While Hovering",   prop: "color",        from: "#6b6873",       to: "#6c3ce0",                              dur: "250ms" },
  { comp: "Stats Bar",          trigger: "Static",           prop: "—",            from: "—",             to: "gradient + grid texture",              dur: "—" },
];

const COLORS = [
  { name: "Purple",       hex: "#6c3ce0", var: "--primary",          usage: "Buttons, links, accents" },
  { name: "Purple Deep",  hex: "#4b21b3", var: "—",                  usage: "Button hover, CTA gradient start" },
  { name: "Purple Pale",  hex: "#f3eefd", var: "--muted",            usage: "Work section bg, about marks" },
  { name: "Ink",          hex: "#0d0c10", var: "--foreground",       usage: "Headlines, dark surfaces" },
  { name: "Gray",         hex: "#6b6873", var: "--muted-foreground", usage: "Body text, descriptions" },
  { name: "Line",         hex: "#ece9f2", var: "--border",           usage: "Borders, dividers" },
  { name: "White",        hex: "#ffffff", var: "--background",       usage: "Page background" },
  { name: "Dark BG",      hex: "#0f0d17", var: "—",                  usage: "Dark mode background" },
  { name: "Dark Card",    hex: "#1a1728", var: "—",                  usage: "Dark mode card surfaces" },
  { name: "Purple Light", hex: "#9b6dff", var: "—",                  usage: "Dark mode primary purple" },
  { name: "Stats Grad L", hex: "#06040d", var: "—",                  usage: "Stats bar gradient edge" },
  { name: "Stats Grad C", hex: "#1c1040", var: "—",                  usage: "Stats bar gradient center" },
];

// Frozen state renderers
const F = {
  BtnPrimary: ({ h }: { h: boolean }) => (
    <div style={{ ...sans, display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", borderRadius: 999, background: h ? PD : P, color: "#fff", fontSize: 13, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", transform: h ? "translateY(-2px)" : "none", boxShadow: h ? "0 14px 30px -10px rgba(108,60,224,.55)" : "none", userSelect: "none" }}>
      Book a Call →
    </div>
  ),
  BtnOutline: ({ h }: { h: boolean }) => (
    <div style={{ ...sans, display: "inline-flex", padding: "14px 28px", borderRadius: 999, background: h ? INK : "transparent", color: h ? "#fff" : INK, border: `1px solid ${INK}`, fontSize: 13, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", userSelect: "none" }}>
      View Our Work
    </div>
  ),
  NavLink: ({ h }: { h: boolean }) => (
    <div style={{ paddingBottom: 4, position: "relative", display: "inline-block" }}>
      <span style={{ ...sans, fontSize: 13, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: INK }}>Services</span>
      <div style={{ position: "absolute", left: 0, bottom: 0, height: 2, background: P, width: h ? "100%" : "0%", transition: "width .3s ease" }} />
    </div>
  ),
  ServiceCard: ({ h }: { h: boolean }) => (
    <div style={{ border: `1px solid ${h ? "transparent" : LINE}`, borderRadius: 16, padding: "28px 24px", background: h ? INK : "#fff", transform: h ? "translateY(-5px)" : "none", boxShadow: h ? "0 20px 40px -18px rgba(13,12,16,.35)" : "none", width: 210, userSelect: "none" }}>
      <span style={{ ...sans, fontSize: 12, color: h ? "#a87cff" : P, fontWeight: 700, display: "block", marginBottom: 14 }}>01</span>
      <h3 style={{ ...serif, fontSize: 17, color: h ? "#fff" : INK, marginBottom: 8, lineHeight: 1.2 }}>Media Relations</h3>
      <p style={{ ...sans, fontSize: 12, color: h ? "#c9c4d6" : GRAY, fontWeight: 300, lineHeight: 1.55 }}>Building press relationships.</p>
    </div>
  ),
  ServiceCardDark: ({ h }: { h: boolean }) => (
    <div style={{ border: `1px solid ${h ? "transparent" : "#252030"}`, borderRadius: 16, padding: "28px 24px", background: h ? "#9b6dff" : "#1a1728", transform: h ? "translateY(-5px)" : "none", width: 210, userSelect: "none" }}>
      <span style={{ ...sans, fontSize: 12, color: h ? "#f0e8ff" : "#9b6dff", fontWeight: 700, display: "block", marginBottom: 14 }}>01</span>
      <h3 style={{ ...serif, fontSize: 17, color: "#ede9f8", marginBottom: 8, lineHeight: 1.2 }}>Media Relations</h3>
      <p style={{ ...sans, fontSize: 12, color: h ? "rgba(255,255,255,.72)" : "#a39db0", fontWeight: 300, lineHeight: 1.55 }}>Building press relationships.</p>
    </div>
  ),
  WorkCard: ({ h }: { h: boolean }) => (
    <div style={{ borderRadius: 18, overflow: "hidden", background: "#fff", border: `1px solid ${LINE}`, transform: h ? "translateY(-5px)" : "none", boxShadow: h ? "0 20px 40px -18px rgba(13,12,16,.25)" : "none", width: 220, userSelect: "none" }}>
      <div style={{ aspectRatio: "16/10", background: `linear-gradient(135deg, ${INK}, ${PD})`, padding: 14, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <span style={{ ...sans, fontSize: 9, color: "#fff", background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.25)", padding: "4px 8px", borderRadius: 999 }}>Fintech</span>
        <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#fff", color: INK, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", transform: h ? "rotate(45deg)" : "none" }}>↗</span>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <h3 style={{ ...serif, fontSize: 16, color: INK, marginBottom: 4 }}>Northbeam</h3>
        <p style={{ ...sans, fontSize: 11, color: GRAY, fontWeight: 300 }}>Covered across 40+ outlets.</p>
      </div>
    </div>
  ),
  SocialIcon: ({ h }: { h: boolean }) => (
    <div style={{ width: 40, height: 40, borderRadius: "50%", border: `1px solid ${h ? P : LINE}`, background: h ? P : "transparent", display: "flex", alignItems: "center", justifyContent: "center", ...sans, fontSize: 12, color: h ? "#fff" : INK, userSelect: "none" }}>in</div>
  ),
};

function CompRow({ name, figma, trigger, note, def, hov }: { name: string; figma: string; trigger: string; note?: string; def: React.ReactNode; hov: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
      <div style={{ background: "#faf9fe", borderBottom: `1px solid ${LINE}`, padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <div>
          <span style={{ ...sans, fontSize: 13, fontWeight: 700, color: INK }}>{name}</span>
          <span style={{ ...sans, fontSize: 10, color: P, background: PP, padding: "2px 8px", borderRadius: 999, marginLeft: 10 }}>{figma}</span>
        </div>
        <span style={{ ...sans, fontSize: 10, fontWeight: 600, color: "#fff", background: INK, padding: "3px 10px", borderRadius: 999 }}>{trigger}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 40px 1fr", alignItems: "center", padding: "24px 20px" }}>
        <div>
          <div style={{ ...sans, fontSize: 9, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: GRAY_L, marginBottom: 14 }}>Default</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 0" }}>{def}</div>
        </div>
        <div style={{ textAlign: "center", fontSize: 18, color: GRAY_L }}>→</div>
        <div>
          <div style={{ ...sans, fontSize: 9, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: P, marginBottom: 14 }}>Hover</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 0" }}>{hov}</div>
        </div>
      </div>
      {note && <div style={{ borderTop: `1px solid ${LINE}`, padding: "10px 20px", ...sans, fontSize: 11, color: GRAY, background: "#fdfcff" }}>ℹ️ {note}</div>}
    </div>
  );
}

export function FigmaSpec() {
  return (
    <div style={{ background: "#f7f5fd", minHeight: "100vh", ...sans }}>
      {/* Top bar */}
      <div style={{ background: INK, padding: "0 40px", position: "sticky", top: 0, zIndex: 10, borderBottom: "1px solid rgba(255,255,255,.07)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div>
            <div style={{ ...sans, fontSize: 10, color: "#b794ff", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 2 }}>Figma Handoff · Runway Media</div>
            <div style={{ ...serif, fontSize: 18, fontWeight: 600, color: "#fff" }}>Interaction Specs</div>
          </div>
          <div style={{ ...sans, fontSize: 11, color: "#a87cff" }}>{ANIM_ROWS.length} interactions · 8 components</div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "52px 40px 120px" }}>

        {/* Colors */}
        <div style={{ marginBottom: 72 }}>
          <div className="flex items-center" style={{ gap: 12, marginBottom: 28 }}>
            <div style={{ width: 4, height: 28, background: P, borderRadius: 2 }} />
            <h2 style={{ ...serif, fontSize: 22, color: INK, fontWeight: 600 }}>01 — Color Tokens</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))", gap: 10 }}>
            {COLORS.map(c => (
              <div key={c.hex} style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 10, overflow: "hidden" }}>
                <div style={{ height: 48, background: c.hex }} />
                <div style={{ padding: "10px 12px" }}>
                  <div style={{ ...sans, fontSize: 11, fontWeight: 700, color: INK, marginBottom: 2 }}>{c.name}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: P, marginBottom: 4 }}>{c.hex}</div>
                  <div style={{ ...sans, fontSize: 9, color: GRAY_L, lineHeight: 1.4 }}>{c.usage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Animation Table */}
        <div style={{ marginBottom: 72 }}>
          <div className="flex items-center" style={{ gap: 12, marginBottom: 28 }}>
            <div style={{ width: 4, height: 28, background: P, borderRadius: 2 }} />
            <h2 style={{ ...serif, fontSize: 22, color: INK, fontWeight: 600 }}>02 — Animation Reference</h2>
          </div>
          <div style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 14, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.4fr 1.2fr 1.5fr 1.8fr .7fr", background: INK, padding: "11px 18px", gap: 8 }}>
              {["Component","Trigger","Property","From","To","Dur"].map(h => (
                <div key={h} style={{ ...sans, fontSize: 9, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.38)" }}>{h}</div>
              ))}
            </div>
            {ANIM_ROWS.map((r, i) => {
              const first = i === 0 || ANIM_ROWS[i-1].comp !== r.comp;
              return (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1.8fr 1.4fr 1.2fr 1.5fr 1.8fr .7fr", padding: "9px 18px", gap: 8, borderBottom: `1px solid ${LINE}`, alignItems: "center", background: first ? "#fdfcff" : "#fff" }}>
                  <div style={{ ...sans, fontSize: 11, fontWeight: first ? 700 : 400, color: first ? P : GRAY }}>{first ? r.comp : ""}</div>
                  <div style={{ ...sans, fontSize: 9, fontWeight: 600, color: r.trigger.startsWith("On") ? "#e67e22" : "#27ae60", background: r.trigger.startsWith("On") ? "#fff8f0" : "#f0faf5", padding: "2px 7px", borderRadius: 4, display: "inline-block" }}>{r.trigger}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: INK, fontWeight: 600 }}>{r.prop}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: GRAY_L }}>{r.from}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: P, fontWeight: 600 }}>{r.to}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: INK, fontWeight: 700 }}>{r.dur}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Components */}
        <div>
          <div className="flex items-center" style={{ gap: 12, marginBottom: 28 }}>
            <div style={{ width: 4, height: 28, background: P, borderRadius: 2 }} />
            <h2 style={{ ...serif, fontSize: 22, color: INK, fontWeight: 600 }}>03 — Component States</h2>
          </div>

          <div style={{ ...sans, fontSize: 10, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: GRAY_L, marginBottom: 12 }}>Buttons</div>
          <CompRow name="Button / Primary" figma="Components/Button · Type=Primary" trigger="While Hovering"
            note="bg #6c3ce0→#4b21b3 · translateY −2px · shadow appears. 300ms ease."
            def={<F.BtnPrimary h={false} />} hov={<F.BtnPrimary h={true} />} />
          <CompRow name="Button / Outline" figma="Components/Button · Type=Outline" trigger="While Hovering"
            note="bg transparent→#0d0c10 · color dark→white. 300ms ease."
            def={<F.BtnOutline h={false} />} hov={<F.BtnOutline h={true} />} />

          <div style={{ ...sans, fontSize: 10, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: GRAY_L, marginBottom: 12, marginTop: 28 }}>Navigation</div>
          <CompRow name="Nav Link" figma="Components/NavLink · State=Default|Hover" trigger="While Hovering"
            note="Purple underline (2px) width 0→100% from left. Smart Animate 300ms ease."
            def={<F.NavLink h={false} />} hov={<F.NavLink h={true} />} />

          <div style={{ ...sans, fontSize: 10, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: GRAY_L, marginBottom: 12, marginTop: 28 }}>Cards — Light Mode</div>
          <CompRow name="Service Card (Light)" figma="Components/ServiceCard · Theme=Light" trigger="While Hovering"
            note="5 props via Smart Animate 350ms ease. bg white→#0d0c10."
            def={<F.ServiceCard h={false} />} hov={<F.ServiceCard h={true} />} />
          <CompRow name="Work Card" figma="Components/WorkCard" trigger="While Hovering"
            note="translateY −6px · shadow · arrow rotates 45deg. 350ms / arrow 300ms."
            def={<F.WorkCard h={false} />} hov={<F.WorkCard h={true} />} />

          <div style={{ ...sans, fontSize: 10, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: GRAY_L, marginBottom: 12, marginTop: 28 }}>Cards — Dark Mode</div>
          <CompRow name="Service Card (Dark)" figma="Components/ServiceCard · Theme=Dark" trigger="While Hovering"
            note="Dark mode hover uses bright purple (#9b6dff) instead of black — inverted treatment."
            def={<F.ServiceCardDark h={false} />} hov={<F.ServiceCardDark h={true} />} />

          <div style={{ ...sans, fontSize: 10, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: GRAY_L, marginBottom: 12, marginTop: 28 }}>Footer</div>
          <CompRow name="Social Icon" figma="Components/SocialIcon" trigger="While Hovering"
            note="bg transparent→#6c3ce0 · border + text changes. 300ms ease."
            def={<F.SocialIcon h={false} />} hov={<F.SocialIcon h={true} />} />
        </div>
      </div>
    </div>
  );
}
