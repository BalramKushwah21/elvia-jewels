"use client";

import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundGlow}></div>

      <div className={`${styles.floatingDiamond} ${styles.d1}`}></div>
      <div className={`${styles.floatingDiamond} ${styles.d2}`}></div>
      <div className={`${styles.floatingDiamond} ${styles.d3}`}></div>
      <div className={`${styles.floatingDiamond} ${styles.d4}`}></div>
      <div className={`${styles.floatingDiamond} ${styles.d5}`}></div>
      <div className={`${styles.floatingDiamond} ${styles.d6}`}></div>

      <div className={styles.card}>
        <div className={styles.loaderWrapper}>
          <div className={styles.outerRing}></div>
          <div className={styles.middleRing}></div>
          <div className={styles.innerRing}></div>
          <div className={styles.centerDiamond}></div>
        </div>

        <h1 className={styles.brandName}>ELVIA</h1>
        <p className={styles.brandSub}>JEWELS</p>

        <div className={styles.progressBar}>
          <div className={styles.shimmer}></div>
        </div>

        <p className={styles.loadingText}>Crafting Elegance...</p>
      </div>
    </div>
  );
}