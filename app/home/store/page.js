import { prisma } from "@/lib/prisma";
import AddToCart from "@/components/AddToCart/AddToCart";
import styles from "./store.module.css";
import Link from "next/link";



export default async function Page() {
  
  const products = await prisma.product.findMany();
 

  return (
    <div className={styles.container}>

      {/* ✅ Top Image with Text */}
      <div className={styles.imageWrapper}>
        <img
          src="/Images/image.jpg"
          alt="Store"
          className={styles.topImage}
        />
        <div className={styles.imageText}></div>
      </div>

      {/* ✅ Products */}
      <div className={styles.productsGrid}>
        {products.map((p) => (
          <div key={p.id} className={styles.productCard}>

            {/* ✅ FIXED IMAGE */}
            <Link href={`/home/store/product/${p.id}`}>
            <img 
              src={p?.image?.trim() ? p.image : "/placeholder.png"} 
              className={styles.productImage} 
              alt={p?.name || "product"}
              />
              </Link>

            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{p.name}</h3>
              <p className={styles.productDescription}>{p.description}</p>
              <p className={styles.productPrice}>₹{p.price}</p>

              <AddToCart productId={p.id} />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}