import { Headphones } from 'lucide-react'
import { ctaBanner } from '../data/content'
import { AnimatedSection } from './AnimatedSection'

export function CTABanner() {
  return (
    <section className="pt-4 pb-12 lg:pt-6 lg:pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative bg-gradient-to-r from-navy via-[#2a1f5c] to-primary rounded-3xl px-8 py-8 lg:px-16 lg:py-10 text-center overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
                `,
                backgroundSize: '48px 48px',
              }}
            />

            <h2 className="relative text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4">
              {ctaBanner.heading.prefix}
              <span className="text-white">{ctaBanner.heading.highlight}</span>
            </h2>

            <p className="relative text-sm sm:text-base text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              {ctaBanner.description}
            </p>

            <div className="relative flex flex-col sm:flex-row justify-center gap-4">
              {ctaBanner.buttons.map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href}
                  className={
                    btn.variant === 'white'
                      ? 'inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-primary text-sm font-semibold rounded-xl hover:bg-gray-100 transition-colors'
                      : 'inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/40 text-white text-sm font-semibold rounded-xl hover:bg-white/10 transition-colors'
                  }
                >
                  {btn.variant === 'outline' && <Headphones className="w-4 h-4" />}
                  {btn.label}
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
