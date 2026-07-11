import { NextRequest, NextResponse } from "next/server";
import { createCalBooking, CalApiError } from "@/lib/cal";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bad(error: string) {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid request body");
  }

  const record = (body ?? {}) as Record<string, unknown>;
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const start = typeof record.start === "string" ? record.start : "";
  const timeZone =
    typeof record.timeZone === "string" && record.timeZone ? record.timeZone : "UTC";

  if (!name) return bad("Please enter your name");
  if (!EMAIL_RE.test(email)) return bad("Please enter a valid email address");
  if (!start || Number.isNaN(Date.parse(start))) return bad("Please select a valid time slot");

  try {
    const booking = await createCalBooking({ start, name, email, timeZone });
    return NextResponse.json({ ok: true, booking });
  } catch (err) {
    if (err instanceof CalApiError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 502 });
    }
    console.error("[cal/book]", err);
    return NextResponse.json(
      { ok: false, error: "Booking is temporarily unavailable" },
      { status: 500 },
    );
  }
}
