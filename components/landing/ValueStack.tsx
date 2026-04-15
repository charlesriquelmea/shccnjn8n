"use client"

import { motion, useReducedMotion } from "framer-motion"
import { CheckCircle, Medal } from "lucide-react"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

interface Props { lang: Lang; onCtaClick: () => void }

export function ValueStack({ lang, onCtaClick }: Props) {
  const shouldReduce = useReducedMotion()
  const c = copy[lang]

  return (
    <section id="value-stack" className="py-24" style={{ backgroundColor: "#04091A" }}>
      <div className="max-w-2xl mx-auto px-4 md:px-6 relative">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          aria-hidden="true"
        >
          <div
            className="w-96 h-96 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(201,147,58,0.04) 0%, transparent 70%)" }}
          />
        </div>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance font-serif"
          style={{ color: "#FDFAF4" }}
        >
          {c.valueStackTitle}
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "#071228",
            border: "1px solid rgba(201,147,58,0.25)",
          }}
        >
          {/* Items */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {c.valueItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-center justify-between gap-4 px-6 py-4 transition-colors"
                style={{ borderBottom: "1px solid rgba(201,147,58,0.1)" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(201,147,58,0.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: "#D9A84E" }}
                  />
                  <span className="text-sm leading-snug" style={{ color: "rgba(201,195,181,0.85)" }}>
                    {item.label}
                  </span>
                </div>
                <span
                  className="text-sm font-mono line-through shrink-0"
                  style={{ color: "rgba(201,195,181,0.35)" }}
                >
                  {item.price}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Total */}
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ borderBottom: "2px solid rgba(201,147,58,0.2)" }}
          >
            <span className="font-medium" style={{ color: "rgba(201,195,181,0.6)" }}>
              {c.valueTotalLabel}
            </span>
            <span
              className="font-mono line-through text-lg"
              style={{ color: "rgba(201,195,181,0.4)" }}
            >
              {c.valueTotalPrice}
            </span>
          </div>

          {/* Investment */}
          <div
            className="px-6 pb-6 pt-4 flex flex-col gap-2"
            style={{ backgroundColor: "rgba(201,147,58,0.05)" }}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg" style={{ color: "#FDFAF4" }}>
                {c.valueInvestmentLabel}
              </span>
              <motion.span
                className="font-black text-3xl font-mono"
                style={{ color: "#D9A84E" }}
                initial={shouldReduce ? {} : { scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              >
                {c.valueInvestmentPrice}
              </motion.span>
            </div>
            <p className="text-xs" style={{ color: "rgba(201,195,181,0.5)" }}>
              {c.valueInvestmentSub}
            </p>
          </div>
        </motion.div>

        {/* Anchor copy */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-6 text-center text-sm leading-relaxed"
          style={{ color: "rgba(201,195,181,0.6)" }}
        >
          {c.valuePriceAnchor}
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <button
            onClick={onCtaClick}
            className="w-full font-bold text-lg px-8 py-5 rounded-xl transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{
              backgroundColor: "#D9A84E",
              color: "#04091A",
              boxShadow: "0 8px 24px rgba(201,147,58,0.2)",
            }}
          >
            {c.primaryCta}
          </button>
          {/* Member microcopy */}
          <div className="flex items-center gap-2">
            <Medal className="w-4 h-4 shrink-0" style={{ color: "#D9A84E" }} />
            <p className="text-xs" style={{ color: "rgba(201,195,181,0.55)" }}>
              {c.formMicrocopy}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
