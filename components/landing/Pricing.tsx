"use client"

import { motion } from "framer-motion"
import { Users, CheckCircle } from "lucide-react"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

interface Props {
  lang: Lang
  onCtaClick: () => void
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export function Pricing({ lang, onCtaClick }: Props) {
  const c = copy[lang]
  const isWorkshop = !!c.workshop
  const t = (isWorkshop ? c.workshop : c) as any

  if (!t.pricingTiers) return null

  return (
    <>
      {/* ── Value receipt ── */}
      <section id="investment" className="py-24" style={{ backgroundColor: "#04091A" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-balance" style={{ color: "#FDFAF4" }}>
              {t.valueTitle2 ?? t.valueTitle}
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl border overflow-hidden"
            style={{
              backgroundColor: "#0C1E40",
              borderColor: "rgba(201,147,58,0.2)",
            }}
          >
            <ul className="divide-y divide-zinc-700/60" style={{ borderColor: "rgba(201,147,58,0.1)" }}>
              {(t.valueItems2 ?? t.valueItems)?.map((item: any, i: number) => (
                <li key={i} className="flex items-center justify-between gap-4 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-green-400 shrink-0" />
                    <span className="text-sm leading-relaxed" style={{ color: "rgba(201,195,181,0.8)" }}>
                      {item.label}
                    </span>
                  </div>
                  <span className="text-sm font-mono shrink-0 line-through" style={{ color: "rgba(201,195,181,0.4)" }}>
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className="px-6 py-4 flex items-center justify-between border-t"
              style={{ backgroundColor: "#04091A", borderColor: "rgba(201,147,58,0.2)" }}
            >
              <span className="font-semibold" style={{ color: "rgba(201,195,181,0.6)" }}>
                {t.valueTotalLabel2 ?? t.valueTotalLabel}
              </span>
              <span className="line-through text-lg font-bold font-mono" style={{ color: "rgba(201,195,181,0.4)" }}>
                {t.valueTotalPrice2 ?? t.valueTotalPrice}
              </span>
            </div>

            <div
              className="px-6 py-5 flex items-center justify-between border-t"
              style={{ backgroundColor: "rgba(217,168,78,0.05)", borderColor: "rgba(217,168,78,0.3)" }}
            >
              <span className="font-bold text-lg" style={{ color: "#FDFAF4" }}>
                {t.valueYourLabel ?? t.valueInvestLabel}
              </span>
              <motion.span
                initial={{ scale: 1 }}
                whileInView={{ scale: [1, 1.08, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="font-black text-3xl"
                style={{ color: "#D9A84E" }}
              >
                {t.valueYourPrice ?? t.valueInvestPrice} 🔥
              </motion.span>
            </div>
          </motion.div>

          {t.valueAnchor2 && (
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-5 text-center text-sm italic leading-relaxed"
              style={{ color: "rgba(201,195,181,0.5)" }}
            >
              {t.valueAnchor2}
            </motion.p>
          )}
        </div>
      </section>

      {/* ── Pricing tiers ── */}
      <section id="value" className="py-16" style={{ backgroundColor: "#04091A" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-balance" style={{ color: "#FDFAF4" }}>
              {t.pricingTitle}
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-4"
          >
            {t.pricingTiers.map((tier: any, i: number) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`rounded-xl border-2 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all`}
                style={{
                  backgroundColor: tier.highlighted ? "rgba(217,168,78,0.08)" : "#0C1E40",
                  borderColor: tier.highlighted ? "#D9A84E" : "rgba(201,147,58,0.2)",
                }}
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-base" style={{ color: "#FDFAF4" }}>
                      {tier.label}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full border font-semibold"
                      style={{
                        backgroundColor: tier.highlighted ? "rgba(217,168,78,0.2)" : "rgba(201,147,58,0.1)",
                        color: tier.highlighted ? "#D9A84E" : "rgba(201,195,181,0.6)",
                        borderColor: tier.highlighted ? "#D9A84E" : "rgba(201,147,58,0.2)",
                      }}
                    >
                      {tier.badge}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(201,195,181,0.6)" }}>
                    {tier.description}
                  </p>
                  <p className="text-xs font-semibold mt-1" style={{ color: "#4ADE80" }}>
                    {tier.savings}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0">
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`font-black text-2xl ${tier.highlighted ? "text-[#D9A84E]" : "text-white"}`}
                      style={{ color: tier.highlighted ? "#D9A84E" : "#FDFAF4" }}
                    >
                      {tier.price}
                    </span>
                    <span
                      className="text-sm font-mono line-through"
                      style={{ color: "rgba(201,195,181,0.4)" }}
                    >
                      {tier.originalPrice}
                    </span>
                  </div>
                  <button
                    onClick={onCtaClick}
                    className="shrink-0 font-bold px-4 py-2 rounded-lg text-sm transition-all min-h-10 border"
                    style={{
                      backgroundColor: tier.highlighted ? "#D9A84E" : "transparent",
                      color: tier.highlighted ? "#04091A" : "#D9A84E",
                      borderColor: "#D9A84E",
                    }}
                    onMouseEnter={(e) => {
                      if (!tier.highlighted) {
                        e.currentTarget.style.backgroundColor = "rgba(217,168,78,0.1)"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!tier.highlighted) {
                        e.currentTarget.style.backgroundColor = "transparent"
                      }
                    }}
                  >
                    {tier.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Growth hack ── */}
      {t.growthTitle && (
        <section className="pb-16" style={{ backgroundColor: "#04091A" }}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="rounded-2xl border border-dashed p-6 flex flex-col sm:flex-row gap-5 items-start"
              style={{
                backgroundColor: "rgba(217,168,78,0.05)",
                borderColor: "rgba(217,168,78,0.4)",
              }}
            >
              <div className="shrink-0 mt-1">
                <Users className="w-8 h-8" style={{ color: "#D9A84E" }} />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-lg" style={{ color: "#FDFAF4" }}>
                    {t.growthTitle}
                  </h3>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full border font-semibold"
                    style={{
                      backgroundColor: "rgba(217,168,78,0.2)",
                      color: "#D9A84E",
                      borderColor: "rgba(217,168,78,0.4)",
                    }}
                  >
                    {t.growthBadge}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(201,195,181,0.7)" }}>
                  {t.growthBody}
                </p>
                <button
                  onClick={onCtaClick}
                  className="font-bold mt-1 w-fit px-4 py-2 rounded-lg text-sm transition-all border"
                  style={{
                    backgroundColor: "transparent",
                    color: "#D9A84E",
                    borderColor: "#D9A84E",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(217,168,78,0.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {t.growthCta}
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Payment options ── */}
      {(t as any).paymentTitle && (
        <section className="pb-24" style={{ backgroundColor: "#04091A" }}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <motion.h3
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center font-bold mb-6"
              style={{ color: "rgba(201,195,181,0.6)" }}
            >
              {(t as any).paymentTitle}
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(t as any).paymentOptions?.map((opt: any, i: number) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="rounded-xl p-4 text-center border"
                  style={{
                    backgroundColor: opt.highlight ? "rgba(217,168,78,0.1)" : "#0C1E40",
                    borderColor: opt.highlight ? "#D9A84E" : "rgba(201,147,58,0.1)",
                  }}
                >
                  <p className="text-sm font-bold mb-1" style={{ color: "#FDFAF4" }}>
                    {opt.label}
                  </p>
                  <p className="text-xs font-mono" style={{ color: "#D9A84E" }}>
                    {opt.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
