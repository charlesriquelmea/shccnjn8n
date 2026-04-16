"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Loader2, CheckCircle, Medal } from "lucide-react"
import { copy, PHONE_NUMBER } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

const TOTAL_STEPS = 6

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }),
}

interface Props {
  lang: Lang
  formRef: React.RefObject<HTMLDivElement | null>
  highlightForm?: boolean
}

export function LeadForm({ lang, formRef, highlightForm }: Props) {
  const shouldReduce = useReducedMotion()
  const c = copy[lang]

  const [step, setStep] = useState(-1)
  const [dir, setDir] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [business, setBusiness] = useState("")
  const [challenge, setChallenge] = useState("")
  const [shake, setShake] = useState(false)
  const [loadingIdx, setLoadingIdx] = useState(0)
  const [done, setDone] = useState(false)
  const [direction, setDirection] = useState(1)
  const inputRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  /* const progress = step < 0 ? 0 : ((step + 1) / TOTAL_STEPS) * 100 */

  useEffect(() => {
    if (step === 1) setTimeout(() => phoneRef.current?.focus(), 350)
    if (step === 2) setTimeout(() => emailRef.current?.focus(), 350)
  }, [step])

  useEffect(() => {
    if (step !== 5) return

    // Trigger email sending
    const sendEmail = async () => {
      try {
        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            phone,
            business,
            challenge,
            lang,
          }),
        })
      } catch (err) {
        console.error("Error sending lead email:", err)
      }
    }

    sendEmail()

    let i = 0
    const t = setInterval(() => {
      i++
      if (i < c.formStep5Texts.length) {
        setLoadingIdx(i)
      } else {
        clearInterval(t)
        const msg = c.waMessage(name, business, challenge)
        const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`
        window.open(url, "_blank")
        setDone(true)
      }
    }, 700)
    return () => clearInterval(t)
  }, [step]) // eslint-disable-line react-hooks/exhaustive-deps

  const goNext = useCallback((s: number) => {
    setDir(1)
    setStep(s)
  }, [])

  const validateAndNext = useCallback(() => {
    if (step === 0 && name.trim().length < 2) { setShake(true); setTimeout(() => setShake(false), 500); return }
    if (step === 1 && phone.replace(/\D/g, "").length < 10) { setShake(true); setTimeout(() => setShake(false), 500); return }
    if (step === 2 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setShake(true); setTimeout(() => setShake(false), 500); return }
    goNext(step + 1)
  }, [step, name, phone, email, goNext])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") validateAndNext()
  }

  const reopen = useCallback(() => {
    const msg = c.waMessage(name, business, challenge)
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank")
  }, [name, business, challenge, c])

  return (
    <section id="lead-form" className="py-24" style={{ backgroundColor: "#04091A" }} ref={formRef}>
      <div className="max-w-lg mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2
            className="text-3xl md:text-4xl font-bold mb-2 text-balance font-serif"
            style={{ color: "#FDFAF4" }}
          >
            {c.formTitle}
          </h2>
          <p className="text-sm" style={{ color: "rgba(201,195,181,0.55)" }}>
            {c.formSubtitle}
          </p>
        </div>

        <motion.div
          animate={
            highlightForm && !shouldReduce
              ? {
                boxShadow: [
                  "0 0 0 0px rgba(201,147,58,0)",
                  "0 0 0 4px rgba(201,147,58,0.4)",
                  "0 0 0 0px rgba(201,147,58,0)",
                ],
              }
              : {}
          }
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "#071228",
            border: "1px solid rgba(201,147,58,0.25)",
            minHeight: 420,
          }}
        >
          {/* Progress bar */}
          {step >= 0 && step < 5 && (
            <div className="h-1" style={{ backgroundColor: "#0C1E40" }}>
              <motion.div
                className="h-full"
                style={{ backgroundColor: "#C9933A", transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: ((step + 1) / TOTAL_STEPS) }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            </div>
          )}

          <div className="p-8 relative overflow-hidden" style={{ minHeight: 380 }}>
            <AnimatePresence mode="wait" custom={dir}>
              {/* STEP -1: Welcome */}
              {step === -1 && (
                <motion.div
                  key="welcome"
                  custom={dir}
                  variants={shouldReduce ? {} : slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col items-center gap-5 text-center absolute inset-8"
                >
                  <span className="text-5xl">🏛️</span>
                  <h3 className="text-2xl font-bold" style={{ color: "#FDFAF4" }}>
                    {c.formStep0Title}
                  </h3>
                  <p style={{ color: "rgba(201,195,181,0.7)" }}>{c.formStep0Body}</p>
                  <button
                    onClick={() => goNext(0)}
                    className="mt-2 font-bold px-8 py-4 rounded-xl transition-all hover:opacity-90 text-lg w-full"
                    style={{ backgroundColor: "#D9A84E", color: "#04091A" }}
                  >
                    {c.formStep0Btn}
                  </button>
                </motion.div>
              )}

              {/* STEP 0: Name */}
              {step === 0 && (
                <motion.div
                  key="name"
                  custom={dir}
                  variants={shouldReduce ? {} : slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-6 absolute inset-8"
                >
                  <label className="text-xl font-bold" style={{ color: "#FDFAF4" }}>
                    {c.formStep1Label}
                  </label>
                  <motion.input
                    ref={inputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder={lang === "es" ? "Tu nombre..." : "Your name..."}
                    animate={shake && !shouldReduce ? { x: [-4, 4, -4, 4, 0] } : {}}
                    transition={{ duration: 0.3 }}
                    className="bg-transparent text-2xl py-2 outline-none placeholder-transparent transition-colors"
                    style={{
                      color: "#FDFAF4",
                      borderBottom: "2px solid rgba(201,147,58,0.4)",
                    }}
                    onFocus={(e) => (e.target.style.borderBottomColor = "#D9A84E")}
                    onBlur={(e) => (e.target.style.borderBottomColor = "rgba(201,147,58,0.4)")}
                  />
                  <p className="text-xs" style={{ color: "rgba(201,195,181,0.4)" }}>
                    {c.formStep1Hint}
                  </p>
                  <button
                    onClick={validateAndNext}
                    className="mt-auto font-semibold px-6 py-3 rounded-xl transition-all hover:opacity-90"
                    style={{ backgroundColor: "#C9933A", color: "#04091A" }}
                  >
                    {c.formNextBtn}
                  </button>
                </motion.div>
              )}

              {/* STEP 1: Phone */}
              {step === 1 && (
                <motion.div
                  key="phone"
                  custom={dir}
                  variants={shouldReduce ? {} : slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-6 absolute inset-8"
                >
                  <label className="text-xl font-bold" style={{ color: "#FDFAF4" }}>
                    {c.formStep2Label}
                  </label>
                  <p className="text-sm -mt-4" style={{ color: "rgba(201,195,181,0.5)" }}>
                    {c.formStep2Sub}
                  </p>
                  <motion.input
                    ref={inputRef}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="+1 (201) 555-0000"
                    animate={shake && !shouldReduce ? { x: [-4, 4, -4, 4, 0] } : {}}
                    transition={{ duration: 0.3 }}
                    className="bg-transparent text-2xl py-2 outline-none font-mono transition-colors"
                    style={{
                      color: "#FDFAF4",
                      borderBottom: "2px solid rgba(201,147,58,0.4)",
                    }}
                    onFocus={(e) => (e.target.style.borderBottomColor = "#D9A84E")}
                    onBlur={(e) => (e.target.style.borderBottomColor = "rgba(201,147,58,0.4)")}
                  />
                  <p className="text-xs" style={{ color: "rgba(201,195,181,0.4)" }}>
                    {c.formStep1Hint}
                  </p>
                  <button
                    onClick={validateAndNext}
                    className="mt-auto font-semibold px-6 py-3 rounded-xl transition-all hover:opacity-90"
                    style={{ backgroundColor: "#C9933A", color: "#04091A" }}
                  >
                    {c.formNextBtn}
                  </button>
                </motion.div>
              )}

              {/* STEP 2: Email */}
              {step === 2 && (
                <motion.div
                  key="email"
                  custom={dir}
                  variants={shouldReduce ? {} : slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-6 absolute inset-8"
                >
                  <label className="text-xl font-bold" style={{ color: "#FDFAF4" }}>
                    {c.formStepEmailLabel}
                  </label>
                  <p className="text-sm -mt-4" style={{ color: "rgba(201,195,181,0.5)" }}>
                    {c.formStepEmailSub}
                  </p>
                  <motion.input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="ejemplo@correo.com"
                    animate={shake && !shouldReduce ? { x: [-4, 4, -4, 4, 0] } : {}}
                    transition={{ duration: 0.3 }}
                    className="bg-transparent text-2xl py-2 outline-none transition-colors"
                    style={{
                      color: "#FDFAF4",
                      borderBottom: "2px solid rgba(201,147,58,0.4)",
                    }}
                    onFocus={(e) => (e.target.style.borderBottomColor = "#D9A84E")}
                    onBlur={(e) => (e.target.style.borderBottomColor = "rgba(201,147,58,0.4)")}
                  />
                  <p className="text-xs" style={{ color: "rgba(201,195,181,0.4)" }}>
                    {c.formStep1Hint}
                  </p>
                  <button
                    onClick={validateAndNext}
                    className="mt-auto font-semibold px-6 py-3 rounded-xl transition-all hover:opacity-90"
                    style={{ backgroundColor: "#C9933A", color: "#04091A" }}
                  >
                    {c.formNextBtn}
                  </button>
                </motion.div>
              )}

              {/* STEP 3: Business type */}
              {step === 3 && (
                <motion.div
                  key="business"
                  custom={dir}
                  variants={shouldReduce ? {} : slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-4 absolute inset-8"
                >
                  <label className="text-lg font-bold" style={{ color: "#FDFAF4" }}>
                    {c.formStep3Label}
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {c.formStep3Options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => { setBusiness(opt.label); goNext(4) }}
                        className="flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                        style={{
                          border: "1px solid rgba(201,147,58,0.2)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "rgba(201,147,58,0.5)"
                          e.currentTarget.style.backgroundColor = "rgba(201,147,58,0.05)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(201,147,58,0.2)"
                          e.currentTarget.style.backgroundColor = "transparent"
                        }}
                      >
                        <span className="text-xl">{opt.icon}</span>
                        <div>
                          <p className="font-medium text-sm" style={{ color: "rgba(201,195,181,0.9)" }}>
                            {opt.label}
                          </p>
                          <p className="text-xs" style={{ color: "rgba(201,195,181,0.5)" }}>
                            {opt.sub}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Technology challenge */}
              {step === 4 && (
                <motion.div
                  key="challenge"
                  custom={dir}
                  variants={shouldReduce ? {} : slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-4 absolute inset-8"
                >
                  <label className="text-lg font-bold" style={{ color: "#FDFAF4" }}>
                    {c.formStep4Label}
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {c.formStep4Options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => { setChallenge(opt.label); goNext(5) }}
                        className="flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                        style={{ border: "1px solid rgba(201,147,58,0.2)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "rgba(201,147,58,0.5)"
                          e.currentTarget.style.backgroundColor = "rgba(201,147,58,0.05)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(201,147,58,0.2)"
                          e.currentTarget.style.backgroundColor = "transparent"
                        }}
                      >
                        <span className="text-xl">{opt.icon}</span>
                        <div>
                          <p className="font-medium text-sm" style={{ color: "rgba(201,195,181,0.9)" }}>
                            {opt.label}
                          </p>
                          <p className="text-xs" style={{ color: "rgba(201,195,181,0.5)" }}>
                            {opt.sub}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Loading */}
              {step === 5 && !done && (
                <motion.div
                  key="loading"
                  custom={dir}
                  variants={shouldReduce ? {} : slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col items-center justify-center gap-5 text-center absolute inset-8"
                >
                  <Loader2 className="w-10 h-10 animate-spin" style={{ color: "#D9A84E" }} />
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={loadingIdx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="font-medium"
                      style={{ color: "rgba(201,195,181,0.85)" }}
                    >
                      {c.formStep5Texts[loadingIdx]}
                    </motion.p>
                  </AnimatePresence>
                  <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ backgroundColor: "#0C1E40" }}>
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: "#C9933A", transformOrigin: "left" }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.8, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Success */}
              {done && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="flex flex-col items-center justify-center gap-5 text-center absolute inset-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  >
                    <CheckCircle className="w-14 h-14" style={{ color: "#D9A84E" }} />
                  </motion.div>
                  <h3 className="text-xl font-bold" style={{ color: "#FDFAF4" }}>
                    {c.formSuccessTitle.replace("{name}", name)}
                  </h3>
                  <p style={{ color: "rgba(201,195,181,0.7)" }}>{c.formSuccessBody}</p>
                  <button
                    onClick={reopen}
                    className="font-semibold px-6 py-3 rounded-xl transition-all hover:opacity-90"
                    style={{ backgroundColor: "#D9A84E", color: "#04091A" }}
                  >
                    {c.formSuccessBtn}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Member microcopy */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <Medal className="w-4 h-4 shrink-0" style={{ color: "#D9A84E" }} />
          <p className="text-xs text-center" style={{ color: "rgba(201,195,181,0.5)" }}>
            {c.formMicrocopy}
          </p>
        </div>
      </div>
    </section>
  )
}
