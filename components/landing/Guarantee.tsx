"use client"

import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

interface Props { lang: Lang }

export function Guarantee({ lang }: Props) {
  const c = copy[lang]
  const lines = c.guaranteeBody.split("\n\n")

  return (
    <section id="guarantee" className="py-24" style={{ backgroundColor: "#04091A" }}>
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl p-8 md:p-12"
          style={{
            backgroundColor: "#071228",
            border: "2px solid rgba(201,147,58,0.3)",
            boxShadow: "0 20px 60px rgba(201,147,58,0.06)",
          }}
        >
          <div className="flex flex-col items-center text-center gap-5">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "rgba(201,147,58,0.1)",
                border: "1px solid rgba(201,147,58,0.3)",
              }}
            >
              <ShieldCheck className="w-8 h-8" style={{ color: "#D9A84E" }} />
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold font-serif"
              style={{ color: "#FDFAF4" }}
            >
              {c.guaranteeTitle}
            </h2>
            <div className="flex flex-col gap-4 text-left">
              {lines.map((line, i) => (
                <p
                  key={i}
                  className="leading-relaxed text-base"
                  style={{ color: "rgba(201,195,181,0.72)" }}
                >
                  {line}
                </p>
              ))}
            </div>
            {/* Alliance badge */}
            <div
              className="mt-4 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{
                backgroundColor: "rgba(201,147,58,0.08)",
                border: "1px solid rgba(201,147,58,0.25)",
                color: "#D9A84E",
              }}
            >
              {c.guaranteeSubtitle}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
