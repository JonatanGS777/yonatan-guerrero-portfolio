import { useState } from 'react';
import HeroSection from '@/components/projects/HeroSection';
import ProjectGrid from '@/components/projects/ProjectGrid';
import DigitalMathDeepDive from '@/components/projects/DigitalMathDeepDive';
import GithubShowcase from '@/components/projects/GithubShowcase';
import CtaBanner from '@/components/projects/CtaBanner';
import type { FilterCategory } from '@/components/projects/FilterBar';
import type { Project } from '@/components/projects/ProjectCard';
import { useLanguage } from '@/contexts/LanguageContext';

const projectImages = [
  '/digital-math-preview.jpg',
  '/github-repos-preview.jpg',
  '/project-ai-math.jpg',
  '/project-curriculum-design.jpg',
  '/project-edtech-platform.jpg',
  '/research-publication.jpg',
];

const projectFilters: FilterCategory[] = [
  'platforms',
  'open-source',
  'research',
  'resources',
  'platforms',
  'research',
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const { t } = useLanguage();

  const projects: Project[] = t.projectsPage.items.map((item, i) => ({
    id: i + 1,
    title: item.title,
    category: item.category,
    categoryFilter: projectFilters[i],
    description: item.description,
    tags: [...item.tags],
    image: projectImages[i],
    links: item.links.map((l) => ({ label: l.label, href: l.href, external: l.external })),
  }));

  return (
    <div className="bg-[#0A0E1A]">
      <HeroSection activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <section className="py-16 md:py-24">
        <ProjectGrid projects={projects} activeFilter={activeFilter} />
      </section>

      <DigitalMathDeepDive />
      <GithubShowcase />
      <CtaBanner />
    </div>
  );
}
