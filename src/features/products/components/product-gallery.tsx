"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductGalleryProps {
  images: string[]
  name: string
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [index, setIndex] = useState(0)

  if (images.length === 0) {
    return <div className="relative aspect-4/3 w-full overflow-hidden rounded-[15px] bg-[#eef0ff]" />
  }

  function go(delta: number) {
    setIndex((i) => (i + delta + images.length) % images.length)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-[15px]">
        <img
          src={images[index]}
          alt={`${name} photo ${index + 1}`}
          className="absolute inset-0 size-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute top-1/2 left-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#131a3f] shadow-md hover:bg-white"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute top-1/2 right-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#131a3f] shadow-md hover:bg-white"
            >
              <ChevronRight className="size-5" />
            </button>
            <span className="absolute right-3 bottom-3 rounded-full bg-black/50 px-2.5 py-1 font-sans text-xs text-white">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((url, i) => (
            <button
              key={url + i}
              type="button"
              onClick={() => setIndex(i)}
              className={`relative aspect-square size-16 shrink-0 overflow-hidden rounded-[10px] border-2 ${
                i === index ? "border-[#3343a5]" : "border-transparent"
              }`}
            >
              <img src={url} alt="" className="absolute inset-0 size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
