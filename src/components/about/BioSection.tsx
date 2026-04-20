import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function BioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.bio-label'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', scrollTrigger: { trigger: section.querySelector('.bio-label'), start: 'top 85%', once: true } }
      );

      gsap.fromTo(
        section.querySelector('.bio-opening'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', scrollTrigger: { trigger: section.querySelector('.bio-opening'), start: 'top 85%', once: true } }
      );

      const paragraphs = section.querySelectorAll('.bio-paragraph');
      paragraphs.forEach((p) => {
        gsap.fromTo(
          p,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', scrollTrigger: { trigger: p, start: 'top 85%', once: true } }
        );
      });

      gsap.fromTo(
        section.querySelector('.quote-mark'),
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: section.querySelector('.quote-block'), start: 'top 80%', once: true } }
      );

      const quoteWords = section.querySelectorAll('.quote-word');
      gsap.fromTo(
        quoteWords,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, stagger: 0.02, ease: 'power2.out', scrollTrigger: { trigger: section.querySelector('.quote-block'), start: 'top 75%', once: true } }
      );

      gsap.fromTo(
        section.querySelector('.quote-attr'),
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', scrollTrigger: { trigger: section.querySelector('.quote-attr'), start: 'top 90%', once: true } }
      );
    }, section);

    return () => ctx.revert();
  }, { scope: sectionRef });

  const quoteWords = t.aboutBio.quote.split(' ');

  return (
    <section ref={sectionRef} className="bg-[#0A0E1A] py-24 md:py-32 lg:py-48">
      <div className="max-container container-padding max-w-[800px] mx-auto">
        {/* Section Label */}
        <div className="bio-label text-caption text-[#5A6375] mb-6">
          {t.aboutBio.label}
        </div>

        {/* Opening Paragraph */}
        <p className="bio-opening text-body-lg text-[#F0EDE6] leading-[1.8]">
          {t.aboutBio.opening}
        </p>

        {/* Body Paragraphs */}
        {t.aboutBio.paragraphs.map((text, i) => (
          <p
            key={i}
            className="bio-paragraph mt-8 md:mt-10 text-[1rem] text-[#9BA3AF] leading-[1.7]"
          >
            {text}
          </p>
        ))}

        {/* Quote Block */}
        <div className="quote-block relative mt-16 md:mt-20">
          <span
            className="quote-mark absolute -top-8 -left-4 md:-left-8 font-accent text-[8rem] leading-none text-[#D4A853] pointer-events-none select-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <blockquote className="relative z-10 text-display-md font-accent italic font-semibold text-[#F0EDE6] leading-[1.3]">
            {quoteWords.map((word, i) => (
              <span key={i} className="quote-word inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </blockquote>

          <p className="quote-attr mt-6 text-body-sm text-[#5A6375]">
            {t.aboutBio.attr}
          </p>
        </div>
      </div>
    </section>
  );
}
