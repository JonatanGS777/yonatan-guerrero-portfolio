import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section ref={sectionRef} className="bg-[#0A0E1A] py-24 md:py-32">
      <motion.div
        className="max-container container-padding max-w-[700px] mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <div className="text-caption text-[#5A6375] mb-4">
          {t.aboutCta.label}
        </div>

        <h2 className="text-display-md font-display text-[#F0EDE6]">
          {t.aboutCta.heading}{' '}
          <span className="font-accent italic text-[#D4A853]">
            {t.aboutCta.headingAccent}
          </span>
        </h2>

        <p className="mt-6 text-body-lg font-light text-[#9BA3AF]">
          {t.aboutCta.body}
        </p>

        <div className="mt-10">
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3.5 bg-[#D4A853] text-[#0A0E1A] text-[0.875rem] font-semibold uppercase tracking-[0.06em] transition-all duration-300 hover:bg-[#8B6914] hover:shadow-[0_0_20px_rgba(212,168,83,0.3)]"
          >
            {t.aboutCta.btn}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
