import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { projects } from '../data/projects';

const featuredProjectIds = ['project-1', 'project-10', 'project-9', 'project-8'];

const areas = [
  {
    number: '01',
    title: 'ART',
    description: 'Графика, иллюстрация, комиксы, визуальные эксперименты и личные проекты.',
    filter: 'art',
  },
  {
    number: '02',
    title: 'DESIGN',
    description: 'Айдентика, графический дизайн, key visuals, print и digital.',
    filter: 'design',
  },
  {
    number: '03',
    title: 'GAME DEVELOPMENT',
    description: '2D art, visual development, персонажи, окружение и игровые ассеты.',
    filter: 'game',
  },
] as const;

const games = [
  {
    title: 'CMYK-конструктор',
    description: 'Небольшая игра про цвет и точность.',
    path: '/games/cmyk',
  },
  {
    title: 'Поймай идею',
    description: 'Лови идеи, уклоняйся от правок и не теряй темп.',
    path: '/games/catch',
  },
];

export default function Home() {
  const featuredProjects = featuredProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  return (
    <main>
      <section className="min-h-[78vh] lg:min-h-[82vh] flex items-end pb-14 lg:pb-20 pt-28 lg:pt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <Reveal>
            <h1 className="!text-5xl sm:!text-6xl lg:!text-7xl xl:!text-8xl font-[family-name:var(--font-display)] font-medium mb-7 leading-[0.94] tracking-[-0.055em] max-w-5xl">
              Создаю визуальные миры
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-foreground/55 text-lg lg:text-2xl max-w-3xl mb-8 leading-relaxed">
              Работаю на стыке искусства, дизайна и геймдева — от идеи и поиска визуального языка
              до цельного визуального решения.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="flex flex-wrap gap-2.5 mb-10">
              {['ART', 'DESIGN', 'GAME DEVELOPMENT'].map((label) => (
                <span
                  key={label}
                  className="px-4 py-2 rounded-full border border-accent/25 bg-accent/[0.05] text-accent text-xs sm:text-sm font-medium tracking-wide"
                >
                  {label}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={220}>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-background text-sm font-medium hover:bg-accent/85 transition-colors rounded-full"
              >
                Смотреть проекты
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-border text-sm font-medium hover:border-accent hover:text-accent transition-colors rounded-full"
              >
                Обо мне
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-border text-sm font-medium hover:border-accent hover:text-accent transition-colors rounded-full"
              >
                Связаться
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8 lg:mb-10">
              <h2 className="text-2xl lg:text-3xl font-[family-name:var(--font-display)] font-medium">
                Избранные проекты
              </h2>
              <p className="text-foreground/45 text-sm lg:text-base max-w-xl leading-relaxed">
                Проекты не делятся на отдельные профессии: искусство, дизайн и game development
                пересекаются внутри одной практики.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">
            {featuredProjects.map((project, index) => {
              const isChaika = project.id === 'project-1';
              const isTwentyThirty = project.id === 'project-10';
              const gridClass = isChaika
                ? 'lg:col-span-8 lg:row-span-2'
                : isTwentyThirty
                  ? 'lg:col-span-4 lg:row-span-2'
                  : 'lg:col-span-6';

              return (
                <Reveal key={project.id} delay={Math.min(index * 80, 240)} className={gridClass}>
                  <Link
                    to={`/project/${project.id}`}
                    className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-card min-h-[360px]"
                  >
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      style={{ objectPosition: project.id === 'project-8' ? 'center 82%' : 'center' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#202020]/90 via-[#202020]/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7 text-white">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags?.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 border border-white/30 bg-black/10 backdrop-blur-sm rounded-full text-[10px] sm:text-xs uppercase tracking-[0.12em]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-[family-name:var(--font-display)] font-medium mb-2">
                        {project.title}
                      </h3>
                      <p className="text-white/65 text-sm leading-relaxed max-w-xl">
                        {project.description}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={160}>
            <div className="mt-8">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
              >
                Все проекты →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {areas.map((area, index) => (
              <Reveal key={area.title} delay={index * 90}>
                <Link
                  to={`/projects?filter=${area.filter}`}
                  className="group block h-full min-h-[250px] p-6 lg:p-8 bg-background border border-border rounded-2xl hover:border-accent/40 transition-colors"
                >
                  <span className="text-accent text-sm font-medium block mb-8">{area.number}</span>
                  <h2 className="text-2xl lg:text-3xl font-[family-name:var(--font-display)] font-medium mb-4">
                    {area.title}
                  </h2>
                  <p className="text-foreground/50 leading-relaxed mb-8">{area.description}</p>
                  <span className="text-sm text-foreground/35 group-hover:text-accent transition-colors">
                    Смотреть проекты →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="aspect-square max-w-md bg-card border border-border overflow-hidden rounded-2xl">
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
                <h2 className="text-3xl lg:text-5xl font-[family-name:var(--font-display)] font-medium mb-6 leading-tight">
                  Художник и визуальный дизайнер
                </h2>
              </Reveal>
              <Reveal delay={90}>
                <p className="text-lg lg:text-xl text-foreground/70 leading-relaxed mb-5">
                  Работаю на стыке искусства, дизайна и геймдева.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-foreground/50 leading-relaxed mb-5 max-w-2xl">
                  Создаю визуальные концепции и системы: разрабатываю персонажей и окружение для игр,
                  иллюстрации, айдентику, графические и digital-проекты.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <p className="text-foreground/50 leading-relaxed mb-7 max-w-2xl">
                  Мне интересно не ограничиваться одним направлением, а подбирать визуальный язык под
                  конкретную задачу — от идеи и поиска стилистики до цельного визуального решения.
                </p>
              </Reveal>
              <Reveal delay={280}>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
                >
                  Подробнее обо мне →
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-[#2b2b2b] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-3xl lg:text-5xl font-[family-name:var(--font-display)] font-medium mb-5 leading-tight text-white">
                Игры оставляем
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-white/55 leading-relaxed mb-7 max-w-lg">
                Отдельная игровая площадка сайта: мини-игры, странные механики и приколы без обязанности
                превращать каждую штуку в серьёзный портфельный кейс.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <Link
                to="/games"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/25 text-sm font-medium hover:border-white/60 transition-colors rounded-full"
              >
                Перейти в игры →
              </Link>
            </Reveal>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {games.map((game, index) => (
              <Reveal key={game.path} delay={index * 90}>
                <Link
                  to={game.path}
                  className="group block min-h-[190px] p-6 lg:p-7 border border-white/12 bg-white/[0.04] hover:bg-white/[0.07] transition-colors rounded-2xl"
                >
                  <div className="text-xs uppercase tracking-[0.16em] text-white/35 mb-8">MINI GAME</div>
                  <h3 className="text-xl lg:text-2xl font-[family-name:var(--font-display)] font-medium mb-3 group-hover:text-[#9fadff] transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">{game.description}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-accent text-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <Reveal>
            <h2 className="text-3xl lg:text-5xl font-[family-name:var(--font-display)] font-medium mb-6">
              Есть проект?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-background/70 max-w-xl mx-auto mb-8 leading-relaxed">
              Можно начать с идеи, визуального направления или уже готового брифа.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground text-sm font-medium hover:bg-background/90 transition-colors rounded-full"
            >
              Обсудить проект
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
