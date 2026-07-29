"use client"

import { motion } from "framer-motion"
import type { MissionVisionData, ValueItem, MissionVisionValuesProps } from "../types/type"
import { BookIcon, KeyboardIcon, DollarIcon } from "./icons"

const GRADIENT_MAP = {
  book: { from: "#eef0ff", to: "#00bfd7" },
  keyboard: { from: "#eef0ff", to: "#01d2ef" },
  dollar: { from: "#00bfd7", to: "#eef0ff" },
} as const

function iconFor(type: MissionVisionData["icon"]) {
  switch (type) {
    case "book":
      return <BookIcon />
    case "keyboard":
      return <KeyboardIcon />
    case "dollar":
      return <DollarIcon />
  }
}

function MissionVisionCard({ data }: { data: MissionVisionData }) {
  const gradient = GRADIENT_MAP[data.icon]
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex size-16 items-center justify-center md:size-20">{iconFor(data.icon)}</div>
      <h3
        className="w-full bg-linear-to-r bg-clip-text text-center font-sans text-2xl font-medium leading-[1.2] text-transparent md:text-3xl"
        style={{
          backgroundImage: `linear-gradient(-450deg, ${gradient.from}, ${gradient.to})`,
        }}
      >
        {data.title}
      </h3>
      {data.description && (
        <p className="w-full text-justify font-sans text-base font-medium leading-relaxed text-[#fbfcff]">
          {data.description}
        </p>
      )}
    </div>
  )
}

function ValuesList({ values }: { values: ValueItem[] }) {
  return (
    <div className="flex w-full flex-col items-center gap-0.5">
      {values.map((v) => (
        <span
          key={v.label}
          className="w-full text-center font-sans text-base font-medium leading-[1.2] text-[#fbfcff]"
        >
          {v.label}
        </span>
      ))}
    </div>
  )
}

export function MissionVisionValues({ missionVision, values }: MissionVisionValuesProps) {
  return (
    <section className="bg-[#131a3f] px-5 py-6 md:px-8 lg:px-21.25">
      <div className="mx-auto flex max-w-360 flex-col items-center gap-10 md:flex-row md:items-start md:justify-around md:gap-8">
        {missionVision.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
            className={
              item.icon === "dollar"
                ? "w-full shrink-0 md:w-64"
                : "flex w-full shrink-0 flex-col items-center md:w-80"
            }
          >
            {item.icon === "dollar" ? (
              <div className="flex flex-col items-center gap-2">
                <div className="flex size-16 items-center justify-center md:size-20">
                  {iconFor(item.icon)}
                </div>
                <h3
                  className="w-full bg-linear-to-r bg-clip-text text-center font-sans text-2xl font-medium leading-[1.2] text-transparent md:text-3xl"
                  style={{
                    backgroundImage: `linear-gradient(-450deg, ${GRADIENT_MAP.dollar.from}, ${GRADIENT_MAP.dollar.to})`,
                  }}
                >
                  {item.title}
                </h3>
                <ValuesList values={values} />
              </div>
            ) : (
              <MissionVisionCard data={item} />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
