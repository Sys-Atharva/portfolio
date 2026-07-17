import { motion } from 'framer-motion';

interface BentoCardProps {
  title: string;
  category: string;
  image: string;
  colSpan?: string;
  rowSpan?: string;
}

export function BentoCard({ title, category, image, colSpan = 'col-span-1', rowSpan = 'row-span-1' }: BentoCardProps) {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-xl bg-surface border border-border ${colSpan} ${rowSpan}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      data-cursor="hover"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <span className="text-xs font-semibold text-crimson uppercase tracking-wider">{category}</span>
        <h3 className="text-xl font-bold text-white mt-1">{title}</h3>
        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
          <p className="text-sm text-gray-300 mt-2 line-clamp-2">
            Click to view case study, tech stack, and outcomes.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
