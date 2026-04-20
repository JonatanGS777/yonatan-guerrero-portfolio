import { useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function CtaBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
    });

    tl.fromTo(contentRef.current.children, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out' });

    return () => { tl.kill(); };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-[#111827] py-16 md:py-24">
      <div className="max-container container-padding">
        <div ref={contentRef} className="max-w-[700px] mx-auto text-center">
          <span className="text-caption text-[#5A6375] block mb-3 will-animate">
            {t.projectsPage.ctaBannerLabel}
          </span>

          <h2 className="text-display-md font-display text-[#F0EDE6] will-animate">
            {t.projectsPage.ctaBannerHeading}{' '}
            <span className="font-accent italic text-[#D4A853]">
              {t.projectsPage.ctaBannerAccent}
            </span>
          </h2>

          <p className="text-body-lg font-light text-[#9BA3AF] mt-4 will-animate">
            {t.projectsPage.ctaBannerBody}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-10 will-animate">
            <Link
              to="/contact"
              className="inline-block px-8 py-3.5 bg-[#D4A853] text-[#0A0E1A] text-[0.875rem] font-semibold uppercase tracking-[0.06em] hover:bg-[#8B6914] transition-colors duration-300"
            >
              {t.projectsPage.ctaBannerBtn1}
            </Link>
            <Link
              to="/about"
              className="inline-block px-8 py-3.5 border border-[#5A6375] text-[#9BA3AF] text-[0.875rem] font-semibold uppercase tracking-[0.06em] hover:border-[#D4A853] hover:text-[#D4A853] transition-colors duration-300"
            >
              {t.projectsPage.ctaBannerBtn2}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
