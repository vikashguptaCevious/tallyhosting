import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { acronisFeatures } from '../data/content'
import { AnimatedSection } from './AnimatedSection'

export function AcronisSection() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight">
            Worried about losing your precious data?
            <br />
            <span className="inline-flex items-center gap-2">
              Say goodbye to that risk!
              <Shield className="w-8 h-8" />
            </span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Our partnership with Acronis brings you top-tier protection at just{' '}
            <span className="font-bold text-primary">Rs 250/month (10GB)</span>. Safeguard your
            Tally and PC data from hardware failure and ransomware attacks.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <h3 className="text-xl font-bold text-primary text-center mb-10">
            Why Acronis stands out:
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {acronisFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <span className="text-3xl">{feature.icon}</span>
                <h4 className="mt-4 font-bold text-primary">{feature.title}</h4>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
