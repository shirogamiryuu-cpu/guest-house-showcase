"use client"

import { motion } from "framer-motion"
import { figmaImages } from "../utils/utils"

export function RelatedProjectsSection() {
  // Duplicate for seamless marquee loop
  const items = [...figmaImages, ...figmaImages]

  return (
    <section className="overflow-hidden px-5 py-8 md:px-8 lg:px-12.5">
      <div className="mx-auto flex max-w-360 flex-col gap-6 md:gap-7.5">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full bg-linear-to-r from-[#3343a5] to-[#131a3f] bg-clip-text font-sans text-2xl font-medium leading-[1.2] text-transparent drop-shadow-sm md:text-3xl lg:text-4xl"
        >
          Related Projects
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mt-2"
        >
          <div className="animate-marquee flex gap-8 py-2">
            {items.map((src, idx) => (
              <div key={idx} className="group relative shrink-0">
                <div className="relative h-56 w-80 overflow-hidden rounded-[15px] shadow-[0_4px_3.5px_#131626]">
                  <img
                    src={src}
                    alt={`Project ${idx + 1}`}
                    className="absolute inset-0 size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-br from-[#3343a5]/30 to-[#5a67d8]/20 opacity-90 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <button className="w-fit rounded-[15px] bg-[#3343a5] px-5.5 py-2.5 font-mono text-sm font-light text-white transition-opacity hover:opacity-80">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
