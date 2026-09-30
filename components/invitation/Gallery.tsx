"use client";

import Image from "next/image";
import { useState } from "react";

const images = [
  { src: "/images/gallery-1.jpg", alt: "لحظه‌ای از حسین و مهدیه", large: true },
  { src: "/images/hero.jpg", alt: "تصویر یادگاری", large: false },
] as const;

export default function Gallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <div className="gallery-grid">
        {images.map((image) => (
          <button
            key={image.src}
            type="button"
            className={`gallery-item cinematic ${image.large ? "large" : ""}`}
            onClick={() => setActive(image.src)}
            aria-label="نمایش تصویر بزرگ"
          >
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 800px) 92vw, 430px" />
          </button>
        ))}
      </div>

      {active && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="نمایش تصویر" onClick={() => setActive(null)}>
          <button className="lightbox-close" type="button" onClick={() => setActive(null)} aria-label="بستن">×</button>
          <Image className="lightbox-image" src={active} alt="تصویر بزرگ" width={1125} height={1500} priority />
        </div>
      )}
    </>
  );
}
