import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "dist");
const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: false, limit: "50kb" }));

const CONTACT_RECIPIENTS = [
  "kapil@runwaymedia.co.in",
  "anagha@runwaymedia.co.in",
];

// Safe runtime check: reports only whether the required server-side
// configuration exists, never the secret values themselves.
app.get("/api/contact-status", (_req, res) => {
  res.status(200).json({
    resendApiKeyConfigured: Boolean(process.env.RESEND_API_KEY),
    contactFromEmailConfigured: Boolean(process.env.CONTACT_FROM_EMAIL),
  });
});

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

app.post("/api/contact", async (req, res) => {
  const { name = "", company = "", email = "", service = "", message = "" } = req.body || {};

  // Honeypot for simple bot protection. Real visitors never see/send this field.
  if (req.body?.website) return res.status(200).json({ ok: true });

  if (!name.trim() || !email.trim() || !message.trim()) {
    return res.status(400).json({ error: "Please complete all required fields." });
  }

  if (name.length > 120 || company.length > 160 || email.length > 254 || service.length > 120 || message.length > 5000) {
    return res.status(400).json({ error: "One or more fields are too long." });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.trim())) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    console.error("Contact email is not configured: RESEND_API_KEY or CONTACT_FROM_EMAIL is missing.");
    return res.status(503).json({ error: "The contact form is temporarily unavailable. Please email us directly." });
  }

  const safeName = escapeHtml(name.trim());
  const safeCompany = escapeHtml(company.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeService = escapeHtml(service.trim() || "Not specified");
  const safeMessage = escapeHtml(message.trim()).replaceAll("\n", "<br>");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: CONTACT_RECIPIENTS,
        reply_to: email.trim(),
        subject: `Runway Media — New enquiry from ${name.trim()}`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#222">
            <h2>New enquiry from the Runway Media website</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Company:</strong> ${safeCompany || "Not provided"}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Service interest:</strong> ${safeService}</p>
            <p><strong>Message:</strong></p>
            <p>${safeMessage}</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Resend error:", response.status, details);
      return res.status(502).json({ error: "We couldn't send your message right now. Please try again or email us directly." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact email request failed:", error);
    return res.status(502).json({ error: "We couldn't send your message right now. Please try again or email us directly." });
  }
});

app.use(express.static(distPath));

// React Router SPA fallback: serve index.html for application routes.
app.get("*splat", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Runway Media server listening on port ${port}`);
});
