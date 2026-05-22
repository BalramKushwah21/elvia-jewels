import { prisma } from "@/lib/prisma";
import AddToCart from "@/components/AddToCart/AddToCart";
import styles from "./collection.module.css";
import CollectionHeader from "@/components/CollectionHeader/CollectionHeader";
import Image from "next/image";

export default async function Category({ params }) {
  const { category } = await params;

  const products = await prisma.product.findMany({
    where: {
      category: {
        equals: category,
        mode: "insensitive",
      },
    },
  });

  return (
    <div className={styles.container}>
      <CollectionHeader title={category} />
      <div className={styles.productsGrid}>
        {products.map((p) => (
          <div key={p.id} className={styles.productCard}>
            <Image src={p.image} className={styles.productImage} alt={p.name}
            width={100}
            height={300}
            />

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
