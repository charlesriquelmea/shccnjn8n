"use client"

import { useState, useRef, useCallback } from "react"
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
import { PainPoints } from "@/components/landing/PainPoints"
import { Curriculum } from "@/components/landing/Curriculum"
import { Credibility } from "@/components/landing/Credibility"
import { Instructors } from "@/components/landing/Instructors"
import { Pricing } from "@/components/landing/Pricing"
import { Footer } from "@/components/landing/Footer"
import { MobileStickyBar } from "@/components/landing/MobileStickyBar"
import type { Lang } from "@/lib/copy"
import HeroUrgencySection from "@/components/sections/HeroUrgencySection"
import WorkflowsSection from "@/components/landing/WorkflowsSection"

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

      <WorkflowsSection lang={lang} />

        {/* Tech ticker */}
        <TechTicker lang={lang} />

        {/* AI Engineering & Software Factory Advantage */}
        <N8nAdvantage lang={lang} />

        {/* Pain Points */}
        <PainPoints lang={lang} />

        {/* Shift / Philosophy */}
        <Shift lang={lang} />

        {/* Workflow Cards */}
        <WorkflowCards lang={lang} onCtaClick={scrollToForm} />

        {/* Testimonials */}
        <Testimonials lang={lang} />

        {/* Curriculum / Schedule */}
        <Curriculum lang={lang} />

        {/* Credibility */}
        <Credibility lang={lang} />

        {/* Value Stack & Pricing */}
        <Pricing lang={lang} onCtaClick={scrollToForm} />

        {/* Hero Urgency */}
        <HeroUrgencySection lang={lang} />

        {/* Guarantee */}
        <Guarantee lang={lang} />

        {/* Instructors */}
        <Instructors lang={lang} />

        {/* FAQ */}
        <FAQ lang={lang} />

        {/* Lead Form */}
        <LeadForm lang={lang} formRef={formRef} highlightForm={highlightForm} />

        {/* Footer */}
        <Footer lang={lang} />

        {/* Mobile sticky CTA bar */}
        <MobileStickyBar lang={lang} onCtaClick={scrollToForm} />
    </div>
  )
}
