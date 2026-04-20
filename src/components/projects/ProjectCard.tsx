import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { FilterCategory } from './FilterBar';

export interface Project {
  id: number;
  title: string;
  category: string;
  categoryFilter: FilterCategory;
  description: string;
  tags: string[];
  image: string;
  links: { label: string; href: string; external?: boolean }[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className="group bg-[#111827] border border-[rgba(255,255,255,0.04)] overflow-hidden will-animate hover:border-[rgba(212,168,83,0.15)] hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.5)] transition-all duration-[400ms]"
    >
      {/* Image */}
      <div className="overflow-hidden aspect-[16/10]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <span className="text-caption text-[#D4A853] mb-2 block">
          {project.category}
        </span>

        {/* Title */}
        <h3 className="text-heading-lg text-[#F0EDE6] mb-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-body-sm text-[#9BA3AF] mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-caption text-[#5A6375] border border-[#1A2235] px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 mt-4">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="text-[0.8rem] font-medium text-[#D4A853] hover:text-[#F0EDE6] transition-colors duration-300 inline-flex items-center gap-1"
            >
              {link.label}
              {link.external && <ExternalLink className="w-3 h-3" />}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
