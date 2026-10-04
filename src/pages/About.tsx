import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

const skills = [
  {
    category: 'ART',
    items: ['Иллюстрация', 'Графика', 'Комиксы', 'Визуальные эксперименты'],
  },
  {
    category: 'DESIGN',
    items: ['Айдентика', 'Графический дизайн', 'Key visual', 'Print & digital'],
  },
  {
    category: 'GAME DEVELOPMENT',
    items: ['2D Art', 'Visual Development', 'Персонажи', 'Окружение и игровые ассеты'],
  },
];

const tools = [
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Adobe After Effects',
  'Adobe InDesign',
  'MS PowerPoint',
  'Figma',
  'Procreate',
  'Autodesk Maya',
  'Adobe Substance 3D Painter',
  'Marmoset Toolbag',
  'Нейронки',
];

const toolCapabilities: Record<string, string[]> = {
  'Adobe Photoshop': [
    'Ретушь',
    'Цветокор',
    'Коллажи',
    'Обтравка',
    'Иллюстрация',
    'Концепт-арт',
    'Композитинг',
    'Мокапы',
  ],
  'Adobe Illustrator': [
    'Векторная графика',
    'Логотипы',
    'Макеты',
    'Вёрстка',
    'Инфографика',
    'Иллюстрация',
    'Допечатная подготовка',
  ],
  'Adobe After Effects': [
    '2D-анимация',
    'Моушн-дизайн',
    'Изинг',
    'Анимация персонажей',
    'Анимация текста',
  ],
  'Adobe InDesign': [
    'Многостраничная верстка',
    'Презентации',
    'Полиграфия',
    'Макеты',
    'Допечатная подготовка',
  ],
  'MS PowerPoint': [
    'Презентации',
    'Инфографика',
    'Шаблоны',
    'Анимация',
    'Верстка слайдов',
  ],
  Figma: [
    'Прототипирование',
    'WEB-дизайн',
    'Адаптации',
    'Компоненты',
    'Графика',
    'Дизайн-системы',
  ],
  Procreate: [
    'Иллюстрация',
    'Концепт-арт',
    'Скетчинг',
    'Персонажи',
    'Фоны',
    'Пропсы',
    'Покадровая анимация',
  ],
  'Autodesk Maya': [
    '3D-моделирование',
    'UV-развёртка',
    'Low poly',
    'High poly',
    'Освещение',
    'Рендеринг',
  ],
  'Adobe Substance 3D Painter': [
    'Текстурирование',
    'PBR-материалы',
    'Запекание карт',
  ],
  'Marmoset Toolbag': [
    'Рендеринг',
    'Запекание карт',
    'Материалы',
    'Освещение',
    'Презентация моделей',
  ],
  'Нейронки': [
    'Генерация изображений',
    'Поиск концепций',
    'Стайлинг',
    'Ретушь',
    'Апскейл',
    'Мокапы',
  ],
};

function getCapabilityPositions(count: number) {
  const radiusX = count <= 3 ? 125 : count <= 5 ? 135 : 150;
  const radiusY = count <= 3 ? 72 : count <= 5 ? 84 : 98;

  return Array.from({ length: count }, (_, index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / count;

    return {
      x: Math.cos(angle) * radiusX,
      y: Math.sin(angle) * radiusY,
    };
  });
}

const toolRotations = [
  -2.5, 1.8, -0.7, 3.1, -1.4, 0.9, -3.0, 2.2, -0.3, 1.5,
];

export default function About() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <main
      className="pt-24 lg:pt-28 pb-16 lg:pb-20 overflow-x-hidden"
      onClick={() => setActiveTool(null)}
    >
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-14 lg:mb-20 items-start min-w-0">
          <div className="lg:col-span-5 min-w-0">
            <Reveal>
              <div className="about-portrait relative w-full max-w-[360px] sm:max-w-sm lg:max-w-md mx-auto lg:mx-0 aspect-square bg-card border border-border overflow-hidden rounded-2xl">
                <img
                  src="/images/about.jpg"
                  alt="Фомина Анастасия"
                  className="about-portrait__photo w-full h-full object-cover object-top"
                />
                <video
                  src="/media/about-loop.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  className="about-portrait__motion absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-start min-w-0">
            <Reveal>
              <h1 className="!text-3xl lg:!text-5xl font-[family-name:var(--font-display)] font-medium mb-7 !leading-tight tracking-[-0.035em]">
                Художник и визуальный дизайнер
              </h1>
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
              <p className="text-foreground/50 leading-relaxed mb-5 max-w-2xl">
                Мне интересно не ограничиваться одним направлением, а подбирать визуальный язык под
                конкретную задачу — от идеи и поиска стилистики до цельного визуального решения.
                В работе для меня важны атмосфера, композиция, характер проекта и то, как разные
                визуальные элементы складываются в единую систему.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <p className="text-foreground/40 leading-relaxed max-w-2xl">
                Имею профильное высшее образование в области графики компьютерных игр и опыт работы
                с коммерческими, образовательными и игровыми проектами.
              </p>
            </Reveal>
          </div>
        </div>

        <section className="mb-14 lg:mb-20 min-w-0">
          <Reveal>
            <h2 className="text-2xl lg:text-3xl font-[family-name:var(--font-display)] font-medium mb-8 lg:mb-10">
              Специализация и навыки
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {skills.map((group, groupIndex) => (
              <Reveal key={group.category} delay={groupIndex * 100}>
                <div className="border border-border p-6 lg:p-8 bg-card rounded-2xl h-full">
                  <h3 className="text-lg font-[family-name:var(--font-display)] font-medium mb-5">
                    {group.category}
                  </h3>
                  <ul className="space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="text-foreground/60">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mb-14 lg:mb-20 min-w-0">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-5 lg:mb-6">
              <h2 className="text-2xl lg:text-3xl font-[family-name:var(--font-display)] font-medium">
                Инструменты
              </h2>
              <p className="text-xs sm:text-sm text-foreground/35">
                <span className="hidden md:inline">Наведи — покажу, что умею</span>
                <span className="md:hidden">Нажми — покажу, что умею</span>
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap gap-3 items-center pt-1 pb-4 md:pt-5 md:pb-14 min-w-0 max-w-full">
              {tools.map((tool, index) => {
                const capabilities = toolCapabilities[tool];
                const hasCapabilities = Boolean(capabilities?.length);
                const positions = capabilities ? getCapabilityPositions(capabilities.length) : [];

                return (
                  <div
                    key={tool}
                    className={`relative inline-flex group max-w-full ${hasCapabilities ? 'z-20 hover:z-30 focus-within:z-30' : ''}`}
                  >
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (hasCapabilities) {
                          setActiveTool(activeTool === tool ? null : tool);
                        }
                      }}
                      aria-expanded={hasCapabilities ? activeTool === tool : undefined}
                      style={{
                        transform: `rotate(${toolRotations[index % toolRotations.length]}deg)`,
                      }}
                      className={`max-w-full px-4 py-2 text-sm border border-border bg-card text-foreground/60 rounded-lg select-none shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 transition-all duration-300 ${hasCapabilities ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      {tool}
                    </button>

                    {hasCapabilities && capabilities && (
                      <>
                        <div className="hidden md:block pointer-events-none">
                          {capabilities.map((capability, capabilityIndex) => {
                            const position = positions[capabilityIndex];

                            return (
                              <span
                                key={capability}
                                style={{
                                  left: '50%',
                                  top: '50%',
                                  transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
                                  transitionDelay: `${capabilityIndex * 25}ms`,
                                }}
                                className="absolute whitespace-nowrap px-3 py-1.5 text-xs border border-accent/30 bg-background text-foreground/70 rounded-full shadow-sm opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200"
                              >
                                {capability}
                              </span>
                            );
                          })}
                        </div>

                        <div
                          className={`md:hidden pointer-events-none absolute z-30 left-0 top-full mt-3 w-[min(280px,calc(100vw-3rem))] max-w-[calc(100vw-3rem)] p-3 border border-border bg-background rounded-2xl shadow-lg transition-all duration-200 ${
                            activeTool === tool
                              ? 'opacity-100 visible translate-y-0'
                              : 'opacity-0 invisible -translate-y-2'
                          }`}
                        >
                          <div className="flex flex-wrap gap-2">
                            {capabilities.map((capability) => (
                              <span
                                key={capability}
                                className="px-3 py-1.5 text-xs border border-accent/30 bg-card text-foreground/70 rounded-full"
                              >
                                {capability}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>

        <section className="py-14 lg:py-20 bg-accent text-background text-center rounded-3xl min-w-0">
          <Reveal>
            <h2 className="text-2xl lg:text-4xl font-[family-name:var(--font-display)] font-medium mb-6">
              Открыта для новых идей и сотрудничества
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground text-sm font-medium hover:bg-background/90 transition-colors rounded-full"
            >
              Обсудить проект
            </Link>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
