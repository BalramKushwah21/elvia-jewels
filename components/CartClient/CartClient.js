// components/CartClient.js
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./CartClient.module.css";

export default function CartClient({ cartItems }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  // ✅ Calculate only checked items total
  const total = cartItems.reduce((acc, item) => {
    if (selectedItems.includes(item.id)) {
      return acc + item.product.price * item.quantity;
    }
    return acc;
  }, 0);

  return (
    <div className={styles.cartGrid}>
      {/* LEFT */}
      <div className={styles.itemsSection}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => toggleItem(item.id)}
            />

            <img src={item.product.image} className={styles.image} />

            <div>
              <p>{item.product.name}</p>
              <p>₹{item.product.price}</p>
              <p>Qty: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className={styles.summary}>
        <h2>Total: ₹{total}</h2>

        {selectedItems.length > 0 && (
          <Link
            href={{
              pathname: "/home/checkout",
              query: { items: JSON.stringify(selectedItems) },
            }}
          >
            <button className={styles.checkoutBtn}>
              Proceed with Selected
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}