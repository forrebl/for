import { useParams, Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { projects } from '../data/projects';
import { useEffect, useRef, useState } from 'react';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const nextProject = project ? projects.find((p) => p.id === project.nextProjectId) : null;
  const [openChaikaInfoCard, setOpenChaikaInfoCard] = useState<string | null>(null);
  const [comicPageIndex, setComicPageIndex] = useState(0);
  const omutHorizontalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (id !== 'project-9') return;

    const strip = omutHorizontalRef.current;
    if (!strip) return;

    const handleWheel = (event: WheelEvent) => {
      const maxScroll = strip.scrollWidth - strip.clientWidth;
      if (maxScroll <= 1) return;

      const delta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;

      if (delta === 0) return;

      const atStart = strip.scrollLeft <= 1;
      const atEnd = strip.scrollLeft >= maxScroll - 1;
      const movingForward = delta > 0;
      const shouldConsume =
        (movingForward && !atEnd) ||
        (!movingForward && !atStart);

      if (!shouldConsume) return;

      event.preventDefault();
      strip.scrollLeft = Math.max(
        0,
        Math.min(maxScroll, strip.scrollLeft + delta),
      );
    };

    strip.addEventListener('wheel', handleWheel, { passive: false });
    return () => strip.removeEventListener('wheel', handleWheel);
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

  if (project.id === 'project-8') {
    const comicPages = [
      'cover',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
    ];

    return (
      <main className="comic-reader comic-reader--k-sebe">
        <aside className="comic-reader__progress" aria-label={`Страница ${comicPageIndex} из 8`}>
          <span className="comic-reader__scroll-arrow" aria-hidden="true">↓</span>
          <span className="comic-reader__counter">{comicPageIndex}/8</span>
        </aside>

        <div
          className="comic-reader__viewport"
          onScroll={(event) => {
            const viewport = event.currentTarget;
            const index = Math.max(
              0,
              Math.min(8, Math.round(viewport.scrollTop / viewport.clientHeight)),
            );
            setComicPageIndex(index);
          }}
        >
          {comicPages.map((page, index) => (
            <section
              key={page}
              className="comic-reader__page"
              aria-label={index === 0 ? 'Обложка комикса «К себе»' : `Страница ${page} комикса «К себе»`}
            >
              <img
                src={`/images/comics/k-sebe/${page}.JPG`}
                alt={index === 0 ? 'Обложка комикса «К себе»' : `К себе — страница ${page}`}
                className="comic-reader__image"
                loading={index <= 1 ? 'eager' : 'lazy'}
              />
            </section>
          ))}

          <footer className="comic-reader__footer">
            <Link to="/projects?filter=comics" className="comic-reader__back-link">
              ← Вернуться к&nbsp;проектам
            </Link>
          </footer>
        </div>
      </main>
    );
  }

  if (project.id === 'project-9') {
    const omutImage = (page: number) => `/images/comics/omut/${page}.webp`;

    const HoverPage = ({ base, hover, label }: { base: number; hover: number; label: string }) => (
      <div className="omut-hover-page" aria-label={label}>
        <img
          src={omutImage(base)}
          alt={`Омут — страница ${base}`}
          className="omut-hover-page__image omut-hover-page__image--base"
        />
        <img
          src={omutImage(hover)}
          alt={`Омут — страница ${hover}`}
          className="omut-hover-page__image omut-hover-page__image--hover"
          loading="lazy"
        />
      </div>
    );

    return (
      <main className="omut-reader">
        <section className="omut-reader__hero">
          <HoverPage base={1} hover={2} label="Обложка комикса «Омут»: при наведении открывается второй вариант" />
          <div className="omut-reader__hover-hint" aria-hidden="true">
            Наведи курсор
          </div>
        </section>

        <section className="omut-reader__horizontal-stage" aria-label="Омут — страницы 3–7">
          <div
            ref={omutHorizontalRef}
            className="omut-reader__horizontal-scroll"
          >
            <div className="omut-reader__horizontal-track">
              {[3, 4, 5, 6, 7].map((page) => (
                <img
                  key={page}
                  src={omutImage(page)}
                  alt={`Омут — страница ${page}`}
                  className="omut-reader__horizontal-image"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="omut-reader__page-strip" aria-label="Омут — страницы 8–15">
          {[8, 9, 10, 11, 12, 13, 14].map((page) => (
            <div key={page} className="omut-reader__screen-page">
              <img src={omutImage(page)} alt={`Омут — страница ${page}`} loading="lazy" />
            </div>
          ))}
          <div className="omut-reader__screen-page">
            <HoverPage base={15} hover={16} label="Омут — страница 15; при наведении открывается страница 16" />
          </div>
        </section>

        <section className="omut-reader__page-strip omut-reader__page-strip--continuation" aria-label="Омут — страницы 17–19">
          <div className="omut-reader__screen-page">
            <img src={omutImage(17)} alt="Омут — страница 17" loading="lazy" />
          </div>
          <div className="omut-reader__screen-page">
            <HoverPage base={18} hover={19} label="Омут — страница 18; при наведении открывается страница 19" />
          </div>
        </section>

        <section className="omut-reader__page-strip omut-reader__page-strip--ending" aria-label="Омут — страницы 20–23">
          {[20, 21, 22, 23].map((page) => (
            <div key={page} className="omut-reader__screen-page">
              <img src={omutImage(page)} alt={`Омут — страница ${page}`} loading="lazy" />
            </div>
          ))}
        </section>

        <footer className="omut-reader__ending">
          <p>продолжение следует...</p>
          <Link to="/projects?filter=comics" className="omut-reader__back-link">
            ← Вернуться к&nbsp;проектам
          </Link>
        </footer>
      </main>
    );
  }

  if (project.id === 'project-1') {
    return (
      <main
        className="pt-16 lg:pt-20 min-h-screen"
        style={{
          backgroundColor: '#ddd5ba',
          backgroundImage: "url('/images/chaika-bg.jpg')",
          backgroundRepeat: 'repeat-y',
          backgroundSize: '100% auto',
          backgroundPosition: 'top center',
        }}
      >
        <Reveal>
          <div className="relative w-full aspect-[32/9] overflow-hidden flex items-center justify-center px-5 sm:px-8 lg:px-12">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "url('/images/chaika-header-bg.jpg')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
                WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 58%, rgba(0,0,0,0.92) 68%, rgba(0,0,0,0.45) 84%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, #000 0%, #000 58%, rgba(0,0,0,0.92) 68%, rgba(0,0,0,0.45) 84%, transparent 100%)',
              }}
              aria-hidden="true"
            />
            <img
              src="/images/chaika-header-object.png"
              alt="Чайка"
              className="chaika-header-object relative z-10 w-[84%] sm:w-[70%] lg:w-[62%] max-w-[980px] h-auto select-none"
              draggable={false}
            />
          </div>
        </Reveal>

        <section className="chaika-project-section relative overflow-hidden">
          <div className="chaika-content-shell max-w-6xl mx-auto px-5 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
            <Reveal>
              <div className="chaika-project-heading">
                <h1
                  className="chaika-project-heading__title font-bold uppercase"
                  style={{ fontFamily: "'Natasha', Impact, 'Arial Narrow', sans-serif", letterSpacing: '0.025em' }}
                >
                  Концепт игры «Чайка»
                </h1>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start mb-14 sm:mb-16 lg:mb-20">
              <Reveal delay={80}>
                <article className={`chaika-info-card chaika-info-card--setting ${openChaikaInfoCard === 'setting' ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="chaika-info-card__summary"
                    onClick={() => setOpenChaikaInfoCard(openChaikaInfoCard === 'setting' ? null : 'setting')}
                    aria-expanded={openChaikaInfoCard === 'setting'}
                  >
                    <span className="chaika-info-card__title text-[#9a4317]">Сеттинг</span>
                    <span className="chaika-info-card__chevron" aria-hidden="true">⌄</span>
                  </button>
                  <div className="chaika-info-card__body">
                    <div className="chaika-info-card__body-inner text-[#6e321c]">
                      атомикпанк, ретрофутуризм, альтернативный СССР 1970–1980-х
                    </div>
                  </div>
                </article>
              </Reveal>

              <Reveal delay={130}>
                <article className={`chaika-info-card chaika-info-card--genre ${openChaikaInfoCard === 'genre' ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="chaika-info-card__summary"
                    onClick={() => setOpenChaikaInfoCard(openChaikaInfoCard === 'genre' ? null : 'genre')}
                    aria-expanded={openChaikaInfoCard === 'genre'}
                  >
                    <span className="chaika-info-card__title text-[#806600]">Жанр</span>
                    <span className="chaika-info-card__chevron" aria-hidden="true">⌄</span>
                  </button>
                  <div className="chaika-info-card__body">
                    <div className="chaika-info-card__body-inner text-[#70551a]">
                      приключение, point-and-click, детектив
                    </div>
                  </div>
                </article>
              </Reveal>

              <Reveal delay={180}>
                <article className={`chaika-info-card chaika-info-card--audience ${openChaikaInfoCard === 'audience' ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="chaika-info-card__summary"
                    onClick={() => setOpenChaikaInfoCard(openChaikaInfoCard === 'audience' ? null : 'audience')}
                    aria-expanded={openChaikaInfoCard === 'audience'}
                  >
                    <span className="chaika-info-card__title text-[#244f80]">ЦА</span>
                    <span className="chaika-info-card__chevron" aria-hidden="true">⌄</span>
                  </button>
                  <div className="chaika-info-card__body">
                    <div className="chaika-info-card__body-inner text-[#244f80] space-y-2">
                      <p>пользователи от&nbsp;14 лет</p>
                      <p>любители инди-игр, приключенческих игр и&nbsp;point-and-click квестов</p>
                      <p>игроки, интересующиеся ретрофутуризмом и&nbsp;атомикпанком</p>
                      <p>поклонники игр вроде «Machinarium», «Papers, Please», «Atomic Heart», «Зайчик»</p>
                      <p>люди, выросшие в&nbsp;странах СНГ и&nbsp;испытывающие интерес к&nbsp;советской культуре</p>
                      <p>художники, дизайнеры и&nbsp;любители авторских визуальных проектов</p>
                    </div>
                  </div>
                </article>
              </Reveal>

              <Reveal delay={230}>
                <article className={`chaika-info-card chaika-info-card--plot ${openChaikaInfoCard === 'plot' ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="chaika-info-card__summary"
                    onClick={() => setOpenChaikaInfoCard(openChaikaInfoCard === 'plot' ? null : 'plot')}
                    aria-expanded={openChaikaInfoCard === 'plot'}
                  >
                    <span className="chaika-info-card__title text-[#8a431e]">Сюжет</span>
                    <span className="chaika-info-card__chevron" aria-hidden="true">⌄</span>
                  </button>
                  <div className="chaika-info-card__body">
                    <div className="chaika-info-card__body-inner text-[#8a431e]">
                      Сюжет игры сосредоточен вокруг автослесаря, подрабатывающего таксистом.
                      Отправной точкой становится загадочное исчезновение его автомобиля: он
                      самопроизвольно заводится и&nbsp;уезжает в&nbsp;неизвестном направлении.
                      Герой начинает собственное расследование. Он постепенно выявляет, что
                      в&nbsp;городе происходит серия аналогичных краж. В&nbsp;ходе развития
                      сюжета становится известно, что группа бандитов-угонщиков собирает
                      из&nbsp;похищенных автомобилей космический корабль с&nbsp;целью покинуть
                      Землю и&nbsp;отправиться на&nbsp;Луну. Кульминацией становится проникновение
                      героя в&nbsp;их убежище, возвращение любимого автомобиля и&nbsp;неудачный
                      запуск ракеты.
                    </div>
                  </div>
                </article>
              </Reveal>
            </div>

            <Reveal delay={220}>
              <div className="chaika-video-frame max-w-5xl mx-auto mt-14 sm:mt-16 lg:mt-20">
                <div className="chaika-video-frame__bar">
                  <span className="chaika-video-frame__label">Видео</span>
                  <span className="chaika-video-frame__lights" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
                <div className="chaika-video-frame__viewport">
                  <video
                    src="/media/chaika-video.mp4"
                    className="w-full h-full object-cover"
                    preload="metadata"
                    playsInline
                    controls
                    aria-label="Видео проекта «Чайка»"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={235}>
              <div className="mt-10 sm:mt-12 lg:mt-14">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <Link
                    to="/project/project-1/characters"
                    className="chaika-category-card chaika-category-card--characters"
                    aria-label="Открыть раздел «Персонажи»"
                  >
                    <span className="chaika-category-card__label">Персонажи</span>
                    <img
                      src="/images/chaika-nav-characters.png"
                      alt=""
                      className="chaika-category-card__art chaika-category-card__art--characters"
                      aria-hidden="true"
                    />
                  </Link>

                  <button
                    type="button"
                    className="chaika-category-card chaika-category-card--props"
                  >
                    <span className="chaika-category-card__label">Пропсы</span>
                    <img
                      src="/images/chaika-nav-props.png"
                      alt=""
                      className="chaika-category-card__art chaika-category-card__art--props"
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    type="button"
                    className="chaika-category-card chaika-category-card--locations"
                  >
                    <span className="chaika-category-card__label">Локации</span>
                    <img
                      src="/images/chaika-nav-locations.png"
                      alt=""
                      className="chaika-category-card__art chaika-category-card__art--locations"
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    type="button"
                    className="chaika-category-card chaika-category-card--interface"
                  >
                    <span className="chaika-category-card__label">Интерфейс</span>
                    <img
                      src="/images/chaika-nav-interface.png"
                      alt=""
                      className="chaika-category-card__art chaika-category-card__art--interface"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-16 sm:mt-20 lg:mt-24 pt-8 border-t border-[#5b4b31]/20">
                <Link
                  to="/projects?filter=cgi"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#6e321c] hover:text-[#244f80] transition-colors"
                >
                  ← Вернуться к&nbsp;CGI-проектам
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
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
