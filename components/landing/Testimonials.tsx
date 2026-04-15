"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

interface TiltCardProps {
  children: React.ReactNode
  className?: string
}

function TiltCard({ children }: TiltCardProps) {
  const shouldReduce = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 25 })
  const rotY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 25 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={shouldReduce ? {} : { rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
      className="h-full"
    >
      {children}
    </motion.div>
  )
}

interface Props { lang: Lang }

export function Testimonials({ lang }: Props) {
  const c = copy[lang]

  return (
    <section id="testimonials" className="py-24" style={{ backgroundColor: "#071228" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance font-serif"
          style={{ color: "#FDFAF4" }}
        >
          {c.testimonialsTitle}
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {c.testimonials.map((t, i) => (
            <motion.div key={i} variants={fadeUp}>
              <TiltCard>
                <div
                  className="rounded-2xl p-6 h-full flex flex-col gap-4 transition-all"
                  style={{
                    backgroundColor: "#0C1E40",
                    border: "1px solid rgba(201,147,58,0.2)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(201,147,58,0.4)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(201,147,58,0.2)")}
                >
                  {/* ANTES */}
                  <div>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: "rgba(123,29,46,0.2)",
                        border: "1px solid rgba(123,29,46,0.4)",
                        color: "#E8748A",
                      }}
                    >
                      {lang === "es" ? "ANTES" : "BEFORE"}
                    </span>
                    <p
                      className="mt-2 text-sm leading-relaxed italic"
                      style={{ color: "rgba(201,195,181,0.6)" }}
                    >
                      &ldquo;{t.before}&rdquo;
                    </p>
                  </div>

                  {/* DURANTE */}
                  <div>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: "rgba(201,147,58,0.12)",
                        border: "1px solid rgba(201,147,58,0.3)",
                        color: "#D9A84E",
                      }}
                    >
                      {lang === "es" ? "DURANTE" : "DURING"}
                    </span>
                    <p
                      className="mt-2 text-sm leading-relaxed italic"
                      style={{ color: "rgba(201,195,181,0.75)" }}
                    >
                      &ldquo;{t.during}&rdquo;
                    </p>
                  </div>

                  {/* DESPUÉS */}
                  <div className="flex-1">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: "rgba(34,197,94,0.12)",
                        border: "1px solid rgba(34,197,94,0.3)",
                        color: "#22C55E",
                      }}
                    >
                      {lang === "es" ? "DESPUÉS" : "AFTER"}
                    </span>
                    <p
                      className="mt-2 text-sm leading-relaxed font-medium"
                      style={{ color: "#FDFAF4" }}
                    >
                      &ldquo;{t.after}&rdquo;
                    </p>
                  </div>

                  {/* Author */}
                  <div
                    className="pt-3 flex items-center gap-3"
                    style={{ borderTop: "1px solid rgba(201,147,58,0.15)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #C9933A, #7B1D2E)",
                        color: "#FDFAF4",
                      }}
                    >
                      {t.author.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#FDFAF4" }}>
                        {t.author}
                      </p>
                      <p className="text-xs" style={{ color: "rgba(201,195,181,0.5)" }}>
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 text-center rounded-xl px-6 py-4"
          style={{
            backgroundColor: "#0C1E40",
            border: "1px solid rgba(201,147,58,0.2)",
          }}
        >
          <p className="text-sm leading-relaxed" style={{ color: "rgba(201,195,181,0.7)" }}>
            {c.statsBar}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
