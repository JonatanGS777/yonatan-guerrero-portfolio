import { useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const titleWords = section.querySelectorAll('.hero-title-word');
      gsap.fromTo(
        titleWords,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.8, stagger: 0.06, ease: 'expo.out', delay: 0.2 }
      );

      gsap.fromTo(
        section.querySelector('.hero-subtitle'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', delay: 0.6 }
      );

      const statItems = section.querySelectorAll('.hero-stat');
      gsap.fromTo(
        statItems,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'expo.out', delay: 0.8 }
      );

      gsap.fromTo(
        section.querySelector('.hero-portrait'),
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.0, ease: 'expo.out', delay: 0.3 }
      );
    }, section);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] bg-[#0A0E1A] pt-[72px] overflow-hidden"
    >
      <div className="max-container container-padding w-full py-16 md:py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start">
          {/* Left Column - 55% */}
          <div className="w-full lg:w-[55%]">
            {/* Breadcrumb */}
            <div className="text-caption text-[#5A6375] mb-6">
              <Link to="/" className="hover:text-[#D4A853] transition-colors duration-300">
                {t.aboutHero.breadcrumbHome}
              </Link>
              {' / '}
              <span>{t.aboutHero.breadcrumbCurrent}</span>
            </div>

            {/* Title */}
            <h1 className="text-display-lg font-display text-[#F0EDE6] leading-tight">
              <span className="overflow-hidden block">
                <span className="hero-title-word inline-block">Yonatan</span>{' '}
                <span className="hero-title-word inline-block font-accent italic text-[#D4A853]">Guerrero</span>{' '}
                <span className="hero-title-word inline-block">Soriano</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle mt-6 text-body-lg font-light text-[#9BA3AF] max-w-xl">
              {t.aboutHero.subtitle}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 md:gap-10 mt-12">
              {t.aboutHero.stats.map((stat) => (
                <div key={stat.abbr} className="hero-stat">
                  <div className="font-mono text-[1.5rem] font-bold text-[#D4A853]">
                    {stat.abbr}
                  </div>
                  <div className="text-caption text-[#5A6375] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - 45% */}
          <div className="w-full lg:w-[45%] relative">
            <div className="relative overflow-hidden">
              <img
                src="/yonatan-portrait.jpg"
                alt="Yonatan Guerrero Soriano"
                className="hero-portrait w-full aspect-[3/4] object-cover will-animate"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(212,168,83,0.15) 0%, transparent 60%)' }}
              />
              <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-[#D4A853]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
