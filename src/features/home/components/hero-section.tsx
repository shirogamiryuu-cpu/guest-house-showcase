"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { figmaImages } from "../utils/utils"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#eef0ff]">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-6 md:gap-12 md:px-8 md:py-7.5 lg:grid-cols-2 lg:px-21.25">
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-5 md:space-y-6"
        >
          <h1 className="font-sans text-3xl font-medium leading-tight text-[#131626] sm:text-4xl md:text-5xl lg:text-6xl">
            Building Today,
            <br />
            Inspiring Tomorrow
          </h1>

          <p className="max-w-md font-sans text-base font-extralight leading-relaxed text-[#3343a5] md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>

          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 rounded-[15px] bg-linear-to-r from-[#131a3f] to-[#00a5eb] px-6 py-3 font-sans text-base font-semibold text-[#eef0ff] shadow-[0_4px_3.5px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-90 md:gap-2.5 md:px-7.5 md:py-3.5 md:text-xl"
          >
            Register Now
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1 md:size-6" />
          </Link>
        </motion.div>

        {/* Right — Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative aspect-4/3 overflow-hidden rounded-[15px] shadow-[0_4px_3.5px_rgba(0,0,0,0.25)] md:aspect-650/433">
            <img
              src={figmaImages[0]}
              alt="Hero"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
