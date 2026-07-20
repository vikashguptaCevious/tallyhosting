import { motion } from 'framer-motion'
import { ClipboardList, CloudUpload, Server, Rocket } from 'lucide-react'
import { howItWorksSteps } from '../data/content'
import { AnimatedSection } from './AnimatedSection'

const stepIcons = [ClipboardList, CloudUpload, Server, Rocket]

export function HowItWorksSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy">
            How <span className="text-primary">TallyHosting</span> Works
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          {howItWorksSteps.map((step, i) => {
            const Icon = stepIcons[i]
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative text-center"
              >
                {i < howItWorksSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-primary/30" />
                )}

                <div className="relative mx-auto w-20 h-20 rounded-2xl bg-white border-2 border-primary/20 shadow-md flex items-center justify-center mb-5">
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                  <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>

                <h3 className="text-base font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed max-w-[220px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
