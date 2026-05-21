"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./navbar.module.css";
import ProfileDropdown from "@/components/ProfileDropdown";
import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import useCartCount from "@/hooks/useCartCount";
import { signOut } from "next-auth/react";
import SearchBar from "./SearchBar";


export default function Navbar() {
  const count = useCartCount();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const user = session?.user;

  // 🔓 Logout (NextAuth)
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };

  return (
    <nav className={styles.headerNavbar}>
      {/* Brand */}
      <div className={styles.navbarBrand}>
        <img src="/icons/logo.jpeg" className={styles.logo} />
        Elvia Jewels
      </div>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileNavbar} ${open ? styles.showMenu : ""
          }`}
      >
        <button
          className={styles.navbarClose}
          onClick={() => setOpen(false)}
        >
          ✖
        </button>


        {user ? (
          <>
            <Profile />

            <Link href="#" onClick={() => setOpen(false)} className={styles.navLink}>Profile</Link>
            <Link href="/" onClick={() => setOpen(false)} className={styles.navLink}>Home</Link>
            <Link href="/home/store" onClick={() => setOpen(false)} className={styles.navLink}>Store</Link>
            <Link href="/home/contactus" onClick={() => setOpen(false)} className={styles.navLink}>Contact</Link>
            <Link href="/home/cart" onClick={() => setOpen(false)} className={styles.navLink}>Cart({count})</Link>
            <button
              className={styles.logoutBtn}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className={styles.btn}>Login</Link>
            <Link href="/" onClick={() => setOpen(false)} className={styles.navLink}>Home</Link>
            <Link href="/home/store" onClick={() => setOpen(false)} className={styles.navLink}>Store</Link>
            <Link href="/home/contactus" onClick={() => setOpen(false)} className={styles.navLink}>Contact</Link>
            <Link href="/home/cart" onClick={() => setOpen(false)} className={styles.navLink}>Cart({count})</Link>

          </>
        )}

      </div>

      {/* Toggle */}
      <button
        className={styles.navbarOpen}
        onClick={() => setOpen(true)}
      >
        ☰
      </button>


      {/* Desktop */}
      <div className={styles.navbarCenter}>
        <SearchBar />
      </div>

      <div className={styles.navbarLinks}>
        {user ? (
          <>
            <Link className={styles.navbarLink} href="/">Home</Link>
            <Link className={styles.navbarLink} href="/home/store">Store</Link>
            <Link className={styles.navbarLink} href="/home/cart">Cart ({count})</Link>

            <ProfileDropdown />
          </>
        ) : (
          <>
            <Link className={styles.navbarLink} href="/">Home</Link>
            <Link className={styles.navbarLink} href="/home/store">Store</Link>
            <Link className={styles.navbarLink} href="/home/contactus">Contact</Link>
            <Link className={styles.navbarLink} href="/home/cart">Cart</Link>

            <Link href="/auth/login" className={styles.btn}>Login</Link>
            <Link href="/auth/register" className={styles.btn}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}