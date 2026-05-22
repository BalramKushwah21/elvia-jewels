import { prisma } from "@/lib/prisma";
import AddToCart from "@/components/AddToCart/AddToCart";
import styles from "./gender.module.css";
import CollectionHeader from "@/components/CollectionHeader/CollectionHeader";

export default async function Category({ params }) {
    const { gender } = await params;

  const products = await prisma.product.findMany({
    where: {
      gender: {
        equals: gender,
        mode: "insensitive",
      },
    },
  });

  return (
    <div className={styles.container}>

      <CollectionHeader title={gender} />  
    <div className={styles.productsGrid}>
      {products.map((p) => (
        <div key={p.id} className={styles.productCard}>

          <img src={p.image} className={styles.productImage} alt={p.name}/>

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