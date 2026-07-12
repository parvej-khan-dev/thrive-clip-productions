"use client";

import { useState, type CSSProperties } from "react";
import { Reveal } from "@/components/reveal";
import { CheckIcon } from "@/components/icons";
import { CONTACT } from "@/lib/data";

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: boolean;
  email?: boolean;
  message?: boolean;
}

const baseInput: CSSProperties = {
  width: "100%",
  padding: "15px 18px",
  borderRadius: 13,
  background: "rgba(244,239,231,.04)",
  color: "#F4EFE7",
  fontFamily: "inherit",
  fontSize: 15,
  transition: "border-color .25s ease",
};

const errorText: CSSProperties = {
  fontSize: 12,
  color: "#e5765a",
  marginTop: 6,
  paddingLeft: 4,
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const [sentName, setSentName] = useState("");

  const setField = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((er) => ({ ...er, [key]: false }));
  };

  const submit = () => {
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) nextErrors.name = true;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) nextErrors.email = true;
    if (!form.message.trim()) nextErrors.message = true;
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setSentName(form.name.split(" ")[0]);
    setSent(true);
  };

  return (
    <section
      id="contact"
      style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "clamp(60px,8vw,120px) clamp(18px,5vw,52px)" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "clamp(40px,6vw,80px)" }}>
        <Reveal>
          <div style={{ fontSize: 12.5, letterSpacing: ".2em", textTransform: "uppercase", color: "#E0A65A", marginBottom: 16 }}>
            / Get in touch
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(34px,5vw,60px)", lineHeight: 1.03, margin: "0 0 30px" }}>
            Tell us what you&rsquo;re building
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div>
              <div style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(244,239,231,.45)", marginBottom: 8 }}>
                Call us
              </div>
              {CONTACT.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/\s+/g, "")}`}
                  data-cursor="lg"
                  style={{ display: "block", fontSize: 17, color: "#F4EFE7", textDecoration: "none" }}
                >
                  {p}
                </a>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(244,239,231,.45)", marginBottom: 8 }}>
                Email
              </div>
              <a
                href={`mailto:${CONTACT.email}`}
                data-cursor="lg"
                style={{ fontSize: 17, color: "#F4EFE7", textDecoration: "none" }}
              >
                {CONTACT.email}
              </a>
            </div>
            <div>
              <div style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(244,239,231,.45)", marginBottom: 8 }}>
                Studio
              </div>
              <a
                href={CONTACT.mapUrl}
                data-cursor="lg"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 17, color: "#F4EFE7", lineHeight: 1.5, textDecoration: "none" }}
              >
                {CONTACT.address[0]}
                <br />
                {CONTACT.address[1]}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={100}
          style={{
            position: "relative",
            borderRadius: 24,
            background: "linear-gradient(180deg,rgba(244,239,231,.045),rgba(244,239,231,.012))",
            border: "1px solid rgba(244,239,231,.1)",
            padding: "clamp(28px,4vw,44px)",
          }}
        >
          {!sent ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <input
                  value={form.name}
                  onChange={setField("name")}
                  placeholder="Your name"
                  style={{ ...baseInput, border: `1px solid ${errors.name ? "#e5765a" : "rgba(244,239,231,.14)"}` }}
                />
                {errors.name && <div style={errorText}>Please enter your name</div>}
              </div>
              <div>
                <input
                  value={form.email}
                  onChange={setField("email")}
                  placeholder="Email address"
                  style={{ ...baseInput, border: `1px solid ${errors.email ? "#e5765a" : "rgba(244,239,231,.14)"}` }}
                />
                {errors.email && <div style={errorText}>Enter a valid email</div>}
              </div>
              <input
                value={form.company}
                onChange={setField("company")}
                placeholder="Company / channel (optional)"
                style={{ ...baseInput, border: "1px solid rgba(244,239,231,.14)" }}
              />
              <div>
                <textarea
                  value={form.message}
                  onChange={setField("message")}
                  placeholder="Tell us about your goals…"
                  rows={4}
                  style={{
                    ...baseInput,
                    resize: "vertical",
                    minHeight: 110,
                    border: `1px solid ${errors.message ? "#e5765a" : "rgba(244,239,231,.14)"}`,
                  }}
                />
                {errors.message && <div style={errorText}>Add a short message</div>}
              </div>
              <button
                data-cursor="lg"
                onClick={submit}
                className="tc-submit-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 9,
                  padding: "16px 28px",
                  borderRadius: 100,
                  background: "linear-gradient(135deg,#E0A65A,#F0D3A0)",
                  color: "#0A0908",
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: "inherit",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 10px 34px rgba(224,166,90,.3)",
                }}
              >
                Send message →
              </button>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 10px", animation: "tcRise .6s both" }}>
              <div
                style={{
                  width: 70,
                  height: 70,
                  margin: "0 auto 24px",
                  borderRadius: "50%",
                  background: "rgba(95,208,138,.15)",
                  border: "1px solid rgba(95,208,138,.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckIcon size={44} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 28, margin: "0 0 10px" }}>Message sent</h3>
              <p style={{ fontSize: 15, color: "rgba(244,239,231,.6)", margin: 0, lineHeight: 1.6 }}>
                Thanks {sentName} — we&rsquo;ll reply within one business day.
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
