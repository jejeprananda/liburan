"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { MediaItem } from "@/lib/destinations";

type MediaGalleryProps = {
  media: MediaItem[];
};

export default function MediaGallery({ media }: MediaGalleryProps) {
  const images = media.filter((item) => item.type === "image");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((current) =>
      current === null ? null : (current - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((current) =>
      current === null ? null : (current + 1) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {media.map((item, index) => {
          if (item.type === "video") {
            return (
              <div
                key={item.src}
                className="col-span-2 overflow-hidden rounded-xl bg-black sm:col-span-3"
              >
                <video
                  src={item.src}
                  controls
                  playsInline
                  className="aspect-video w-full"
                  preload="metadata"
                >
                  Browser Anda tidak mendukung video.
                </video>
              </div>
            );
          }

          const imageIndex = images.findIndex((img) => img.src === item.src);

          return (
            <button
              key={item.src}
              type="button"
              onClick={() => setLightboxIndex(imageIndex)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-100"
            >
              <Image
                src={item.src}
                alt={item.alt ?? `Foto ${index + 1}`}
                fill
                className="object-cover transition group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 200px"
              />
            </button>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Galeri foto"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-white hover:bg-white/20"
            aria-label="Tutup"
          >
            ✕
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
            className="absolute left-4 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20"
            aria-label="Foto sebelumnya"
          >
            ‹
          </button>

          <div
            className="relative h-[70vh] w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt ?? "Foto Highland Camp"}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute right-4 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20"
            aria-label="Foto berikutnya"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
