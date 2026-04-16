"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

interface Props {
  lang: Lang
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export function Curriculum({ lang }: Props) {
  const c = copy[lang]
  const isWorkshop = !!c.workshop
  const t = (isWorkshop ? c.workshop : c) as any

  if (!t.modules) return null

  return (
    <section id="curriculum" className="py-24" style={{ backgroundColor: "#04091A" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-3xl sm:text-4xl font-bold mb-12 text-balance font-serif"
          style={{ color: "#FDFAF4" }}
        >
          {t.curriculumTitle}
        </motion.h2>

        <div className="relative">
          {/* Vertical Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 origin-top"
            style={{
              background: "linear-gradient(to bottom, #D9A84E, rgba(201,147,58,0.1))",
            }}
          />

          <div className="flex flex-col gap-6 pl-14 sm:pl-20">
            {t.modules.map((mod: any, i: number) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className={`relative ${mod.isBreak ? "opacity-70" : ""}`}
              >
                {/* Dot */}
                <div
                  className={`absolute -left-14 sm:-left-20 w-4 h-4 rounded-full border-2 top-1`}
                  style={{
                    borderColor: mod.isBreak ? "rgba(201,195,181,0.4)" : "#D9A84E",
                    backgroundColor: mod.isBreak ? "#0C1E40" : "rgba(217,168,78,0.2)",
                  }}
                />

                <div
                  className={`rounded-xl p-5 border ${
                    mod.isBreak ? "italic" : ""
                  }`}
                  style={{
                    backgroundColor: "#0C1E40",
                    borderColor: "rgba(201,147,58,0.2)",
                  }}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded"
                      style={{
                        color: "#D9A84E",
                        backgroundColor: "rgba(217,168,78,0.1)",
                      }}
                    >
                      {mod.time}
                    </span>
                    <span className="text-xs" style={{ color: "rgba(201,195,181,0.5)" }}>
                      {mod.duration}
                    </span>
                    {mod.badge && (
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full border"
                        style={{
                          color: "#4ADE80",
                          backgroundColor: "rgba(74,222,128,0.1)",
                          borderColor: "rgba(74,222,128,0.2)",
                        }}
                      >
                        {mod.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold mb-1" style={{ color: "#FDFAF4" }}>
                    {mod.title}
                  </h3>
                  <p className="text-sm" style={{ color: "rgba(201,195,181,0.7)" }}>
                    {mod.desc}
                  </p>

                  {mod.learn && (
                    <div className="mt-3 flex flex-col gap-1">
                      <span className="text-xs font-semibold" style={{ color: "#C9933A" }}>
                        {lang === "es" ? "Aprenderás:" : "You will learn:"}
                      </span>
                      <p className="text-sm" style={{ color: "rgba(201,195,181,0.6)" }}>
                        {mod.learn}
                      </p>
                    </div>
                  )}

                  {mod.get && (
                    <div className="mt-2 flex flex-col gap-1">
                      <span className="text-xs font-semibold" style={{ color: "#4ADE80" }}>
                        {lang === "es" ? "Saldrás con:" : "You will leave with:"}
                      </span>
                      <p className="text-sm" style={{ color: "rgba(201,195,181,0.6)" }}>
                        {mod.get}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
