"use client"

import { motion, useReducedMotion } from "framer-motion"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

// Technologies used by Protolylat
const TECH = [
  { label: "OpenAI GPT", color: "#D9A84E" },
  { label: "Anthropic Claude", color: "#D9A84E" },
  { label: "AWS Cloud", color: "#D9A84E" },
  { label: "Google Cloud", color: "#C9C3B5" },
  { label: "Next.js", color: "#C9C3B5" },
  { label: "WhatsApp Business API", color: "#D9A84E" },
  { label: "n8n Automation", color: "#C9C3B5" },
  { label: "Stripe", color: "#D9A84E" },
  { label: "PostgreSQL", color: "#C9C3B5" },
  { label: "Vercel", color: "#D9A84E" },
  { label: "React", color: "#C9C3B5" },
]

interface Props {
  lang: Lang
}

export function TechTicker({ lang }: Props) {
  const shouldReduce = useReducedMotion()
  const c = copy[lang]

  const badges = (
    <span className="inline-flex items-center gap-3 pr-8">
      {TECH.map((t) => (
        <span
          key={t.label}
          className="inline-flex items-center font-mono text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
          style={{
            color: t.color,
            border: `1px solid ${t.color}44`,
            backgroundColor: `${t.color}14`,
          }}
        >
          {t.label}
        </span>
      ))}
      <span
        className="text-xs font-medium whitespace-nowrap px-4"
        style={{ color: "rgba(201,195,181,0.5)" }}
      >
        {c.techTickerSuffix}
      </span>
    </span>
  )

  return (
    <div
      className="py-3 overflow-hidden"
      style={{
        backgroundColor: "#071228",
        borderTop: "1px solid rgba(201,147,58,0.15)",
        borderBottom: "1px solid rgba(201,147,58,0.15)",
      }}
    >
      <div className="flex items-center gap-4 px-4">
        <span
          className="text-xs font-semibold whitespace-nowrap shrink-0 pr-4"
          style={{
            color: "#D9A84E",
            borderRight: "1px solid rgba(201,147,58,0.3)",
          }}
        >
          {c.techTickerPrefix}
        </span>
        <div className="overflow-hidden flex-1">
          {shouldReduce ? (
            <div className="flex flex-wrap gap-2">{badges}</div>
          ) : (
            <motion.div
              className="flex"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
              {badges}
              {badges}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
