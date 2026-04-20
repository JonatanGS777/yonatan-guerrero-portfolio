import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const projectLinks = [
  'https://digitalmathematics.org',
  'https://github.com/JonatanGS777',
];

const projectImages = ['/digital-math-preview.jpg', '/github-repos-preview.jpg'];

export default function ProjectsSection() {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 lg:py-48 bg-[#0A0E1A]"
    >
      <div className="max-container container-padding">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <div>
            <p
              className={`text-caption text-[#5A6375] mb-3 transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {t.projectsHome.sectionLabel}
            </p>
            <h2
              className={`text-display-md font-display text-[#F0EDE6] transition-all duration-800 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '0.1s' }}
            >
              {t.projectsHome.headline}{' '}
              <span className="text-[#D4A853]">{t.projectsHome.headlineAccent}</span>{' '}
              {t.projectsHome.headlineEnd}
            </h2>
          </div>
          <Link
            to="/projects"
            className={cn(
              'mt-4 md:mt-0 text-[0.875rem] text-[#9BA3AF] hover:text-[#F0EDE6] transition-all duration-300 relative group',
              visible ? 'opacity-100' : 'opacity-0'
            )}
          >
            {t.projectsHome.viewAll}
            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-[#D4A853] transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.projectsHome.items.map((project, i) => (
            <div
              key={i}
              className={cn(
                'group bg-[#111827] border border-white/[0.04] transition-all duration-500 hover:border-[rgba(212,168,83,0.15)] hover:-translate-y-1 hover:shadow-card',
                visible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-[60px]'
              )}
              style={{
                transitionDelay: `${0.2 + i * 0.2}s`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={projectImages[i]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/90 via-[#0A0E1A]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6">
                  <a
                    href={projectLinks[i]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4A853] text-[0.875rem] font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-400"
                  >
                    {project.linkLabel}
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-heading-lg font-semibold text-[#F0EDE6]">
                  {project.title}
                </h3>
                <p className="mt-2 text-caption text-[#5A6375]">{project.tags}</p>
                <p className="mt-3 text-[0.875rem] text-[#9BA3AF] leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Explore More Banner */}
        <div
          className={cn(
            'mt-12 md:mt-16 bg-[#111827] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-800',
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
          style={{
            transitionDelay: '0.6s',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h4 className="text-heading-md font-semibold text-[#F0EDE6] text-center md:text-left">
            {t.projectsHome.moreTitle}
          </h4>
          <Link
            to="/projects"
            className="inline-flex items-center px-8 py-3.5 bg-[#D4A853] text-[#0A0E1A] text-[0.875rem] font-semibold uppercase tracking-[0.06em] hover:bg-[#8B6914] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,168,83,0.3)]"
          >
            {t.projectsHome.moreBtn}
          </Link>
        </div>
      </div>
    </section>
  );
}
