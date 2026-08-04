"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Star } from "lucide-react"
import { useProduct, useSiteContent } from "@/integrations/supabase/use-content"
import { contentValue } from "@/features/content/content-schema"

type ProductExtras = {
  detail?: string | null
  gallery?: string[] | null
  telegram_url?: string | null
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: product, loading } = useProduct(id)
  const { data: content } = useSiteContent()

  if (loading) {
    return <div className="px-5 py-16 text-center font-sans text-[#3343a5]">Loading…</div>
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center gap-4 px-5 py-16 text-center">
        <p className="font-sans text-lg text-[#131a3f]">Product not found.</p>
        <Link href="/products" className="font-sans text-sm text-[#3343a5] underline">
          Back to products
        </Link>
      </div>
    )
  }

  const extras = product as unknown as ProductExtras
  const gallery = Array.isArray(extras.gallery) ? extras.gallery.filter(Boolean) : []
  const detail = extras.detail ?? ""
  const orderUrl =
    (extras.telegram_url && extras.telegram_url.trim() !== "" ? extras.telegram_url : null) ??
    contentValue(content, "products_telegram_url")
  const orderLabel = contentValue(content, "products_order_label")

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-5 py-10 md:px-8 md:py-14">
      <Link href="/products" className="flex w-fit items-center gap-1.5 font-sans text-sm text-[#3343a5]">
        <ArrowLeft className="size-4" />
        Back to products
      </Link>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-[15px] md:w-1/2">
          <img
            src={product.image_url}
            alt={product.name}
            className="absolute inset-0 size-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <h1 className="font-serif text-3xl text-[#131a3f]">{product.name}</h1>
          <p className="font-serif text-base text-[#424243]">{product.subtitle}</p>

          <div className="flex items-center gap-1">
            <span className="font-serif text-lg font-light text-[#131a3f]">{product.rating}</span>
            <Star className="size-4 fill-[#1d1b20] text-[#1d1b20]" />
          </div>

          <span className="font-serif text-2xl text-[#3343a5]">${product.price}</span>

          {product.description && (
            <p className="whitespace-pre-line font-sans text-base text-[#424243]">
              {product.description}
            </p>
          )}

          {orderUrl && (
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-2 rounded-[15px] bg-[#3343a5] px-6 py-3 font-sans text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Send className="size-4" />
              {orderLabel}
            </a>
          )}
        </div>
      </div>

      {detail.trim() !== "" && (
        <section className="flex flex-col gap-3">
          <h2 className="font-serif text-2xl text-[#131a3f]">Details</h2>
          <p className="whitespace-pre-line font-sans text-base leading-relaxed text-[#424243]">
            {detail}
          </p>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="font-serif text-2xl text-[#131a3f]">Gallery</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {gallery.map((url, i) => (
              <div key={url + i} className="relative aspect-square overflow-hidden rounded-[12px]">
                <img
                  src={url}
                  alt={`${product.name} photo ${i + 1}`}
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
