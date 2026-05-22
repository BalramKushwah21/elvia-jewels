// components/PopupMessage/PopupMessage.jsx
"use client";

import styles from "./PopupMessage.module.css";

export default function PopupMessage({ message, onClose }) {
  if (!message) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h3>Success</h3>
        <p>{message}</p>

        <button type="button" onClick={onClose} className={styles.button}>
          OK
        </button>
      </div>
    </div>
  );
}