"use client";

import {
  Contact,
  Home,
  LogIn,
  LogOut,
  Menu,
  ShoppingBag,
  Sparkles,
  Store,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Profile from "@/components/Profile/Profile";
import ProfileDropdown from "@/components/ProfileDropdown/ProfileDropdown";
import useCartCount from "@/hooks/useCartCount";
import styles from "./navbar.module.css";
import SearchBar from "@/components/SearchBar/SearchBar";

const navigationLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/home/store", label: "Store", icon: Store },
  { href: "/home/contactus", label: "Contact", icon: Contact },
];

export default function Navbar() {
  const count = useCartCount();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const user = session?.user;
  const closeMenu = () => setOpen(false);
  const mobileLinks = user
    ? [
        { href: "/user/profile", label: "Profile", icon: User },
        ...navigationLinks,
      ]
    : navigationLinks;

  return (
    <nav className={styles.headerNavbar}>
      <div className={styles.navbarBrand}>
        <Image
          src="/icons/logo.jpeg"
          className={styles.logo}
          alt="Elvia Jewels"
          width={40}
          height={40}
        />
        <span>Elvia Jewels</span>
      </div>

      <button
        type="button"
        className={styles.navbarOpen}
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
      >
        <Menu size={22} strokeWidth={2.2} />
      </button>

      <button
        type="button"
        className={`${styles.mobileBackdrop} ${open ? styles.showBackdrop : ""}`}
        onClick={closeMenu}
        aria-label="Close navigation menu"
        tabIndex={open ? 0 : -1}
      />

      <div
        className={`${styles.mobileNavbar} ${open ? styles.showMenu : ""}`}
        aria-hidden={!open}
      >
        <div className={styles.mobileHeader}>
          <div className={styles.mobileBrand}>
            <Image
              src="/icons/logo.jpeg"
              className={styles.mobileLogo}
              alt=""
              width={48}
              height={48}
            />
            <div>
              <span className={styles.userName}> {user && <Profile />}</span>
              <small>Fine silver jewellery</small>
            </div>
          </div>

          <button
            type="button"
            className={styles.navbarClose}
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

       

        <div className={styles.mobileNavGroup}>
          {mobileLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className={`${styles.navLink} ${
                pathname === href ? styles.activeNavLink : ""
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}

          <Link
            href="/home/cart"
            onClick={closeMenu}
            className={`${styles.navLink} ${
              pathname === "/home/cart" ? styles.activeNavLink : ""
            }`}
          >
            <ShoppingBag size={18} />
            <span>Cart</span>
            <strong>{count}</strong>
          </Link>
        </div>

        <div className={styles.mobileActionArea}>
          {user
            ? <button
                type="button"
                className={styles.logoutBtn}
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut size={18} />
                Logout
              </button>
            : <>
                <Link
                  href="/auth/login"
                  onClick={closeMenu}
                  className={styles.mobilePrimaryBtn}
                >
                  <LogIn size={18} />
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={closeMenu}
                  className={styles.mobileSecondaryBtn}
                >
                  <Sparkles size={18} />
                  Register
                </Link>
              </>}
        </div>
      </div>

      <div className={styles.navbarCenter}>
        <SearchBar />
      </div>

      <div className={styles.navbarLinks}>
        {user
          ? <>
              <Link className={styles.navbarLink} href="/">
                Home
              </Link>
              <Link className={styles.navbarLink} href="/home/store">
                Store
              </Link>
              <Link className={styles.navbarLink} href="/home/cart">
                Cart ({count})
              </Link>

              <ProfileDropdown />
            </>
          : <>
              <Link className={styles.navbarLink} href="/">
                Home
              </Link>
              <Link className={styles.navbarLink} href="/home/store">
                Store
              </Link>
              <Link className={styles.navbarLink} href="/home/contactus">
                Contact
              </Link>
              <Link className={styles.navbarLink} href="/home/cart">
                Cart
              </Link>

              <Link href="/auth/login" className={styles.btn}>
                Login
              </Link>
              <Link href="/auth/register" className={styles.btn}>
                Register
              </Link>
            </>}
      </div>
    </nav>
  );
}
