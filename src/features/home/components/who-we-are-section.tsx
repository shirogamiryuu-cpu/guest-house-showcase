"use client"

import Link from "next/link"
import { ArrowRight, Globe, Users, Award, Heart } from "lucide-react"
import { motion } from "framer-motion"
import type { WhoWeAreSectionProps } from "../types/type"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Users,
  Award,
  Heart,
}

const gradients = [
  "from-[#131a3f] to-[#3343a5]",
  "from-[#3343a5] via-[#253179] to-[#3343a5]",
  "from-[#3343a5] via-[#243076] to-[#3343a5]",
  "from-[#3343a5] to-[#131a3f]",
]

export function WhoWeAreSection({
  features,
  events,
  eyebrow = "WHO WE ARE",
  title = "Empowering Youths Through Actions",
  description = "",
  ctaLabel = "Learn More",
  eventsTitle = "Upcoming Events",
}: WhoWeAreSectionProps) {
  return (
    <section className="bg-white px-5 py-6 md:px-8 md:py-7.5 lg:px-21.25">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        {/* Left — About part */}
        <div className="flex flex-col gap-5">
          {/* Text section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-4 md:gap-5"
          >
            <div className="flex flex-col gap-1 md:gap-1.25">
              <span className="bg-linear-to-r from-[#00a5eb] to-[#3343a5] bg-clip-text font-sans text-base font-bold text-transparent md:text-lg">
                {eyebrow}
              </span>
              <h2 className="font-sans text-2xl font-medium leading-tight text-[#131626] md:text-3xl lg:text-4xl">
                {title}
              </h2>
            </div>
            <p className="max-w-lg font-sans text-base font-extralight leading-relaxed text-[#3343a5] md:text-lg lg:text-xl">
              {description}
            </p>
          </motion.div>

          {/* Feature blocks - 2x2 grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:w-150 lg:w-193.25">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon] ?? Globe
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                  className={`flex items-center gap-3 rounded-[15px] bg-linear-to-r ${gradients[index]} p-4 md:gap-3.5 md:p-5`}
                >
                  <div className="flex size-8 shrink-0 items-center justify-center md:size-10">
                    <Icon className="size-5 text-[#f3f3f3] md:size-6.25" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-sans text-base font-medium text-[#eef0ff] md:text-lg lg:text-xl">
                      {feature.title}
                    </h3>
                    <p className="font-sans text-xs font-extralight text-[#eef0ff] md:text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA */}
          <Link
            href="/about"
            className="group inline-flex w-fit items-center gap-2 rounded-[10px] bg-linear-to-r from-[#131a3f] to-[#00a5eb] px-5 py-2.5 font-sans text-base font-semibold text-[#eef0ff] transition-opacity hover:opacity-90 md:gap-3 md:px-7.5 md:py-3.5 md:text-xl"
          >
            {ctaLabel}
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1 md:size-6" />
          </Link>
        </div>

        {/* Right — Upcoming events */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex w-full flex-col gap-4 rounded-[10px] bg-[#6e7ee0]/20 p-5 shadow-[0_5px_13.125px_rgba(0,0,0,0.25)] md:p-[23px_30px_48px] lg:w-87.5"
        >
          <h3 className="font-sans text-xl font-semibold text-[#131626] md:text-[25px]">
            {eventsTitle}
          </h3>
          {events.map((event) => (
            <div
              key={event.title}
              className="rounded-[15px] bg-white p-4 md:p-5"
            >
              <h4 className="font-sans text-sm font-semibold text-[#131626] md:text-base">
                {event.title}
              </h4>
              <p className="mt-1 font-sans text-xs font-extralight text-[#555] md:text-sm">
                {event.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
