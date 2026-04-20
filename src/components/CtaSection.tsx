import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[60vh] flex items-center justify-center bg-[#111827] overflow-hidden"
    >
      {/* Animated background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0 animate-grid-drift"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #D4A853 1px, transparent 1px),
              linear-gradient(-45deg, #D4A853 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div
        className={`relative z-10 max-w-[700px] mx-auto text-center container-padding py-20 md:py-32 transition-all duration-800 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <p className="text-caption text-[#5A6375] tracking-[0.12em] mb-4">
          {t.cta.label}
        </p>
        <h2 className="text-display-lg font-display text-[#F0EDE6]">
          {t.cta.headline}{' '}
          <span className="text-[#D4A853]">{t.cta.headlineAccent}</span>{' '}
          {t.cta.headlineEnd}
        </h2>
        <p className="mt-6 text-[1.125rem] font-light text-[#9BA3AF] leading-relaxed">
          {t.cta.body}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3.5 bg-[#D4A853] text-[#0A0E1A] text-[0.875rem] font-semibold uppercase tracking-[0.06em] hover:bg-[#8B6914] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,168,83,0.3)]"
          >
            {t.cta.btn1}
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center px-6 py-3.5 border border-[#5A6375] text-[#9BA3AF] text-[0.875rem] font-medium hover:border-[#D4A853] hover:text-[#D4A853] transition-all duration-300"
          >
            {t.cta.btn2}
          </Link>
        </div>
      </div>
    </section>
  );
}
