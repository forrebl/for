import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { projects, categories, getCategoryColor } from '../data/projects';

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'all';
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  useEffect(() => {
    const f = searchParams.get('filter');
    if (f && categories.some((c) => c.slug === f)) {
      setActiveFilter(f);
    }
  }, [searchParams]);

  const handleFilter = (slug: string) => {
    setActiveFilter(slug);
    if (slug === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ filter: slug });
    }
  };

  const getFilterStyle = (slug: string, color: string) => {
    if (activeFilter === slug) {
      if (slug === 'all') {
        return { backgroundColor: '#2a3fc7', borderColor: '#2a3fc7', color: '#ffffff' };
      }
      return { backgroundColor: color, borderColor: color, color: slug === 'cgi' ? '#0a0a0a' : '#ffffff' };
    }
    return { borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)' };
  };

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.categorySlug === activeFilter);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-24 lg:pt-32 pb-20 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <Reveal>
          <h1 className="text-3xl lg:text-5xl font-[family-name:var(--font-display)] font-medium mb-4 text-white">
            Проекты
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-white/50 max-w-lg mb-12 lg:mb-16">
            Коллекция работ
          </p>
        </Reveal>

        {/* Filters — цветные плашки */}
        <Reveal delay={200}>
          <div className="flex flex-wrap gap-2 mb-12 lg:mb-16">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleFilter(cat.slug)}
                className="px-4 py-2 text-sm border transition-all duration-200 rounded-full font-medium"
                style={getFilterStyle(cat.slug, cat.color)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid — 4 columns, square thumbnails, ЧБ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {filtered.map((project, i) => (
            <Reveal key={project.id} delay={i * 60}>
              <Link
                to={`/project/${project.id}`}
                className="group block"
              >
                <div className="relative overflow-hidden bg-white/5 border border-white/10 aspect-square mb-3 group-hover:border-white/30 transition-colors rounded-xl">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <span
                  className="text-xs uppercase tracking-[0.15em] block mb-1 font-medium"
                  style={{ color: getCategoryColor(project.categorySlug) }}
                >
                  {project.category}
                </span>
                <h3 className="text-sm lg:text-base font-[family-name:var(--font-display)] font-medium text-white group-hover:text-white/70 transition-colors leading-tight">
                  {project.title}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30">
            Нет проектов в этой категории
          </div>
        )}
      </div>
    </main>
  );
}
