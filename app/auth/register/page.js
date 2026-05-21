"use client";

import { Eye, Gem, Gift, Lock, Mail, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import styles from "../login/login.module.css";

export default function RegisterPage() {
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

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const sendOTP = async () => {
    setError("");

    if (!form.name.trim()) {
      return setError("Enter name first");
    }

    if (!validateEmail(form.email)) {
      return setError("Enter a valid email");
    }

    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters");
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
          purpose: "REGISTER",
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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 409) {
        setError("Email already registered");
        return;
      }

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      const login = await signIn("password-login", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (login?.error) {
        setError("Account created, login failed");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.left}>
          <div className={styles.brandMark}>EJ</div>
          <h1 className={styles.brandName}>ELVIA JEWELS</h1>
          <p className={styles.tagline}>Timeless Elegance. Yours Forever.</p>

          <div className={styles.jewelScene}>
            <div className={styles.necklaceLine}></div>
            <div className={styles.diamondRing}></div>
          </div>

          <div className={styles.featureGrid}>
            <div>
              <Gem size={32} />
              <span>Premium Quality Craftsmanship</span>
            </div>
            <div>
              <ShieldCheck size={32} />
              <span>Ethically Sourced Materials</span>
            </div>
            <div>
              <Gift size={32} />
              <span>Exclusively Yours</span>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.formCard}>
            <h2 className={styles.heading}>Create Account</h2>
            <p className={styles.subheading}>
              Join Elvia Jewels and begin your collection
            </p>
            <div className={styles.divider}>
              <span></span>
              <b>✦</b>
              <span></span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="register-name">Full Name</label>
                <div className={styles.inputShell}>
                  <User size={21} />
                  <input
                    id="register-name"
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="register-email">Email Address</label>
                <div className={styles.inputShell}>
                  <Mail size={21} />
                  <input
                    id="register-email"
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
                <label htmlFor="register-password">Password</label>
                <div className={styles.inputShell}>
                  <Lock size={21} />
                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
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

              <button
                type="button"
                className={styles.button}
                onClick={sendOTP}
                disabled={otpLoading || emailError}
              >
                {otpLoading
                  ? "Sending OTP..."
                  : otpSent
                    ? "OTP Sent"
                    : "Send OTP"}
              </button>

              {otpSent && (
                <div className={styles.field}>
                  <label htmlFor="register-otp">Verification Code</label>
                  <div className={styles.inputShell}>
                    <Mail size={21} />
                    <input
                      id="register-otp"
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

              <button
                type="submit"
                className={styles.button}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            <p className={styles.authSwitch}>
              Already have an account? <Link href="/auth/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
