"use client"

import { motion } from "framer-motion"
import { Bot, Code2, Cloud, Zap, DollarSign, Settings, TrendingUp, Brain } from "lucide-react"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"
import { JSX } from "react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

interface Props {
  lang: Lang
}

export function N8nAdvantage({ lang }: Props) {
  const c = copy[lang]
  const isWorkshop = !!c.workshop
  const t = (isWorkshop ? c.workshop : c) as any

  const iconMap: Record<string, JSX.Element> = {
    bot: <Bot className="w-6 h-6" />,
    code: <Code2 className="w-6 h-6" />,
    cloud: <Cloud className="w-6 h-6" />,
    zap: <Zap className="w-6 h-6" />,
    dollar: <DollarSign className="w-6 h-6" />,
    settings: <Settings className="w-6 h-6" />,
    trending: <TrendingUp className="w-6 h-6" />,
    brain: <Brain className="w-6 h-6" />,
  }

  const title = t.n8nTitle ?? c.advantageTitle
  const intro = t.n8nIntro ?? c.advantageIntro
  const cards = t.n8nCards ?? c.advantageCards
  const quote = t.n8nQuote ?? c.advantageQuote

  return (
    <section id="advantage" className="py-24" style={{ backgroundColor: "#04091A" }}>
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-balance font-serif"
            style={{ color: "#FDFAF4" }}
          >
            {title}
          </h2>
          <p
            className="text-base leading-relaxed max-w-3xl mx-auto"
            style={{ color: "rgba(201,195,181,0.7)" }}
          >
            {intro}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {cards?.map((card: any, i: number) => {
            const Icon = iconMap[card.icon] ?? <Zap className="w-6 h-6" />
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-xl p-6 transition-all border"
                style={{
                  backgroundColor: "#0C1E40",
                  borderColor: "rgba(201,147,58,0.2)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(201,147,58,0.2)")}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div style={{ color: "#D9A84E" }}>{Icon}</div>
                  <h3 className="font-bold text-lg font-serif" style={{ color: "#FDFAF4" }}>
                    {card.title}
                  </h3>
                </div>
                <p className="leading-relaxed text-sm mb-4" style={{ color: "rgba(201,195,181,0.6)" }}>
                  {card.body}
                </p>
                <span
                  className="inline-flex font-mono text-xs px-3 py-1 rounded-full border"
                  style={{
                    backgroundColor: "rgba(217,168,78,0.1)",
                    borderColor: "rgba(217,168,78,0.2)",
                    color: "#D9A84E",
                  }}
                >
                  {card.stat}
                </span>
              </motion.div>
            )
          })}
        </motion.div>

        {quote && (
          <motion.blockquote
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-14 text-center italic max-w-2xl mx-auto border-l-4 pl-6"
            style={{ borderColor: "#D9A84E" }}
          >
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: "rgba(201,195,181,0.8)" }}>
              &ldquo;{quote}&rdquo;
            </p>
          </motion.blockquote>
        )}
      </div>
    </section>
  )
}
