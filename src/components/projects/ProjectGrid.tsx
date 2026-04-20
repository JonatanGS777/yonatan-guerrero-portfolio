import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import type { Project } from './ProjectCard';
import type { FilterCategory } from './FilterBar';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectGridProps {
  projects: Project[];
  activeFilter: FilterCategory;
}

export default function ProjectGrid({ projects, activeFilter }: ProjectGridProps) {
  const { t } = useLanguage();

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.categoryFilter === activeFilter);

  return (
    <div className="max-container container-padding">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {filteredProjects.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-[#9BA3AF] py-16"
        >
          {t.projectsPage.empty}
        </motion.p>
      )}
    </div>
  );
}
