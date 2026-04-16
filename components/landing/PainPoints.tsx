"use client"

import { motion } from "framer-motion"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

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

export function PainPoints({ lang }: Props) {
  const c = copy[lang]
  const isWorkshop = !!c.workshop
  const t = (isWorkshop ? c.workshop : c) as any

  // If not workshop, this component normally returns null per stub, 
  // but let's make it work for both if text exists.
  if (!t.pains && !t.painTitle) return null

  return (
    <section id="pain-points" className="py-24" style={{ backgroundColor: "#04091A" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-3xl sm:text-4xl font-bold mb-12 text-center text-balance font-serif"
          style={{ color: "#FDFAF4" }}
        >
          {t.painTitle}
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-4 mb-6"
        >
          {t.pains?.map((pain: any, i: number) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-xl p-5 transition-all border"
              style={{
                backgroundColor: "#0C1E40",
                borderColor: "rgba(201,147,58,0.2)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(201,147,58,0.2)")}
            >
              <div className="text-2xl mb-2">{pain.icon}</div>
              <p className="font-medium leading-snug" style={{ color: "#FDFAF4" }}>
                {pain.title}
              </p>
              {pain.sub && (
                <p className="text-sm mt-1" style={{ color: "rgba(201,195,181,0.6)" }}>
                  {pain.sub}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Featured pain */}
        {t.painFeaturedTitle && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-xl p-6 sm:p-8 border-2"
            style={{
              backgroundColor: "#0C1E40",
              borderColor: "rgba(217,168,78,0.4)",
              boxShadow: "0 0 32px rgba(217,168,78,0.1)",
            }}
          >
            <div className="text-3xl mb-3">{t.painFeaturedIcon}</div>
            <h3 className="text-xl font-bold mb-2 font-serif" style={{ color: "#D9A84E" }}>
              {t.painFeaturedTitle}
            </h3>
            <p className="leading-relaxed" style={{ color: "rgba(201,195,181,0.8)" }}>
              {t.painFeaturedBody}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
