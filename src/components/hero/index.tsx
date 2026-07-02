import { HeroSection } from './HeroSection'
import { HeroFeatureCards } from './HeroFeatureCards'
import { HeroStatsBar } from './HeroStatsBar'

export function HeroPage() {
  return (
    <>
      <HeroSection />
      <HeroFeatureCards />
      <HeroStatsBar />
    </>
  )
}

export { HeroSection, HeroFeatureCards, HeroStatsBar }
