"use client"

import { useState, useRef, useCallback } from "react"
import { X } from "lucide-react"
import { AnnouncementBar } from "@/components/landing/AnnouncementBar"
import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"
import { TechTicker } from "@/components/landing/TechTicker"
import { N8nAdvantage } from "@/components/landing/N8nAdvantage"
import { WorkflowCards } from "@/components/landing/WorkflowCards"
import { Shift } from "@/components/landing/Shift"
import { Testimonials } from "@/components/landing/Testimonials"
import { ValueStack } from "@/components/landing/ValueStack"
import { LeadForm } from "@/components/landing/LeadForm"
import { Guarantee } from "@/components/landing/Guarantee"
import { FAQ } from "@/components/landing/FAQ"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer({ lang }: { lang: Lang }) {
  const c = copy[lang]
  const CONTACT_EMAIL = "hccnj@protolylat.com"

  return (
    <footer
      className="pt-16 pb-8 mt-0"
      style={{
        backgroundColor: "#04091A",
        borderTop: "1px solid rgba(201,147,58,0.2)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand block */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-lg" style={{ color: "#D9A84E" }}>
                  Protolylat
                </span>
                <span className="text-sm" style={{ color: "rgba(201,195,181,0.4)" }}>×</span>
                <span className="font-bold text-lg" style={{ color: "#FDFAF4" }}>HCC-NJ</span>
              </div>
              <p className="text-xs font-medium tracking-widest uppercase" style={{ color: "rgba(201,147,58,0.7)" }}>
                Alianza Tecnológica Oficial
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              {c.footerContact.map((item, i) => (
                <span key={i} className="text-sm" style={{ color: "rgba(201,195,181,0.55)" }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* HCC-NJ links */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#D9A84E" }}>
              HCC-NJ
            </p>
            <ul className="flex flex-col gap-2.5">
              {c.footerHccLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: "rgba(201,195,181,0.6)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#D9A84E")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(201,195,181,0.6)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Protolylat links */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#D9A84E" }}>
              Protolylat
            </p>
            <ul className="flex flex-col gap-2.5">
              {c.footerProtoLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: "rgba(201,195,181,0.6)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#D9A84E")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(201,195,181,0.6)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#D9A84E" }}>
              Legal
            </p>
            <ul className="flex flex-col gap-2.5">
              {c.footerLegalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: "rgba(201,195,181,0.6)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#D9A84E")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(201,195,181,0.6)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-6"
          style={{ backgroundColor: "rgba(201,147,58,0.15)" }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-center md:text-left" style={{ color: "rgba(201,195,181,0.4)" }}>
            {c.footerCopyright}
          </p>
          <p
            className="text-xs italic"
            style={{ color: "rgba(201,147,58,0.5)" }}
          >
            {c.footerPowered}
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── Mobile Sticky CTA Bar ────────────────────────────────────────────────────
function MobileStickyBar({
  lang,
  onCtaClick,
}: {
  lang: Lang
  onCtaClick: () => void
}) {
  const [dismissed, setDismissed] = useState(false)
  const c = copy[lang]

  if (dismissed) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex items-center justify-between px-4 py-3 gap-3"
      style={{
        background: "linear-gradient(90deg, #C9933A 0%, #D9A84E 100%)",
      }}
    >
      <p className="text-xs font-semibold leading-tight" style={{ color: "#04091A" }}>
        {c.mobileStickyText}
      </p>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onCtaClick}
          className="text-xs font-bold px-3 py-2 rounded-lg transition-all"
          style={{ backgroundColor: "#04091A", color: "#D9A84E" }}
        >
          {c.mobileStickyBtn}
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded-full transition-opacity hover:opacity-70"
          aria-label="Dismiss"
          style={{ color: "#04091A" }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  const [lang, setLang] = useState<Lang>("es")
  const formRef = useRef<HTMLDivElement>(null)
  const [highlightForm, setHighlightForm] = useState(false)

  const scrollToForm = useCallback(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
      setHighlightForm(true)
      setTimeout(() => setHighlightForm(false), 1200)
    }
  }, [])

  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden"
      style={{ backgroundColor: "#04091A", color: "#FDFAF4" }}
    >
      {/* Announcement bar */}
      <AnnouncementBar lang={lang} onCtaClick={scrollToForm} />

      {/* Navbar */}
      <Navbar lang={lang} onLangChange={setLang} onCtaClick={scrollToForm} />

      {/* Hero */}
      <Hero lang={lang} onCtaClick={scrollToForm} />

      {/* Tech ticker */}
      <TechTicker lang={lang} />

      {/* AI Engineering & Software Factory Advantage */}
      <N8nAdvantage lang={lang} />

      {/* Service Use Cases (replaces Workflow Cards) */}
      <WorkflowCards lang={lang} onCtaClick={scrollToForm} />

      {/* NJ Impact / Mission section (replaces Shift + Pain Points) */}
      <Shift lang={lang} />

      {/* Testimonials */}
      <Testimonials lang={lang} />

      {/* Value Stack */}
      <ValueStack lang={lang} onCtaClick={scrollToForm} />

      {/* Lead Form */}
      <LeadForm lang={lang} formRef={formRef} highlightForm={highlightForm} />

      {/* Guarantee */}
      <Guarantee lang={lang} />

      {/* FAQ */}
      <FAQ lang={lang} />

      {/* Footer */}
      <Footer lang={lang} />

      {/* Mobile sticky CTA bar */}
      <MobileStickyBar lang={lang} onCtaClick={scrollToForm} />
    </div>
  )
}
