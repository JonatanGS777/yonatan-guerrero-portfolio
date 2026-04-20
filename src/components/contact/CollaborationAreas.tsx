import { useRef } from 'react';
import { GraduationCap, Code2, Users, Atom } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const areaIcons: LucideIcon[] = [GraduationCap, Code2, Users, Atom];

export default function CollaborationAreas() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useLanguage();

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true } }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', delay: i * 0.12, scrollTrigger: { trigger: card, start: 'top 85%', once: true } }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-[#111827] py-24 md:py-32">
      <div className="max-container container-padding">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24 opacity-0">
          <span className="text-caption text-[#5A6375] block mb-4">
            {t.collaborationAreas.label}
          </span>
          <h2 className="text-display-md font-display text-[#F0EDE6]">
            {t.collaborationAreas.heading}{' '}
            <span className="text-[#D4A853]">{t.collaborationAreas.headingAccent}</span>
            {t.collaborationAreas.headingEnd}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.collaborationAreas.items.map((item, i) => {
            const Icon = areaIcons[i];
            return (
              <div
                key={item.title}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="group bg-[#0A0E1A] p-8 md:p-10 border-l-[3px] border-l-[#D4A853] transition-all duration-300 hover:-translate-y-1 hover:shadow-card will-animate opacity-0"
              >
                <Icon className="w-10 h-10 text-[#D4A853] mb-6" />
                <h3 className="text-heading-lg font-semibold text-[#F0EDE6] mb-2">
                  {item.title}
                </h3>
                <p className="text-body-sm text-[#9BA3AF] mb-4 leading-relaxed">
                  {item.description}
                </p>
                <p className="text-caption text-[#5A6375]">{item.examples}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
