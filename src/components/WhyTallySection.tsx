import { motion } from 'framer-motion'
import { whyTallyCards } from '../data/content'
import { AnimatedSection } from './AnimatedSection'

export function WhyTallySection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">
            Why Tally On Cloud?
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyTallyCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-100"
            >
              <div className="relative mx-auto w-20 h-20 mb-6 bg-primary/10 rounded-full flex items-center justify-center text-4xl group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-primary mb-3">{card.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
