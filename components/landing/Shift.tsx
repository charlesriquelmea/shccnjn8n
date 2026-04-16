"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

interface Props {
  lang: Lang
}

export function Shift({ lang }: Props) {
  const c = copy[lang]
  const isWorkshop = !!c.workshop
  const t = (isWorkshop ? c.workshop : c) as any

  // Fallback to non-workshop keys if workshop keys are missing
  const title = (t as any).shiftTitle ?? c.njImpactTitle
  const intro = (t as any).shiftIntro ?? c.njImpactIntro
  const blocks = (t as any).shiftBlocks ?? c.njImpactPrinciples
  const alertTitle = (t as any).alertTitle ?? (c as any).njImpactAlertTitle
  const alertItems = (t as any).alertItems ?? (c as any).njImpactAlertBullets

  return (
    <section id="shift" className="py-24" style={{ backgroundColor: "#04091A" }}>
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-balance font-serif"
            style={{ color: "#FDFAF4" }}
          >
            {title}
          </h2>
          <p
            className="text-base leading-relaxed max-w-3xl"
            style={{ color: "rgba(201,195,181,0.7)" }}
          >
            {intro}
          </p>
        </motion.div>

        {/* Principle blocks */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {blocks?.map((block: any, i: number) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col gap-3 rounded-2xl p-6 border"
              style={{
                backgroundColor: "#0C1E40",
                borderColor: "rgba(201,147,58,0.2)",
              }}
            >
              <span
                className="text-5xl font-black font-mono leading-none"
                style={{ color: "rgba(217,168,78,0.2)" }}
              >
                {block.num}
              </span>
              <h3 className="text-xl font-bold font-serif" style={{ color: "#FDFAF4" }}>
                {block.title}
              </h3>
              <p className="leading-relaxed text-sm" style={{ color: "rgba(201,195,181,0.7)" }}>
                {block.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Alert / Bonus Info */}
        {alertTitle && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-xl p-6 border"
            style={{
              backgroundColor: "rgba(217,168,78,0.05)",
              borderColor: "rgba(217,168,78,0.3)",
            }}
          >
            <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: "#D9A84E" }}>
              <CheckCircle className="w-5 h-5" /> {alertTitle}
            </h3>
            <ul className="flex flex-col gap-2">
              {alertItems?.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(201,195,181,0.8)" }}>
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#4ADE80" }} /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  )
}
