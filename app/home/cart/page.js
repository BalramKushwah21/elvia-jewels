export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import CartClient from "@/components/CartClient/CartClient";


export default async function CartPage() {

  let session = null;
  let cartItems = []; // ✅ define here (global to function)

  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Session Error:", error);
  }

  if (session?.user?.email) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (user) {
        const cart = await prisma.cart.findFirst({
          where: { userId: user.id },
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        });

        cartItems = cart?.items || []; // ✅ assign here
      }
    } catch (err) {
      console.error("DB Error:", err);
    }
  }

  return (
    <div>
      <h1>Your Cart</h1>

      {/* ✅ now it exists */}
      <CartClient cartItems={cartItems}/>
    </div>
  );
}




// export default async function CartPage() {
//   //  const [checked, setChecked] = useState(false);
//   let session = null;

//   // ✅ Prevent crash
//   try {
//     session = await getServerSession(authOptions);
//   } catch (error) {
//     console.error("Session Error:", error);
//   }

//   let cartItems = [];

//   // ✅ Fetch cart safely
//   if (session?.user?.email) {
//     try {
//       const user = await prisma.user.findUnique({
//         where: { email: session.user.email },
//       });

//       if (user) {
//         const cart = await prisma.cart.findFirst({
//           where: { userId: user.id },
//           include: {
//             items: {
//               include: {
//                 product: true,
//               },
//             },
//           },
//         });

//         cartItems = cart?.items || [];
//       }
//     } catch (err) {
//       console.error("DB Error:", err);
//     }
//   }

//   // ✅ Calculate total
//   const total = cartItems.reduce((acc, item) => {
//     return acc + (item?.product?.price || 0) * (item?.quantity || 0);
//   }, 0);

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Your Cart</h1>

//       {!session && (
//         <p className={styles.guestText}>
//           You are browsing as guest. Login to save your cart.
//         </p>
//       )}

//       {/* 🔥 2 COLUMN GRID */}
//       <div className={styles.cartGrid}>
//         {/* LEFT SIDE */}
//         <div className={styles.itemsSection}>
//           {cartItems.length === 0 ? (
//             <p className={styles.empty}>Your cart is empty</p>
//           ) : (
//             cartItems.map((item) => (
//               <div key={item.id} className={styles.cartItem}>
//                 <img
//                   src={item?.product?.image || "/placeholder.png"}
//                   alt={item?.product?.name || "product"}
//                   className={styles.image}
//                 />

//                 <div>
//                   <p className={styles.productName}>{item?.product?.name}</p>

//                   <p className={styles.price}>₹{item?.product?.price}</p>

//                   <p className={styles.qty}>Qty: {item?.quantity}</p>

//                   {/* 🔥 BUTTONS */}
//                   <div className={styles.actionBtns}>
//                     {/* Remove */}
//                     <button className={styles.removeBtn}>Remove</button>

//                     {/* ❤️ Wishlist Heart */}
//                     <button className={styles.wishlistIcon}>
//                       <span className={styles.heart}>❤️</span>

//                       <span>Add to Wishlist</span>
//                     </button>
//                     <input
//                       type="checkbox"
//                       // checked={checked}
//                       // onChange={() => setChecked(!checked)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* RIGHT SIDE */}
//         <div className={styles.summary}>
//           <h2 className={styles.total}>Total: ₹{total}</h2>

//           {!session ? (
//             <p>Please login to checkout</p>
//           ) : total > 0 ? (
//             <Link href="/home/checkout">
//               <button className={styles.checkoutBtn}>
//                 Proceed to Checkout
//               </button>
//             </Link>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// }
