"use client";
import { useState, useEffect } from "react";
import "./imageSlider.css";
import Image from "next/image";

export default function ImageSlider() {
  const images = [
    "/slider/image1.jpeg",
    "/slider/image2.png",
    "/slider/image3.jpeg",
    "/slider/image4.png",
    "/slider/image5.jpeg",
    "/slider/image6.jpeg",
    "/slider/image7.jpeg",
    "/slider/image8.jpeg",
  ];

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const distance = touchStartX - touchEndX;

    const minSwipeDistance = 50; // threshold

    if (distance > minSwipeDistance) {
      // 👉 swipe left → next
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      // 👉 swipe right → prev
      prevSlide();
    }
  };

  // 👉 Auto Slide Logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  // 👉 Manual Controls
  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className="slider_wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchMoveCapture={() => setIsPaused(true)}
      onTouchEndCapture={() => setIsPaused(false)}
    >
      <div
        className="slider_track"
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {images.map((img, i) => (
          <div className="slider_item" key={i}>
            <Image src={img}
            alt="Image"
            width={1500}
            height={500}
            />
            {/* <p className="slider_caption">Image {i + 1}</p> */}
          </div>
        ))}
      </div>

      <button
        className="img_slider_btn img_slider_btn_prev"
        onClick={prevSlide}
      >
        ❮
      </button>
      <button
        className="img_slider_btn img_slider_btn_next"
        onClick={nextSlide}
      >
        ❯
      </button>

      <div className="slider_dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`slider_dot ${i === index ? "slider_dot_active" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}
