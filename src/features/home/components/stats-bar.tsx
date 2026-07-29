"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import type { StatCounterProps, StatsBarProps } from "../types/type"

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const start = performance.now()

          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { ref, count }
}

function StatCounter({ stat }: StatCounterProps) {
  const numStr = stat.value.replace(/[^\d]/g, "")
  const suffix = stat.value.replace(/[\d]/g, "")
  const target = parseInt(numStr, 10) || 0
  const { ref, count } = useCountUp(target)

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 md:gap-5">
      <div className="font-sans text-3xl font-medium leading-[1.2] text-white md:text-4xl lg:text-[49px]">
        {count}{suffix}
      </div>
      <div className="font-sans text-xl font-medium leading-[1.2] text-[#eef0ff] md:text-2xl lg:text-[31px]">
        {stat.label}
      </div>
    </div>
  )
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="bg-linear-to-b from-[#131626] to-[#3343a5] px-5 py-6 md:px-8 md:py-7.5 lg:px-21.25">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-6 md:gap-8 lg:flex lg:items-center lg:justify-between lg:gap-12.5"
      >
        {stats.map((stat) => (
          <StatCounter key={stat.label} stat={stat} />
        ))}
      </motion.div>
    </section>
  )
}
