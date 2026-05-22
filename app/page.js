import Image from "next/image";
import React from "react";
import styles from "./home.module.css";
import Slider from "@/components/slider/slider";
import ShowSlider from "@/components/imageSlider/imageSlider";
import { redirect } from "next/navigation";
import { getUserFromToken } from "@/lib/auth.server";
import TopRatedProducts from "@/components/TopRatedProducts/TopRatedProducts";
import Link from "next/link";

export default async function Home() {
  const images = [
    {
      img: "/Card_Images/infinity.png",
      title: "Infinity",
    },
    {
      img: "/Card_Images/water_drops.png",
      title: "Water Drops",
    },
    {
      img: "/Card_Images/knots.png",
      title: "Knots",
    },
    {
      img: "/Card_Images/leaves.png",
      title: "Leaves",
    },
    {
      img: "/Card_Images/moon_and_star.png",
      title: "Moon And Star",
    },
    {
      img: "/Card_Images/bubbles.png",
      title: "Bubbles",
    },
  ];

  return (
    <div className={styles.main}>
      <ShowSlider />
      <Slider />
      <div className={styles.features}>
        <h3 className={styles.item}>Our Features</h3>
        <h3 className={styles.item}>Our Features</h3>
        <h3 className={styles.item}>Our Features</h3>
        <h3 className={styles.item}>Our Features</h3>
        <h3 className={styles.item}>Our Features</h3>
      </div>

      <h3 className={styles.shopByRecipient}>Luxury within Reach</h3>
      <div className={styles.shopByReach}>
        <Link href="/home/store/reach/1500" className={styles.reachBox}>
          Under <br />
          ₹1499
        </Link>
        <Link href="/home/store/reach/2000" className={styles.reachBox}>
          Under <br />
          ₹1999
        </Link>
      </div>

      <h3 className={styles.shopByRecipient}> Shop by Recipient</h3>
      <div className={styles.recipient}>
        <Link href="/home/store/gender/male">
          <Image
            className={styles.recipientImage}
            src="/Images/male.jpeg"
            alt="Recipient"
            width={500}
            height={400}
          />
        </Link>

        <Link href="/home/store/gender/female">
          <Image
            className={styles.recipientImage}
            src="/Images/female.jpeg"
            alt="Recipient"
            width={500}
            height={400}
          />
        </Link>
      </div>
      <TopRatedProducts />
      <div className={styles.poster}>
        <Image
          className={styles.posterImage}
          src={"/Images/Poster.webp"}
          width={1200}
          height={100}
          alt="Poster"
          style={{ height: "auto" }} 
        />

        {/* This is for showcase jewellery */}
        <div className={styles.card_Container}>
          {images.map((item, i) => (
            <div className={styles.card_Image} key={i}>
              <Image
                src={item.img}
                className={styles.Images}
                width={200}
                height={200}
                style={{ height: "auto" }} 
                alt="Image"
              />
              <p className={styles.image_caption}>{item.title}</p>
            </div>
          ))}
        </div>

        <Image
          className={styles.posterImage}
          src={
            "https://www.giva.co/cdn/shop/files/first_access_Collection_Web_2.webp"
          }
          width={1200}
          height={100}
          alt="Poster"
          style={{ height: "auto" }} 
        />
      </div>
    </div>
  );
}
