import styles from "./CollectionHeader.module.css";
import Image from "next/image";
import React from "react";

export default function CollectionHeader({ title }) {
  const imgSrc = `/collection_header_images/${title}.png`;
  console.log(imgSrc);
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}>
        <Image src={imgSrc} alt={title} fill style={{ objectFit: "cover" }} loading="eager" priority />
      </div>

      <div className={styles.content}>
        {/* <h1 className={styles.title}>
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </h1> 

        <p className={styles.subtitle}>Where elegance meets sparkle</p>
        */}

      
      </div>
    </div>
  );
}
