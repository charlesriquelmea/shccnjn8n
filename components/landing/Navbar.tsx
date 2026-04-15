"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

interface Props {
  lang: Lang
  onLangChange: (l: Lang) => void
  onCtaClick: () => void
}

export function Navbar({ lang, onLangChange, onCtaClick }: Props) {
  const shouldReduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const c = copy[lang]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md border-b"
          : "bg-transparent"
      }`}
      style={
        scrolled
          ? { backgroundColor: "rgba(4,9,26,0.92)", borderColor: "rgba(201,147,58,0.2)" }
          : {}
      }
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center gap-4">

        {/* Co-branded logo lockup */}
        <div className="flex flex-col items-start shrink-0 mr-auto">
          <div className="flex items-center gap-1.5">
            <span
              className="font-bold text-[15px] tracking-tight leading-none whitespace-nowrap"
              style={{ color: "#D9A84E" }}
            >
              Protolylat
            </span>
            <span
              className="text-sm font-light leading-none"
              style={{ color: "rgba(253,250,244,0.4)" }}
            >
              &times;
            </span>
            <span
              className="font-bold text-[15px] tracking-tight leading-none whitespace-nowrap"
              style={{ color: "#FDFAF4" }}
            >
              HCC-NJ
            </span>
          </div>
          <span
            className="text-[8px] font-semibold tracking-[0.18em] uppercase mt-[3px] whitespace-nowrap"
            style={{ color: "rgba(201,147,58,0.85)" }}
          >
            Alianza Tecnol&oacute;gica Oficial
          </span>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-6">
          {c.navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm font-medium transition-colors whitespace-nowrap"
              style={{ color: "rgba(201,195,181,0.8)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D9A84E")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(201,195,181,0.8)")}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language switcher */}
          <div
            className="flex items-center rounded-full p-0.5"
            style={{ backgroundColor: "rgba(12,30,64,0.8)", border: "1px solid rgba(201,147,58,0.3)" }}
          >
            {(["es", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => onLangChange(l)}
                className="px-2.5 py-1 text-[11px] font-bold rounded-full transition-all leading-none"
                style={
                  lang === l
                    ? { backgroundColor: "#C9933A", color: "#04091A" }
                    : { color: "rgba(201,195,181,0.7)" }
                }
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* CTA button — hidden on very small screens, shown md+ */}
          <button
            onClick={onCtaClick}
            className="hidden md:flex items-center font-bold text-[11px] px-3 py-2 rounded-lg transition-all hover:opacity-90 active:opacity-80 whitespace-nowrap leading-none"
            style={{ backgroundColor: "#D9A84E", color: "#04091A" }}
          >
            {c.navCta}
          </button>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 transition-colors"
            style={{ color: "rgba(201,195,181,0.7)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? {} : { opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden px-4 py-5 flex flex-col gap-4"
            style={{
              backgroundColor: "#071228",
              borderBottom: "1px solid rgba(201,147,58,0.2)",
            }}
          >
            {c.navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-left transition-colors py-1"
                style={{ color: "rgba(201,195,181,0.8)" }}
              >
                {link.label}
              </button>
            ))}
            <div
              className="flex items-center justify-between pt-3"
              style={{ borderTop: "1px solid rgba(201,147,58,0.2)" }}
            >
              {/* Mobile lang switcher */}
              <div
                className="flex gap-1 rounded-full p-0.5"
                style={{ backgroundColor: "rgba(12,30,64,0.8)", border: "1px solid rgba(201,147,58,0.3)" }}
              >
                {(["es", "en"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => onLangChange(l)}
                    className="px-3 py-1 text-xs font-bold rounded-full transition-all"
                    style={
                      lang === l
                        ? { backgroundColor: "#C9933A", color: "#04091A" }
                        : { color: "rgba(201,195,181,0.7)" }
                    }
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                onClick={() => { setMobileOpen(false); onCtaClick() }}
                className="font-bold text-xs px-4 py-2 rounded-lg"
                style={{ backgroundColor: "#D9A84E", color: "#04091A" }}
              >
                {c.navCta}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
