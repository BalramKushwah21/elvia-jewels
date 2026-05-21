import { NextResponse } from "next/server";
import { verifyOTP } from "@/lib/otpService";

export async function POST(req) {
  try {
    const { email, otp, purpose } = await req.json();

    await verifyOTP(email, otp, purpose);

    return NextResponse.json({
      success: true,
      verified: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}