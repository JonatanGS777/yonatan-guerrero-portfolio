import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

function AnimatedNumber({ target, inView }: { target: string; inView: boolean }) {
  const [display, setDisplay] = useState('00');

  useEffect(() => {
    if (!inView) return;
    const targetNum = parseInt(target, 10);
    let current = 0;
    const duration = 800;
    const steps = 20;
    const increment = targetNum / steps;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNum) {
        setDisplay(target);
        clearInterval(timer);
      } else {
        setDisplay(String(Math.floor(current)).padStart(2, '0'));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [inView, target]);

  return <span>{display}</span>;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section
      ref={sectionRef}
      className="bg-[#0A0E1A] py-24 md:py-32 lg:py-48"
    >
      <div className="max-container container-padding">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div className="text-caption text-[#5A6375] mb-4">
            {t.aboutPhilosophy.label}
          </div>
          <h2 className="text-display-md font-display text-[#F0EDE6]">
            {t.aboutPhilosophy.heading}{' '}
            <span className="text-[#D4A853]">{t.aboutPhilosophy.headingAccent}</span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.aboutPhilosophy.cards.map((card, i) => (
            <motion.div
              key={card.number}
              className="bg-[#111827] p-8 md:p-10 border-t-2 border-[#D4A853] will-animate"
              custom={i}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={cardVariants}
            >
              <div className="font-mono text-[3rem] text-[#D4A853] opacity-30 leading-none">
                <AnimatedNumber target={card.number} inView={isInView} />
              </div>
              <h3 className="text-heading-lg font-semibold text-[#F0EDE6] mt-6">
                {card.title}
              </h3>
              <p className="mt-4 text-[1rem] text-[#9BA3AF] leading-[1.7]">
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
