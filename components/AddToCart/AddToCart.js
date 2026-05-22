"use client";
import { useState } from "react";
import styles from "./AddToCart.module.css";
import { addToGuestCart } from "@/lib/cart";
import { useSession } from "next-auth/react";

export default function AddToCart({ productId }) {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const handleClick = async () => {
    if (status === "loading") return;

    try {
      setLoading(true);

      if (status === "unauthenticated") {
        addToGuestCart(productId, 1);
        alert("Added to cart (guest) 🛒");
        return;
      }

      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      alert("Added to cart ✅");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}