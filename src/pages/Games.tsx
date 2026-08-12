import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

const games = [
  {
    title: 'CMYK-конструктор',
    description: 'Повтори заданный цвет с помощью четырёх каналов. 10 уровней — каждый следующий требует большей точности.',
    path: '/games/cmyk',
    tag: 'Цвет',
    preview: 'cmyk',
  },
  {
    title: 'Поймай идею',
    description: 'Лови «Идеи», не пропускай их, избегай «Правок» и не отвлекайся на остальные дизайн-слова, пока игра ускоряется.',
    path: '/games/catch',
    tag: 'Реакция',
    preview: 'catch',
  },
] as const;

export default function Games() {
  return (
    <main
      className="pt-24 lg:pt-28 pb-16 lg:pb-20 min-h-screen bg-[#090909] text-white"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#00b8d9]" />
              <span className="w-2 h-2 bg-[#e6007e]" />
              <span className="w-2 h-2 bg-[#f2d500]" />
            </span>
            <p className="ml-2 text-xs uppercase tracking-[0.22em] text-[#00b8d9] font-medium">игры</p>
          </div>
          <h1 className="font-[family-name:var(--font-display)] font-medium mb-4 text-white">
            Сделай паузу
          </h1>
          <p className="text-white/50 max-w-2xl leading-relaxed mb-10 lg:mb-14">
            Небольшие дизайнерские игры между проектами. Можно проверить глазомер, реакцию и терпимость к правкам.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-9 items-stretch">
          {games.map((game, index) => (
            <Reveal key={game.path} delay={index * 100} className="h-full">
              <Link
                to={game.path}
                className="group h-full flex flex-col border-2 border-white/15 bg-[#111] overflow-hidden transition-all duration-150 hover:-translate-y-1 hover:border-white/30"
              >
                <div className="relative w-full aspect-[16/9] shrink-0 overflow-hidden border-b-2 border-white/15 bg-[#161616]">
                  {game.preview === 'cmyk' ? (
                    <div className="absolute inset-0 grid grid-cols-4">
                      <div className="relative bg-[#00b8d9]">
                        <span className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-[#090909]" />
                      </div>
                      <div className="relative bg-[#e6007e]">
                        <span className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#090909]" />
                      </div>
                      <div className="relative bg-[#f2d500]">
                        <span className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#090909]" />
                      </div>
                      <div className="relative bg-[#171717]">
                        <span className="absolute top-0 left-0 w-1/3 h-1/3 bg-white/15" />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="absolute inset-0 bg-[#e9e8df]"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(10,10,10,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.07) 1px, transparent 1px)',
                        backgroundSize: '12px 12px',
                      }}
                    >
                      <span className="absolute top-7 left-[12%] px-3 py-2 bg-[#00b8d9] text-white text-xs sm:text-sm font-medium border-2 border-[#0a0a0a]">Идея</span>
                      <span className="absolute top-20 right-[12%] px-3 py-2 bg-[#e6007e] text-white text-xs sm:text-sm font-medium border-2 border-[#0a0a0a]">Правка</span>
                      <span className="absolute top-[46%] left-[35%] px-3 py-2 bg-white text-[#0a0a0a] text-xs sm:text-sm font-medium border-2 border-[#0a0a0a]">Мокап</span>
                      <span className="absolute bottom-[25%] right-[12%] px-3 py-2 bg-white text-[#0a0a0a] text-xs sm:text-sm font-medium border-2 border-[#0a0a0a]">Шрифт</span>

                      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-14">
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[72%] h-10 bg-[#171717] border-[3px] border-[#0a0a0a]">
                          <div className="absolute inset-[4px] bg-[#2a3fc7] flex items-center justify-center gap-1">
                            <span className="w-2 h-2 bg-[#00b8d9]" />
                            <span className="w-2 h-2 bg-[#e6007e]" />
                            <span className="w-2 h-2 bg-[#f2d500]" />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-4 bg-[#c8c8c2] border-[3px] border-[#0a0a0a]" />
                      </div>
                    </div>
                  )}

                  <div className="absolute top-4 left-4 px-3 py-1.5 text-[10px] sm:text-xs uppercase tracking-[0.16em] bg-[#090909] text-white border-2 border-white/70">
                    {game.tag}
                  </div>
                </div>

                <div className="p-6 sm:p-7 lg:p-8 flex flex-1 flex-col bg-[#111]">
                  <h2 className="text-xl lg:text-2xl font-[family-name:var(--font-display)] font-medium mb-4 text-white leading-[1.15] group-hover:text-[#00b8d9] transition-colors">
                    {game.title}
                  </h2>
                  <p className="text-white/50 leading-relaxed mb-7 flex-1">{game.description}</p>
                  <span className="inline-flex items-center gap-3 text-sm font-medium mt-auto uppercase tracking-[0.12em] text-[#f2d500]">
                    Играть
                    <span className="transition-transform duration-150 group-hover:translate-x-1">▶</span>
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
