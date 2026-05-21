import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { transporter } from "@/lib/mailer";
import { generateOTP } from "@/lib/otp";

export async function sendOTP(email, purpose) {
  const otp = generateOTP();
  const otpHash = await bcrypt.hash(otp, 10);

  await prisma.oTP.updateMany({
    where: {
      email,
      purpose,
      used: false,
    },
    data: {
      used: true,
    },
  });

  await prisma.oTP.create({
    data: {
      email,
      otpHash,
      purpose,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    },
  });

  const result = await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Email Verification OTP",
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2>OTP Verification</h2>
        <p>Your verification code is:</p>
        <h1 style="letter-spacing: 5px;">${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      </div>
    `,
  });


  return true;
}

export async function verifyOTP(email, otp, purpose) {
  const record = await prisma.oTP.findFirst({
    where: {
      email,
      purpose,
      used: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!record) {
    throw new Error("OTP not found");
  }

  if (new Date() > record.expiresAt) {
    throw new Error("OTP expired");
  }

  const valid = await bcrypt.compare(otp, record.otpHash);

  if (!valid) {
    throw new Error("Invalid OTP");
  }

  await prisma.oTP.update({
    where: {
      id: record.id,
    },
    data: {
      used: true,
    },
  });

  return true;
}