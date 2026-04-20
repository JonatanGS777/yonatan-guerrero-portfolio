import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export type FilterCategory = 'all' | 'platforms' | 'research' | 'open-source' | 'resources';

interface FilterBarProps {
  activeFilter: FilterCategory;
  onFilterChange: (filter: FilterCategory) => void;
}

const filterKeys: FilterCategory[] = ['all', 'platforms', 'research', 'open-source', 'resources'];

export default function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  const { t } = useLanguage();

  const filterLabels: Record<FilterCategory, string> = {
    all: t.projectsPage.filters.all,
    platforms: t.projectsPage.filters.platforms,
    research: t.projectsPage.filters.research,
    'open-source': t.projectsPage.filters.openSource,
    resources: t.projectsPage.filters.resources,
  };

  return (
    <div className="flex flex-wrap gap-2">
      {filterKeys.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <motion.button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={
              isActive
                ? 'text-caption px-4 py-2 border border-[#D4A853] text-[#D4A853] bg-[rgba(212,168,83,0.08)] transition-colors duration-300 cursor-pointer'
                : 'text-caption px-4 py-2 border border-[#1A2235] text-[#9BA3AF] hover:border-[#5A6375] hover:text-[#F0EDE6] transition-colors duration-300 cursor-pointer'
            }
            whileTap={{ scale: 0.97 }}
            layout
          >
            {filterLabels[filter]}
          </motion.button>
        );
      })}
    </div>
  );
}
