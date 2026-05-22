import { prisma } from "@/lib/prisma";
import AddToCart from "@/components/AddToCart/AddToCart";
import styles from "./reach.module.css";
import CollectionHeader from "@/components/CollectionHeader/CollectionHeader";

export default async function Category({ params }) {
    const { reach } = await params;
   const num = parseInt(reach);
  const products = await prisma.product.findMany({
    where: {
      price: {
        lt: num,
       
      },
    },
  });

  return (
    <div className={styles.container}>

      <CollectionHeader title={num} />  
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