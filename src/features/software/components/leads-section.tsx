"use client"

import { motion } from "framer-motion"
import type { LeadCardProps, LeadsSectionProps } from "../types/type"

function LeadCardRow({ card, index }: LeadCardProps) {
  const isImageLeft = card.imageSide === "left"

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      className="flex w-full flex-col items-center gap-6 rounded-[15px] bg-[#eef0ff]/10 px-5 py-6 md:gap-8 md:px-10 md:py-8 lg:flex-row"
    >
      {isImageLeft ? (
        <>
          {/* Image */}
          <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-[10px] shadow-[0_4px_3.5px_#00000040] lg:h-102.75 lg:w-137.5 lg:aspect-auto">
            <img
              src={card.imageSrc}
              alt={card.title}
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-br from-[#3343a5]/30 to-[#5a67d8]/20" />
          </div>
          {/* Vertical line */}
          <div className="hidden h-96.75 w-0 shrink-0 rotate-[0.074deg] border-l-2 border-white/80 opacity-80 lg:block" />
          {/* Text */}
          <div className="flex flex-1 flex-col gap-4 md:gap-6">
            <h2 className="w-full font-sans text-2xl font-semibold leading-[1.2] text-[#eef0ff] drop-shadow-sm md:text-3xl lg:text-4xl">
              {card.title}
            </h2>
            <p className="w-full text-justify font-sans text-base font-light leading-[1.2] text-[#eef0ff] drop-shadow-sm md:text-lg">
              {card.description}
            </p>
            <button className="w-fit rounded-[15px] bg-[#3343a5] px-5.5 py-2.5 font-mono text-sm font-light text-white transition-opacity hover:opacity-80">
              Register Now
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Text */}
          <div className="flex flex-1 flex-col gap-4 md:gap-6">
            <h2 className="w-full font-sans text-2xl font-semibold leading-[1.2] text-[#eef0ff] drop-shadow-sm md:text-3xl lg:text-4xl">
              {card.title}
            </h2>
            <p className="w-full text-justify font-sans text-base font-light leading-[1.2] text-[#eef0ff] drop-shadow-sm md:text-lg">
              {card.description}
            </p>
            <button className="w-fit rounded-[15px] bg-[#3343a5] px-5.5 py-2.5 font-mono text-sm font-light text-white transition-opacity hover:opacity-80">
              Register Now
            </button>
          </div>
          {/* Vertical line */}
          <div className="hidden h-98.5 w-0 shrink-0 rotate-[-0.073deg] border-l-2 border-white/80 opacity-80 lg:block" />
          {/* Image */}
          <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-[10px] shadow-[0_4px_3.5px_#00000040] lg:h-102.75 lg:w-137.5 lg:aspect-auto">
            <img
              src={card.imageSrc}
              alt={card.title}
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-br from-[#3343a5]/30 to-[#5a67d8]/20" />
          </div>
        </>
      )}
    </motion.div>
  )
}

export function LeadsSection({ cards }: LeadsSectionProps) {
  return (
    <section className="bg-[#131a3f] px-5 py-8 md:px-8 lg:px-14 lg:py-10">
      <div className="mx-auto flex max-w-360 flex-col gap-6 md:gap-7.5">
        {cards.map((card, index) => (
          <LeadCardRow key={card.title} card={card} index={index} />
        ))}
      </div>
    </section>
  )
}
