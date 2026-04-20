import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TrajectorySection() {
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
      className="relative py-20 md:py-32 lg:py-40 bg-[#0A0E1A]"
    >
      <div className="max-container container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16">
          {/* Left Column — Portrait & Identity */}
          <div
            className={`transition-all duration-800 ${
              visible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-[30px]'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Portrait */}
            <div className="overflow-hidden border-l-2 border-[#D4A853]">
              <img
                src="/yonatan-portrait.jpg"
                alt="Yonatan Guerrero Soriano"
                className="w-full aspect-[4/5] object-cover transition-transform duration-500 hover:scale-[1.02]"
                loading="lazy"
              />
            </div>

            {/* Name Block */}
            <div className="mt-8">
              <h3 className="font-accent text-[1.5rem] font-semibold text-[#F0EDE6]">
                {t.trajectory.name}
              </h3>
              <p className="mt-1 text-[0.875rem] text-[#9BA3AF]">
                {t.trajectory.subtitle}
              </p>
            </div>

            {/* Quote */}
            <blockquote className="mt-6 pl-6 border-l-2 border-[#D4A853]">
              <p className="text-[1rem] font-light italic text-[#9BA3AF] leading-relaxed">
                {t.trajectory.quote}
              </p>
            </blockquote>
          </div>

          {/* Right Column — Timeline & Stats */}
          <div>
            {/* Section Label */}
            <p
              className={`text-caption text-[#5A6375] tracking-[0.12em] mb-8 transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: '0.1s',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {t.trajectory.sectionLabel}
            </p>

            {/* Timeline */}
            <div className="relative border-l border-[#1A2235]">
              {t.trajectory.timeline.map((item, i) => (
                <div
                  key={i}
                  className={`relative pl-8 pb-10 transition-all duration-600 ${
                    visible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-5'
                  }`}
                  style={{
                    transitionDelay: `${0.2 + i * 0.15}s`,
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {/* Gold dot */}
                  <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-[#D4A853] -translate-x-1/2" />
                  <h4 className="text-heading-md font-semibold text-[#F0EDE6]">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-[0.875rem] text-[#9BA3AF] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div
              className={`mt-12 flex flex-wrap gap-8 transition-all duration-800 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: '0.8s',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {t.trajectory.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-mono text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-[#D4A853]">
                    {stat.value}
                  </div>
                  <div className="text-caption text-[#5A6375] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
