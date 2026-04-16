"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Bot, Code2, Cloud, Zap } from "lucide-react"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const ICONS = [
  <Bot key="bot" className="w-6 h-6" style={{ color: "#D9A84E" }} />,
  <Code2 key="code" className="w-6 h-6" style={{ color: "#D9A84E" }} />,
  <Cloud key="cloud" className="w-6 h-6" style={{ color: "#D9A84E" }} />,
  <Zap key="zap" className="w-6 h-6" style={{ color: "#D9A84E" }} />,
]

interface Props {
  lang: Lang
}

export function N8nAdvantage({ lang }: Props) {
  const c = copy[lang]

  return (
    <section id="advantage" className="py-24" style={{ backgroundColor: "#071228" }}>
      <div className="max-w-6xl  mx-auto px-4 md:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-4"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-balance font-serif"
            style={{ color: "#FDFAF4" }}
          >
            {c.advantageTitle}
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
            style={{ color: "rgba(201,195,181,0.7)" }}
          >
            {c.advantageIntro}
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12"
        >
          {c.advantageCards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-xl p-6 transition-all"
              style={{
                backgroundColor: "#0C1E40",
                border: "1px solid rgba(201,147,58,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,147,58,0.45)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,147,58,0.2)"
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                {ICONS[i]}
                <h3 className="font-bold text-lg" style={{ color: "#FDFAF4" }}>
                  {card.title}
                </h3>
              </div>
              <p
                className="leading-relaxed text-sm mb-4"
                style={{ color: "rgba(201,195,181,0.7)" }}
              >
                {card.body}
              </p>
              <span
                className="inline-flex font-mono text-xs px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "rgba(201,147,58,0.1)",
                  border: "1px solid rgba(201,147,58,0.3)",
                  color: "#D9A84E",
                }}
              >
                {card.stat}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.blockquote
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 text-center border-l-4 pl-6 max-w-2xl mx-auto"
          style={{ borderColor: "#C9933A" }}
        >
          <p
            className="text-lg md:text-xl italic leading-relaxed"
            style={{ color: "rgba(201,195,181,0.8)" }}
          >
            &ldquo;{c.advantageQuote}&rdquo;
          </p>
        </motion.blockquote>
      </div>
    </section>
  )
}
