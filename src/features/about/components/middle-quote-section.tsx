"use client"

import { motion } from "framer-motion"

const quoteVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) =>
    ({
      opacity: 0.7,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.15, ease: "easeOut" },
    }) as const,
} as const

export function MiddleQuoteSection({ words }: { words: string[] }) {
  return (
    <section className="bg-[#131a3f] px-5 py-5 md:px-8 lg:px-12.5">
      <div className="mx-auto flex max-w-360 flex-wrap items-center justify-center gap-3 md:gap-6">
        {words.map((word, i) => (
          <motion.span
            key={word}
            custom={i}
            variants={quoteVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="shrink-0 bg-linear-to-r from-[#eef0ff] to-[#00bfd7] bg-clip-text font-sans text-2xl font-bold leading-[1.2] text-transparent opacity-70 md:text-3xl lg:text-4xl"
          >
            {word}
          </motion.span>
        ))}
      </div>
    </section>
  )
}
