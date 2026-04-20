import { useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import FilterBar from './FilterBar';
import type { FilterCategory } from './FilterBar';
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  activeFilter: FilterCategory;
  onFilterChange: (filter: FilterCategory) => void;
}

export default function HeroSection({ activeFilter, onFilterChange }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(breadcrumbRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
    tl.fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.12);
    tl.fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.36);
    tl.fromTo(filtersRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.54);
    tl.fromTo(decorRef.current, { opacity: 0 }, { opacity: 0.4, duration: 1.2, ease: 'power2.out' }, 0.3);

    return () => { tl.kill(); };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0A0E1A] pt-[72px] overflow-hidden"
      style={{ minHeight: '60vh' }}
    >
      <div className="max-container container-padding py-16 md:py-24 flex flex-col lg:flex-row items-center gap-10 lg:gap-0">
        {/* Left Column — Text (60%) */}
        <div className="w-full lg:w-[60%] relative z-10">
          {/* Breadcrumb */}
          <div ref={breadcrumbRef} className="mb-6 will-animate">
            <span className="text-caption text-[#5A6375]">
              <Link to="/" className="hover:text-[#D4A853] transition-colors duration-300">
                {t.projectsPage.breadcrumbHome}
              </Link>
              {' / '}
              <span className="text-[#9BA3AF]">{t.projectsPage.breadcrumbCurrent}</span>
            </span>
          </div>

          {/* Title */}
          <h1 ref={titleRef} className="text-display-lg font-display text-[#F0EDE6] will-animate">
            {t.projectsPage.title}{' '}
            <span className="text-[#D4A853] font-accent italic">{t.projectsPage.titleAccent}</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-body-lg font-light text-[#9BA3AF] mt-4 max-w-[540px] leading-relaxed will-animate"
          >
            {t.projectsPage.subtitle}
          </p>

          {/* Filter Tabs */}
          <div ref={filtersRef} className="mt-10 will-animate">
            <FilterBar activeFilter={activeFilter} onFilterChange={onFilterChange} />
          </div>
        </div>

        {/* Right Column — Decorative (40%) */}
        <div
          ref={decorRef}
          className="hidden lg:flex w-[40%] items-center justify-center will-animate"
          style={{ opacity: 0 }}
        >
          <div className="relative w-full aspect-square max-w-[400px]">
            <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(212,168,83,0.1)" strokeWidth="0.5" />
                </pattern>
                <linearGradient id="surfaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4A853" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#D4A853" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <rect width="400" height="400" fill="url(#grid)" />
              <path d="M0,200 Q50,150 100,200 T200,200 T300,200 T400,200" fill="none" stroke="#D4A853" strokeWidth="1.5" opacity="0.6">
                <animate attributeName="d" values="M0,200 Q50,150 100,200 T200,200 T300,200 T400,200;M0,200 Q50,250 100,200 T200,200 T300,200 T400,200;M0,200 Q50,150 100,200 T200,200 T300,200 T400,200" dur="6s" repeatCount="indefinite" />
              </path>
              <path d="M0,220 Q50,170 100,220 T200,220 T300,220 T400,220" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.4">
                <animate attributeName="d" values="M0,220 Q50,170 100,220 T200,220 T300,220 T400,220;M0,220 Q50,270 100,220 T200,220 T300,220 T400,220;M0,220 Q50,170 100,220 T200,220 T300,220 T400,220" dur="8s" repeatCount="indefinite" />
              </path>
              <path d="M200,200 m0,0 a10,10 0 1,0 0.1,0" fill="none" stroke="#D4A853" strokeWidth="1" opacity="0.5">
                <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="20s" repeatCount="indefinite" />
              </path>
              <circle cx="100" cy="200" r="3" fill="#D4A853" opacity="0.5">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="200" cy="200" r="3" fill="#D4A853" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.9;0.5" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="300" cy="200" r="3" fill="#D4A853" opacity="0.5">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.5s" repeatCount="indefinite" />
              </circle>
              <line x1="0" y1="200" x2="400" y2="200" stroke="#5A6375" strokeWidth="0.5" opacity="0.4" />
              <line x1="200" y1="0" x2="200" y2="400" stroke="#5A6375" strokeWidth="0.5" opacity="0.4" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
