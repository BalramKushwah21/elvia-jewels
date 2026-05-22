"use client";

import { Eye, Gem, Gift, Lock, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import styles from "./login.module.css";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const res = await signIn("password-login", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/");
    router.refresh();
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
            <h2 className={styles.heading}>Welcome Back</h2>
            <p className={styles.subheading}>
              Sign in to continue to your account
            </p>
            <div className={styles.divider}>
              <span></span>
              <b>✦</b>
              <span></span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="login-email">Email Address</label>
                <div className={styles.inputShell}>
                  <Mail size={21} />
                  <input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="login-password">Password</label>
                <div className={styles.inputShell}>
                  <Lock size={21} />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
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

              <div className={styles.formRow}>
                <label className={styles.checkLabel}>
                  <input type="checkbox" defaultChecked />
                  <span>Remember me</span>
                </label>
                <Link href="/auth/forgot-password">Forgot password?</Link>
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button
                type="submit"
                className={styles.button}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <div className={styles.orDivider}>
                <span></span>
                <b>or</b>
                <span></span>
              </div>

              <button type="button" className={styles.googleButton}>
                <span>G</span>
                Continue with Google
              </button>
            </form>

            <p className={styles.authSwitch}>
              New to Elvia Jewels?{" "}
              <Link href="/auth/register">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
