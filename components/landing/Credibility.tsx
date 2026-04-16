"use client"

import { motion } from "framer-motion"
import { Building2, Wrench, Star, DollarSign, Settings, TrendingUp, Brain, Clock, Zap, Shield } from "lucide-react"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"
import { JSX } from "react"

interface Props {
  lang: Lang
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export function Credibility({ lang }: Props) {
  const c = copy[lang]
  const isWorkshop = !!c.workshop
  const t = (isWorkshop ? c.workshop : c) as any

  if (!t.credibilityCards) return null

  const iconMap: Record<string, JSX.Element> = {
    Building2: <Building2 className="w-5 h-5" />,
    Wrench: <Wrench className="w-5 h-5" />,
    Star: <Star className="w-5 h-5" />,
    dollar: <DollarSign className="w-5 h-5" />,
    settings: <Settings className="w-5 h-5" />,
    trending: <TrendingUp className="w-5 h-5" />,
    brain: <Brain className="w-5 h-5" />,
    clock: <Clock className="w-5 h-5" />,
    zap: <Zap className="w-5 h-5" />,
    shield: <Shield className="w-5 h-5" />,
  }

  return (
    <section id="credibilidad" className="py-24" style={{ backgroundColor: "#04091A" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
        >
          <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "#D9A84E" }}>
            {t.credibilityTitle}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-balance font-serif" style={{ color: "#FDFAF4" }}>
            {t.credibilitySubtitle}
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {t.credibilityCards.map((card: any, i: number) => {
            const Icon = iconMap[card.icon] ?? <Star className="w-5 h-5" />
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl p-6 flex flex-col gap-4 transition-all border"
                style={{
                  backgroundColor: "#0C1E40",
                  borderColor: "rgba(201,147,58,0.2)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(201,147,58,0.2)")}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "rgba(217,168,78,0.1)",
                    color: "#D9A84E",
                  }}
                >
                  {Icon}
                </div>
                <div>
                  <h3 className="font-bold text-base mb-2 text-balance font-serif" style={{ color: "#FDFAF4" }}>
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(201,195,181,0.6)" }}>
                    {card.body}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
