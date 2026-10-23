import React, { createContext, useContext } from "react";

export const lightTheme = {
  bg: "#ffffff",
  bgAlt: "#f3eefd",
  bgDark: "#0d0c10",
  card: "#ffffff",
  border: "#ece9f2",
  ink: "#0d0c10",
  gray: "#6b6873",
  grayL: "#9c99a3",
  purple: "#6c3ce0",
  purpleD: "#4b21b3",
  purpleP: "#f3eefd",
  navBg: "rgba(255,255,255,.87)",
  navBorder: "#ece9f2",
  heroBlob: "rgba(108,60,224,.16)",
  heroGrad:
    "linear-gradient(155deg, #0d0c10 0%, #2a2335 55%, #4b21b3 100%)",
  badgeBg: "#ffffff",
  badgeShadow: "0 18px 40px -16px rgba(0,0,0,.40)",
  scrollShadow: "0 2px 12px rgba(0,0,0,.07)",
  hoverBg: "#0d0c10",
  hoverText: "#ffffff",
  hoverNum: "#a87cff",
  hoverBody: "#c9c4d6",
  hoverBorder: "transparent",
  hoverShadow: "0 24px 50px -22px rgba(13,12,16,.35)",
  workShadow: "0 26px 50px -22px rgba(13,12,16,.25)",
  darkCardBg: "rgba(255,255,255,.04)",
  darkCardBorder: "rgba(255,255,255,.12)",
  logoInvert: "none",
  isDark: false,
} as const;

export const darkTheme = {
  bg: "#0f0d17",
  bgAlt: "#140f22",
  bgDark: "#07060d",
  card: "#1a1728",
  border: "#252030",
  ink: "#ede9f8",
  gray: "#a39db0",
  grayL: "#5c576a",
  purple: "#9b6dff",
  purpleD: "#7c4be8",
  purpleP: "#1c1530",
  navBg: "rgba(15,13,23,.92)",
  navBorder: "rgba(255,255,255,.06)",
  heroBlob: "rgba(155,109,255,.22)",
  heroGrad:
    "linear-gradient(155deg, #1c1a2e 0%, #2d2448 55%, #5a35d0 100%)",
  badgeBg: "#1a1728",
  badgeShadow: "0 18px 40px -16px rgba(0,0,0,.80)",
  scrollShadow: "0 2px 12px rgba(0,0,0,.55)",
  hoverBg: "#9b6dff",
  hoverText: "#ffffff",
  hoverNum: "#f0e8ff",
  hoverBody: "rgba(255,255,255,.72)",
  hoverBorder: "transparent",
  hoverShadow: "0 24px 50px -22px rgba(0,0,0,.65)",
  workShadow: "0 26px 50px -22px rgba(0,0,0,.65)",
  darkCardBg: "rgba(255,255,255,.03)",
  darkCardBorder: "rgba(255,255,255,.09)",
  logoInvert: "brightness(0) invert(1)",
  isDark: true,
} as const;

export type AppTheme = typeof lightTheme;
export const ThemeCtx = createContext<AppTheme>(lightTheme);
export const useTheme = () => useContext(ThemeCtx);
export const serif: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
};
export const sans: React.CSSProperties = {
  fontFamily: "'Montserrat', -apple-system, sans-serif",
};