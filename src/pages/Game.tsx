import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type CMYK = {
  c: number;
  m: number;
  y: number;
  k: number;
};

type Level = {
  target: CMYK;
  tolerance: number;
};

const levels: Level[] = [
  { target: { c: 100, m: 0, y: 0, k: 0 }, tolerance: 22 },
  { target: { c: 0, m: 90, y: 15, k: 0 }, tolerance: 19 },
  { target: { c: 0, m: 15, y: 95, k: 0 }, tolerance: 16 },
  { target: { c: 70, m: 0, y: 75, k: 0 }, tolerance: 14 },
  { target: { c: 15, m: 75, y: 0, k: 10 }, tolerance: 12 },
  { target: { c: 80, m: 45, y: 0, k: 15 }, tolerance: 10 },
  { target: { c: 5, m: 50, y: 70, k: 20 }, tolerance: 8 },
  { target: { c: 55, m: 35, y: 60, k: 25 }, tolerance: 7 },
  { target: { c: 20, m: 45, y: 35, k: 35 }, tolerance: 6 },
  { target: { c: 62, m: 48, y: 38, k: 42 }, tolerance: 5 },
];

const channelMeta = [
  { key: 'c' as const, label: 'C', name: 'Cyan', color: '#00b8d9' },
  { key: 'm' as const, label: 'M', name: 'Magenta', color: '#e6007e' },
  { key: 'y' as const, label: 'Y', name: 'Yellow', color: '#f2d500' },
  { key: 'k' as const, label: 'K', name: 'Black', color: '#171717' },
];

function cmykToRgb({ c, m, y, k }: CMYK) {
  const cyan = c / 100;
  const magenta = m / 100;
  const yellow = y / 100;
  const black = k / 100;

  const r = Math.round(255 * (1 - cyan) * (1 - black));
  const g = Math.round(255 * (1 - magenta) * (1 - black));
  const b = Math.round(255 * (1 - yellow) * (1 - black));

  return `rgb(${r}, ${g}, ${b})`;
}

function getError(current: CMYK, target: CMYK) {
  return (
    Math.abs(current.c - target.c) +
    Math.abs(current.m - target.m) +
    Math.abs(current.y - target.y) +
    Math.abs(current.k - target.k)
  ) / 4;
}

function getHint(current: CMYK, target: CMYK) {
  const differences = channelMeta
    .map((channel) => ({
      ...channel,
      diff: target[channel.key] - current[channel.key],
    }))
    .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));

  const biggest = differences[0];
  if (Math.abs(biggest.diff) <= 2) return 'Ты почти попала. Нужна совсем маленькая корректировка.';

  return `${biggest.label} нужно ${biggest.diff > 0 ? 'чуть больше' : 'чуть меньше'}.`;
}

const initialColor: CMYK = { c: 0, m: 0, y: 0, k: 0 };

export default function Game() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [current, setCurrent] = useState<CMYK>(initialColor);
  const [message, setMessage] = useState('Подбери CMYK так, чтобы цвет справа совпал с образцом.');
  const [passed, setPassed] = useState(false);
  const [finished, setFinished] = useState(false);

  const level = levels[levelIndex];
  const error = useMemo(() => getError(current, level.target), [current, level.target]);
  const accuracy = Math.max(0, Math.round(100 - error));

  const updateChannel = (key: keyof CMYK, value: number) => {
    setCurrent((previous) => ({ ...previous, [key]: value }));
    setPassed(false);
    setMessage('Подбери оттенок и проверь результат.');
  };

  const checkColor = () => {
    if (error <= level.tolerance) {
      setPassed(true);
      setMessage(levelIndex === levels.length - 1 ? 'Идеально. Вы прошли все 10 уровней.' : 'Есть попадание. Можно дальше.');
      return;
    }

    setPassed(false);
    setMessage(`${getHint(current, level.target)} Сейчас точность — ${accuracy}%.`);
  };

  const nextLevel = () => {
    if (!passed) return;

    if (levelIndex === levels.length - 1) {
      setFinished(true);
      return;
    }

    setLevelIndex((index) => index + 1);
    setCurrent(initialColor);
    setPassed(false);
    setMessage('Новый оттенок. Допустимая погрешность стала меньше.');
  };

  const restart = () => {
    setLevelIndex(0);
    setCurrent(initialColor);
    setMessage('Подбери CMYK так, чтобы цвет справа совпал с образцом.');
    setPassed(false);
    setFinished(false);
  };

  return (
    <main className="pt-20 sm:pt-24 lg:pt-28 pb-4 sm:pb-10 lg:pb-20 min-h-[100dvh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <Link to="/games" className="inline-flex items-center gap-2 text-xs sm:text-sm text-foreground/45 hover:text-accent transition-colors mb-3 sm:mb-7">
          ← Все игры
        </Link>

        <div className="mb-4 sm:mb-8 lg:mb-10">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent mb-1.5 sm:mb-3 font-medium">Мини-игра</p>
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-3xl lg:text-5xl font-[family-name:var(--font-display)] font-medium leading-tight mb-1 sm:mb-3">
                CMYK-конструктор
              </h1>
              <p className="hidden sm:block text-foreground/50 max-w-2xl leading-relaxed">
                Повтори цвет с помощью четырёх каналов. 10 уровней — каждый следующий требует большей точности.
              </p>
            </div>
            <span className="text-[11px] sm:text-sm text-foreground/40 whitespace-nowrap pb-1">{levelIndex + 1} / {levels.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-10 gap-1 mb-3 sm:mb-8" aria-label={`Прогресс: уровень ${levelIndex + 1} из ${levels.length}`}>
          {levels.map((_, index) => (
            <div
              key={index}
              className={`h-1 sm:h-1.5 rounded-full transition-colors ${index <= levelIndex ? 'bg-accent' : 'bg-foreground/10'}`}
            />
          ))}
        </div>

        {finished ? (
          <section className="border border-border bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-12 lg:p-16 text-center">
            <div className="mx-auto mb-5 sm:mb-8 grid grid-cols-4 w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-border shadow-sm">
              <div className="bg-[#00b8d9]" />
              <div className="bg-[#e6007e]" />
              <div className="bg-[#f2d500]" />
              <div className="bg-[#171717]" />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3 sm:mb-4">10 / 10</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[family-name:var(--font-display)] font-medium mb-3 sm:mb-4">CMYK покорён</h2>
            <p className="text-sm sm:text-base text-foreground/50 mb-5 sm:mb-8">Теперь можно официально спорить с монитором о цветопередаче.</p>
            <button
              type="button"
              onClick={restart}
              className="px-7 py-3 rounded-full bg-accent text-background text-sm font-medium hover:bg-accent/85 transition-colors"
            >
              Пройти ещё раз
            </button>
          </section>
        ) : (
          <section className="border border-border bg-card rounded-2xl sm:rounded-3xl p-3 sm:p-7 lg:p-9">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)] gap-4 sm:gap-8 lg:gap-12">
              <div>
                <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-6">
                  <div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.16em] text-foreground/40 mb-1 sm:mb-2">Образец</p>
                    <div
                      className="h-20 sm:h-auto sm:aspect-[4/3] rounded-xl sm:rounded-2xl border border-border shadow-sm"
                      style={{ backgroundColor: cmykToRgb(level.target) }}
                    />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.16em] text-foreground/40 mb-1 sm:mb-2">Твой цвет</p>
                    <div
                      className="h-20 sm:h-auto sm:aspect-[4/3] rounded-xl sm:rounded-2xl border border-border shadow-sm transition-colors duration-150"
                      style={{ backgroundColor: cmykToRgb(current) }}
                    />
                  </div>
                </div>

                <div className="min-h-10 sm:min-h-14 text-xs sm:text-sm text-foreground/55 leading-snug sm:leading-relaxed border-t border-border pt-2 sm:pt-4">
                  {message}
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="space-y-2.5 sm:space-y-5">
                  {channelMeta.map((channel) => (
                    <label key={channel.key} className="block">
                      <div className="flex items-center justify-between gap-3 sm:gap-4 mb-1 sm:mb-2">
                        <div className="flex items-center gap-2 sm:gap-2.5">
                          <span
                            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-medium border border-black/10"
                            style={{ backgroundColor: channel.color, color: channel.key === 'y' ? '#171717' : '#ffffff' }}
                          >
                            {channel.label}
                          </span>
                          <span className="text-xs sm:text-sm text-foreground/60">{channel.name}</span>
                        </div>
                        <span className="text-xs sm:text-sm tabular-nums min-w-10 sm:min-w-12 text-right">{current[channel.key]}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={current[channel.key]}
                        onChange={(event) => updateChannel(channel.key, Number(event.target.value))}
                        className="w-full cursor-pointer block"
                        style={{ accentColor: channel.color }}
                        aria-label={`${channel.name}: ${current[channel.key]} процентов`}
                      />
                    </label>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:gap-3 mt-3 sm:mt-8">
                  <button
                    type="button"
                    onClick={checkColor}
                    className="sm:flex-1 px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-full border border-foreground/20 text-xs sm:text-sm font-medium hover:border-accent hover:text-accent transition-colors"
                  >
                    Проверить
                  </button>
                  <button
                    type="button"
                    onClick={nextLevel}
                    disabled={!passed}
                    className={`sm:flex-1 px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                      passed
                        ? 'bg-accent text-background hover:bg-accent/85'
                        : 'bg-foreground/5 text-foreground/20 cursor-not-allowed'
                    }`}
                  >
                    {levelIndex === levels.length - 1 ? (
                      'Завершить'
                    ) : (
                      <>
                        <span className="sm:hidden">Следующий →</span>
                        <span className="hidden sm:inline">Следующий уровень →</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="hidden sm:block text-xs text-foreground/30 mt-5 leading-relaxed">
                  Экран передаёт CMYK приблизительно — в игре используется лёгкая RGB-симуляция без дополнительных библиотек.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
