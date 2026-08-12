import { useState } from 'react';
import Reveal from '../components/Reveal';
import { Link } from 'react-router-dom';

const skills = [
  { category: 'Бренд-дизайн', items: ['Айдентика', 'Фирменный стиль', 'Дизайн-концепции', 'Рекламные кампании'] },
  { category: 'Графический дизайн', items: ['Дизайн презентаций', 'Упаковка', 'Полиграфия', 'Digital-материалы'] },
  { category: 'Art & Motion', items: ['Иллюстрация и концепт-арт', '2D-анимация', 'Коллаж и композитинг', 'Визуализация продукта'] },
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
};

const photoshopCapabilityPositions = [
  { x: -105, y: -68 },
  { x: 0, y: -92 },
  { x: 105, y: -68 },
  { x: 145, y: 0 },
  { x: 105, y: 68 },
  { x: 0, y: 92 },
  { x: -105, y: 68 },
  { x: -145, y: 0 },
];

/* разрозненные углы наклона для эффекта «гаек в куче» */
const toolRotations = [
  -2.5, 1.8, -0.7, 3.1, -1.4, 0.9, -3.0, 2.2, -0.3, 1.5,
];

export default function About() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <main
      className="pt-24 lg:pt-32 pb-20 lg:pb-32"
      onClick={() => setActiveTool(null)}
    >
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-black/10 backdrop-blur-[1px] transition-opacity duration-200 ${
          activeTool ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-20 lg:mb-32 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="w-full max-w-[360px] sm:max-w-sm lg:max-w-md mx-auto lg:mx-0 aspect-[3/4] bg-card border border-border overflow-hidden rounded-2xl">
                <img
                  src="/images/about.jpg"
                  alt="Фомина Анастасия"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-start">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4 font-medium">
                Обо мне
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-[family-name:var(--font-display)] font-medium mb-8 leading-tight">
                Графический и бренд-дизайнер
                <br />
                <span className="text-xl sm:text-2xl lg:text-3xl text-foreground/30">Художник компьютерной графики, автор креативных проектов</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <div className="space-y-4 text-foreground/60 leading-relaxed">
                <p>
                  Веду проекты от брифа и поиска визуального направления до презентации концепции,
                  подготовки макетов и передачи материалов в производство. Работала с коммерческими
                  брендами, образовательными проектами, командами игровой разработки и галереями современного искусства.
                </p>
                <p>
                  Имею профильное высшее образование в области графики компьютерных игр, а также
                  опыт преподавания.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Skills */}
        <section className="mb-20 lg:mb-32">
          <Reveal>
            <h2 className="text-2xl lg:text-3xl font-[family-name:var(--font-display)] font-medium mb-12 lg:mb-16">
              Специализация и навыки
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {skills.map((group, gi) => (
              <Reveal key={group.category} delay={gi * 100}>
                <div className="border border-border p-6 lg:p-8 bg-card rounded-2xl">
                  <h3 className="text-xs uppercase tracking-[0.15em] text-accent mb-4 font-medium">
                    {group.category}
                  </h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-foreground/70">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Tools — «разрозненные плашки» */}
        <section className="mb-20 lg:mb-32">
          <Reveal>
            <h2 className="text-2xl lg:text-3xl font-[family-name:var(--font-display)] font-medium mb-12 lg:mb-16">
              Инструменты
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap gap-3 items-center py-4 md:py-20">
              {tools.map((tool, i) => {
                const capabilities = toolCapabilities[tool];
                const hasCapabilities = Boolean(capabilities?.length);
                const isActive = activeTool === tool;

                return (
                  <div
                    key={tool}
                    onMouseEnter={() => {
                      if (hasCapabilities) setActiveTool(tool);
                    }}
                    onMouseLeave={() => {
                      if (hasCapabilities) {
                        setActiveTool((current) => (current === tool ? null : current));
                      }
                    }}
                    className={`relative inline-flex group ${hasCapabilities ? 'z-40' : ''}`}
                  >
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (hasCapabilities) {
                          setActiveTool(isActive ? null : tool);
                        }
                      }}
                      aria-expanded={hasCapabilities ? isActive : undefined}
                      style={{
                        transform: `rotate(${toolRotations[i % toolRotations.length]}deg)`,
                      }}
                      className={`relative z-50 px-4 py-2 text-sm border border-border bg-card text-foreground/60 rounded-lg select-none shadow-sm hover:shadow-md hover:border-accent hover:text-accent transition-all duration-300 ${hasCapabilities ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      {tool}
                    </button>

                    {hasCapabilities && capabilities && (
                      <>
                        <div className="hidden md:block pointer-events-none">
                          {capabilities.map((capability, capabilityIndex) => {
                            const position = photoshopCapabilityPositions[capabilityIndex];

                            return (
                              <span
                                key={capability}
                                style={{
                                  left: '50%',
                                  top: '50%',
                                  transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
                                  transitionDelay: `${capabilityIndex * 25}ms`,
                                }}
                                className="absolute z-50 whitespace-nowrap px-3 py-1.5 text-xs border border-accent/30 bg-background text-foreground/80 rounded-full shadow-md opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200"
                              >
                                {capability}
                              </span>
                            );
                          })}
                        </div>

                        <div
                          className={`md:hidden pointer-events-none absolute z-50 left-0 top-full mt-3 w-[min(280px,calc(100vw-3rem))] p-3 border border-border bg-background rounded-2xl shadow-lg transition-all duration-200 ${
                            isActive
                              ? 'opacity-100 visible translate-y-0'
                              : 'opacity-0 invisible -translate-y-2'
                          }`}
                        >
                          <div className="flex flex-wrap gap-2">
                            {capabilities.map((capability) => (
                              <span
                                key={capability}
                                className="px-3 py-1.5 text-xs border border-accent/30 bg-card text-foreground/80 rounded-full"
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

        {/* CTA */}
        <section className="py-16 lg:py-24 bg-accent text-background text-center rounded-3xl">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.2em] text-background/60 mb-4">
              Хороший проект?
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-2xl lg:text-4xl font-[family-name:var(--font-display)] font-medium mb-6">
              Всегда открыта для
              <br />новых идей и сотрудничества
            </h2>
          </Reveal>
          <Reveal delay={200}>
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
