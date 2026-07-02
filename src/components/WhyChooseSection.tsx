import { motion } from 'framer-motion'
import {
  Shield,
  CloudCog,
  Globe,
  Zap,
  Users,
  Headphones,
  Check,
  type LucideIcon,
} from 'lucide-react'
import { whyChooseCards } from '../data/content'
import { AnimatedSection } from './AnimatedSection'

const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  backup: CloudCog,
  globe: Globe,
  zap: Zap,
  users: Users,
  headphones: Headphones,
}

export function WhyChooseSection() {
  return (
    <section id="features" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy">
            Why Businesses Choose{' '}
            <span className="text-primary">TallyHosting</span>
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseCards.map((card, i) => {
            const Icon = iconMap[card.icon]
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-bold text-navy mb-4">{card.title}</h3>
                <ul className="space-y-2.5">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
