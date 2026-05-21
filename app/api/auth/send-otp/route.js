import { NextResponse } from "next/server";
import { sendOTP } from "@/lib/otpService";

export async function POST(req) {
  try {
    let { email, purpose } = await req.json();

    // normalize email
    email = email?.toLowerCase().trim();

    // validation
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Email is required",
        },
        { status: 400 }
      );
    }

    if (!purpose) {
      return NextResponse.json(
        {
          success: false,
          error: "Purpose is required",
        },
        { status: 400 }
      );
    }

    await sendOTP(email, purpose);

    return NextResponse.json(
      {
        success: true,
        message: "OTP sent successfully",
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("SEND OTP ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to send OTP",
      },
      { status: 500 }
    );
  }
}