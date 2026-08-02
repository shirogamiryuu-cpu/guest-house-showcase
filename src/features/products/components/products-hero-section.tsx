"use client"

import { motion } from "framer-motion"
import { figmaImages } from "../utils/utils"

export function ProductsHeroSection() {
  return (
    <section className="bg-[#131a3f] px-5 py-10 md:px-8 md:py-14 lg:px-21.25 lg:py-16">
      <div className="mx-auto flex max-w-360 flex-col items-center gap-8 lg:flex-row lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative aspect-3/2 w-full shrink-0 overflow-hidden rounded-[15px] shadow-[0_4px_3.5px_rgba(0,0,0,0.25)] lg:h-88.75 lg:w-133.25 lg:aspect-auto"
        >
          <img
            src={figmaImages[0]}
            alt="Best selling products"
            className="absolute inset-0 size-full object-cover"
          />
        </motion.div>

        <div className="hidden h-88 w-0 shrink-0 border-l border-white/80 lg:block" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left"
        >
          <h1 className="font-serif text-4xl font-bold leading-[1.2] text-white sm:text-5xl md:text-6xl">
            Best Selling Products
          </h1>
          <button className="rounded-[15px] bg-white px-8 py-4 font-serif text-lg text-[#131a3f] shadow-[0_4px_3.5px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-90 md:text-xl">
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  )
}
