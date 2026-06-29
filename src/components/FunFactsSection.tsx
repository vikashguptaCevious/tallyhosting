import { useCountUp } from '../hooks/useCountUp'
import { stats } from '../data/content'
import { AnimatedSection } from './AnimatedSection'

function StatCard({
  value,
  suffix,
  label,
  color,
}: {
  value: number
  suffix: string
  label: string
  color: string
}) {
  const { count, ref } = useCountUp(value)

  return (
    <div ref={ref} className="text-center">
      <div className={`text-4xl sm:text-5xl font-extrabold ${color}`}>
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="mt-2 text-sm text-gray-500 font-medium">{label}</p>
    </div>
  )
}

export function FunFactsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230066cc' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection className="text-center mb-16">
          <span className="text-sm font-bold tracking-widest text-primary uppercase">
            Fun Facts
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-primary leading-tight">
            We Always try to Understand
            <br />
            Users expectation
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
