"use client";

import PopupMessage from "@/components/PopupMessage/PopupMessage";

import { Eye, Gem, Gift, Lock, Mail, ShieldCheck, User } from "lucide-react";
import React from "react";
import styles from "./forgot-password.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function forgotPassword() {
  const router = useRouter();
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const sendOTP = async () => {
    setError("");

    if (!validateEmail(form.email)) {
      return setError("Enter a valid email");
    }

    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    setOtpLoading(true);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          purpose: "PASSWORD_RESET",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send OTP");
        return;
      }

      setOtpSent(true);
    } catch {
      setError("Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      return setError("Send OTP first");
    }

    if (!form.otp.trim()) {
      return setError("Enter OTP");
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      console.log(res);

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      

      if (res.ok) {
        setPopupMessage("Password changed successfully");
        
      
        return;
      }
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Forgot Password</h2>

        <div className={styles.field}>
          <label htmlFor="forgot-email">Email Address</label>
          <div className={styles.inputShell}>
            <Mail size={21} />
            <input
              id="forgot-email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => {
                const value = e.target.value;

                setForm({
                  ...form,
                  email: value,
                  otp: "",
                });

                setOtpSent(false);

                if (!value) setEmailError("");
                else if (!validateEmail(value))
                  setEmailError("Invalid email format");
                else setEmailError("");
              }}
              required
            />
          </div>
        </div>

        {emailError && <p className={styles.error}>{emailError}</p>}

        <div className={styles.field}>
          <label htmlFor="forgot-password">Password</label>
          <div className={styles.inputShell}>
            <Lock size={21} />
            <input
              id="forgot-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter New password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              required
            />
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Show password"
            >
              <Eye size={21} />
            </button>
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="forgot-password"> Confirm Password</label>
          <div className={styles.inputShell}>
            <Lock size={21} />
            <input
              id="forgot-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Confirm password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
              required
            />
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Show password"
            >
              <Eye size={21} />
            </button>
          </div>
        </div>

        <button
          type="button"
          className={styles.button}
          onClick={sendOTP}
          disabled={otpLoading || emailError}
        >
          {otpLoading ? "Sending OTP..." : otpSent ? "OTP Sent" : "Send OTP"}
        </button>

        {otpSent && (
          <div className={styles.field}>
            <label htmlFor="forgot-otp">Verification Code</label>
            <div className={styles.inputShell}>
              <Mail size={21} />
              <input
                id="forgot-otp"
                type="text"
                placeholder="Enter OTP"
                value={form.otp}
                onChange={(e) =>
                  setForm({
                    ...form,
                    otp: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}

      {/* Pop Message */}
        <PopupMessage
          message={popupMessage}
          onClose={() => {
            setPopupMessage("");
            router.push("/auth/login");
            router.refresh();
          }}
        />

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
