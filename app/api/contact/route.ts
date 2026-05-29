import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// ── Validate env at request time so the error is clear ────────────────────────
function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error('Missing SMTP_HOST / SMTP_USER / SMTP_PASS env variables. Copy .env.local.example to .env.local and fill in your credentials.')
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465, // true for port 465 (TLS), false for STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message } = body as { name?: string; email?: string; message?: string }

    // ── Basic validation ────────────────────────────────────────────────────
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const to = process.env.CONTACT_TO ?? process.env.SMTP_USER ?? ''
    const transporter = getTransporter()

    // ── Send the email ──────────────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to,
      replyTo: email,                    // Reply-To goes straight to the sender
      subject: `[Portfolio] New message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#0f0f1a;color:#e2e8f0;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#6c63ff,#00d4aa);padding:28px 32px;">
            <h1 style="margin:0;font-size:20px;color:#fff;">New Contact Form Submission</h1>
            <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.8);">From your portfolio website</p>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0;color:#94a3b8;font-size:13px;width:90px;">Name</td>
                <td style="padding:8px 0;font-weight:600;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#94a3b8;font-size:13px;">Email</td>
                <td style="padding:8px 0;">
                  <a href="mailto:${escapeHtml(email)}" style="color:#6c63ff;">${escapeHtml(email)}</a>
                </td>
              </tr>
            </table>
            <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:20px 0;" />
            <p style="color:#94a3b8;font-size:13px;margin-bottom:8px;">Message</p>
            <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:16px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</div>
          </div>
          <div style="padding:16px 32px;background:rgba(0,0,0,0.2);font-size:12px;color:#475569;">
            Hit Reply to respond directly to ${escapeHtml(name)}.
          </div>
        </div>
      `,
      // Plain-text fallback
      text: `New portfolio contact from ${name} <${email}>\n\n${message}`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] email error:', err)
    const message = err instanceof Error ? err.message : 'Failed to send email.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// ── Tiny XSS guard for HTML email body ────────────────────────────────────────
function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
