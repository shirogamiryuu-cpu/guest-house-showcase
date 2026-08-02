"use client"

import { motion } from "framer-motion"
import { BoothCard } from "./booth-card"
import { useBooths, useSiteContent } from "@/features/content/use-content"
import { contentValue } from "@/features/content/content-schema"

export function MerchandisePage() {
  const { data: booths, loading } = useBooths()
  const { data: content } = useSiteContent()

  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-360 px-5 py-10 md:px-8 md:py-14 lg:px-25 lg:py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-brand text-2xl font-semibold text-[#3343a5] md:text-[29px]"
        >
          {contentValue(content, "merch_booths_title")}
        </motion.h1>

        {!loading && booths.length === 0 && (
          <p className="mt-6 font-sans text-sm text-[#3343a5]/70">No booths announced yet.</p>
        )}

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
          {booths.map((booth) => (
            <BoothCard
              key={booth.id}
              booth={booth}
              seeMoreLabel={contentValue(content, "merch_see_more_label")}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
