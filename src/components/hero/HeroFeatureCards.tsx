import { motion } from 'framer-motion'
import {
  Gauge,
  Shield,
  MonitorSmartphone,
  Sparkles,
  CloudCog,
  Headphones,
  type LucideIcon,
} from 'lucide-react'
import { heroFeatureCards } from '../../data/content'

const iconMap: Record<string, LucideIcon> = {
  gauge: Gauge,
  shield: Shield,
  devices: MonitorSmartphone,
  sparkles: Sparkles,
  backup: CloudCog,
  headphones: Headphones,
}

export function HeroFeatureCards() {
  return (
    <section id="features" className="relative pt-6 pb-10 lg:pt-8 lg:pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-light/25 to-white pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 lg:gap-4">
          {heroFeatureCards.map((card, i) => {
            const Icon = iconMap[card.icon]
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col h-full min-h-[170px] rounded-2xl px-5 pt-4 pb-5 bg-white/80 backdrop-blur-sm border border-white shadow-md shadow-primary/5 hover:shadow-xl hover:shadow-primary/15 hover:border-primary/20 transition-all duration-300"
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-3 group-hover:from-primary/25 group-hover:to-primary/10 group-hover:scale-110 transition-all duration-300 shadow-sm shadow-primary/10">
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
                </div>

                <h3 className="text-[15px] font-bold text-navy mb-2 leading-snug group-hover:text-primary transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed flex-1">
                  {card.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
