import { useEffect, useRef, useState } from 'react';
import { GraduationCap, BookOpen, Code2, Brain } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const pillarIcons: LucideIcon[] = [GraduationCap, BookOpen, Code2, Brain];

export default function PillarsSection() {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 lg:py-48 bg-[#0A0E1A]"
    >
      <div className="max-container container-padding">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p
            className={`text-caption text-[#5A6375] mb-3 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {t.pillars.sectionLabel}
          </p>
          <h2
            className={`text-display-md font-display text-[#F0EDE6] transition-all duration-800 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '0.1s' }}
          >
            {t.pillars.headline}{' '}
            <span className="text-[#D4A853]">{t.pillars.headlineAccent}</span>
          </h2>
          <p
            className={`mt-4 text-[1.125rem] font-light text-[#9BA3AF] max-w-[640px] mx-auto leading-relaxed transition-all duration-800 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            {t.pillars.subheadline}
          </p>
        </div>

        {/* Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.pillars.items.map((pillar, i) => {
            const Icon = pillarIcons[i];
            return (
              <div
                key={i}
                className={`group relative bg-[#111827] border-l-2 border-[#D4A853] p-8 transition-all duration-700 hover:border-[#F0EDE6] ${
                  visible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-[50px]'
                }`}
                style={{
                  transitionDelay: `${0.2 + i * 0.12}s`,
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  background:
                    'linear-gradient(135deg, rgba(212,168,83,0.03) 0%, transparent 50%), #111827',
                }}
              >
                {/* Icon */}
                <div className="mb-6 transition-transform duration-300 group-hover:rotate-[10deg] group-hover:scale-110">
                  <Icon size={32} className="text-[#D4A853]" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-heading-lg font-semibold text-[#F0EDE6] mb-3">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-[0.875rem] text-[#9BA3AF] leading-relaxed mb-4">
                  {pillar.description}
                </p>

                {/* Tags */}
                <p className="text-caption text-[#5A6375]">{pillar.tags}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
