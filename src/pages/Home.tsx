import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { projects, categories } from '../data/projects';

const directions = categories.filter((c) => c.slug !== 'all');

const galleryItems = projects.slice(0, 7).map((project) => ({
  id: project.id,
  image: project.cover,
  title: project.title,
  description: project.description,
}));

if (projects[0]?.resultImages[0]) {
  galleryItems.push({
    id: `${projects[0].id}-detail`,
    image: projects[0].resultImages[0],
    title: `${projects[0].title} — деталь`,
    description: projects[0].description,
  });
}

type GalleryItem = (typeof galleryItems)[number];

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedItem(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem]);

  return (
    <main>
      {/* Hero */}
      <section className="min-h-[72vh] lg:min-h-[74vh] flex items-end pb-12 lg:pb-16 pt-28 lg:pt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <Reveal>
            <h1 className="text-4xl lg:text-6xl font-[family-name:var(--font-display)] font-medium mb-4 leading-tight">
              Создаю визуальные миры
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-foreground/50 text-base lg:text-lg max-w-lg sm:max-w-xl mb-10 leading-relaxed">
              Дизайн и графика для брендов, digital-проектов и игр
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

      {/* Gallery */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal>
            <h2 className="text-2xl lg:text-3xl font-[family-name:var(--font-display)] font-medium mb-8 lg:mb-10">
              Галерея
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
            {galleryItems.map((item, index) => (
              <Reveal key={item.id} delay={(index % 4) * 60}>
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="group block w-full aspect-[4/3] overflow-hidden bg-card border border-border rounded-xl lg:rounded-2xl text-left cursor-zoom-in"
                  aria-label={`Открыть: ${item.title}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Directions — цветные номера CMYK */}
      <section className="py-14 lg:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal>
            <h2 className="text-2xl lg:text-3xl font-[family-name:var(--font-display)] font-medium mb-8 lg:mb-10">
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
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="aspect-video bg-card border border-border overflow-hidden rounded-2xl">
                  <video
                    src="/media/about-loop.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label="Фомина Анастасия"
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
                  Графический и бренд-дизайнер
                  <br />
                  <span className="text-foreground/30">Художник компьютерной графики, автор креативных проектов</span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-foreground/50 leading-relaxed mb-6">
                  Веду проекты от брифа и поиска визуального направления до презентации концепции,
                  подготовки макетов и передачи материалов в производство. Работала с коммерческими
                  брендами, галереями современного искусства, образовательными проектами и командами
                  игровой разработки.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <p className="text-foreground/50 leading-relaxed mb-6">
                  Имею профильное высшее образование в области графики компьютерных игр, а также
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
      <section className="py-16 lg:py-24 bg-accent text-background">
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

      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm p-3 sm:p-6 lg:p-10 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
          onMouseDown={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto bg-background rounded-2xl lg:rounded-3xl shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute z-10 top-3 right-3 lg:top-5 lg:right-5 w-10 h-10 flex items-center justify-center rounded-full bg-background/90 border border-border hover:border-foreground transition-colors"
              aria-label="Закрыть"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.75fr)] min-h-0 lg:min-h-[620px]">
              <div className="bg-muted min-h-[280px] sm:min-h-[420px] lg:min-h-[620px] flex items-center justify-center overflow-hidden rounded-t-2xl lg:rounded-l-3xl lg:rounded-tr-none">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full max-h-[58vh] lg:max-h-[82vh] object-contain"
                />
              </div>

              <div className="p-6 pt-8 sm:p-8 lg:p-10 lg:pt-20 flex flex-col justify-start">
                <h3 className="text-2xl lg:text-3xl font-[family-name:var(--font-display)] font-medium leading-tight mb-5 pr-10">
                  {selectedItem.title}
                </h3>
                <p className="text-foreground/55 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
