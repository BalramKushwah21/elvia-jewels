import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { verifyOTP } from "@/lib/otpService";

export async function POST(req) {
  try {
    const body = await req.json();

    let {email, password, confirmPassword, otp } = body;

    // normalize email
    email = email?.toLowerCase().trim();


    // existing user check
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (!existing) {
      return Response.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    // OTP verification
    await verifyOTP(email, otp, "PASSWORD_RESET");

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    });

    return Response.json(
      {
        success: true,
        message: "Password changed successfully",
      },
    );

  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);

    return Response.json(
      {
        success: false,
        error: err.message || "Internal server error",
      },
    );
      
  }
}