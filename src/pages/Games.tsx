import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

const games = [
  {
    title: 'CMYK-конструктор',
    description: 'Повтори заданный цвет с помощью четырёх каналов. 10 уровней — каждый следующий требует большей точности.',
    path: '/games/cmyk',
    tag: 'Цвет',
    preview: 'cmyk',
  },
  {
    title: 'Поймай идею',
    description: 'Лови «Идеи», не пропускай их, избегай «Правок» и не отвлекайся на остальные дизайн-слова, пока игра ускоряется.',
    path: '/games/catch',
    tag: 'Реакция',
    preview: 'catch',
  },
] as const;

export default function Games() {
  return (
    <main className="pt-24 lg:pt-28 pb-16 lg:pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3 font-medium">Игровая пауза</p>
          <h1 className="text-3xl lg:text-5xl font-[family-name:var(--font-display)] font-medium leading-tight mb-4">
            Игры
          </h1>
          <p className="text-foreground/50 max-w-2xl leading-relaxed mb-10 lg:mb-14">
            Небольшие дизайнерские игры между проектами. Можно проверить глазомер, реакцию и терпимость к правкам.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7">
          {games.map((game, index) => (
            <Reveal key={game.path} delay={index * 100}>
              <Link
                to={game.path}
                className="group block border border-border bg-card rounded-3xl overflow-hidden hover:border-accent/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-60 sm:h-72 overflow-hidden bg-muted border-b border-border">
                  {game.preview === 'cmyk' ? (
                    <div className="absolute inset-0 grid grid-cols-4">
                      <div className="bg-[#00b8d9] transition-transform duration-500 group-hover:-translate-y-2" />
                      <div className="bg-[#e6007e] transition-transform duration-500 group-hover:translate-y-2" />
                      <div className="bg-[#f2d500] transition-transform duration-500 group-hover:-translate-y-2" />
                      <div className="bg-[#171717] transition-transform duration-500 group-hover:translate-y-2" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-[#f5f5f3]">
                      <span className="absolute top-7 left-[12%] px-4 py-2 rounded-full bg-[#00b8d9] text-white text-sm font-medium rotate-[-5deg]">Идея</span>
                      <span className="absolute top-20 right-[15%] px-4 py-2 rounded-full bg-[#e6007e] text-white text-sm font-medium rotate-[6deg]">Правка</span>
                      <span className="absolute top-[46%] left-[42%] px-4 py-2 rounded-full bg-background border border-border text-foreground/55 text-sm font-medium rotate-[3deg]">Мокап</span>
                      <span className="absolute bottom-[29%] right-[12%] px-4 py-2 rounded-full bg-background border border-border text-foreground/55 text-sm font-medium rotate-[-4deg]">Шрифт</span>
                      <span className="absolute bottom-12 left-1/2 -translate-x-1/2 w-28 h-12 border-[3px] border-foreground/70 border-t-0 rounded-b-2xl bg-background/80" />
                    </div>
                  )}

                  <div className="absolute top-4 left-4 px-3 py-1.5 text-xs uppercase tracking-[0.16em] bg-background/90 border border-border rounded-full">
                    {game.tag}
                  </div>
                </div>

                <div className="p-6 sm:p-7 lg:p-8">
                  <h2 className="text-2xl lg:text-3xl font-[family-name:var(--font-display)] font-medium mb-3 group-hover:text-accent transition-colors">
                    {game.title}
                  </h2>
                  <p className="text-foreground/50 leading-relaxed mb-6">{game.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium">
                    Играть
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
