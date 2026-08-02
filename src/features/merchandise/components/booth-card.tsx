"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { BoothRow } from "../types"

function mapEmbedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
}

export function BoothCard({ booth, seeMoreLabel }: { booth: BoothRow; seeMoreLabel: string }) {
  const [open, setOpen] = useState(false)
  const query = booth.map_query || booth.location_name

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-[15px] bg-white shadow-[0_4px_13px_rgba(19,22,38,0.12)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#eef0ff]">
        <img
          src={booth.image_url || "/Bwtnd.png"}
          alt={booth.title}
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-3 p-5">
        <h3 className="font-sans text-lg font-medium text-[#131626]">{booth.title}</h3>

        {open && (
          <div className="flex flex-col gap-2">
            <dl className="flex flex-col gap-1.5 font-sans text-sm text-[#3343a5]">
              {booth.event_date && (
                <div className="flex gap-2">
                  <dt className="font-medium">Date:</dt>
                  <dd>{booth.event_date}</dd>
                </div>
              )}
              {booth.available_hours && (
                <div className="flex gap-2">
                  <dt className="font-medium">Available Hours:</dt>
                  <dd>{booth.available_hours}</dd>
                </div>
              )}
              {booth.selling_items && (
                <div className="flex gap-2">
                  <dt className="font-medium">Selling Items:</dt>
                  <dd>{booth.selling_items}</dd>
                </div>
              )}
              {booth.location_name && (
                <div className="flex gap-2">
                  <dt className="font-medium">Location:</dt>
                  <dd>{booth.location_name}</dd>
                </div>
              )}
            </dl>

            {query && (
              <div className="overflow-hidden rounded-[10px] border border-[#3343a5]/15">
                <iframe
                  title={`Map for ${booth.title}`}
                  src={mapEmbedUrl(query)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-56 w-full border-0"
                />
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          className="self-start rounded-[15px] bg-[#3343a5] px-5 py-2 font-sans text-sm text-white transition-opacity hover:opacity-85"
        >
          {open ? "See less" : seeMoreLabel}
        </button>
      </div>
    </motion.article>
  )
}
