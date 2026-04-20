import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.timeline-header'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', scrollTrigger: { trigger: section.querySelector('.timeline-header'), start: 'top 85%', once: true } }
      );

      gsap.fromTo(
        section.querySelector('.timeline-line-fill'),
        { scaleY: 0 },
        { scaleY: 1, duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: section.querySelector('.timeline-wrapper'), start: 'top 75%', once: true } }
      );

      const items = section.querySelectorAll('.timeline-item');
      items.forEach((item, i) => {
        const node = item.querySelector('.timeline-node');
        const card = item.querySelector('.timeline-card');
        const isLeft = i % 2 === 0;

        gsap.fromTo(
          node,
          { scale: 0 },
          { scale: 1, duration: 0.4, ease: 'back.out(2)', scrollTrigger: { trigger: item, start: 'top 80%', once: true } }
        );

        gsap.fromTo(
          card,
          { x: isLeft ? -30 : 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'expo.out', scrollTrigger: { trigger: item, start: 'top 80%', once: true } }
        );
      });
    }, section);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-[#111827] py-24 md:py-32 lg:py-48">
      <div className="max-container container-padding">
        {/* Section Header */}
        <div className="timeline-header text-center mb-16 md:mb-24">
          <div className="text-caption text-[#5A6375] mb-4">
            {t.aboutTimeline.label}
          </div>
          <h2 className="text-display-md font-display text-[#F0EDE6]">
            {t.aboutTimeline.heading}{' '}
            <span className="text-[#D4A853]">{t.aboutTimeline.headingAccent}</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="timeline-wrapper relative">
          {/* Center Line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
            <div className="w-full h-full bg-[#1A2235]" />
            <div
              className="timeline-line-fill absolute top-0 left-0 w-full h-full bg-[#D4A853] origin-top"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          {/* Left line (mobile) */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5">
            <div className="w-full h-full bg-[#1A2235]" />
            <div
              className="timeline-line-fill absolute top-0 left-0 w-full h-full bg-[#D4A853] origin-top"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          {/* Items */}
          <div className="space-y-12 md:space-y-16">
            {t.aboutTimeline.items.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`timeline-item relative flex items-start md:items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="timeline-node absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full border-[3px] border-[#D4A853] bg-[#111827] z-10 mt-6 md:mt-0" />

                  <div
                    className={`timeline-card ml-12 md:ml-0 md:w-[45%] ${
                      isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                  >
                    <div className="bg-[#0A0E1A] p-6 border-l-2 border-[#D4A853]">
                      <h3 className="text-heading-md font-semibold text-[#F0EDE6]">
                        {item.title}
                      </h3>
                      <div className="mt-2 text-body-sm text-[#9BA3AF]">
                        {item.institution}
                      </div>
                      {'focusLink' in item && item.focusLink ? (
                        <a
                          href={item.focusLink as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 text-body-sm text-[#D4A853] hover:text-[#F0EDE6] transition-colors duration-300 inline-block"
                        >
                          {item.focus}
                        </a>
                      ) : (
                        <div className="mt-1 text-body-sm text-[#D4A853]">
                          {item.focus}
                        </div>
                      )}
                      <p className="mt-3 text-body-sm text-[#9BA3AF] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
