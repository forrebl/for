import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { categories, projects, type ProjectArea } from '../data/projects';

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'all';
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter && categories.some((category) => category.slug === filter)) {
      setActiveFilter(filter);
    } else if (!filter) {
      setActiveFilter('all');
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

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.areas.includes(activeFilter as ProjectArea));

  return (
    <main className="min-h-screen bg-[#2b2b2b] text-white pt-24 lg:pt-32 pb-20 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <h1 className="!text-4xl lg:!text-6xl font-[family-name:var(--font-display)] font-medium mb-5 text-white tracking-[-0.04em]">
            Проекты
          </h1>
        </Reveal>
        <Reveal delay={90}>
          <p className="text-white/50 max-w-2xl mb-10 lg:mb-14 leading-relaxed">
            Искусство, дизайн и game development здесь не разделены на разные портфолио — одна работа
            может относиться сразу к нескольким направлениям.
          </p>
        </Reveal>

        <Reveal delay={160}>
          <div className="flex flex-wrap gap-2 mb-12 lg:mb-16">
            {categories.map((category) => {
              const isActive = activeFilter === category.slug;
              return (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => handleFilter(category.slug)}
                  className={`px-4 py-2 text-sm border rounded-full font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-accent border-accent text-white'
                      : 'border-white/20 text-white/55 hover:border-white/45 hover:text-white'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {filtered.map((project, index) => (
            <Reveal key={project.id} delay={Math.min(index * 70, 280)}>
              <Link to={`/project/${project.id}`} className="group block">
                <div className="relative overflow-hidden bg-white/5 border border-white/10 aspect-square mb-4 group-hover:border-white/30 transition-colors rounded-2xl">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    style={{ objectPosition: project.id === 'project-8' ? 'center 82%' : 'center' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2b2b2b]/55 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity" />
                </div>

                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {project.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-[0.14em] text-[#9fadff] border border-[#9fadff]/20 rounded-full px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-lg lg:text-xl font-[family-name:var(--font-display)] font-medium text-white group-hover:text-white/70 transition-colors leading-tight mb-2">
                  {project.title}
                </h2>
                <p className="text-sm text-white/40 leading-relaxed line-clamp-2">{project.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30">
            Здесь пока нет опубликованных проектов.
          </div>
        )}
      </div>
    </main>
  );
}
