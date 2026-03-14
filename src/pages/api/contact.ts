import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, company, service, budget, message, source } = req.body;

  console.log("[Contact API] Received submission:", { name, email, phone, company, service, source });

  if (!name || !email || !message) {
    console.log("[Contact API] Validation failed - missing fields");
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const receivers = process.env.EMAIL_RECEIVER || process.env.EMAIL_RECIEVER || "hey@digidog.org";

  console.log("[Contact API] SMTP config:", {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER ? "***set***" : "NOT SET",
    pass: process.env.EMAIL_PASS ? "***set***" : "NOT SET",
    receivers,
  });

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #02033d; padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">New Contact Form Submission</h1>
        <p style="color: #52bd94; margin: 4px 0 0; font-size: 14px;">via digidog.org${source ? ` — ${source}` : ""}</p>
      </div>
      <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 100px;">Name</td><td style="padding: 8px 0; color: #1e293b; font-size: 15px; font-weight: 600;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Phone</td><td style="padding: 8px 0; color: #1e293b;">${phone}</td></tr>` : ""}
          ${company ? `<tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Company</td><td style="padding: 8px 0; color: #1e293b;">${company}</td></tr>` : ""}
          ${service ? `<tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Service</td><td style="padding: 8px 0; color: #1e293b;">${service}</td></tr>` : ""}
          ${budget ? `<tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Budget</td><td style="padding: 8px 0; color: #1e293b;">${budget}</td></tr>` : ""}
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px;">
          <p style="color: #64748b; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
          <p style="color: #1e293b; font-size: 15px; margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
      </div>
    </div>
  `;

  try {
    console.log("[Contact API] Sending email...");

    await transporter.sendMail({
      from: `"Digidog Website" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: receivers,
      subject: `New inquiry from ${name}${service ? ` — ${service}` : ""}`,
      html: htmlBody,
    });

    console.log("[Contact API] Email sent successfully");
    return res.status(200).json({ success: true });
  } catch (error: unknown) {
    console.error("[Contact API] Email send error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
