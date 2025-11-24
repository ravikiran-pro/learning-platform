import { generateEmailTemplate } from "@/lib/mailTemplate";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) return Response.json({ error: "Email required" }, { status: 400 });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return Response.json({ error: "User already exists. Please log in." }, { status: 400 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in DB (expires in 10 min)
    await prisma.otpVerification.create({
      data: {
        email,
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    // Setup mail transport (IONOS)
    const transporter = nodemailer.createTransport({
      host: "smtp.ionos.com",
      port: 587,
      secure: false,
      auth: {
        user: "info@ninja-ai.org",
        pass: process.env.IONOS_EMAIL_PASSWORD, // set in .env
      },
    });

    // Email content
    const mailOptions = {
      from: '"Ninja AI" <info@ninja-ai.org>',
      to: email,
      subject: "🚀 Your Ninja AI Verification Code",
      html: generateEmailTemplate({
        title: "Verify Your Email",
        message: "Thank you for signing up with <b>Ninja AI</b> 👋<br>Please use the OTP below to continue.",
        otp,
        validity: "10 minutes",
        ctaLabel: "Visit Ninja AI",
        ctaUrl: "https://ninja-ai.org",
      }),
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
