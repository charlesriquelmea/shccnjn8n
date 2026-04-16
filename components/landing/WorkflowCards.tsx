"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

// Accent color configs for each service card
const ACCENT_CONFIGS = {
  gold: {
    badgeBg: "rgba(201,147,58,0.12)",
    badgeBorder: "rgba(201,147,58,0.35)",
    badgeText: "#D9A84E",
    hoverBorder: "rgba(201,147,58,0.45)",
    defaultBorder: "rgba(201,147,58,0.2)",
    stackBg: "rgba(201,147,58,0.08)",
    stackText: "#D9A84E",
  },
  burgundy: {
    badgeBg: "rgba(123,29,46,0.2)",
    badgeBorder: "rgba(123,29,46,0.5)",
    badgeText: "#E8748A",
    hoverBorder: "rgba(123,29,46,0.6)",
    defaultBorder: "rgba(123,29,46,0.25)",
    stackBg: "rgba(123,29,46,0.1)",
    stackText: "#E8748A",
  },
  navy: {
    badgeBg: "rgba(17,37,88,0.4)",
    badgeBorder: "rgba(201,147,58,0.2)",
    badgeText: "#93A8D4",
    hoverBorder: "rgba(201,147,58,0.4)",
    defaultBorder: "rgba(201,147,58,0.15)",
    stackBg: "rgba(17,37,88,0.3)",
    stackText: "#93A8D4",
  },
} as const

interface Props {
  lang: Lang
  onCtaClick: () => void
}

export function WorkflowCards({ lang, onCtaClick }: Props) {
  const shouldReduce = useReducedMotion()
  const c = copy[lang]
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section id="services" className="py-24" style={{ backgroundColor: "#04091A" }}>
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Section header */}
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
            {c.servicesSectionTitle}
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "rgba(201,195,181,0.7)" }}
          >
            {c.servicesSectionIntro}
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="flex flex-col gap-8">
          {c.services.map((service, i) => {
            const accent = ACCENT_CONFIGS[service.accentColor as keyof typeof ACCENT_CONFIGS]
            const isHovered = hoveredCard === i

            return (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-6 md:p-8 transition-all cursor-default"
                style={{
                  backgroundColor: "#071228",
                  border: `1px solid ${isHovered ? accent.hoverBorder : accent.defaultBorder}`,
                  boxShadow: isHovered ? "0 8px 32px rgba(0,0,0,0.3)" : "none",
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Top badges */}
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full font-mono"
                    style={{
                      backgroundColor: accent.badgeBg,
                      border: `1px solid ${accent.badgeBorder}`,
                      color: accent.badgeText,
                    }}
                  >
                    {service.badge}
                  </span>
                  <div className="flex items-center gap-1.5 ml-auto">
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: "#22C55E" }}
                    />
                    <span className="text-xs font-mono font-semibold" style={{ color: "#22C55E" }}>
                      ACTIVO
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-xl md:text-2xl font-bold mb-4"
                  style={{ color: "#FDFAF4" }}
                >
                  {service.title}
                </h3>

                {/* Body */}
                <p
                  className="leading-relaxed mb-5"
                  style={{ color: "rgba(201,195,181,0.75)" }}
                >
                  {service.body}
                </p>

                {/* Impact metrics */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {service.impact.map((m) => (
                    <span
                      key={m}
                      className="text-xs px-3 py-1.5 rounded-full font-medium"
                      style={{
                        backgroundColor: "rgba(12,30,64,0.8)",
                        border: "1px solid rgba(201,147,58,0.2)",
                        color: "rgba(201,195,181,0.85)",
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* Stack tags */}
                <div className="flex flex-wrap gap-1.5">
                  {service.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-xs px-2.5 py-1 rounded"
                      style={{
                        backgroundColor: accent.stackBg,
                        color: accent.stackText,
                        border: `1px solid ${accent.badgeBorder}`,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Summary / pricing block */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 rounded-2xl p-8 text-center"
          style={{
            backgroundColor: "#071228",
            border: "1px solid rgba(201,147,58,0.3)",
          }}
        >
          <p
            className="text-base md:text-lg leading-relaxed mb-6"
            style={{ color: "rgba(201,195,181,0.85)" }}
          >
            {c.servicesSummary}
          </p>
          <button
            onClick={onCtaClick}
            className="font-bold px-8 py-4 rounded-xl transition-all 
            hover:opacity-90 hover:-translate-y-0.5"
            style={{
              backgroundColor: "#D9A84E",
              color: "#04091A",
              boxShadow: "0 8px 24px rgba(201,147,58,0.2)",
            }}
          >
            {c.primaryCta}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
