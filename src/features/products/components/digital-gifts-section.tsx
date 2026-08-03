"use client"

import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { ProductCard } from "./product-card"
import { figmaImages } from "../utils/utils"
import { useProducts } from "@/integrations/supabase/use-content"

export function DigitalGiftsSection() {
  const { data: products } = useProducts()

  return (
    <section className="bg-white px-5 py-10 md:px-8 md:py-14 lg:px-21.25 lg:py-16">
      <div className="mx-auto flex max-w-360 flex-col gap-10">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-1 flex-col gap-4 text-center lg:text-left"
          >
            <h2 className="font-serif text-3xl font-bold leading-[1.2] text-[#131a3f] sm:text-4xl md:text-5xl">
              Digital Gifts
            </h2>
            <p className="font-serif text-xl italic text-[#3343a5] md:text-2xl">
              For Your Loved Ones
            </p>
            <p className="max-w-2xl text-justify font-serif text-base italic text-[#424243] md:text-lg">
              Your loved ones are important. Someone who&rsquo;s always by your
              side whatever you&rsquo;re going through. Surprise them with a
              warming gift of ours. Show them you care!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="relative aspect-3/2 w-full shrink-0 overflow-hidden rounded-[15px] shadow-[0_4px_3.5px_rgba(0,0,0,0.25)] lg:h-88.75 lg:w-133.25 lg:aspect-auto"
          >
            <img
              src={figmaImages[1]}
              alt="Digital gifts"
              className="absolute inset-0 size-full object-cover"
            />
          </motion.div>
        </div>

        <label className="flex w-full items-center gap-3 rounded-[28px] bg-[#ece6f0] px-6 py-4 lg:w-90">
          <Search className="size-5 shrink-0 text-[#49454f]" />
          <input
            type="text"
            placeholder="Hinted search text"
            className="w-full bg-transparent font-sans text-base text-[#49454f] placeholder:text-[#49454f] focus:outline-none"
          />
        </label>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.1, ease: "easeOut" }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
