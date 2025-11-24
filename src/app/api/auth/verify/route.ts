// /app/api/verify-otp/route.ts
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, otp, password, name } = await req.json();

    if (!email || !otp || !password) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    // validate stored OTP
    const otpData = await prisma.otpVerification.findFirst({
      where: { email, otp },
    });

    if (!otpData || otpData.expiresAt < new Date()) {
      return Response.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        provider: "credentials",
        isVerified: true,
      },
    });

    // Delete OTP after use
    await prisma.otpVerification.delete({ where: { id: otpData.id } });

    return Response.json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
