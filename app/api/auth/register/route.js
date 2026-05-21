import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();

    let { name,email, password } = body;

    // 🔐 Normalize email
    email = email?.toLowerCase().trim();

    // 🔍 Validation
    if (!email || !password) {
      return Response.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return Response.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return Response.json(
        { success: false, error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // 🔎 Check existing user
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return Response.json(
        { success: false, error: "User already exists" },
        { status: 409 } // better status code
      );
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Create user
    const user = await prisma.user.create({
      data: {
        name:name,
        email:email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true, // never return password
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
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}