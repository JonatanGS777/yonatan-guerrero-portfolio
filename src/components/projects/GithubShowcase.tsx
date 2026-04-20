import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const repoNames = [
  'ai-skill-agent-control-deck-2026',
  'pagina-de-fe',
  'pagina-matematicas',
];

const repoLanguages = ['Python', 'HTML', 'HTML'];
const repoStars = ['6', '0', '0'];

export default function GithubShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
    });

    tl.fromTo(headerRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
    tl.fromTo(terminalRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.2);

    const lines = terminalRef.current?.querySelectorAll('.terminal-line');
    if (lines) {
      tl.fromTo(lines, { opacity: 0 }, { opacity: 1, duration: 0.15, stagger: 0.08, ease: 'none' }, 0.5);
    }

    tl.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.0);

    return () => { tl.kill(); };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-[#0A0E1A] py-24 md:py-32">
      <div className="max-container container-padding">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24 will-animate">
          <span className="text-caption text-[#5A6375] block mb-3">
            {t.projectsPage.githubLabel}
          </span>
          <h2 className="text-display-md font-display text-[#F0EDE6]">
            {t.projectsPage.githubHeading} <span className="text-[#D4A853]">GitHub</span>
          </h2>
          <p className="text-body-lg font-light text-[#9BA3AF] mt-4 max-w-xl mx-auto">
            {t.projectsPage.githubBody}
          </p>
        </div>

        {/* Terminal Card */}
        <div
          ref={terminalRef}
          className="max-w-[900px] mx-auto bg-[#111827] border border-[#1A2235] overflow-hidden will-animate"
        >
          {/* Terminal Header */}
          <div className="bg-[#1A2235] px-4 py-2.5 flex items-center gap-2">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <span className="w-3 h-3 rounded-full bg-[#10B981]" />
            </div>
            <span className="font-mono text-[0.75rem] text-[#5A6375] ml-4 uppercase tracking-wider">
              yonatan@github: ~/projects
            </span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-[0.875rem]">
            <div className="terminal-line text-[#5A6375]">$ gh repo list JonatanGS777 --limit 6</div>
            <div className="terminal-line h-3" />
            <div className="terminal-line text-[#9BA3AF] text-[0.8rem]">
              {'NAME                           LANGUAGE       STARS  DESCRIPTION'}
            </div>
            <div className="terminal-line text-[#5A6375] text-[0.8rem]">
              {'────────────────────────────────────────────────────────────────────'}
            </div>
            {repoNames.map((name, i) => (
              <div key={name} className="terminal-line">
                <a
                  href={`https://github.com/JonatanGS777/${name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F0EDE6] hover:text-[#D4A853] transition-colors duration-200 text-[0.8rem]"
                >
                  {name.padEnd(30)}{repoLanguages[i].padEnd(15)}{repoStars[i].padEnd(6)}{t.projectsPage.repoDescriptions[i]}
                </a>
              </div>
            ))}
          </div>

          {/* Terminal Footer */}
          <div className="px-6 py-3 border-t border-[#1A2235]">
            <span className="font-mono text-[0.875rem] text-[#9BA3AF]">
              $ <span className="inline-block w-2 h-4 bg-[#9BA3AF] ml-0.5 animate-pulse" />
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            ref={ctaRef}
            href="https://github.com/JonatanGS777"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3.5 bg-[#D4A853] text-[#0A0E1A] text-[0.875rem] font-semibold uppercase tracking-[0.06em] hover:bg-[#8B6914] transition-colors duration-300 will-animate"
          >
            {t.projectsPage.githubCta}
          </a>
        </div>
      </div>
    </section>
  );
}
