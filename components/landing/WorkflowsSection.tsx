"use client"

import { useState } from "react"
import { motion } from "framer-motion"

// ─────────────────────────────────────────────────────────
// COPY
// ─────────────────────────────────────────────────────────
const copy = {
  es: {
    workflowsTitle: "No sales con teoría. Sales con 3 automatizaciones funcionando.",
    workflowsIntro: "Cada workflow que construyes en este taller tiene un nombre, una función real, y un impacto medible en tu negocio desde el día siguiente. No son ejercicios. Son tu infraestructura de automatización — deployada y activa.",
    wf1Badge: "Workflow 01",
    wf1Active: "⚡ Activo desde el día 1",
    wf1Title: "Lead Capture → CRM con notificación automática",
    wf1What: "Cada vez que alguien llena tu formulario, n8n lo captura, lo guarda en tu Google Sheets/Airtable como un CRM real, y te envía una notificación instantánea por WhatsApp. Nunca más un lead perdido.",
    wf1Impact: ["⏱️ Respuesta: < 2 min", "💰 Valor: $800–$1,500 como servicio", "🔄 24/7 automático"],
    wf1Stack: ["n8n", "Webhooks", "Google Sheets", "WhatsApp Business API"],
    wf2Badge: "Workflow 02",
    wf2Active: "⚡ Activo desde el día 1",
    wf2Title: "Email Marketing automático con secuencias personalizadas",
    wf2What: "Un nuevo suscriptor o cliente dispara automáticamente una secuencia de emails personalizados con su nombre, comportamiento y contexto — enviados por Resend en los momentos exactos. Tu email marketing corriendo solo mientras tú duermes.",
    wf2Impact: ["📈 Open rate: 45%+ (vs 22% promedio)", "💰 Valor: $1,200–$2,500 como servicio", "🔄 Escala infinita"],
    wf2Stack: ["n8n", "Resend", "Webhooks", "Google Sheets"],
    wf3Badge: "Workflow 03",
    wf3Active: "⚡ El más avanzado · Nivel Intermedio",
    wf3Title: "Agente de IA que responde con contexto real",
    wf3What: "Un mensaje llega (por WhatsApp, email, formulario). n8n extrae el contexto, lo envía a Claude o GPT con tu prompt personalizado, recibe la respuesta inteligente y la entrega automáticamente. Sin sonar a robot. Con el tono de tu marca.",
    wf3Impact: ["⚡ Respuesta: < 30 segundos", "💰 Valor: $2,000–$5,000 como servicio", "🤖 IA con contexto"],
    wf3Stack: ["n8n", "Claude API", "GPT-4", "Webhooks", "WhatsApp API"],
    workflowsSummary: "Valor de mercado de estos 3 workflows implementados por una agencia: $4,500–$12,000. Tu inversión para aprender a construirlos tú: $497. Una sola vez.",
  },
  en: {
    workflowsTitle: "You don't leave with theory. You leave with 3 working automations.",
    workflowsIntro: "Every workflow you build in this workshop has a name, a real function, and a measurable impact on your business from the next day. These aren't exercises. This is your automation infrastructure — deployed and active.",
    wf1Badge: "Workflow 01",
    wf1Active: "⚡ Active from day 1",
    wf1Title: "Lead Capture → CRM with automatic notification",
    wf1What: "Every time someone fills your form, n8n captures it, saves it to your Google Sheets/Airtable as a real CRM, and sends you an instant WhatsApp notification. Never lose a lead again.",
    wf1Impact: ["⏱️ Response: < 2 min", "💰 Value: $800–$1,500 as a service", "🔄 24/7 automatic"],
    wf1Stack: ["n8n", "Webhooks", "Google Sheets", "WhatsApp Business API"],
    wf2Badge: "Workflow 02",
    wf2Active: "⚡ Active from day 1",
    wf2Title: "Automatic Email Marketing with personalized sequences",
    wf2What: "A new subscriber or client automatically triggers a personalized email sequence with their name, behavior and context — sent by Resend at exactly the right moments. Your email marketing running solo while you sleep.",
    wf2Impact: ["📈 Open rate: 45%+ (vs 22% avg)", "💰 Value: $1,200–$2,500 as a service", "🔄 Infinite scale"],
    wf2Stack: ["n8n", "Resend", "Webhooks", "Google Sheets"],
    wf3Badge: "Workflow 03",
    wf3Active: "⚡ Most advanced · Intermediate Level",
    wf3Title: "AI Agent that responds with real context",
    wf3What: "A message arrives (via WhatsApp, email, form). n8n extracts the context, sends it to Claude or GPT with your custom prompt, receives the intelligent response and delivers it automatically. Without sounding robotic. In your brand's voice.",
    wf3Impact: ["⚡ Response: < 30 seconds", "💰 Value: $2,000–$5,000 as a service", "🤖 AI with context"],
    wf3Stack: ["n8n", "Claude API", "GPT-4", "Webhooks", "WhatsApp API"],
    workflowsSummary: "Market value of these 3 workflows implemented by an agency: $4,500–$12,000. Your investment to learn to build them yourself: $497. One time.",
  },
}

// ─────────────────────────────────────────────────────────
// ANIMATION VARIANTS (copied from parent to stay self-contained)
// ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

// ─────────────────────────────────────────────────────────
// WORKFLOW DIAGRAM (copied from parent)
// ─────────────────────────────────────────────────────────
type WfNode = { label: string; color: string }

function WorkflowDiagram({ nodes, isHovered }: { nodes: WfNode[]; isHovered: boolean }) {
  return (
    <div className="flex items-center gap-2 py-2">
      {nodes.map((node, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all duration-300"
            style={{
              color: node.color,
              borderColor: node.color + "60",
              backgroundColor: node.color + "15",
              boxShadow: isHovered ? `0 0 8px ${node.color}40` : "none",
            }}
          >
            {node.label}
          </div>
          {i < nodes.length - 1 && (
            <div className="flex items-center">
              <div
                className="h-px w-8 transition-all duration-300"
                style={{
                  background: isHovered
                    ? `linear-gradient(90deg, ${nodes[i].color}, ${nodes[i + 1].color})`
                    : "#52525b",
                }}
              />
              <div className="text-zinc-500 text-xs">→</div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// WORKFLOW CARD
// ─────────────────────────────────────────────────────────
type WorkflowCardProps = {
  badge: string
  active: string
  title: string
  what: string
  impact: string[]
  stack: string[]
  nodes: WfNode[]
  accentColor: "violet" | "cyan" | "orange"
  statusLabel: string
  statusColor: string
  isHovered: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function WorkflowCard({
  badge, active, title, what, impact, stack, nodes,
  accentColor, statusLabel, statusColor, isHovered,
  onMouseEnter, onMouseLeave,
}: WorkflowCardProps) {
  const borderHover = {
    violet: "hover:border-gold-500/40",
    cyan: "hover:border-gold-500/40",
    orange: "hover:border-gold-500/40",
  }[accentColor]

  const badgeStyle = {
    violet: "bg-violet-600/20 border-violet-500/40 text-violet-300",
    cyan: "bg-cyan-600/20 border-cyan-500/40 text-cyan-300",
    orange: "bg-orange-600/20 border-orange-500/40 text-orange-300",
  }[accentColor]

  const stackStyle = {
    violet: "text-violet-400 bg-violet-500/10",
    cyan: "text-cyan-400 bg-cyan-500/10",
    orange: "text-orange-400 bg-orange-500/10",
  }[accentColor]

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={`bg-zinc-900 border border-zinc-700 rounded-2xl p-6 sm:p-8 ${borderHover} transition-colors`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className={`border text-xs font-mono px-3 py-1 rounded-full ${badgeStyle}`}>{badge}</span>
        <span className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full animate-pulse`} style={{ backgroundColor: statusColor }} />
          <span className="text-xs font-mono" style={{ color: statusColor }}>{statusLabel}</span>
        </span>
        <span className="text-xs text-zinc-400">{active}</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-zinc-50 mb-4">{title}</h3>
      <div className="mb-5 overflow-x-auto">
        <WorkflowDiagram nodes={nodes} isHovered={isHovered} />
      </div>
      <p className="text-zinc-400 leading-relaxed mb-5">{what}</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {impact.map((item, i) => (
          <span key={i} className="text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 px-3 py-1.5 rounded-full">{item}</span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {stack.map((s, i) => (
          <span key={i} className={`text-xs font-mono px-2 py-1 rounded ${stackStyle}`}>{s}</span>
        ))}
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────
interface WorkflowsSectionProps {
  lang: "es" | "en"
}

export default function WorkflowsSection({ lang }: WorkflowsSectionProps) {
  const [wfHovered, setWfHovered] = useState<number | null>(null)
  const t = copy[lang]

  const wf1Nodes: WfNode[] = [
    { label: "Form 📋", color: "#8B5CF6" },
    { label: "n8n ⚡", color: "#8B5CF6" },
    { label: "Sheets 📊", color: "#10B981" },
    { label: "WhatsApp 💬", color: "#22C55E" },
  ]
  const wf2Nodes: WfNode[] = [
    { label: "Event 🎯", color: "#22D3EE" },
    { label: "n8n ⚡", color: "#8B5CF6" },
    { label: "Resend 📧", color: "#3B82F6" },
    { label: "Email ✉️", color: "#3B82F6" },
  ]
  const wf3Nodes: WfNode[] = [
    { label: "Webhook 🔗", color: "#22D3EE" },
    { label: "n8n ⚡", color: "#8B5CF6" },
    { label: "Claude/GPT 🧠", color: "#F97316" },
    { label: "Reply 💬", color: "#22C55E" },
  ]

  return (
    <section id="workflows" className="py-24 ">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl 
          font-bold text-zinc-50 mb-4 text-balance">
            {t.workflowsTitle}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-zinc-400 
          max-w-2xl mx-auto leading-relaxed">
            {t.workflowsIntro}
          </motion.p>
        </motion.div>

        <div className="flex flex-col gap-8">
          <WorkflowCard
            badge={t.wf1Badge} active={t.wf1Active} title={t.wf1Title}
            what={t.wf1What} impact={t.wf1Impact} stack={t.wf1Stack}
            nodes={wf1Nodes} accentColor="violet"
            statusLabel="LIVE" statusColor="#4ade80"
            isHovered={wfHovered === 1}
            onMouseEnter={() => setWfHovered(1)}
            onMouseLeave={() => setWfHovered(null)}
          />
          <WorkflowCard
            badge={t.wf2Badge} active={t.wf2Active} title={t.wf2Title}
            what={t.wf2What} impact={t.wf2Impact} stack={t.wf2Stack}
            nodes={wf2Nodes} accentColor="cyan"
            statusLabel="LIVE" statusColor="#4ade80"
            isHovered={wfHovered === 2}
            onMouseEnter={() => setWfHovered(2)}
            onMouseLeave={() => setWfHovered(null)}
          />
          <WorkflowCard
            badge={t.wf3Badge} active={t.wf3Active} title={t.wf3Title}
            what={t.wf3What} impact={t.wf3Impact} stack={t.wf3Stack}
            nodes={wf3Nodes} accentColor="orange"
            statusLabel="ADVANCED" statusColor="#fb923c"
            isHovered={wfHovered === 3}
            onMouseEnter={() => setWfHovered(3)}
            onMouseLeave={() => setWfHovered(null)}
          />
        </div>

        {/* Summary */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 border border-gold-500 rounded-2xl p-6 sm:p-8 text-center"
        >
          <p className="text-zinc-200 text-lg leading-relaxed">{t.workflowsSummary}</p>
        </motion.div>
      </div>
    </section>
  )
}
