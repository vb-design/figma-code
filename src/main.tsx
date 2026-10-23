import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import App from "./app/App.tsx";
import "./styles/index.css";

// Compatibility value for the homepage case-study indicator.
// The component currently references T_PURPLE; keep the existing visual
// treatment without changing the page layout or CMS/schema behavior.
(globalThis as any).T_PURPLE = "#9b6dff";

// The homepage logo marquee repeats the same set three times. Because the
// flex gap also creates spacing between the repeated sets, translating by
// exactly one third of the full track leaves a small jump at the loop point.
// Keep the existing component/layout intact and correct only the loop offset.
const logoMarqueeStyle = document.createElement("style");
logoMarqueeStyle.textContent = `
  @keyframes logoScrollFixed {
    0%   { transform: translateX(0); }
    100% { transform: translateX(calc(-100% / 3 - 42.6667px)); }
  }
  div[style*="logoScroll"] {
    animation-name: logoScrollFixed !important;
  }
`;
document.head.appendChild(logoMarqueeStyle);

function AppWithHomepageEnhancements() {
  useEffect(() => {
    let cleanup: (() => void) | null = null;

    const enhanceTestimonials = () => {
      // Find the homepage testimonial grid without relying on CSS selector
      // escaping for Tailwind's `lg:grid-cols-3` class.
      const grids = Array.from(document.querySelectorAll<HTMLElement>("div"));
      const grid = grids.find(el => {
        if (!el.classList.contains("grid-cols-1") || !el.classList.contains("lg:grid-cols-3")) return false;
        const section = el.closest("section");
        return (section?.innerText ?? "").includes("Client Voices");
      });

      if (!grid || grid.dataset.runwayTestimonials === "true") return;

      const cards = Array.from(grid.children) as HTMLElement[];
      if (cards.length <= 1) return;

      grid.dataset.runwayTestimonials = "true";
      grid.classList.add("runway-testimonials-carousel");
      grid.setAttribute("role", "region");
      grid.setAttribute("aria-label", "Client testimonials");
      grid.setAttribute("tabindex", "0");

      cards.forEach(card => {
        card.setAttribute("role", "group");
        card.setAttribute("aria-roledescription", "slide");
      });

      const controls = document.createElement("div");
      controls.className = "runway-testimonials-controls";
      controls.setAttribute("aria-label", "Testimonial navigation");

      const makeButton = (label: string, symbol: string) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "runway-testimonials-arrow";
        button.setAttribute("aria-label", label);
        button.textContent = symbol;
        return button;
      };

      const previous = makeButton("Previous testimonial", "←");
      const next = makeButton("Next testimonial", "→");
      const dots = document.createElement("div");
      dots.className = "runway-testimonials-dots";
      dots.setAttribute("role", "tablist");
      dots.setAttribute("aria-label", "Choose testimonial");

      let activeIndex = 0;
      const updateActive = (index: number, smooth = true) => {
        activeIndex = Math.max(0, Math.min(index, cards.length - 1));
        const target = cards[activeIndex];
        if (target) {
          grid.scrollTo({ left: target.offsetLeft, behavior: smooth ? "smooth" : "auto" });
        }
        Array.from(dots.children).forEach((dot, i) => {
          const button = dot as HTMLButtonElement;
          button.setAttribute("aria-selected", String(i === activeIndex));
          button.classList.toggle("is-active", i === activeIndex);
        });
        previous.disabled = activeIndex === 0;
        next.disabled = activeIndex === cards.length - 1;
      };

      cards.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "runway-testimonials-dot";
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", `Show testimonial ${index + 1}`);
        dot.addEventListener("click", () => updateActive(index));
        dots.appendChild(dot);
      });

      previous.addEventListener("click", () => updateActive(activeIndex - 1));
      next.addEventListener("click", () => updateActive(activeIndex + 1));

      let scrollTimer: number | undefined;
      const onScroll = () => {
        window.clearTimeout(scrollTimer);
        scrollTimer = window.setTimeout(() => {
          const nearest = cards.reduce((best, card, index) => {
            const bestDistance = Math.abs(cards[best].offsetLeft - grid.scrollLeft);
            const distance = Math.abs(card.offsetLeft - grid.scrollLeft);
            return distance < bestDistance ? index : best;
          }, 0);
          updateActive(nearest, false);
        }, 80);
      };
      grid.addEventListener("scroll", onScroll, { passive: true });

      controls.append(previous, dots, next);
      grid.parentElement?.insertBefore(controls, grid.nextSibling);
      updateActive(0, false);

      cleanup = () => {
        grid.removeEventListener("scroll", onScroll);
        window.clearTimeout(scrollTimer);
        controls.remove();
        grid.classList.remove("runway-testimonials-carousel");
        delete grid.dataset.runwayTestimonials;
      };
    };

    enhanceTestimonials();
    const observer = new MutationObserver(() => {
      // Let React finish its render before looking for the testimonial grid.
      window.requestAnimationFrame(enhanceTestimonials);
    });
    const root = document.getElementById("root");
    if (root) observer.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanup?.();
    };
  }, []);

  return <App />;
}

createRoot(document.getElementById("root")!).render(<AppWithHomepageEnhancements />);
