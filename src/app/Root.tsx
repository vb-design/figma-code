import React, { useState } from "react";
import { Outlet } from "react-router";
import { lightTheme, darkTheme, ThemeCtx, sans } from "./theme";
import { SharedNav } from "./components";
import { SanityFooter } from "./SanityFooter";
import { isConfigured } from "../sanity/client";

// Lazy-loaded spec view
import { FigmaSpec } from "./pages/FigmaSpec";

export function Root() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSpec, setShowSpec] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeCtx.Provider value={theme}>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: theme.bg, transition: "background .4s ease, color .4s ease" }}>
        {showSpec ? (
          <FigmaSpec />
        ) : (
          <>
            {!isConfigured && <CmsBanner />}
            <SharedNav />
            <main style={{ flex: 1 }}>
              <Outlet />
            </main>
            <SanityFooter />
          </>
        )}

        {/* Floating controls */}
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
          {!showSpec && (
            <FloatBtn
              onClick={() => setDarkMode(!darkMode)}
              bg={darkMode ? "#ede9f8" : "#0d0c10"}
              color={darkMode ? "#0d0c10" : "#fff"}
              shadow={darkMode ? "0 8px 24px rgba(237,233,248,.25)" : "0 8px 24px rgba(13,12,16,.35)"}
            >
              {darkMode ? "☀ Light" : "◑ Dark"}
            </FloatBtn>
          )}
        </div>
      </div>
    </ThemeCtx.Provider>
  );
}

function CmsBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9998, background: "#1c1040", borderBottom: "1px solid rgba(155,109,255,.3)", padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 14 }}>🔌</span>
        <span style={{ ...sans, fontSize: 12, color: "rgba(255,255,255,.75)", fontWeight: 500 }}>
          <strong style={{ color: "#9b6dff" }}>Sanity CMS not connected.</strong>
          {" "}Set <code style={{ background: "rgba(155,109,255,.15)", padding: "1px 6px", borderRadius: 4, fontSize: 11 }}>VITE_SANITY_PROJECT_ID</code> in your environment to enable live editing. Showing static fallback data.
        </span>
      </div>
      <a href="https://sanity.io" target="_blank" rel="noreferrer"
         style={{ ...sans, fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#9b6dff", textDecoration: "none", whiteSpace: "nowrap" }}>
        Create free project →
      </a>
      <button onClick={() => setDismissed(true)}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,.4)", cursor: "pointer", fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
    </div>
  );
}

function FloatBtn({ children, onClick, bg, color, shadow }: { children: React.ReactNode; onClick: () => void; bg: string; color: string; shadow: string }) {
  return (
    <button onClick={onClick} style={{ ...sans, background: bg, color, border: "none", borderRadius: 999, padding: "12px 20px", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", cursor: "pointer", boxShadow: shadow, display: "flex", alignItems: "center", gap: 8, transition: "all .25s ease" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = "translateY(-2px)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = "none")}>
      {children}
    </button>
  );
}
