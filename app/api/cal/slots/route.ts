import { NextRequest, NextResponse } from "next/server";
import { getCalSlots, CalApiError } from "@/lib/cal";

// Availability is time-sensitive; never cache the response.
export const dynamic = "force-dynamic";

// How far ahead to offer slots.
const RANGE_DAYS = 21;

export async function GET(req: NextRequest) {
  const timeZone = req.nextUrl.searchParams.get("timeZone") || "UTC";

  const now = new Date();
  const end = new Date(now.getTime() + RANGE_DAYS * 24 * 60 * 60 * 1000);

  try {
    const slots = await getCalSlots({
      start: now.toISOString(),
      end: end.toISOString(),
      timeZone,
    });
    return NextResponse.json({ ok: true, slots });
  } catch (err) {
    // Surface Cal.com's own message; hide config/internal errors.
    if (err instanceof CalApiError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 502 });
    }
    console.error("[cal/slots]", err);
    return NextResponse.json(
      { ok: false, error: "Booking is temporarily unavailable" },
      { status: 500 },
    );
  }
}
