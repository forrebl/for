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

  if (project.id === 'project-1') {
    return (
      <main className="pt-16 lg:pt-20 min-h-screen">
        <Reveal>
          <div className="relative w-full aspect-[32/9] overflow-hidden border-b border-black/10 bg-[#ddd5ba] flex items-center justify-center px-5 sm:px-8 lg:px-12">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "url('/images/chaika-bg.jpg')",
                backgroundRepeat: 'repeat-y',
                backgroundSize: '100% auto',
                backgroundPosition: 'top center',
                transform: 'scaleY(-1)',
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

        <section
          className="relative overflow-hidden"
          style={{
            backgroundColor: '#ddd5ba',
            backgroundImage: "url('/images/chaika-bg.jpg')",
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% auto',
            backgroundPosition: 'top center',
          }}
        >
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
            <Reveal>
              <p
                className="text-xs uppercase tracking-[0.22em] mb-3 text-[#244f80]"
                style={{ fontFamily: "'Natasha', Impact, 'Arial Narrow', sans-serif" }}
              >
                CGI
              </p>
              <h1
                className="font-bold uppercase text-[#7a2f12] mb-8 sm:mb-10"
                style={{ fontFamily: "'Natasha', Impact, 'Arial Narrow', sans-serif", letterSpacing: '0.025em' }}
              >
                Концепт игры «Чайка»
              </h1>
            </Reveal>

            <Reveal delay={80}>
              <div className="max-w-4xl mx-auto mb-14 sm:mb-16 lg:mb-20">
                <div className="relative rounded-[10px] border-[3px] border-[#3f2b1f] bg-[#f6d982]/85 px-5 py-5 sm:px-8 sm:py-7 lg:px-10 lg:py-8 text-[#8a431e] shadow-[inset_0_0_0_2px_rgba(255,240,180,0.75)] outline outline-1 outline-[#3f2b1f] outline-offset-[4px]">
                  <p className="text-sm sm:text-base lg:text-lg leading-[1.52]">
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
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="space-y-8 sm:space-y-10 lg:space-y-12 max-w-5xl">
              <Reveal delay={120}>
                <div className="grid grid-cols-1 sm:grid-cols-[210px_minmax(0,1fr)] gap-2 sm:gap-8 items-start">
                  <h2
                    className="text-2xl sm:text-3xl lg:text-4xl uppercase text-[#9a4317] leading-none"
                    style={{ fontFamily: "'Natasha', Impact, 'Arial Narrow', sans-serif", letterSpacing: '0.025em' }}
                  >
                    Сеттинг:
                  </h2>
                  <p className="text-[#6e321c] text-base sm:text-lg leading-relaxed pt-0.5">
                    атомикпанк, ретрофутуризм, альтернативный СССР 1970–1980-х
                  </p>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <div className="grid grid-cols-1 sm:grid-cols-[210px_minmax(0,1fr)] gap-2 sm:gap-8 items-start">
                  <h2
                    className="text-2xl sm:text-3xl lg:text-4xl uppercase text-[#806600] leading-none"
                    style={{ fontFamily: "'Natasha', Impact, 'Arial Narrow', sans-serif", letterSpacing: '0.025em' }}
                  >
                    Жанр:
                  </h2>
                  <p className="text-[#70551a] text-base sm:text-lg leading-relaxed pt-0.5">
                    приключение, point-and-click, детектив
                  </p>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="grid grid-cols-1 sm:grid-cols-[210px_minmax(0,1fr)] gap-3 sm:gap-8 items-start">
                  <h2
                    className="text-2xl sm:text-3xl lg:text-4xl uppercase text-[#244f80] leading-none"
                    style={{ fontFamily: "'Natasha', Impact, 'Arial Narrow', sans-serif", letterSpacing: '0.025em' }}
                  >
                    ЦА:
                  </h2>
                  <div className="space-y-3 text-[#244f80] text-base sm:text-lg leading-relaxed">
                    <p>пользователи от&nbsp;14 лет</p>
                    <p>любители инди-игр, приключенческих игр и&nbsp;point-and-click квестов</p>
                    <p>игроки, интересующиеся ретрофутуризмом и&nbsp;атомикпанком</p>
                    <p>поклонники игр вроде «Machinarium», «Papers, Please», «Atomic Heart», «Зайчик»</p>
                    <p>люди, выросшие в&nbsp;странах СНГ и&nbsp;испытывающие интерес к&nbsp;советской культуре</p>
                    <p>художники, дизайнеры и&nbsp;любители авторских визуальных проектов</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={220}>
              <div className="max-w-5xl mx-auto mt-14 sm:mt-16 lg:mt-20">
                <div className="aspect-video overflow-hidden border border-[#5b4b31]/20 bg-black">
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
