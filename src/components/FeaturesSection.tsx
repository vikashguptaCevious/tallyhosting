import { motion } from 'framer-motion'
import { features } from '../data/content'
import { AnimatedSection } from './AnimatedSection'

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-sm font-bold tracking-widest text-primary uppercase">
            Our Capabilities
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">
            FEATURES
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.4 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-5 bg-primary/10 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-primary mb-3">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
