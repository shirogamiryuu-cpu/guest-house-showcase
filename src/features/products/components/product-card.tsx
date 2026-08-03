import Link from "next/link"
import { Star, ArrowRight } from "lucide-react"
import type { ProductRow } from "@/integrations/supabase/content-types"

export function ProductCard({ product }: { product: ProductRow }) {
  return (
    <div className="flex w-full flex-col gap-2.5 rounded-[15px] border border-[#3343a5]/15 bg-[#eef0ff]/90 p-2.5">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-[10px]">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="absolute inset-0 size-full object-cover opacity-90"
          />
        ) : null}
      </div>
      <div className="flex items-start justify-between gap-4 px-1">
        <div className="flex flex-col">
          <h3 className="font-serif text-lg text-[#131a3f]">{product.name}</h3>
          <p className="font-serif text-xs text-[#424243]">{product.subtitle}</p>
        </div>
        <span className="font-serif text-base text-[#3343a5]">${product.price}</span>
      </div>
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1">
          <span className="font-serif text-lg font-light text-[#131a3f]">{product.rating}</span>
          <Star className="size-4 fill-[#1d1b20] text-[#1d1b20]" />
        </div>
        <Link
          href={`/products/${product.id}`}
          className="flex items-center gap-1.5 rounded-[15px] bg-[#3343a5]/15 px-3 py-2.5 font-serif text-base text-[#131a3f] transition-opacity hover:opacity-80"
        >
          View Details
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  )
}
