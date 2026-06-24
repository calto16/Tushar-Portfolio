import { NextResponse } from "next/server";
import { profile } from "@/content/site";

export const runtime = "nodejs";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "All fields are required." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  const key = process.env.RESEND_API_KEY;
  // No email service configured → tell the client to use a mailto: fallback.
  if (!key) {
    return NextResponse.json({ ok: false, fallback: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(key);
    const from =
      process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to: [profile.email],
      replyTo: email,
      subject: `Portfolio · new message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: "Failed to send. Try email directly." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message." },
      { status: 500 },
    );
  }
}
