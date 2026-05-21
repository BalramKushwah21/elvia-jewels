import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { verifyOTP } from "@/lib/otpService";

export async function POST(req) {
  try {
    const body = await req.json();

    let { name, email, password, otp } = body;

    // normalize email
    email = email?.toLowerCase().trim();

    // validation
    if (!name || !email || !password || !otp) {
      return Response.json(
        {
          success: false,
          error: "Name, email, password and OTP are required",
        },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return Response.json(
        {
          success: false,
          error: "Invalid email format",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return Response.json(
        {
          success: false,
          error: "Password must be at least 8 characters",
        },
        { status: 400 }
      );
    }

    // existing user check
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return Response.json(
        {
          success: false,
          error: "User already exists",
        },
        { status: 409 }
      );
    }

    // OTP verification
    await verifyOTP(email, otp, "REGISTER");

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return Response.json(
      {
        success: true,
        message: "User created successfully",
        user,
      },
      { status: 201 }
    );

  } catch (err) {
    console.error("REGISTER ERROR:", err);

    return Response.json(
      {
        success: false,
        error: err.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}