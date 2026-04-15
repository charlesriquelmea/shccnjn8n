import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Protolylat × HCC-NJ — Alianza Tecnológica Oficial | IA & Software Factory para Negocios Hispanos en NJ',
  description:
    'La firma de Ingeniería de IA y Software Factory seleccionada por la Cámara Hispana de Comercio de NJ. $100 de descuento exclusivo para miembros. Consultoría gratuita de 45 minutos en español.',
  generator: 'v0.app',
  keywords: ['Protolylat', 'HCC-NJ', 'IA engineering', 'software factory', 'automatización', 'negocios hispanos', 'New Jersey', 'inteligencia artificial'],
  openGraph: {
    title: 'Protolylat × HCC-NJ — Tecnología Enterprise para Negocios Hispanos en NJ',
    description: 'Alianza Oficial · $100 Descuento para Miembros · Consultoría Gratuita 45 min · IA Engineering & Software Factory',
    locale: 'es_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark bg-navy-950">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#04091A] text-[#FDFAF4]`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
