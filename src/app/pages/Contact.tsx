import React, { useState } from "react";
import { useTheme, serif, sans } from "../theme";
import { useSiteSettings, useContactSettings } from "../../sanity/hooks";
import { PageHero, Eyebrow } from "../components";

const CONTACT_PHONE = "+91-9920-557-947";
const CONTACT_SOCIALS = [
  ["LinkedIn", "https://www.linkedin.com/company/runway-media-india/"],
  ["Instagram", "http://instagram.com/_runwaymedia/"],
] as const;

export function Contact() {
  const T = useTheme();
  const settings = useSiteSettings();
  const contact = useContactSettings();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", company: "", email: "", service: "", message: "" });

  const inputStyle: React.CSSProperties = {
    ...sans, width: "100%", padding: "14px 18px", fontSize: 15,
    background: T.isDark ? "#1a1728" : "#fff",
    border: `1px solid ${T.border}`,
    borderRadius: 10, color: T.ink, outline: "none",
    transition: "border-color .2s ease", boxSizing: "border-box",
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Unable to send your message. Please try again.");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send your message. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const serviceOptions = contact.serviceOptions?.length ? contact.serviceOptions : [
    "Media Relations", "Brand Strategy", "Crisis Communications",
    "Content & Thought Leadership", "Influencer & Partnerships",
    "Event & Launch PR", "Not sure yet",
  ];

  return (
    <div style={{ color: T.ink }}>
      <PageHero eyebrow={contact.heroEyebrow}
        heading={contact.heroHeadline}
        body={contact.heroBody} />

      <section style={{ padding: "0 0 120px", background: T.bg }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]"
             style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", gap: 80 }}>

          {/* Form */}
          <div>
            {submitted ? (
              <div style={{ padding: "60px 40px", background: T.isDark ? "#1a1728" : T.purpleP, border: `1px solid ${T.border}`, borderRadius: 20, textAlign: "center" }}>
                <div style={{ ...serif, fontSize: 48, marginBottom: 16 }}>✓</div>
                <h3 style={{ ...serif, fontSize: 28, color: T.ink, marginBottom: 12 }}>{contact.successHeadline}</h3>
                <p style={{ ...sans, fontSize: 15, color: T.gray, fontWeight: 300, lineHeight: 1.65 }}>{contact.successBody}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 20 }}>
                  {[
                    [contact.nameLabel, "text", contact.namePlaceholder, "name"],
                    [contact.companyLabel, "text", contact.companyPlaceholder, "company"],
                  ].map(([label, type, ph, key]) => (
                    <div key={key}>
                      <label style={{ ...sans, fontSize: 12, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: T.grayL, display: "block", marginBottom: 8 }}>{label}</label>
                      <input required={String(label).includes("*")} type={type} placeholder={ph}
                             value={(form as any)[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                             style={inputStyle}
                             onFocus={e => (e.currentTarget.style.borderColor = T.purple)}
                             onBlur={e => (e.currentTarget.style.borderColor = T.border)} />
                    </div>
                  ))}
                </div>

                <div>
                  <label style={{ ...sans, fontSize: 12, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: T.grayL, display: "block", marginBottom: 8 }}>{contact.emailLabel}</label>
                  <input required type="email" placeholder={contact.emailPlaceholder} value={form.email}
                         onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle}
                         onFocus={e => (e.currentTarget.style.borderColor = T.purple)}
                         onBlur={e => (e.currentTarget.style.borderColor = T.border)} />
                </div>

                <div>
                  <label style={{ ...sans, fontSize: 12, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: T.grayL, display: "block", marginBottom: 8 }}>{contact.serviceLabel}</label>
                  <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                          style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                          onFocus={e => (e.currentTarget.style.borderColor = T.purple)}
                          onBlur={e => (e.currentTarget.style.borderColor = T.border)}>
                    <option value="">{contact.servicePlaceholder}</option>
                    {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ ...sans, fontSize: 12, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: T.grayL, display: "block", marginBottom: 8 }}>{contact.messageLabel}</label>
                  <textarea required rows={6} placeholder={contact.messagePlaceholder}
                             value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                             style={{ ...inputStyle, resize: "vertical", minHeight: 140 }}
                             onFocus={e => (e.currentTarget.style.borderColor = T.purple)}
                             onBlur={e => (e.currentTarget.style.borderColor = T.border)} />
                </div>

                <div>
                  <button type="submit" disabled={sending}
                          style={{ ...sans, display: "inline-flex", alignItems: "center", gap: 10, background: T.purple, color: "#fff", padding: "16px 36px", fontSize: 14, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", borderRadius: 999, border: "none", cursor: sending ? "wait" : "pointer", transition: "all .3s ease", opacity: sending ? .7 : 1 }}
                          onMouseEnter={e => { if (!sending) { const el = e.currentTarget; el.style.background = T.purpleD; el.style.transform = "translateY(-2px)"; } }}
                          onMouseLeave={e => { const el = e.currentTarget; el.style.background = T.purple; el.style.transform = "none"; }}>
                    {sending ? "Sending…" : contact.submitLabel}
                  </button>
                  <p style={{ ...sans, fontSize: 12, color: T.grayL, marginTop: 12 }}>{contact.replyNote}</p>
                  {error && <p role="alert" style={{ ...sans, fontSize: 13, color: "#b42318", marginTop: 10 }}>{error}</p>}
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ paddingTop: 8 }}>
            <div style={{ marginBottom: 48 }}>
              <Eyebrow>{contact.contactInfoTitle}</Eyebrow>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {[
                  { label: "Email", value: settings.email, href: settings.email ? `mailto:${settings.email}` : null },
                  { label: "Phone", value: CONTACT_PHONE, href: `tel:${CONTACT_PHONE}` },
                  { label: "Office", value: settings.address, href: null },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ ...sans, fontSize: 11, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: T.grayL, marginBottom: 6 }}>{item.label}</div>
                    {item.href ? (
                      <a href={item.href} style={{ ...sans, fontSize: 15, color: T.ink, textDecoration: "none" }}
                         onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = T.purple)}
                         onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = T.ink)}>
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ ...sans, fontSize: 15, color: T.ink, margin: 0, whiteSpace: "pre-line" }}>{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: "32px", background: T.isDark ? "#1a1728" : T.purpleP, border: `1px solid ${T.border}`, borderRadius: 20 }}>
              <div style={{ ...sans, fontSize: 11, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: T.purple, marginBottom: 14 }}>{contact.officeHoursTitle}</div>
              <p style={{ ...sans, fontSize: 14.5, color: T.ink, lineHeight: 1.65, marginBottom: 6, whiteSpace: "pre-line" }}>Monday – Friday 10:00 AM – 7:00 PM IST</p>
            </div>

            <div style={{ marginTop: 32 }}>
              <div style={{ ...sans, fontSize: 11, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: T.grayL, marginBottom: 16 }}>{contact.followTitle}</div>
              <div className="flex" style={{ gap: 12 }}>
                {CONTACT_SOCIALS.map(([label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                     style={{ ...sans, fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: T.gray, textDecoration: "none", padding: "8px 16px", border: `1px solid ${T.border}`, borderRadius: 999, transition: "all .25s" }}
                     onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = T.purple; el.style.color = T.purple; }}
                     onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.gray; }}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
