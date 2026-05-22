import React from "react";
import styles from "./TopRatedProducts.module.css";
import AddToCart from "@/components/AddToCart/AddToCart";
import { prisma } from "@/lib/prisma";
import SendToStore from "@/components/Client/Client";
import Link from "next/link";
import Image from "next/image";

export default async function TopRatedProducts() {
  let products = [];

  try {
    products = await prisma.product.findMany({
      take: 6,
    });
  } catch (error) {
    console.error("DB ERROR:", error);
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.container}>
        {products.length === 0 ? (
          <p style={{ textAlign: "center" }}>Loading products...</p>
        ) : (
          products.map((p) => (
            <div key={p.id} className={styles.card}>
              <Link href={`/home/store/product/${p.id}`}>
                <Image
                  src={p.image}
                  className={styles.image}
                  alt={p.name}
                  width={200}
                  height={200}
                  style={{ height: "auto" }} 
                />
              </Link>
              <h3 className={styles.name}>{p.name}</h3>
              <h3 className={styles.description}>{p.description}</h3>
              <p className={styles.price}>₹{p.price}</p>

              <AddToCart productId={p.id} image={p.image} />
            </div>
          ))
        )}
      </div>

      <SendToStore />
    </div>
  );
}
