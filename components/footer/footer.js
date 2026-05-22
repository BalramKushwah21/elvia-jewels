import styles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      
      {/* Brand */}
      <div className={styles.section}>
        <h4 className={styles.brand}>ELVIA JEWELS</h4>
        <p className={styles.tagline}>
          Where elegance meets timeless craftsmanship.
        </p>

        {/* Social Icons */}
        <div className={styles.socials}>
          <div className={styles.icon}>F</div>
          <div className={styles.icon}>I</div>
          <div className={styles.icon}>T</div>
        </div>
      </div>

      {/* Links */}
      <div className={styles.section}>
        <h4 className={styles.heading}>Quick Links</h4>
        <Link href="/" className={styles.link}>Home</Link>
        <Link href="/home/store" className={styles.link}>Shop</Link>
        <Link href="/home/contactus" className={styles.link}>Contact</Link>
      </div>

      {/* Collections */}
      <div className={styles.section}>
        <h4 className={styles.heading}>Collections</h4>
        <Link href="/collections/ring" className={styles.link}>Ring</Link>
        <Link href="/collections/bangles" className={styles.link}>Bangles</Link>
        <Link href="/collections/men-in-silver" className={styles.link}>Men In Silver</Link>
      </div>

      {/* Newsletter */}
      <div className={styles.section}>
        <h4 className={styles.heading}>Stay Updated</h4>
        <p className={styles.tagline}>
          Subscribe for latest collections & offers.
        </p>

        <div className={styles.newsletter}>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.input}
          />
          <button className={styles.subscribeBtn}>Join</button>
        </div>
      </div>

      {/* Bottom */}
      <div className={styles.bottom}>
        © {new Date().getFullYear()} Elvia Jewels — Crafted with elegance.
      </div>
    </footer>
  );
}