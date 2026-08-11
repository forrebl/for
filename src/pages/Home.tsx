import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { projects, categories, getCategoryColor } from '../data/projects';

const featuredProjects = projects.filter((p) => p.featured);
const directions = categories.filter((c) => c.slug !== 'all');

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="min-h-[85vh] flex items-end pb-16 lg:pb-24 pt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <Reveal>
            <h1 className="text-4xl lg:text-6xl font-[family-name:var(--font-display)] font-medium mb-4 leading-tight">
              Создаю визуальные миры
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-foreground/50 text-base lg:text-lg max-w-lg mb-10 leading-relaxed">
              Дизайн и графика для брендов, digital-проектов и игр
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-sm font-medium hover:border-accent hover:text-accent transition-colors rounded-full"
              >
                Обо мне
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background text-sm font-medium hover:bg-accent/80 transition-colors rounded-full"
              >
                Смотреть портфолио
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-sm font-medium hover:border-accent hover:text-accent transition-colors rounded-full"
              >
                Связаться
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Projects — ЧБ превью */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="flex items-baseline justify-between mb-12 lg:mb-16">
              <h2 className="text-2xl lg:text-3xl font-[family-name:var(--font-display)] font-medium">
                Избранные проекты
              </h2>
              <Link
                to="/projects"
                className="text-sm text-foreground/40 hover:text-accent transition-colors hidden sm:block"
              >
                Все проекты →
              </Link>
            </div>
          </Reveal>

          <div className="space-y-6 lg:space-y-8">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.id} delay={i * 100}>
                <Link
                  to={`/project/${project.id}`}
                  className="group block relative overflow-hidden bg-card aspect-[16/7] lg:aspect-[21/9]"
                >
                  <img
                    src={project.cover}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                    <span
                      className="text-xs uppercase tracking-[0.15em] mb-2 block font-medium"
                      style={{ color: getCategoryColor(project.categorySlug) }}
                    >
                      {project.category}
                    </span>
                    <h3 className="text-xl lg:text-3xl font-[family-name:var(--font-display)] text-white font-medium">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-8 sm:hidden text-center">
              <Link
                to="/projects"
                className="text-sm text-foreground/40 hover:text-accent transition-colors"
              >
                Все проекты →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Directions — цветные номера CMYK */}
      <section className="py-20 lg:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal>
            <h2 className="text-2xl lg:text-3xl font-[family-name:var(--font-display)] font-medium mb-12 lg:mb-16">
              Направления работы
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {directions.map((dir, i) => (
              <Reveal key={dir.slug} delay={i * 80}>
                <Link
                  to={`/projects?filter=${dir.slug}`}
                  className="block p-6 lg:p-8 border border-border bg-card transition-all group rounded-2xl"
                  style={{ '--dir-color': dir.color } as React.CSSProperties}
                >
                  <span
                    className="text-lg font-[family-name:var(--font-display)] font-medium mb-4 block"
                    style={{ color: dir.color }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-[family-name:var(--font-display)] font-medium mb-2 group-hover:opacity-80 transition-colors">
                    {dir.label}
                  </h3>
                  <span className="text-xs text-foreground/30 group-hover:text-foreground/50 transition-colors">
                    Смотреть проекты →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="aspect-video bg-card border border-border overflow-hidden rounded-2xl">
                  <img
                    src="https://storage.yandexcloud.net/lork/public/services/svc_web_25adfda25fa8887d2788755c/assets/att_188a9b6b111ec45f442cd516e354c851/devushka.gif"
                    alt="Фомина Анастасия"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4 font-medium">
                  Обо мне
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="text-2xl lg:text-3xl font-[family-name:var(--font-display)] font-medium mb-6 leading-snug">
                  Графический и бренд-дизайнер
                  <br />
                  <span className="text-foreground/30">Художник компьютерной графики, автор креативных проектов</span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-foreground/50 leading-relaxed mb-8">
                  Веду проекты от брифа и поиска визуального направления до презентации концепции,
                  подготовки макетов и передачи материалов в производство. Работала с коммерческими
                  брендами, галереями современного искусства, образовательными проектами и командами
                  игровой разработки.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <p className="text-foreground/50 leading-relaxed mb-8">
                  Имею профильное высшее образование в области графики компьютерных игр, а также
                  опыт преподавания.
                </p>
              </Reveal>
              <Reveal delay={400}>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
                >
                  Подробнее
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-accent text-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.2em] text-background/60 mb-4">
              Есть проект?
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl lg:text-5xl font-[family-name:var(--font-display)] font-medium mb-6">
              Давайте создавать
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground text-sm font-medium hover:bg-background/90 transition-colors mt-4 rounded-full"
            >
              Обсудить проект
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
