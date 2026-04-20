import HeroSection from '@/components/about/HeroSection';
import BioSection from '@/components/about/BioSection';
import TimelineSection from '@/components/about/TimelineSection';
import PhilosophySection from '@/components/about/PhilosophySection';
import ContextsSection from '@/components/about/ContextsSection';
import CtaSection from '@/components/about/CtaSection';

export default function About() {
  return (
    <main>
      <HeroSection />
      <BioSection />
      <TimelineSection />
      <PhilosophySection />
      <ContextsSection />
      <CtaSection />
    </main>
  );
}
