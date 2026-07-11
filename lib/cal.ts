/**
 * Server-only Cal.com v2 API client.
 *
 * Never import this from a Client Component — it reads CAL_API_KEY, which must
 * stay on the server. It is consumed only by the /api/cal/* route handlers.
 *
 * Docs: https://cal.com/docs/api-reference/v2
 */

const DEFAULT_BASE_URL = "https://api.cal.com/v2";

// Each endpoint is pinned to the API version it was built against; omitting the
// header silently falls back to an older, incompatible shape.
const SLOTS_API_VERSION = "2024-09-04";
const BOOKINGS_API_VERSION = "2026-02-25";

/** Thrown when required env config is missing — treated as a 500, never leaked to the client. */
export class CalConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CalConfigError";
  }
}

/** Thrown when Cal.com rejects a request — message is safe to surface to the user. */
export class CalApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CalApiError";
  }
}

type CalConfig = {
  apiKey: string;
  eventTypeId: number;
  baseUrl: string;
};

function getConfig(): CalConfig {
  const apiKey = process.env.CAL_API_KEY;
  const rawEventTypeId = process.env.CAL_EVENT_TYPE_ID;
  const baseUrl = (process.env.CAL_API_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, "");

  if (!apiKey) throw new CalConfigError("CAL_API_KEY is not set");
  if (!rawEventTypeId) throw new CalConfigError("CAL_EVENT_TYPE_ID is not set");

  const eventTypeId = Number(rawEventTypeId);
  if (!Number.isInteger(eventTypeId) || eventTypeId <= 0) {
    throw new CalConfigError("CAL_EVENT_TYPE_ID must be a positive integer");
  }

  return { apiKey, eventTypeId, baseUrl };
}

/** ISO start strings keyed by calendar date, e.g. { "2026-07-12": ["2026-07-12T09:00:00.000-04:00"] }. */
export type SlotsByDate = Record<string, string[]>;

/**
 * The slots endpoint returns a map of date -> array of slots. Depending on the
 * `format`, each slot may be a bare ISO string or an object with a `start`
 * field. Normalize both into plain ISO start strings.
 */
function normalizeSlots(data: unknown): SlotsByDate {
  if (!data || typeof data !== "object") return {};

  const out: SlotsByDate = {};
  for (const [date, value] of Object.entries(data as Record<string, unknown>)) {
    if (!Array.isArray(value)) continue;

    const starts = value
      .map((slot) => {
        if (typeof slot === "string") return slot;
        if (slot && typeof slot === "object" && "start" in slot) {
          const start = (slot as { start?: unknown }).start;
          return typeof start === "string" ? start : undefined;
        }
        return undefined;
      })
      .filter((start): start is string => typeof start === "string");

    if (starts.length > 0) out[date] = starts;
  }
  return out;
}

function extractError(json: unknown, status: number, fallback: string): string {
  const message =
    json && typeof json === "object" && "error" in json
      ? (json as { error?: { message?: unknown } }).error?.message
      : undefined;
  return typeof message === "string" && message ? message : `${fallback} (${status})`;
}

/** Fetch available slots for the configured event type within a date range. */
export async function getCalSlots(params: {
  start: string;
  end: string;
  timeZone: string;
}): Promise<SlotsByDate> {
  const { apiKey, eventTypeId, baseUrl } = getConfig();

  const url = new URL(`${baseUrl}/slots`);
  url.searchParams.set("eventTypeId", String(eventTypeId));
  url.searchParams.set("start", params.start);
  url.searchParams.set("end", params.end);
  url.searchParams.set("timeZone", params.timeZone);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "cal-api-version": SLOTS_API_VERSION,
    },
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);
  if (!res.ok || (json as { status?: string })?.status !== "success") {
    throw new CalApiError(extractError(json, res.status, "Failed to load availability"));
  }

  return normalizeSlots((json as { data?: unknown }).data);
}

/** Create a booking for the configured event type. `start` is normalized to UTC. */
export async function createCalBooking(params: {
  start: string;
  name: string;
  email: string;
  timeZone: string;
}): Promise<unknown> {
  const { apiKey, eventTypeId, baseUrl } = getConfig();

  const res = await fetch(`${baseUrl}/bookings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "cal-api-version": BOOKINGS_API_VERSION,
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      eventTypeId,
      // Cal.com expects the start in UTC; convert away any local offset.
      start: new Date(params.start).toISOString(),
      attendee: {
        name: params.name,
        email: params.email,
        timeZone: params.timeZone,
        language: "en",
      },
    }),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok || (json as { status?: string })?.status !== "success") {
    throw new CalApiError(extractError(json, res.status, "Booking could not be created"));
  }

  return (json as { data?: unknown }).data;
}
