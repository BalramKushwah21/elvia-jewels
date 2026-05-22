"use client";
import { useState } from "react";
import styles from "./slider.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function Slider() {
  const [visibleSlides, setVisibleSlides] = useState(8);

// //this is for touch events on mobile devices to swipe the slider left and right

//   const [touchStartX, setTouchStartX] = useState(0);
// const [touchEndX, setTouchEndX] = useState(0);

// const handleTouchStart = (e) => {
//   setTouchStartX(e.touches[0].clientX);
// };

// const handleTouchMove = (e) => {
//   setTouchEndX(e.touches[0].clientX);
// };

// const handleTouchEnd = () => {
//   const distance = touchStartX - touchEndX;
//   const minSwipeDistance = 20;

//   if (distance > minSwipeDistance) {
//     // 👉 swipe left → next
//     nextSlide();
//   } else if (distance < -minSwipeDistance) {
//     // 👉 swipe right → prev
//     prevSlide();
//   }
// };

useEffect(() => {
  const updateSlides = () => {
    if (window.innerWidth < 768) {
      setVisibleSlides(2); // mobile
    } else if (window.innerWidth < 1024) {
      setVisibleSlides(4); // tablet
    } else {
      setVisibleSlides(8); // desktop
    }
  };

  updateSlides();
  window.addEventListener("resize", updateSlides);

  return () => window.removeEventListener("resize", updateSlides);
}, []);


  const [index, setIndex] = useState(0);
  
  const router = useRouter();





  
  const nextSlide = () => {
    if (index < slides.length - visibleSlides) {
      setIndex(index + 1);
    }
  };
  
  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  
  const slides = [
    {
      img: "/category/bracelet.png",
      title: "Bracelet",
      price: "₹199",
    },
    {
      img: "/category/bangle.png",
      title: "Bangles",
      price: "₹249",
    },
    {
      img: "/category/ring.png",
      title: "Ring",
      price: "₹299",
    },
    {
      img: "/category/earring.png",
      title: "Earring",
      price: "₹349",
    },
    {
      img: "/category/pendant.png",
      title: "Pendants",
      price: "₹399",
    },
    {
      img: "/category/anklet.png",
      title: "Anklet",
      price: "₹399",
    },
    {
      img: "/category/sets.png",
      title: "Sets",
      price: "₹399",
    },
    {
      img: "/category/mangalsutras.png",
      title: "Mangalsutras",
      price: "₹399",
    },
    
    {
      img: "/category/meninsilver.png",
      title: "Men-In-Silver",
      price: "₹399",
    },
  ];
  return (
    
    <div className={styles.sliderContainer}>

    <div
      className={styles.slider}
      // onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      // onTouchEnd={handleTouchEnd}
    >
      <div
        className={styles.sliderTrack}
        style={{
          transform: `translateX(-${index * (100 / visibleSlides)}%)`,
        }}
      >
        {slides.map((slide, i) => (
          <div
            className={styles.slide}
            key={i}
            style={{ minWidth: `${85.6 / visibleSlides}%` }}
          >
            <div className={styles.card}>
              <Image
                className={styles.Image}
                src={slide.img}
                alt={slide.title}
                width={100}
                height={100}
                priority
                onClick={() =>
                router.push(`/collections/${slide.title.toLowerCase()}`)
                }
              />

              <div className={styles.content}>
                <h3>{slide.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <button
      className={`${styles.slider_btn} ${styles.slider_btn_prev}`}
      onClick={prevSlide}
    >
      ❮
    </button>

    <button
      className={`${styles.slider_btn} ${styles.slider_btn_next}`}
      onClick={nextSlide}
    >
      ❯
    </button>
  </div>
);
  
}
