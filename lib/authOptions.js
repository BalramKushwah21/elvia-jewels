import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "password-login",
      name: "Password Login",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),

    CredentialsProvider({
      id: "otp-login",
      name: "OTP Login",

      credentials: {
        email: {},
        otp: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp) {
          throw new Error("Missing OTP credentials");
        }

        const otpRecord = await prisma.oTP.findFirst({
          where: {
            email: credentials.email,
            used: false,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        if (!otpRecord) {
          throw new Error("OTP not found");
        }

        if (new Date() > otpRecord.expiresAt) {
          throw new Error("OTP expired");
        }

        const valid = await bcrypt.compare(
          credentials.otp,
          otpRecord.otpHash
        );

        if (!valid) {
          throw new Error("Invalid OTP");
        }

        await prisma.oTP.update({
          where: { id: otpRecord.id },
          data: { used: true },
        });

        let user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: credentials.email,
              name: credentials.email.split("@")[0],
              password: "",
            },
          });
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/home/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }

      return session;
    },
  },
};