import { motion } from 'framer-motion'
import { ArrowRight, Headphones, CheckCircle2 } from 'lucide-react'
import { heroContent, heroPartnerLogos } from '../../data/content'
import { HeroCenterImage, HeroVisualMobile, TrustCard } from './HeroVisual'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
})

function HeroTextContent() {
  return (
    <>
      <motion.span
        {...fadeUp(0.1)}
        className="inline-flex self-center lg:self-start items-center px-4 py-1.5 bg-primary/10 text-primary text-xs sm:text-sm font-semibold rounded-full mb-4 lg:mb-5"
      >
        {heroContent.badge}
      </motion.span>

      <motion.h1
        {...fadeUp(0.2)}
        className="space-y-1 text-[1.65rem] min-[400px]:text-[1.85rem] sm:text-4xl lg:text-[2.15rem] xl:text-[2.5rem] 2xl:text-5xl font-extrabold leading-[1.15] tracking-tight text-navy max-w-xl mx-auto lg:mx-0"
      >
        {heroContent.taglines.map((line) => (
          <span key={line.highlight} className="block">
            {line.prefix}
            <span className={line.color}>{line.highlight}</span>
          </span>
        ))}
      </motion.h1>

      <motion.p
        {...fadeUp(0.35)}
        className="mt-5 lg:mt-6 text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
      >
        {heroContent.description}
      </motion.p>

      <motion.ul
        {...fadeUp(0.45)}
        className="mt-6 lg:mt-7 flex flex-col sm:flex-row sm:flex-wrap justify-center lg:justify-start gap-3 sm:gap-x-4 sm:gap-y-2"
      >
        {heroContent.features.map((feature) => (
          <li
            key={feature.label}
            className="flex items-center justify-center lg:justify-start gap-2 text-sm font-medium text-gray-700"
          >
            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
            {feature.label}
          </li>
        ))}
      </motion.ul>

      <motion.div
        {...fadeUp(0.55)}
        className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4"
      >
        <a
          href={heroContent.cta.primary.href}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
        >
          {heroContent.cta.primary.label}
          <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href={heroContent.cta.secondary.href}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-primary/25 text-primary text-sm font-semibold rounded-xl hover:bg-primary/5 hover:border-primary transition-all duration-300"
        >
          <Headphones className="w-4 h-4" />
          {heroContent.cta.secondary.label}
        </a>
      </motion.div>

      <motion.p
        {...fadeUp(0.6)}
        className="mt-6 text-sm text-gray-500 font-medium"
      >
        {heroContent.socialProof}
      </motion.p>

      <motion.div
        {...fadeUp(0.65)}
        className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-6"
      >
        {heroPartnerLogos.map((logo) => (
          <img
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            className="h-6 sm:h-7 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        ))}
      </motion.div>
    </>
  )
}

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative bg-white overflow-hidden pt-20 pb-8 lg:pt-24 lg:pb-10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/40 via-white to-white pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-x-4 xl:gap-x-6 items-start lg:pt-2">
          <div className="col-span-5 relative z-20 flex flex-col justify-start text-left pt-0">
            <HeroTextContent />
          </div>

          <div className="col-span-4 relative z-10 flex items-center justify-center h-full min-h-[480px] -mx-2 xl:-mx-4 self-center pt-4">
            <HeroCenterImage />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="col-span-3 relative z-20 flex justify-end self-start pt-0"
          >
            <TrustCard className="w-full max-w-[300px] xl:max-w-[320px]" />
          </motion.div>
        </div>

        <div className="lg:hidden flex flex-col text-center pt-0 pb-4">
          <HeroTextContent />
          <div className="mt-8">
            <HeroVisualMobile />
          </div>
        </div>
      </div>
    </section>
  )
}
