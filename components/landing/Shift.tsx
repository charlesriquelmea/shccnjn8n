"use client"

import { motion } from "framer-motion"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

interface Props { lang: Lang }

export function Shift({ lang }: Props) {
  const c = copy[lang]

  return (
    <section id="nj-impact" className="py-24" style={{ backgroundColor: "#071228" }}>
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-balance font-serif"
            style={{ color: "#FDFAF4" }}
          >
            {c.njImpactTitle}
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
            style={{ color: "rgba(201,195,181,0.7)" }}
          >
            {c.njImpactIntro}
          </p>
        </motion.div>

        {/* Principle blocks */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14"
        >
          {c.njImpactPrinciples.map((p, i) => (
            <motion.div key={i} variants={fadeUp} className="flex flex-col gap-3">
              <span
                className="text-6xl font-black font-mono leading-none"
                style={{ color: "rgba(201,147,58,0.25)" }}
              >
                {p.num}
              </span>
              <h3 className="text-xl font-bold" style={{ color: "#FDFAF4" }}>
                {p.title}
              </h3>
              <p className="leading-relaxed text-sm" style={{ color: "rgba(201,195,181,0.7)" }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  )
}
