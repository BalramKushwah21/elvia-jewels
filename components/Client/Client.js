"use client";
import styles from "./Client.module.css";

import { useRouter } from "next/navigation";

export default function sendToStore() {
  const router = useRouter();

  

  return (
    <button 
    className={styles.showMoreBtn}
    onClick={() => {
    //   alert("Button Clicked");
      router.push("/home/store");
    }}>
      Show More
    </button>
  );
}