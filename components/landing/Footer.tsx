"use client"

import type { Lang } from "@/lib/copy"
import { copy } from "@/lib/copy"

interface FooterProps {
  lang: Lang
}

export function Footer({ lang }: FooterProps) {
  const c = copy[lang]
  const isWorkshop = !!c.workshop

  // Use workshop copy if available, otherwise fallback to default
  const footerC = (isWorkshop ? c.workshop : c) as any

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
                  {isWorkshop ? "Build in n8n" : "Protolylat"}
                </span>
                {!isWorkshop && (
                  <>
                    <span className="text-sm" style={{ color: "rgba(201,195,181,0.4)" }}>
                      ×
                    </span>
                    <span className="font-bold text-lg" style={{ color: "#FDFAF4" }}>
                      HCC-NJ
                    </span>
                  </>
                )}
              </div>
              <p
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: "rgba(201,147,58,0.7)" }}
              >
                {isWorkshop ? footerC.footerTagline : "Alianza Tecnológica Oficial"}
              </p>
            </div>
            {!isWorkshop && (
              <div className="flex flex-col gap-1.5">
                {c.footerContact?.map((item, i) => (
                  <span key={i} className="text-sm" style={{ color: "rgba(201,195,181,0.55)" }}>
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* HCC-NJ links or workshop info */}
          {!isWorkshop ? (
            <>
              <div>
                <p
                  className="text-xs font-bold tracking-widest uppercase mb-4"
                  style={{ color: "#D9A84E" }}
                >
                  HCC-NJ
                </p>
                <ul className="flex flex-col gap-2.5">
                  {c.footerHccLinks?.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm transition-colors"
                        style={{ color: "rgba(201,195,181,0.6)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#D9A84E")}
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "rgba(201,195,181,0.6)")
                        }
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p
                  className="text-xs font-bold tracking-widest uppercase mb-4"
                  style={{ color: "#D9A84E" }}
                >
                  Protolylat
                </p>
                <ul className="flex flex-col gap-2.5">
                  {c.footerProtoLinks?.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm transition-colors"
                        style={{ color: "rgba(201,195,181,0.6)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#D9A84E")}
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "rgba(201,195,181,0.6)")
                        }
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="md:col-span-2">
              <p
                className="text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: "#D9A84E" }}
              >
                {footerC.footerEventTitle}
              </p>
              <p className="text-sm mb-1" style={{ color: "rgba(201,195,181,0.6)" }}>
                {footerC.footerDate}
              </p>
              <p className="text-sm" style={{ color: "rgba(201,195,181,0.6)" }}>
                {footerC.footerTime}
              </p>
            </div>
          )}

          {/* Legal links */}
          <div>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-4"
              style={{ color: "#D9A84E" }}
            >
              Legal
            </p>
            <ul className="flex flex-col gap-2.5">
              {(footerC.footerLinks || c.footerLegalLinks)?.map((link: any) => {
                const label = typeof link === "string" ? link : link.label
                const href = typeof link === "string" ? "#" : link.href
                return (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm transition-colors"
                      style={{ color: "rgba(201,195,181,0.6)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#D9A84E")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(201,195,181,0.6)")}
                    >
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-6" style={{ backgroundColor: "rgba(201,147,58,0.15)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-center md:text-left" style={{ color: "rgba(201,195,181,0.4)" }}>
            {footerC.footerCopyright}
          </p>
          {!isWorkshop && (
            <p className="text-xs italic" style={{ color: "rgba(201,147,58,0.5)" }}>
              {c.footerPowered}
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
