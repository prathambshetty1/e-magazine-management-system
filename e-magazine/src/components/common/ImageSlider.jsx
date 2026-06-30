import { useEffect, useState } from "react";

import campus1 from "@/assets/images/campus1.jpg";
import campus2 from "@/assets/images/campus2.jpg";
import campus3 from "@/assets/images/campus3.jpg";
import campus4 from "@/assets/images/campus4.jpg";

const slides = [
  campus1,
  campus2,
  campus3,
  campus4,
];

function ImageSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-1/2 h-screen overflow-hidden">

      {slides.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Campus ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/35"></div>

      {/* Slider Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-white w-8"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>

    </div>
  );
}

export default ImageSlider;