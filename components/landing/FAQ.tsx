"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

interface Props { lang: Lang }

export function FAQ({ lang }: Props) {
  const c = copy[lang]

  return (
    <section id="faq" className="py-24" style={{ backgroundColor: "#04091A" }}>
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance font-serif"
          style={{ color: "#FDFAF4" }}
        >
          {c.faqTitle}
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Accordion type="single" collapsible className="flex flex-col gap-2">
            {c.faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl px-5 transition-all"
                style={{
                  backgroundColor: "#071228",
                  border: "1px solid rgba(201,147,58,0.2)",
                }}
              >
                <AccordionTrigger
                  className="font-medium text-left hover:no-underline py-4 transition-colors"
                  style={{ color: "rgba(201,195,181,0.9)" }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  className="leading-relaxed pb-4"
                  style={{ color: "rgba(201,195,181,0.65)" }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
