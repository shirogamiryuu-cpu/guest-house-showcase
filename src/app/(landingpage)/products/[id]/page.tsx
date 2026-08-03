"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Star } from "lucide-react"
import { useProduct } from "@/integrations/supabase/use-content"

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: product, loading } = useProduct(id)

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
        </div>
      </div>
    </div>
  )
}
