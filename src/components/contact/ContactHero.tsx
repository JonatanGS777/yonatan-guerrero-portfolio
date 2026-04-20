import { useRef } from 'react';
import { Link } from 'react-router';
import { Clock } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo(breadcrumbRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0);

      if (titleRef.current) {
        const text = titleRef.current.textContent || '';
        titleRef.current.innerHTML = '';
        const words = text.split(' ');
        words.forEach((word, i) => {
          const wordWrapper = document.createElement('span');
          wordWrapper.style.display = 'inline-block';
          wordWrapper.style.overflow = 'hidden';
          wordWrapper.style.verticalAlign = 'top';

          const inner = document.createElement('span');
          inner.textContent = word;
          inner.style.display = 'inline-block';
          inner.className = 'title-word-inner';

          wordWrapper.appendChild(inner);
          titleRef.current!.appendChild(wordWrapper);

          if (i < words.length - 1) {
            const space = document.createTextNode('\u00A0');
            titleRef.current!.appendChild(space);
          }

          tl.fromTo(inner, { y: '100%' }, { y: '0%', duration: 0.8, ease: 'expo.out' }, 0.1 + i * 0.08);
        });
      }

      tl.fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, 0.5);
      tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6);
    },
    { scope: containerRef, dependencies: [t.contactHero.title] }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[50vh] flex items-center justify-center bg-[#0A0E1A] pt-[72px]"
    >
      <div className="max-container container-padding w-full text-center py-16 md:py-24">
        {/* Breadcrumb */}
        <div ref={breadcrumbRef} className="mb-6 opacity-0">
          <span className="text-caption text-[#5A6375]">
            <Link to="/" className="hover:text-[#D4A853] transition-colors duration-300">
              {t.contactHero.breadcrumbHome}
            </Link>
            {' / '}
            <span>{t.contactHero.breadcrumbCurrent}</span>
          </span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-display-xl font-display text-[#F0EDE6] will-animate"
        >
          {t.contactHero.title}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-4 text-body-lg font-light text-[#9BA3AF] max-w-[600px] mx-auto opacity-0"
        >
          {t.contactHero.subtitle}
        </p>

        {/* Response Time Badge */}
        <div ref={badgeRef} className="mt-10 flex justify-center opacity-0">
          <div className="inline-flex items-center gap-2 border border-[rgba(212,168,83,0.15)] bg-[rgba(17,24,39,0.7)] px-4 py-2">
            <Clock className="w-4 h-4 text-[#D4A853]" />
            <span className="text-caption text-[#5A6375]">
              {t.contactHero.responseTime}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
