import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { University, Laptop, Users, Atom } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const contextIcons: LucideIcon[] = [University, Laptop, Users, Atom];

const cardVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function ContextsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section
      ref={sectionRef}
      className="bg-[#111827] py-24 md:py-32 lg:py-48"
    >
      <div className="max-container container-padding">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column - Sticky Title */}
          <motion.div
            className="lg:w-[40%] lg:sticky lg:top-[120px] lg:self-start"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <div className="text-caption text-[#5A6375] mb-4">
              {t.aboutContexts.label}
            </div>
            <h2 className="text-display-md font-display text-[#F0EDE6]">
              {t.aboutContexts.heading}{' '}
              <span className="text-[#D4A853]">{t.aboutContexts.headingAccent}</span>{' '}
              {t.aboutContexts.headingEnd}
            </h2>
          </motion.div>

          {/* Right Column - Context Cards */}
          <div className="lg:w-[60%] space-y-6">
            {t.aboutContexts.items.map((ctx, i) => {
              const Icon = contextIcons[i];
              return (
                <motion.div
                  key={ctx.title}
                  className="bg-[#0A0E1A] p-6 border-l-[3px] border-[#D4A853] transition-all duration-300 hover:translate-x-1 hover:border-[#F0EDE6] will-animate"
                  custom={i}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  variants={cardVariants}
                >
                  <Icon className="w-8 h-8 text-[#D4A853] mb-4" strokeWidth={1.5} />
                  <h3 className="text-heading-md font-semibold text-[#F0EDE6]">
                    {ctx.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-[#9BA3AF] leading-relaxed">
                    {ctx.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
