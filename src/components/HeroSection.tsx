import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroScene = lazy(() => import('./HeroScene'));

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setVideoLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full overflow-hidden"
    >
      {/* Background: Three.js Canvas or Video fallback */}
      <div className="absolute inset-0 z-[1]">
        {videoLoaded ? (
          <Suspense
            fallback={
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-40"
              >
                <source src="/math-visualization-hero.mp4" type="video/mp4" />
              </video>
            }
          >
            <HeroScene />
          </Suspense>
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/math-visualization-hero.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/60 to-transparent z-[2]" />

      {/* Content */}
      <div className="relative z-[3] flex flex-col justify-end min-h-[100dvh] container-padding pb-[8vh]">
        <div className="max-w-[680px]">
          {/* Label */}
          <p className="text-caption text-[#5A6375] tracking-[0.12em] mb-4 will-animate animate-[fadeInUp_0.6s_0.5s_both]">
            {t.hero.label}
          </p>

          {/* Headline */}
          <h1 className="text-display-xl font-display text-[#F0EDE6] will-animate animate-[fadeInUp_0.8s_0.8s_both]">
            {t.hero.headline}{' '}
            <span className="text-[#D4A853] font-accent italic">{t.hero.headlineAccent}</span>{' '}
            {t.hero.headlineEnd}
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-[1.125rem] font-light text-[#9BA3AF] leading-relaxed max-w-[520px] will-animate animate-[fadeInUp_0.7s_1.4s_both]">
            {t.hero.subheadline}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4 will-animate animate-[fadeInUp_0.6s_1.6s_both]">
            <Link
              to="/projects"
              className="inline-flex items-center px-8 py-3.5 bg-[#D4A853] text-[#0A0E1A] text-[0.875rem] font-semibold uppercase tracking-[0.06em] hover:bg-[#8B6914] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,168,83,0.3)]"
            >
              {t.hero.cta1}
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-6 py-3.5 border border-[#5A6375] text-[#9BA3AF] text-[0.875rem] font-medium hover:border-[#D4A853] hover:text-[#D4A853] transition-all duration-300"
            >
              {t.hero.cta2}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={cn(
          'absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2 transition-opacity duration-500',
          scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
      >
        <div className="relative w-px h-10 bg-[#5A6375]/40 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#D4A853] animate-scroll-line" />
        </div>
        <span className="text-caption text-[#5A6375]">{t.hero.scroll}</span>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
