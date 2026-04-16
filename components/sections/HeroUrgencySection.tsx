"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView, useReducedMotion, animate } from "framer-motion"
import Link from "next/link"
import { Zap, AlertTriangle, TrendingUp, ShieldCheck, CreditCard, ArrowRight } from "lucide-react"
import { copy, type Lang } from "@/lib/copy"

interface HeroUrgencySectionProps {
  lang: Lang
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

const nodeVariant = {
  hidden: { scale: 0.75, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: i * 0.12, type: "spring", stiffness: 300, damping: 20 },
  }),
}

function CountUpAmount({ value, duration = 2 }: { value: string; duration?: number }) {
  const [display, setDisplay] = useState("0")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/[^0-9]/g, ""))
      const controls = animate(0, numericValue, {
        duration,
        onUpdate: (latest) => {
          setDisplay(`$${Math.floor(latest).toLocaleString()}`)
        },
      })
      return () => controls.stop()
    }
  }, [isInView, value, duration])

  return <span ref={ref}>{display}</span>
}

function BezierLine({ delay = 0 }: { delay?: number }) {
  return (
    <div className="flex-1 min-w-[20px] md:min-w-[40px] h-10 flex items-center justify-center relative">
      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
        <path
          d="M 0 20 C 20 20, 20 20, 40 20"
          fill="none"
          stroke="rgba(217, 168, 78, 0.2)"
          strokeWidth="2"
          className="w-full"
        />
        <motion.path
          d="M 0 20 C 20 20, 20 20, 40 20"
          fill="none"
          stroke="#D9A84E"
          strokeWidth="2"
          strokeDasharray="6 3"
          initial={{ pathLength: 0, strokeDashoffset: 100 }}
          whileInView={{ pathLength: 1 }}
          animate={{ strokeDashoffset: [100, 0] }}
          transition={{
            pathLength: { duration: 0.8, delay },
            strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
          }}
          className="w-full"
        />
      </svg>
    </div>
  )
}

export default function HeroUrgencySection({ lang }: HeroUrgencySectionProps) {
  const c = copy[lang]
  const t = c.workshop?.heroUrgency || (c as any).heroUrgency
  const prefersReducedMotion = useReducedMotion()

  if (!t) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden font-sans" style={{ backgroundColor: "#04091A" }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center">
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="1" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div variants={fadeUp} className="flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 border"
            style={{ backgroundColor: "rgba(217,168,78,0.1)", borderColor: "rgba(217,168,78,0.3)", color: "#D9A84E" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" style={{ backgroundColor: "#D9A84E" }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "#D9A84E" }}></span>
            </span>
            {t.scarcity}
          </motion.div>
        </motion.div>

        <div className="text-center mb-16 px-4">
          <h1 className="font-bold text-4xl md:text-6xl max-w-4xl mx-auto leading-tight font-serif" style={{ color: "#FDFAF4" }}>
            {t.wakeup.h1.split(" ").map((word: string, i: number) => {
              const accentWords = t.wakeup.accent.split(" ")
              const isAccent = accentWords.includes(word.replace(/[¿?]/g, ""))
              return (
                <motion.span
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  className="inline-block mr-[0.15em]"
                  style={{ color: isAccent ? "#D9A84E" : "inherit" }}
                >
                  {word}
                </motion.span>
              )
            })}
          </h1>
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl font-normal mt-6 max-w-2xl mx-auto px-4"
            style={{ color: "rgba(201,195,181,0.7)" }}
          >
            {t.wakeup.sub}
          </motion.p>
        </div>

        <motion.div
          variants={fadeUp}
          className="rounded-2xl p-6 md:p-8 max-w-2xl mx-auto mb-20 shadow-2xl border"
          style={{ backgroundColor: "#0C1E40", borderColor: "rgba(201,147,58,0.2)" }}
        >
          <p className="font-mono text-xs mb-6 uppercase tracking-wider" style={{ color: "rgba(201,195,181,0.5)" }}>
            {t.calculator.title}
          </p>
          <div className="space-y-4">
            {t.calculator.rows.map((row: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1 - i * 0.2, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b pb-3 last:border-0"
                style={{ borderColor: "rgba(201,147,58,0.1)" }}
              >
                <span className="font-mono text-sm" style={{ color: "rgba(201,195,181,0.6)" }}>{row.label}</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-lg" style={{ color: "#D9A84E" }}>
                    <CountUpAmount value={row.amount} />
                    <span className="text-xs ml-1">/ año</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-tighter rounded-full px-2 py-0.5 border"
                    style={{ backgroundColor: "rgba(217,168,78,0.1)", borderColor: "rgba(217,168,78,0.2)", color: "#D9A84E" }}>
                    {row.chip.replace(/[\[\]]/g, "")}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-20">
          <div className="flex items-center justify-between overflow-x-auto pb-4 no-scrollbar">
            {t.workflow.nodes.map((node: string, i: number) => (
              <div key={i} className="flex items-center">
                <motion.div
                  custom={i}
                  variants={nodeVariant}
                  className="rounded-lg p-3 text-center min-w-[110px] shadow-lg border"
                  style={{ backgroundColor: "#0C1E40", borderColor: "rgba(201,147,58,0.2)" }}
                >
                  <span className="text-sm font-medium" style={{ color: "#FDFAF4" }}>{node}</span>
                </motion.div>
                {i < t.workflow.nodes.length - 1 && <BezierLine delay={i * 0.2} />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <motion.div
              variants={fadeUp}
              className="border-l-2 p-5 rounded-r-xl"
              style={{ borderColor: "rgba(220,38,38,0.5)", backgroundColor: "rgba(220,38,38,0.05)" }}
            >
              <p className="text-xs font-mono mb-3 uppercase tracking-widest" style={{ color: "#EF4444" }}>{t.workflow.comparison.sin.label}</p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(201,195,181,0.7)" }}>{t.workflow.comparison.sin.steps}</p>
              <p className="font-mono text-sm mt-4" style={{ color: "#FDFAF4" }}>{t.workflow.comparison.sin.time}</p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="border-l-2 p-5 rounded-r-xl"
              style={{ borderColor: "#D9A84E", backgroundColor: "rgba(217,168,78,0.05)" }}
            >
              <p className="text-xs font-mono mb-3 uppercase tracking-widest" style={{ color: "#D9A84E" }}>{t.workflow.comparison.con.label}</p>
              <p className="text-sm leading-relaxed" style={{ color: "#FDFAF4" }}>{t.workflow.comparison.con.steps}</p>
              <p className="font-mono text-sm mt-4" style={{ color: "#D9A84E" }}>{t.workflow.comparison.con.time}</p>
            </motion.div>
          </div>
        </div>

        <div className="mb-24 overflow-x-auto px-2">
          <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.2em] mb-8 text-center font-bold" style={{ color: "rgba(201,195,181,0.5)" }}>
            {t.gapTable.title}
          </motion.p>
          <table className="w-full max-w-4xl mx-auto text-sm border-collapse border" style={{ borderColor: "rgba(201,147,58,0.1)" }}>
            <thead>
              <tr className="border-b" style={{ borderColor: "rgba(201,147,58,0.1)" }}>
                {t.gapTable.headers.map((h: string, i: number) => (
                  <th key={i} className="p-4 text-left font-mono text-xs uppercase tracking-wider" style={{ color: "rgba(201,195,181,0.5)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.gapTable.rows.map((row: any, rowIndex: number) => (
                <motion.tr
                  key={rowIndex}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + rowIndex * 0.05 }}
                  className="border-b transition-colors"
                  style={{ borderColor: "rgba(201,147,58,0.05)" }}
                >
                  <td className="p-4 font-medium" style={{ color: "rgba(201,195,181,0.8)" }}>{row[0]}</td>
                  <td className="p-4" style={{ color: "rgba(201,195,181,0.6)" }}>{row[1]}</td>
                  <td className="p-4 font-semibold" style={{ color: "#D9A84E", backgroundColor: "rgba(217,168,78,0.03)" }}>{row[2]}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-24">
          {t.risk.map((card: any, i: number) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              className="rounded-2xl p-6 transition-all shadow-xl group border"
              style={{ backgroundColor: "#0C1E40", borderColor: "rgba(201,147,58,0.2)" }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: "rgba(217,168,78,0.1)" }}>
                {i === 0 ? <Zap className="w-5 h-5" style={{ color: "#D9A84E" }} /> : i === 1 ? <AlertTriangle className="w-5 h-5" style={{ color: "#F59E0B" }} /> : <TrendingUp className="w-5 h-5" style={{ color: "#10B981" }} />}
              </div>
              <h3 className="font-bold text-lg mb-3" style={{ color: "#FDFAF4" }}>{card.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(201,195,181,0.7)" }}>{card.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-24 relative px-4">
          <p className="text-[10px] uppercase tracking-[0.2em] mb-6 text-center font-bold" style={{ color: "rgba(201,195,181,0.5)" }}>
            {t.marquee.label}
          </p>
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-4 pr-4 py-2"
            >
              {[...t.marquee.tools, ...t.marquee.tools].map((tool: string, i: number) => (
                <div
                  key={i}
                  className="text-xs font-mono px-4 py-2 rounded-full border whitespace-nowrap hover:text-white transition-colors"
                  style={{ backgroundColor: "rgba(12,30,64,0.5)", color: "rgba(201,195,181,0.6)", borderColor: "rgba(217,168,78,0.2)" }}
                >
                  {tool}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-8 p-10 rounded-3xl border shadow-2xl"
          style={{ backgroundImage: "linear-gradient(to bottom, rgba(217,168,78,0.05), transparent)", borderColor: "rgba(217,168,78,0.1)" }}>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold leading-tight font-serif" style={{ color: "#FDFAF4" }}>
            {t.cta.h1}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg leading-relaxed" style={{ color: "rgba(201,195,181,0.8)" }}>
            {t.cta.sub}
          </motion.p>
          <motion.p variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "rgba(201,195,181,0.5)" }}>
            {t.cta.bridge}
          </motion.p>
          
          <motion.div variants={fadeUp} className="pt-4 flex justify-center">
            <Link href="#lead-form" className="w-full sm:w-auto">
              <motion.button
                whileHover={prefersReducedMotion ? {} : { scale: 1.02, boxShadow: "0 0 28px rgba(217,168,78,0.4)" }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                className="w-full sm:px-12 h-16 rounded-xl font-bold flex items-center justify-center gap-3 transition-all text-lg shadow-lg"
                style={{ backgroundColor: "#D9A84E", color: "#04091A" }}
              >
                {t.cta.btn}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            {t.cta.trust.map((line: string, i: number) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(217,168,78,0.1)" }}>
                  {i === 0 ? <ShieldCheck className="w-4 h-4" style={{ color: "#10B981" }} /> : i === 1 ? <CreditCard className="w-4 h-4" style={{ color: "#F59E0B" }} /> : <Zap className="w-4 h-4" style={{ color: "#EA580C" }} />}
                </div>
                <span className="text-[10px] uppercase font-bold leading-tight" style={{ color: "rgba(201,195,181,0.5)" }}>{line}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full border-t py-8 px-6 mt-20 text-center relative overflow-hidden group"
        style={{ backgroundColor: "rgba(217,168,78,0.02)", borderColor: "rgba(217,168,78,0.1)" }}
      >
        <div className="absolute inset-0 transform -skew-y-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-700" style={{ backgroundColor: "rgba(217,168,78,0.01)" }}></div>
        <p className="text-xs md:text-sm font-mono tracking-wider relative z-10" style={{ color: "rgba(217,168,78,0.8)" }}>
          {t.urgencyBar}
        </p>
      </motion.div>
    </section>
  )
}
