import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function DigitalMathDeepDive() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const featureRefs = useRef<(HTMLLIElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'bottom 50%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(imageRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }, 0);
    tl.fromTo([labelRef.current, titleRef.current, descRef.current], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, 0.2);
    tl.fromTo(featureRefs.current.filter(Boolean), { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 0.5);
    tl.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.9);

    return () => { tl.kill(); };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-[#111827] py-24 md:py-32">
      <div className="max-container container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column — Large Image */}
          <div ref={imageRef} className="will-animate">
            <div className="overflow-hidden aspect-[4/3]">
              <img
                src="/digital-math-preview.jpg"
                alt="Digital Mathematics Platform"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-caption text-[#5A6375] mt-3">
              {t.projectsPage.deepDiveCaption}
            </p>
          </div>

          {/* Right Column — Features */}
          <div>
            <span ref={labelRef} className="text-caption text-[#D4A853] block mb-3 will-animate">
              {t.projectsPage.deepDiveLabel}
            </span>

            <h2 ref={titleRef} className="text-display-md font-display text-[#F0EDE6] will-animate">
              Digital Mathematics
            </h2>

            <p ref={descRef} className="text-body-lg font-light text-[#9BA3AF] mt-4 leading-relaxed will-animate">
              {t.projectsPage.deepDiveDesc}
            </p>

            {/* Feature List */}
            <ul className="mt-10 space-y-0">
              {t.projectsPage.deepDiveFeatures.map((feature, i) => (
                <li
                  key={i}
                  ref={(el) => { featureRefs.current[i] = el; }}
                  className="flex items-start gap-3 py-3 border-b border-[#1A2235] will-animate"
                >
                  <CheckCircle className="w-5 h-5 text-[#D4A853] mt-0.5 flex-shrink-0" />
                  <span className="text-[0.95rem] text-[#F0EDE6]">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              ref={ctaRef}
              href="https://digitalmathematics.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-10 px-8 py-3.5 bg-[#D4A853] text-[#0A0E1A] text-[0.875rem] font-semibold uppercase tracking-[0.06em] hover:bg-[#8B6914] transition-colors duration-300 will-animate"
            >
              {t.projectsPage.deepDiveCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
