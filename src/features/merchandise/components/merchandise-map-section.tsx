"use client"

import { motion } from "framer-motion"

interface MerchandiseMapSectionProps {
  title: string
  address: string
  query: string
}

export function MerchandiseMapSection({ title, address, query }: MerchandiseMapSectionProps) {
  const location = query.trim() || address.trim()
  if (!location) return null

  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`

  return (
    <section className="px-5 pb-10 md:px-8 md:pb-14 lg:px-21.25 lg:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto flex max-w-360 flex-col gap-6"
      >
        <h2 className="bg-linear-to-r from-[#3343a5] to-[#131a3f] bg-clip-text font-serif text-3xl font-bold leading-[1.2] text-transparent drop-shadow-sm md:text-4xl lg:text-5xl">
          {title}
        </h2>

        <div className="overflow-hidden rounded-[15px] bg-[#131a3f] shadow-[0_4px_3.5px_rgba(0,0,0,0.25)]">
          <div className="relative aspect-16/9 w-full md:aspect-21/9">
            <iframe
              title={title}
              src={embedSrc}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0"
            />
          </div>
          <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-serif text-lg font-light text-white md:text-xl">{address}</p>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit rounded-[15px] bg-white px-5 py-2.5 font-sans text-sm font-semibold text-[#131a3f] transition-opacity hover:opacity-85"
            >
              Get directions
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
