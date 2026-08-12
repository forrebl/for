import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { Link } from 'react-router-dom';

type ItemType = 'idea' | 'revision' | 'neutral';

type FallingItem = {
  id: number;
  type: ItemType;
  label: string;
  x: number;
  y: number;
  speed: number;
  rotation: number;
};

type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

const GOAL = 12;
const MAX_LIVES = 3;
const LAPTOP_HALF_WIDTH = 14;
const neutralWords = ['Бриф', 'Референс', 'Сетка', 'Мокап', 'Дедлайн', 'Шрифт'];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function CatchGame() {
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const spawnTimerRef = useRef(0);
  const nextIdRef = useRef(1);
  const scoreRef = useRef(0);
  const livesRef = useRef(MAX_LIVES);
  const statusRef = useRef<GameStatus>('idle');
  const laptopXRef = useRef(50);
  const itemsRef = useRef<FallingItem[]>([]);

  const [items, setItems] = useState<FallingItem[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [status, setStatus] = useState<GameStatus>('idle');
  const [laptopX, setLaptopX] = useState(50);

  const setGameStatus = (next: GameStatus) => {
    statusRef.current = next;
    setStatus(next);
  };

  const setLaptop = (next: number) => {
    const value = clamp(next, 10, 90);
    laptopXRef.current = value;
    setLaptopX(value);
  };

  const startGame = () => {
    scoreRef.current = 0;
    livesRef.current = MAX_LIVES;
    laptopXRef.current = 50;
    itemsRef.current = [];
    lastTimeRef.current = null;
    spawnTimerRef.current = 0;
    nextIdRef.current = 1;
    setScore(0);
    setLives(MAX_LIVES);
    setLaptopX(50);
    setItems([]);
    setGameStatus('playing');
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (statusRef.current !== 'playing') return;

      if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') {
        event.preventDefault();
        setLaptop(laptopXRef.current - 6);
      }

      if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') {
        event.preventDefault();
        setLaptop(laptopXRef.current + 6);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (status !== 'playing') {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      return;
    }

    const tick = (time: number) => {
      const previousTime = lastTimeRef.current ?? time;
      const deltaMs = Math.min(time - previousTime, 40);
      const deltaSeconds = deltaMs / 1000;
      lastTimeRef.current = time;

      const difficulty = scoreRef.current;
      const spawnEvery = Math.max(400, 980 - difficulty * 45);
      spawnTimerRef.current += deltaMs;

      const nextItems = [...itemsRef.current];

      if (spawnTimerRef.current >= spawnEvery) {
        spawnTimerRef.current = 0;
        const roll = Math.random();
        let type: ItemType;
        let label: string;

        if (roll < 0.5) {
          type = 'idea';
          label = 'Идея';
        } else if (roll < 0.68) {
          type = 'revision';
          label = 'Правка';
        } else {
          type = 'neutral';
          label = neutralWords[Math.floor(Math.random() * neutralWords.length)];
        }

        const baseSpeed = 20 + difficulty * 1.35;

        nextItems.push({
          id: nextIdRef.current++,
          type,
          label,
          x: 10 + Math.random() * 80,
          y: -8,
          speed: baseSpeed * (0.88 + Math.random() * 0.25),
          rotation: -9 + Math.random() * 18,
        });
      }

      let nextScore = scoreRef.current;
      let nextLives = livesRef.current;
      let terminalStatus: GameStatus | null = null;
      const kept: FallingItem[] = [];

      for (const item of nextItems) {
        const moved = { ...item, y: item.y + item.speed * deltaSeconds };
        const isAtLaptop = moved.y >= 81 && moved.y <= 94;
        const isCaught = isAtLaptop && Math.abs(moved.x - laptopXRef.current) <= LAPTOP_HALF_WIDTH;

        if (isCaught) {
          if (moved.type === 'idea') {
            nextScore += 1;
            if (nextScore >= GOAL) {
              terminalStatus = 'won';
              break;
            }
          } else if (moved.type === 'revision') {
            nextLives -= 1;
            if (nextLives <= 0) {
              terminalStatus = 'lost';
              break;
            }
          }

          continue;
        }

        if (moved.y > 106) {
          if (moved.type === 'idea') {
            nextLives -= 1;
            if (nextLives <= 0) {
              terminalStatus = 'lost';
              break;
            }
          }
          continue;
        }

        kept.push(moved);
      }

      if (nextScore !== scoreRef.current) {
        scoreRef.current = nextScore;
        setScore(nextScore);
      }

      if (nextLives !== livesRef.current) {
        livesRef.current = nextLives;
        setLives(nextLives);
      }

      itemsRef.current = terminalStatus ? [] : kept;
      setItems(itemsRef.current);

      if (terminalStatus) {
        setGameStatus(terminalStatus);
      }

      if (statusRef.current === 'playing') {
        animationRef.current = requestAnimationFrame(tick);
      }
    };

    animationRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    };
  }, [status]);

  const handlePointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (status !== 'playing' || !fieldRef.current) return;
    const rect = fieldRef.current.getBoundingClientRect();
    const relativeX = ((event.clientX - rect.left) / rect.width) * 100;
    setLaptop(relativeX);
  };

  return (
    <main className="pt-24 lg:pt-28 pb-16 lg:pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <Link to="/games" className="inline-flex items-center gap-2 text-sm text-foreground/45 hover:text-accent transition-colors mb-7">
          ← Все игры
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3 font-medium">Игра на реакцию</p>
            <h1 className="text-3xl lg:text-5xl font-[family-name:var(--font-display)] font-medium leading-tight mb-3">
              Поймай идею
            </h1>
            <p className="text-foreground/50 max-w-2xl leading-relaxed">
              Поймай 12 «Идей» и не лови «Правки». Пропущенная «Идея» тоже отнимает жизнь, а остальные дизайн-слова просто отвлекают.
            </p>
          </div>
        </div>

        <section className="border border-border bg-card rounded-3xl p-4 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-5">
              <div>
                <span className="text-xs uppercase tracking-[0.14em] text-foreground/35 block mb-1">Идеи</span>
                <span className="text-xl font-medium tabular-nums">{score} / {GOAL}</span>
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.14em] text-foreground/35 block mb-1">Жизни</span>
                <div className="flex gap-1.5" aria-label={`Жизней: ${lives}`}>
                  {Array.from({ length: MAX_LIVES }, (_, index) => (
                    <span
                      key={index}
                      className={`text-lg leading-none ${index < lives ? 'text-[#e6007e]' : 'text-foreground/10'}`}
                    >
                      ♥
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <span className="text-xs text-foreground/35">← → / A D / мышь / палец</span>
          </div>

          <div
            ref={fieldRef}
            onPointerMove={handlePointer}
            onPointerDown={handlePointer}
            className="relative h-[420px] sm:h-[500px] overflow-hidden rounded-2xl border border-border bg-[#f5f5f3] select-none cursor-crosshair"
            style={{ touchAction: 'none' }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-foreground/5" />

            {/* Стол */}
            <div className="absolute inset-x-0 bottom-0 h-[18%] bg-[#e8e3db] border-t border-[#d6d0c7]">
              <div className="absolute inset-x-0 top-2 h-px bg-white/50" />
              <div className="absolute inset-x-0 top-[46%] h-px bg-black/[0.035]" />
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full text-sm font-medium shadow-sm border ${
                  item.type === 'idea'
                    ? 'bg-[#00b8d9] text-white border-black/5'
                    : item.type === 'revision'
                      ? 'bg-[#e6007e] text-white border-black/5'
                      : 'bg-background text-foreground/55 border-border'
                }`}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
                }}
              >
                {item.label}
              </div>
            ))}

            {/* Ноутбук */}
            <div
              className="absolute z-10 bottom-[3.5%] w-32 h-16 sm:w-36 sm:h-[4.5rem] transition-[left] duration-75 ease-linear pointer-events-none"
              style={{ left: `${laptopX}%`, transform: 'translateX(-50%)' }}
              aria-label="Ноутбук"
            >
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[92%] h-2 rounded-full bg-black/10 blur-[2px]" />

              <div className="absolute left-1/2 bottom-[14px] sm:bottom-4 -translate-x-1/2 w-[72%] h-[70%] rounded-t-[9px] rounded-b-[5px] border-[3px] border-[#2f3033] bg-[#252629] shadow-md overflow-hidden">
                <div className="absolute inset-[5px] rounded-[4px] bg-[#eef7f8] overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-[18%] bg-[#00b8d9]/15 border-b border-black/10" />
                  <div className="absolute left-[9%] top-[31%] w-[45%] h-[9%] rounded-full bg-[#e6007e]/18" />
                  <div className="absolute left-[9%] top-[49%] w-[64%] h-[9%] rounded-full bg-[#00b8d9]/18" />
                  <div className="absolute left-[9%] top-[67%] w-[52%] h-[9%] rounded-full bg-[#f2d500]/40" />
                  <div className="absolute right-[8%] bottom-[8%] flex gap-[2px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00b8d9]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e6007e]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f2d500]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#171717]" />
                  </div>
                </div>
              </div>

              <div className="absolute left-1/2 bottom-[3px] -translate-x-1/2 w-full h-[15px] rounded-[3px_3px_10px_10px] border-[2px] border-[#2f3033] bg-[#d8d9db] shadow-sm">
                <div className="absolute left-1/2 top-[3px] -translate-x-1/2 w-[22%] h-[4px] rounded-full border border-black/10 bg-white/35" />
              </div>
            </div>

            {status !== 'playing' && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/82 backdrop-blur-[2px] p-6 text-center">
                <div className="max-w-md">
                  {status === 'idle' && (
                    <>
                      <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3">Задача</p>
                      <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] font-medium mb-3">12 идей. 3 жизни.</h2>
                      <p className="text-foreground/50 leading-relaxed mb-6">
                        Ловите «Идеи» ноутбуком, избегайте «Правок» и не пропускайте нужные слова. «Бриф», «Референс», «Сетка», «Мокап», «Дедлайн» и «Шрифт» — нейтральные помехи.
                      </p>
                    </>
                  )}

                  {status === 'won' && (
                    <>
                      <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3">12 / 12</p>
                      <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] font-medium mb-3">Идея поймана</h2>
                      <p className="text-foreground/50 leading-relaxed mb-6">Вы пережили поток правок и собрали все 12 идей.</p>
                    </>
                  )}

                  {status === 'lost' && (
                    <>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#e6007e] mb-3">Идеи ускользнули</p>
                      <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] font-medium mb-3">Три жизни закончились</h2>
                      <p className="text-foreground/50 leading-relaxed mb-6">Вы успели поймать {score} из 12 идей. Попробуем ещё раз?</p>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={startGame}
                    className="px-7 py-3.5 rounded-full bg-accent text-background text-sm font-medium hover:bg-accent/85 transition-colors"
                  >
                    {status === 'idle' ? 'Начать игру' : 'Играть ещё раз'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="text-xs text-foreground/30 mt-4 leading-relaxed">
            Управляйте ноутбуком по столу. Минус жизнь за пойманную «Правку» или пропущенную «Идею». Остальные слова можно ловить или пропускать без последствий.
          </p>
        </section>
      </div>
    </main>
  );
}
