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

export function Instructors({ lang }: Props) {
  const c = copy[lang]
  const isWorkshop = !!c.workshop
  const t = (isWorkshop ? c.workshop : c) as any

  if (!t.instructorName) return null

  const instructors = [
    {
      initials: t.instructorInitials,
      name: t.instructorName,
      badge: t.instructorBadge,
      bio: t.instructorBio,
      stats: t.instructorStats,
      gradient: "linear-gradient(135deg, #D9A84E, #C9933A)",
      delay: 0,
    },
    {
      initials: t.professorInitials,
      name: t.professorName,
      badge: t.professorBadge,
      bio: t.professorBio,
      stats: t.professorStats,
      gradient: "linear-gradient(135deg, #0C1E40, #04091A)",
      delay: 0.15,
    },
  ]

  return (
    <section id="instructors" className="py-24" style={{ backgroundColor: "#04091A" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "rgba(201,195,181,0.5)" }}
          >
            {t.instructorTitle}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif" style={{ color: "#FDFAF4" }}>
            {lang === "es" ? "Los fundadores" : "The founders"}
          </h2>
        </motion.div>

        {/* Two-column cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {instructors.map((person, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: person.delay }}
              className="flex flex-col items-center gap-6 rounded-2xl p-8 border"
              style={{
                backgroundColor: "#0C1E40",
                borderColor: "rgba(201,147,58,0.2)",
              }}
            >
              {/* Avatar + badge */}
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-black"
                  style={{ background: person.gradient, color: i === 0 ? "#04091A" : "#FDFAF4" }}
                >
                  {person.initials}
                </div>
                <span
                  className="text-xs px-3 py-1 rounded-full text-center border"
                  style={{
                    backgroundColor: "rgba(217,168,78,0.1)",
                    color: "#D9A84E",
                    borderColor: "rgba(217,168,78,0.2)",
                  }}
                >
                  {person.badge}
                </span>
              </div>

              {/* Bio */}
              <div className="flex flex-col items-center text-center gap-3 w-full">
                <h3 className="text-xl font-bold font-serif" style={{ color: "#FDFAF4" }}>{person.name}</h3>
                <p className="leading-relaxed text-sm" style={{ color: "rgba(201,195,181,0.7)" }}>
                  {person.bio}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 w-full mt-2">
                  {person.stats.map((stat: any, j: number) => (
                    <div
                      key={j}
                      className="flex flex-col items-center rounded-xl p-3 border"
                      style={{
                        backgroundColor: "#04091A",
                        borderColor: "rgba(201,147,58,0.1)",
                      }}
                    >
                      <span className="text-xl font-black" style={{ color: "#D9A84E" }}>
                        {stat.value}
                      </span>
                      <span
                        className="text-xs mt-1 leading-tight text-center"
                        style={{ color: "rgba(201,195,181,0.4)" }}
                      >
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
