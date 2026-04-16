"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

interface Props {
  lang: Lang
  onCtaClick: () => void
}

export function MobileStickyBar({ lang, onCtaClick }: Props) {
  const [dismissed, setDismissed] = useState(false)
  const c = copy[lang]
  const isWorkshop = !!c.workshop
  const barC = (isWorkshop ? c.workshop : c) as any

  if (dismissed) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex items-center justify-between px-4 py-3 gap-3"
      style={{
        background: "linear-gradient(90deg, #C9933A 0%, #D9A84E 100%)",
      }}
    >
      <p className="text-xs font-semibold leading-tight" style={{ color: "#04091A" }}>
        {isWorkshop ? barC.stickyText : c.mobileStickyText}
      </p>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onCtaClick}
          className="text-xs font-bold px-3 py-2 rounded-lg transition-all"
          style={{ backgroundColor: "#04091A", color: "#D9A84E" }}
        >
          {isWorkshop ? barC.stickyBtn : c.mobileStickyBtn}
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
