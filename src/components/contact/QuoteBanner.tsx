import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function QuoteBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const attrRef = useRef<HTMLParagraphElement>(null);
  const decoRef = useRef<HTMLSpanElement>(null);
  const { t } = useLanguage();

  useGSAP(
    () => {
      if (!sectionRef.current || !quoteRef.current) return;

      gsap.fromTo(
        decoRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 0.15, scale: 1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      );

      const text = quoteRef.current.textContent || '';
      quoteRef.current.innerHTML = '';
      const words = text.split(' ');
      const wordSpans: HTMLSpanElement[] = [];

      words.forEach((word: string, i: number) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        span.className = 'quote-word';
        quoteRef.current!.appendChild(span);
        wordSpans.push(span);

        if (i < words.length - 1) {
          const space = document.createTextNode('\u00A0');
          quoteRef.current!.appendChild(space);
        }
      });

      gsap.to(wordSpans, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });

      gsap.fromTo(
        attrRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3 + words.length * 0.02,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      );
    },
    { scope: sectionRef, dependencies: [t.quoteBanner.quote] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0A0E1A] py-24 md:py-32 overflow-hidden"
    >
      <div className="max-container container-padding relative">
        <div className="max-w-[800px] mx-auto text-center relative">
          <span
            ref={decoRef}
            className="absolute -top-8 left-1/2 -translate-x-1/2 font-accent text-[8rem] text-[#D4A853] opacity-0 pointer-events-none select-none leading-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <blockquote
            ref={quoteRef}
            className="font-accent text-display-md italic text-[#F0EDE6] leading-[1.5] relative z-10"
          >
            {t.quoteBanner.quote}
          </blockquote>

          <p ref={attrRef} className="mt-6 text-body-sm text-[#5A6375] opacity-0">
            {t.quoteBanner.attr}
          </p>
        </div>
      </div>
    </section>
  );
}
