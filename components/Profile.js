"use client";

import { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./Profile.module.css";

export default function ProfileDropdown() {
  const { data: session } = useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // 🔒 Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) return null;

  const username = user.name || user.email?.split("@")[0];

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      {/* Button */}
      <span>{username}</span>
    </div>
  );
}
