"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

// ─── Typewriter ───────────────────────────────────────────────────────────────
function Typewriter({ phrases, prefix }: { phrases: readonly string[]; prefix: string }) {
  const shouldReduce = useReducedMotion()
  const [text, setText] = useState("")
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [cursorActive, setCursorActive] = useState(true)

  useEffect(() => {
    if (shouldReduce) { setText(phrases[0]); return }
    const current = phrases[phraseIdx]
    if (isPaused) {
      const t = setTimeout(() => { setIsPaused(false); setIsDeleting(true) }, 2400)
      return () => clearTimeout(t)
    }
    if (!isDeleting) {
      if (text.length < current.length) {
        const t = setTimeout(() => setText(current.slice(0, text.length + 1)), 50)
        return () => clearTimeout(t)
      } else { setIsPaused(true) }
    } else {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), 25)
        return () => clearTimeout(t)
      } else {
        setIsDeleting(false)
        const t = setTimeout(() => setPhraseIdx((phraseIdx + 1) % phrases.length), 350)
        return () => clearTimeout(t)
      }
    }
  }, [text, phraseIdx, isDeleting, isPaused, phrases, shouldReduce])

  useEffect(() => {
    const t = setInterval(() => setCursorActive((v) => !v), 530)
    return () => clearInterval(t)
  }, [])

  return (
    <p className="text-lg md:text-xl font-medium mt-4 min-h-[2rem]">
      <span style={{ color: "rgba(201,195,181,0.6)" }}>{prefix} </span>
      <span style={{ color: "#D9A84E" }}>{text}</span>
      <motion.span
        animate={{ opacity: cursorActive ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        style={{ color: "#C9933A" }}
      >
        |
      </motion.span>
    </p>
  )
}

// ─── Floating background nodes ─────────────────────────────────────────────
const BG_NODES = [
  { label: "IA Engineering", x: "5%", y: "22%" },
  { label: "Cloud AWS", x: "18%", y: "40%" },
  { label: "Automatización", x: "58%", y: "18%" },
  { label: "Software Factory", x: "72%", y: "62%" },
  { label: "HCC-NJ", x: "36%", y: "75%" },
]

function BgNodes() {
  const shouldReduce = useReducedMotion()
  if (shouldReduce) return null
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {BG_NODES.map((node, i) => (
        <motion.div
          key={node.label}
          className="absolute font-mono text-xs rounded px-2 py-1"
          style={{
            left: node.x,
            top: node.y,
            color: "rgba(201,147,58,0.15)",
            border: "1px solid rgba(201,147,58,0.12)",
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        >
          {node.label}
        </motion.div>
      ))}
    </div>
  )
}

// ─── Brand visual panel (right side) ─────────────────────────────────────────
function BrandPanel() {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      className="relative"
      animate={shouldReduce ? {} : { y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="rounded-2xl overflow-hidden shadow-2xl"
        style={{
          border: "1px solid rgba(201,147,58,0.3)",
          backgroundColor: "#071228",
          transform: "rotate(-1.5deg)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,147,58,0.15)",
        }}
      >
        {/* Header bar */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ backgroundColor: "#0C1E40", borderBottom: "1px solid rgba(201,147,58,0.2)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold" style={{ color: "#D9A84E" }}>Protolylat</span>
            <span className="text-xs" style={{ color: "rgba(201,195,181,0.4)" }}>×</span>
            <span className="text-xs font-bold" style={{ color: "#FDFAF4" }}>HCC-NJ</span>
          </div>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "rgba(201,147,58,0.15)", color: "#D9A84E", border: "1px solid rgba(201,147,58,0.3)" }}
          >
            MIEMBRO ACTIVO
          </span>
        </div>

        {/* Services list */}
        <div className="p-5 flex flex-col gap-3 min-w-[280px]">
          {[
            { label: "IA Engineering", status: "Activo", color: "#D9A84E" },
            { label: "Software Factory", status: "Activo", color: "#22C55E" },
            { label: "Cloud Infrastructure", status: "Activo", color: "#22C55E" },
            { label: "Process Automation", status: "Activo", color: "#22C55E" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center justify-between gap-4"
              initial={shouldReduce ? {} : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.5, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full animate-pulse shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-mono text-xs" style={{ color: "rgba(201,195,181,0.8)" }}>
                  {item.label}
                </span>
              </div>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded"
                style={{ color: item.color, backgroundColor: `${item.color}18` }}
              >
                {item.status}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Discount badge */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ backgroundColor: "rgba(201,147,58,0.08)", borderTop: "1px solid rgba(201,147,58,0.2)" }}
        >
          <span className="text-xs font-semibold" style={{ color: "rgba(201,195,181,0.7)" }}>
            Descuento miembro aplicado:
          </span>
          <span className="text-sm font-black font-mono" style={{ color: "#D9A84E" }}>
            -$100
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Member exclusive banner ──────────────────────────────────────────────────
function MemberBanner({ lang }: { lang: Lang }) {
  const c = copy[lang]
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.6, ease: "easeOut" }}
      className="rounded-xl p-5 flex items-start gap-4"
      style={{
        backgroundColor: "rgba(201,147,58,0.08)",
        border: "1px solid rgba(201,147,58,0.35)",
      }}
    >
      <span className="text-2xl shrink-0">🏅</span>
      <div>
        <p className="font-bold text-sm mb-1" style={{ color: "#D9A84E" }}>
          {c.memberBannerTitle}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(201,195,181,0.8)" }}>
          {c.memberBannerBody}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Animation variants ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
interface Props {
  lang: Lang
  onCtaClick: () => void
}

export function Hero({ lang, onCtaClick }: Props) {
  const shouldReduce = useReducedMotion()
  const c = copy[lang]

  const scrollToServices = useCallback(() => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden"
      style={{ backgroundColor: "#04091A" }}
    >
      <BgNodes />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(rgba(201,147,58,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Gold radial glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse, rgba(201,147,58,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">

          {/* LEFT — copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Eyebrow badge */}
            <motion.div variants={fadeUp}>
              <span
                className="inline-flex items-center gap-2 text-xs md:text-sm font-medium px-4 py-2 rounded-full text-balance"
                style={{
                  border: "1px solid rgba(201,147,58,0.4)",
                  backgroundColor: "rgba(201,147,58,0.08)",
                  color: "#D9A84E",
                }}
              >
                {c.eyebrow}
              </span>
            </motion.div>

            {/* H1 — Playfair Display */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.1] font-serif"
              style={{ color: "#FDFAF4" }}
            >
              {c.h1}
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={fadeUp}>
              <Typewriter phrases={c.typewriterPhrases} prefix={c.typewriterPrefix} />
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg leading-relaxed max-w-xl"
              style={{ color: "rgba(201,195,181,0.75)" }}
            >
              {c.subheadline}
            </motion.p>

            {/* Trust chips */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {c.trustChips.map((chip) => (
                <span
                  key={chip}
                  className="text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: "rgba(12,30,64,0.8)",
                    border: "1px solid rgba(201,147,58,0.25)",
                    color: "rgba(201,195,181,0.85)",
                  }}
                >
                  {chip}
                </span>
              ))}
            </motion.div>

            {/* Member Banner */}
            <motion.div variants={fadeUp}>
              <MemberBanner lang={lang} />
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onCtaClick}
                className="flex-1 sm:flex-none font-bold text-base md:text-lg px-8 py-4 rounded-xl transition-all hover:opacity-90 active:opacity-80 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "#D9A84E",
                  color: "#04091A",
                  boxShadow: "0 8px 24px rgba(201,147,58,0.25)",
                }}
              >
                {c.primaryCta}
              </button>
              <button
                onClick={scrollToServices}
                className="flex-1 sm:flex-none font-medium text-sm px-6 py-4 rounded-xl transition-all hover:-translate-y-0.5"
                style={{
                  border: "1px solid rgba(201,147,58,0.3)",
                  color: "rgba(201,195,181,0.8)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(201,147,58,0.6)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(201,147,58,0.3)")}
              >
                {c.secondaryCta}
              </button>
            </motion.div>

            {/* Micro copy */}
            <motion.p
              variants={fadeUp}
              className="text-xs"
              style={{ color: "rgba(201,195,181,0.45)" }}
            >
              {c.microCopy}
            </motion.p>
          </motion.div>

          {/* RIGHT — brand panel */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <BrandPanel />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
