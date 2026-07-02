import { logoCloudLogos } from '../../data/content'
import { AnimatedSection } from '../AnimatedSection'

export function LogoCloud() {
  const doubled = [...logoCloudLogos, ...logoCloudLogos]

  return (
    <section className="py-12 lg:py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-8 lg:mb-10">
          <p className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
            Trusted by businesses running on
          </p>
        </AnimatedSection>

        <div className="hidden md:flex flex-wrap items-center justify-center gap-x-10 lg:gap-x-14 gap-y-6">
          {logoCloudLogos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center h-10 lg:h-12 px-2 opacity-90 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-full w-auto max-w-[120px] object-contain"
              />
            </div>
          ))}
        </div>

        <div className="md:hidden overflow-hidden">
          <div className="flex animate-marquee w-max gap-10">
            {doubled.map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex items-center justify-center h-9 flex-shrink-0 opacity-90"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-full w-auto max-w-[100px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
