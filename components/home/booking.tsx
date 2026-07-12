"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/reveal";
import { CheckIcon, ClockIcon } from "@/components/icons";
import { BOOKING_PERKS } from "@/lib/data";

type SlotsByDate = Record<string, string[]>;

function getTimezone(): string | undefined {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || undefined;
  } catch {
    return undefined;
  }
}

function formatDayTab(dateKey: string) {
  // dateKey is a plain date (YYYY-MM-DD); anchor at noon to avoid TZ rollover.
  const d = new Date(`${dateKey}T12:00:00`);
  return {
    dow: d.toLocaleDateString("en-US", { weekday: "short" }),
    date: d.toLocaleDateString("en-US", { day: "numeric" }),
  };
}

function formatDayOption(dateKey: string) {
  const d = new Date(`${dateKey}T12:00:00`);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
}

function formatSlot(iso: string, timeZone: string | undefined): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_DAYS = 6;

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  fontSize: 13.5,
  fontFamily: "inherit",
  color: "#F4EFE7",
  background: "rgba(244,239,231,.03)",
  border: "1px solid rgba(244,239,231,.12)",
  outline: "none",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  paddingRight: 38,
  cursor: "pointer",
};

const optionStyle: React.CSSProperties = {
  background: "#141210",
  color: "#F4EFE7",
};

const selectLabelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11.5,
  letterSpacing: ".06em",
  textTransform: "uppercase",
  color: "rgba(244,239,231,.5)",
  marginBottom: 7,
};

const chevronStyle: React.CSSProperties = {
  position: "absolute",
  right: 14,
  top: "50%",
  transform: "translateY(-50%)",
  pointerEvents: "none",
  color: "rgba(244,239,231,.5)",
  fontSize: 12,
};

export default function Booking() {
  const [timeZone, setTimeZone] = useState<string | undefined>(undefined);
  const [slotsByDate, setSlotsByDate] = useState<SlotsByDate>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [dayKey, setDayKey] = useState<string | null>(null);
  const [selectedStart, setSelectedStart] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [step, setStep] = useState<"select" | "done">("select");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const timezoneLabel = timeZone ?? "your local time";

  const loadSlots = useCallback(async (tz: string | undefined) => {
    setLoading(true);
    setLoadError(null);
    try {
      const qs = tz ? `?timeZone=${encodeURIComponent(tz)}` : "";
      const res = await fetch(`/api/cal/slots${qs}`);
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Couldn't load availability");
      }
      const slots: SlotsByDate = json.slots ?? {};
      setSlotsByDate(slots);
      setDayKey(Object.keys(slots)[0] ?? null);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Couldn't load availability");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const tz = getTimezone();
    setTimeZone(tz);
    loadSlots(tz);
  }, [loadSlots]);

  const days = useMemo(() => Object.keys(slotsByDate).slice(0, MAX_DAYS), [slotsByDate]);
  const daySlots = dayKey ? slotsByDate[dayKey] ?? [] : [];

  const emailValid = EMAIL_RE.test(email.trim());
  const ready = selectedStart !== null && name.trim().length > 0 && emailValid;

  async function submit() {
    if (!ready || !selectedStart) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/cal/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start: selectedStart,
          name: name.trim(),
          email: email.trim(),
          timeZone: timeZone ?? "UTC",
        }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Booking failed. Please try another slot.");
      }
      setStep("done");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setStep("select");
    setSelectedStart(null);
    setSubmitError(null);
    loadSlots(timeZone);
  }

  const confirmedDay = dayKey ? formatDayTab(dayKey) : null;
  const confirmedTime = selectedStart ? formatSlot(selectedStart, timeZone) : "";

  return (
    <section
      id="booking"
      style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "clamp(60px,7vw,100px) clamp(18px,5vw,52px)" }}
    >
      <Reveal
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 28,
          border: "1px solid rgba(224,166,90,.22)",
          background: "linear-gradient(140deg,rgba(224,166,90,.1),rgba(244,239,231,.02) 50%)",
          padding: "clamp(34px,5vw,64px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -60,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(224,166,90,.25),transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "clamp(30px,4vw,60px)",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: 12.5, letterSpacing: ".2em", textTransform: "uppercase", color: "#E0A65A", marginBottom: 16 }}>
              / Book a call
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(32px,4.5vw,54px)", lineHeight: 1.04, margin: "0 0 20px" }}>
              Let&rsquo;s map your content growth plan
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "rgba(244,239,231,.6)", fontWeight: 300, margin: "0 0 26px", maxWidth: "42ch" }}>
              Grab a free strategy call. Pick a real open slot below &mdash; we&rsquo;ll send you a
              calendar invite with the meeting link and reminders to both sides.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {BOOKING_PERKS.map((p) => (
                <div key={p} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "rgba(244,239,231,.72)" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      width: 22,
                      height: 22,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background: "rgba(95,208,138,.15)",
                      color: "#5FD08A",
                    }}
                  >
                    ✓
                  </span>
                  {p}
                </div>
              ))}
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 24,
                padding: "8px 14px",
                borderRadius: 100,
                background: "rgba(244,239,231,.05)",
                border: "1px solid rgba(244,239,231,.1)",
                fontSize: 12.5,
                color: "rgba(244,239,231,.6)",
              }}
            >
              <ClockIcon />
              Detected timezone: {timezoneLabel}
            </div>
          </div>

          <div
            style={{
              position: "relative",
              borderRadius: 22,
              background: "rgba(12,11,9,.55)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(244,239,231,.1)",
              padding: 28,
              minHeight: 340,
            }}
          >
            {step === "select" && (
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Select a time</div>
                  <div style={{ fontSize: 12, color: "rgba(244,239,231,.5)" }}>Live availability</div>
                </div>

                {loading && (
                  <div style={{ padding: "60px 0", textAlign: "center", fontSize: 13.5, color: "rgba(244,239,231,.5)" }}>
                    Loading available times…
                  </div>
                )}

                {!loading && loadError && (
                  <div style={{ padding: "40px 0", textAlign: "center" }}>
                    <p style={{ fontSize: 13.5, color: "rgba(244,239,231,.6)", margin: "0 0 16px" }}>{loadError}</p>
                    <button
                      data-cursor="lg"
                      onClick={() => loadSlots(timeZone)}
                      style={{
                        padding: "10px 20px",
                        borderRadius: 100,
                        background: "rgba(244,239,231,.06)",
                        border: "1px solid rgba(244,239,231,.16)",
                        color: "#F4EFE7",
                        fontSize: 13,
                        fontFamily: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      Try again
                    </button>
                  </div>
                )}

                {!loading && !loadError && days.length === 0 && (
                  <div style={{ padding: "50px 0", textAlign: "center", fontSize: 13.5, color: "rgba(244,239,231,.55)" }}>
                    No open slots in the next few weeks. Please check back soon.
                  </div>
                )}

                {!loading && !loadError && days.length > 0 && (
                  <>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      <div>
                        <label htmlFor="booking-date" style={selectLabelStyle}>
                          Date
                        </label>
                        <div style={{ position: "relative" }}>
                          <select
                            id="booking-date"
                            data-cursor="lg"
                            value={dayKey ?? ""}
                            onChange={(e) => {
                              setDayKey(e.target.value || null);
                              setSelectedStart(null);
                            }}
                            style={selectStyle}
                          >
                            {days.map((key) => (
                              <option key={key} value={key} style={optionStyle}>
                                {formatDayOption(key)}
                              </option>
                            ))}
                          </select>
                          <span style={chevronStyle}>▾</span>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="booking-time" style={selectLabelStyle}>
                          Time
                        </label>
                        <div style={{ position: "relative" }}>
                          <select
                            id="booking-time"
                            data-cursor="lg"
                            value={selectedStart ?? ""}
                            onChange={(e) => setSelectedStart(e.target.value || null)}
                            disabled={daySlots.length === 0}
                            style={{ ...selectStyle, opacity: daySlots.length === 0 ? 0.5 : 1 }}
                          >
                            <option value="" style={optionStyle}>
                              {daySlots.length === 0 ? "No times available" : "Select a time…"}
                            </option>
                            {daySlots.map((iso) => (
                              <option key={iso} value={iso} style={optionStyle}>
                                {formatSlot(iso, timeZone)}
                              </option>
                            ))}
                          </select>
                          <span style={chevronStyle}>▾</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        aria-label="Your name"
                        style={inputStyle}
                      />
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        aria-label="Email address"
                        type="email"
                        style={inputStyle}
                      />
                    </div>

                    {submitError && (
                      <p style={{ margin: "12px 0 0", fontSize: 12.5, color: "#F0A0A0", lineHeight: 1.5 }}>{submitError}</p>
                    )}

                    <button
                      data-cursor="lg"
                      onClick={submit}
                      disabled={!ready || submitting}
                      style={{
                        width: "100%",
                        marginTop: 16,
                        padding: 15,
                        borderRadius: 100,
                        fontSize: 14.5,
                        fontWeight: 600,
                        fontFamily: "inherit",
                        border: "none",
                        transition: "all .3s ease",
                        cursor: ready && !submitting ? "pointer" : "default",
                        background: ready && !submitting ? "linear-gradient(135deg,#E0A65A,#F0D3A0)" : "rgba(244,239,231,.06)",
                        color: ready && !submitting ? "#0A0908" : "rgba(244,239,231,.35)",
                        boxShadow: ready && !submitting ? "0 10px 30px rgba(224,166,90,.3)" : "none",
                      }}
                    >
                      {submitting ? "Booking…" : selectedStart ? "Confirm booking →" : "Select a time slot"}
                    </button>
                  </>
                )}
              </div>
            )}

            {step === "done" && confirmedDay && (
              <div style={{ textAlign: "center", padding: "20px 6px", animation: "tcRise .6s both" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    margin: "0 auto 22px",
                    borderRadius: "50%",
                    background: "rgba(95,208,138,.15)",
                    border: "1px solid rgba(95,208,138,.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckIcon size={40} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 26, margin: "0 0 10px" }}>You&rsquo;re booked!</h3>
                <p style={{ fontSize: 14, color: "rgba(244,239,231,.6)", margin: "0 0 20px", lineHeight: 1.6 }}>
                  {confirmedDay.dow} {confirmedDay.date} · {confirmedTime} · {timezoneLabel}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 9, textAlign: "left", fontSize: 13, color: "rgba(244,239,231,.7)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: "#5FD08A" }}>✓</span> Booking confirmed with Cal.com
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: "#5FD08A" }}>✓</span> Calendar invite &amp; meeting link sent to {email.trim()}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: "#5FD08A" }}>✓</span> Confirmation &amp; reminder emails scheduled
                  </div>
                </div>
                <button
                  data-cursor="lg"
                  onClick={reset}
                  style={{
                    marginTop: 22,
                    padding: "11px 22px",
                    borderRadius: 100,
                    background: "rgba(244,239,231,.06)",
                    border: "1px solid rgba(244,239,231,.16)",
                    color: "#F4EFE7",
                    fontSize: 13,
                    fontFamily: "inherit",
                    cursor: "pointer",
                  }}
                >
                  Book another time
                </button>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
