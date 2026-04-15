"use client"

import { useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

interface Props {
  lang: Lang
  onCtaClick: () => void
}

export function AnnouncementBar({ lang, onCtaClick }: Props) {
  const shouldReduce = useReducedMotion()
  const c = copy[lang]
  const text = c.announcementBar

  const content = (
    <span className="inline-flex items-center gap-10 pr-20 cursor-pointer whitespace-nowrap text-sm font-semibold tracking-wide text-[#04091A]">
      {text}
    </span>
  )

  return (
    <div
      className="relative overflow-hidden py-2.5 cursor-pointer"
      style={{ backgroundColor: "#C9933A" }}
      onClick={onCtaClick}
      role="banner"
    >
      <div className="flex">
        {shouldReduce ? (
          <div className="px-4">{content}</div>
        ) : (
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            style={{ willChange: "transform" }}
          >
            {content}
            {content}
          </motion.div>
        )}
      </div>
    </div>
  )
}
