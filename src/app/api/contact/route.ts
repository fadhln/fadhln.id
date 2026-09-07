import { NextResponse } from "next/server";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5_000;
const TURNSTILE_ACTION = "contact";

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const name = text(payload?.name);
  const email = text(payload?.email);
  const message = text(payload?.message);
  const company = text(payload?.company);
  const turnstileToken = text(payload?.turnstileToken);

  if (company) return NextResponse.json({ ok: true });

  if (
    !name ||
    name.length > MAX_NAME_LENGTH ||
    !email ||
    email.length > MAX_EMAIL_LENGTH ||
    !message ||
    message.length > MAX_MESSAGE_LENGTH ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json({ error: "Please check your form fields." }, { status: 400 });
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

  const allowedHostnames = new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((hostname) => hostname.trim())
      .filter(Boolean),
  );

  if (
    !secret ||
    !formspreeEndpoint ||
    !turnstileToken ||
    turnstileToken.length > 2_048 ||
    allowedHostnames.size === 0
  ) {
    return NextResponse.json({ error: "The contact form is not configured." }, { status: 500 });
  }

  let turnstileResult: { success?: boolean; action?: string; hostname?: string } | null;
  try {
    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: AbortSignal.timeout(10_000),
        body: new URLSearchParams({
          secret,
          response: turnstileToken,
          ...(request.headers.get("CF-Connecting-IP")
            ? { remoteip: request.headers.get("CF-Connecting-IP") as string }
            : {}),
        }),
      },
    );

    if (!turnstileResponse.ok)
      throw new Error(`Turnstile verification failed: ${turnstileResponse.status}`);
    turnstileResult = await turnstileResponse.json();
  } catch {
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 403 });
  }

  if (
    !turnstileResult?.success ||
    turnstileResult.action !== TURNSTILE_ACTION ||
    !turnstileResult.hostname ||
    !allowedHostnames.has(turnstileResult.hostname)
  ) {
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 403 });
  }

  const formspreeResponse = await fetch(formspreeEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      message,
      _replyto: email,
      _subject: `New contact form message from ${name}`,
    }),
  });

  if (!formspreeResponse.ok) {
    return NextResponse.json({ error: "The message could not be sent." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
