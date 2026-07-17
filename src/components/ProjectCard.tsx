import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";

interface ProjectCardProps {
  title: string;
  category: string;
  desc: string;
  tags?: string[];
  featured?: boolean;
  isDimmed?: boolean;
}

const categoryColor: Record<string, string> = {
  "Embedded Systems & IoT": "text-crimson-light",
  "Creative Development": "text-purple-400",
  "Mobile & Cross-Platform": "text-amber-400",
  "Web Applications": "text-crimson",
};

export function ProjectCard({ title, category, desc, tags, featured, isDimmed }: ProjectCardProps) {
  return (
    <a
      href="https://github.com/Sys-Atharva"
      target="_blank"
      rel="noopener noreferrer"
      className={`block h-full transition-all duration-300 ${isDimmed ? "opacity-40 scale-[0.97]" : "opacity-100 scale-100"}`}
    >
      <SpotlightCard variant="crimson" className={`h-full ${featured ? "p-8" : "p-6"}`}>
        <div className="flex flex-col h-full">
          <span className={`text-xs font-body font-medium tracking-wider uppercase ${categoryColor[category] ?? "text-crimson"}`}>
            {category}
          </span>

          <h3 className={`font-display font-semibold mt-2 mb-1 ${featured ? "text-2xl" : "text-lg"}`}>
            {title}
          </h3>

          <p className={`text-slate-400 font-body leading-relaxed ${featured ? "text-base" : "text-sm"}`}>
            {desc}
          </p>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
              {tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 text-xs rounded-md bg-muted border border-border text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center gap-1.5 text-sm text-slate-500 group-hover:text-crimson transition-colors">
            <span>View Project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </SpotlightCard>
    </a>
  );
}
