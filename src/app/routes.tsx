import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Work } from "./pages/Work";
import { CaseStudy } from "./pages/CaseStudy";
import { About } from "./pages/About";
import { Clients } from "./pages/Clients";
import { Contact } from "./pages/Contact";

function NotFound() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, fontFamily: "'Montserrat', sans-serif" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 80, color: "#ece9f2", lineHeight: 1 }}>404</div>
      <p style={{ fontSize: 16, color: "#6b6873" }}>Page not found.</p>
      <a href="/" style={{ fontSize: 13, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "#6c3ce0", textDecoration: "none" }}>← Back Home</a>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true,         Component: Home      },
      { path: "services",    Component: Services  },
      { path: "work",        Component: Work      },
      { path: "work/:slug",  Component: CaseStudy },
      { path: "about",       Component: About     },
      { path: "clients",     Component: Clients   },
      { path: "contact",     Component: Contact   },
      { path: "*",           Component: NotFound  },
    ],
  },
]);
