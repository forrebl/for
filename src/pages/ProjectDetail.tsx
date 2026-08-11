import { useParams, Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { projects } from '../data/projects';
import { useEffect } from 'react';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const nextProject = project ? projects.find((p) => p.id === project.nextProjectId) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-[family-name:var(--font-display)] mb-4">Проект не найден</h1>
          <Link to="/projects" className="text-sm text-foreground/50 hover:text-accent transition-colors">
            ← Вернуться к проектам
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 lg:pt-24 pb-20 lg:pb-32">
      {/* Cover */}
      <div className="w-full">
        <Reveal>
          <div className="w-full aspect-[16/7] lg:aspect-[21/8] bg-card border-b border-border overflow-hidden">
            <img
              src={project.cover}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>
      </div>

      {/* Title + description */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-10 lg:mt-16">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.15em] text-accent block mb-3 font-medium">
            {project.category}
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="text-3xl lg:text-5xl font-[family-name:var(--font-display)] font-medium mb-8 leading-tight">
            {project.title}
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-foreground/60 leading-relaxed max-w-2xl mb-16 lg:mb-20">
            {project.description}
          </p>
        </Reveal>
      </div>

      {/* All images — process + results */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="space-y-4">
          {[...project.processImages, ...project.resultImages].map((src, i) => (
            <Reveal key={i} delay={Math.min(i * 80, 400)}>
              <div className="overflow-hidden bg-card border border-border">
                <img
                  src={src}
                  alt={`${project.title} — ${i + 1}`}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </Reveal>
          ))}
        </div>

        {project.resultVideo && (
          <Reveal delay={200}>
            <div className="mt-4 overflow-hidden bg-card border border-border aspect-video flex items-center justify-center">
              <img
                src={project.resultVideo}
                alt={`${project.title} — видео`}
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        )}
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-20 lg:mt-32">
        <div className="border-t border-border pt-10 lg:pt-16">
          {nextProject && (
            <Reveal>
              <Link
                to={`/project/${nextProject.id}`}
                className="group block"
              >
                <div className="relative overflow-hidden bg-card border border-border aspect-[21/6] mb-4 group-hover:border-accent transition-colors">
                  <img
                    src={nextProject.cover}
                    alt={nextProject.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-[0.15em] text-accent block mb-1 font-medium">
                      {nextProject.category}
                    </span>
                    <h3 className="text-xl lg:text-2xl font-[family-name:var(--font-display)] font-medium group-hover:text-accent transition-colors">
                      {nextProject.title}
                    </h3>
                  </div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-foreground/20 group-hover:text-accent transition-all duration-300 group-hover:translate-x-1 shrink-0"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </main>
  );
}
