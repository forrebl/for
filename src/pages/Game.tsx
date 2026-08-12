import { useMemo, useState } from 'react';

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
    <main className="pt-24 lg:pt-28 pb-16 lg:pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="mb-8 lg:mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3 font-medium">Мини-игра</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-5xl font-[family-name:var(--font-display)] font-medium leading-tight mb-3">
                CMYK-конструктор
              </h1>
              <p className="text-foreground/50 max-w-2xl leading-relaxed">
                Повтори цвет с помощью четырёх каналов. 10 уровней — каждый следующий требует большей точности.
              </p>
            </div>
            <span className="text-sm text-foreground/40 whitespace-nowrap">Уровень {levelIndex + 1} / {levels.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-10 gap-1.5 mb-8" aria-label={`Прогресс: уровень ${levelIndex + 1} из ${levels.length}`}>
          {levels.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-colors ${index <= levelIndex ? 'bg-accent' : 'bg-foreground/10'}`}
            />
          ))}
        </div>

        {finished ? (
          <section className="border border-border bg-card rounded-3xl p-8 sm:p-12 lg:p-16 text-center">
            <div className="mx-auto mb-8 grid grid-cols-4 w-32 h-32 rounded-full overflow-hidden border border-border shadow-sm">
              <div className="bg-[#00b8d9]" />
              <div className="bg-[#e6007e]" />
              <div className="bg-[#f2d500]" />
              <div className="bg-[#171717]" />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4">10 / 10</p>
            <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-display)] font-medium mb-4">CMYK покорён</h2>
            <p className="text-foreground/50 mb-8">Теперь можно официально спорить с монитором о цветопередаче.</p>
            <button
              type="button"
              onClick={restart}
              className="px-7 py-3.5 rounded-full bg-accent text-background text-sm font-medium hover:bg-accent/85 transition-colors"
            >
              Пройти ещё раз
            </button>
          </section>
        ) : (
          <section className="border border-border bg-card rounded-3xl p-5 sm:p-7 lg:p-9">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)] gap-8 lg:gap-12">
              <div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-foreground/40 mb-2">Образец</p>
                    <div
                      className="aspect-square sm:aspect-[4/3] rounded-2xl border border-border shadow-sm"
                      style={{ backgroundColor: cmykToRgb(level.target) }}
                    />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-foreground/40 mb-2">Твой цвет</p>
                    <div
                      className="aspect-square sm:aspect-[4/3] rounded-2xl border border-border shadow-sm transition-colors duration-150"
                      style={{ backgroundColor: cmykToRgb(current) }}
                    />
                  </div>
                </div>

                <div className="min-h-14 text-sm text-foreground/55 leading-relaxed border-t border-border pt-4">
                  {message}
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="space-y-5">
                  {channelMeta.map((channel) => (
                    <label key={channel.key} className="block">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium border border-black/10"
                            style={{ backgroundColor: channel.color, color: channel.key === 'y' ? '#171717' : '#ffffff' }}
                          >
                            {channel.label}
                          </span>
                          <span className="text-sm text-foreground/60">{channel.name}</span>
                        </div>
                        <span className="text-sm tabular-nums min-w-12 text-right">{current[channel.key]}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={current[channel.key]}
                        onChange={(event) => updateChannel(channel.key, Number(event.target.value))}
                        className="w-full cursor-pointer"
                        style={{ accentColor: channel.color }}
                        aria-label={`${channel.name}: ${current[channel.key]} процентов`}
                      />
                    </label>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <button
                    type="button"
                    onClick={checkColor}
                    className="flex-1 px-6 py-3.5 rounded-full border border-foreground/20 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
                  >
                    Проверить
                  </button>
                  <button
                    type="button"
                    onClick={nextLevel}
                    disabled={!passed}
                    className={`flex-1 px-6 py-3.5 rounded-full text-sm font-medium transition-all ${
                      passed
                        ? 'bg-accent text-background hover:bg-accent/85'
                        : 'bg-foreground/5 text-foreground/20 cursor-not-allowed'
                    }`}
                  >
                    {levelIndex === levels.length - 1 ? 'Завершить' : 'Следующий уровень →'}
                  </button>
                </div>

                <p className="text-xs text-foreground/30 mt-5 leading-relaxed">
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
