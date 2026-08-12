import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

type ItemType = 'idea' | 'revision';

type FallingItem = {
  id: number;
  type: ItemType;
  x: number;
  y: number;
  speed: number;
  rotation: number;
};

type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

const GOAL = 12;
const MAX_LIVES = 3;
const BASKET_HALF_WIDTH = 11;

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
  const basketXRef = useRef(50);

  const [items, setItems] = useState<FallingItem[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [status, setStatus] = useState<GameStatus>('idle');
  const [basketX, setBasketX] = useState(50);

  const setGameStatus = (next: GameStatus) => {
    statusRef.current = next;
    setStatus(next);
  };

  const setBasket = (next: number) => {
    const value = clamp(next, 10, 90);
    basketXRef.current = value;
    setBasketX(value);
  };

  const startGame = () => {
    scoreRef.current = 0;
    livesRef.current = MAX_LIVES;
    basketXRef.current = 50;
    lastTimeRef.current = null;
    spawnTimerRef.current = 0;
    nextIdRef.current = 1;
    setScore(0);
    setLives(MAX_LIVES);
    setBasketX(50);
    setItems([]);
    setGameStatus('playing');
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (statusRef.current !== 'playing') return;

      if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') {
        event.preventDefault();
        setBasket(basketXRef.current - 6);
      }

      if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') {
        event.preventDefault();
        setBasket(basketXRef.current + 6);
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
      const spawnEvery = Math.max(430, 1080 - difficulty * 48);
      spawnTimerRef.current += deltaMs;

      setItems((previous) => {
        const next = [...previous];

        if (spawnTimerRef.current >= spawnEvery) {
          spawnTimerRef.current = 0;
          const type: ItemType = Math.random() < 0.72 ? 'idea' : 'revision';
          const baseSpeed = 20 + difficulty * 1.35;

          next.push({
            id: nextIdRef.current++,
            type,
            x: 10 + Math.random() * 80,
            y: -8,
            speed: baseSpeed * (0.88 + Math.random() * 0.25),
            rotation: -9 + Math.random() * 18,
          });
        }

        let nextScore = scoreRef.current;
        let nextLives = livesRef.current;
        const kept: FallingItem[] = [];

        for (const item of next) {
          const moved = { ...item, y: item.y + item.speed * deltaSeconds };
          const isAtBasket = moved.y >= 82 && moved.y <= 94;
          const isCaught = isAtBasket && Math.abs(moved.x - basketXRef.current) <= BASKET_HALF_WIDTH;

          if (isCaught) {
            if (moved.type === 'idea') {
              nextScore += 1;
              scoreRef.current = nextScore;
              setScore(nextScore);

              if (nextScore >= GOAL) {
                setGameStatus('won');
                break;
              }
            } else {
              nextLives -= 1;
              livesRef.current = nextLives;
              setLives(nextLives);

              if (nextLives <= 0) {
                setGameStatus('lost');
                break;
              }
            }

            continue;
          }

          if (moved.y <= 106) kept.push(moved);
        }

        return kept;
      });

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

  const handlePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (status !== 'playing' || !fieldRef.current) return;
    const rect = fieldRef.current.getBoundingClientRect();
    const relativeX = ((event.clientX - rect.left) / rect.width) * 100;
    setBasket(relativeX);
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
              Поймай 12 «Идей» и не лови «Правки». У вас три жизни, а темп становится быстрее с каждой пойманной идеей.
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
            <div className="absolute inset-x-0 bottom-[12%] border-t border-dashed border-foreground/10" />

            {items.map((item) => (
              <div
                key={item.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-black/5 ${
                  item.type === 'idea'
                    ? 'bg-[#00b8d9] text-white'
                    : 'bg-[#e6007e] text-white'
                }`}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
                }}
              >
                {item.type === 'idea' ? 'Идея' : 'Правка'}
              </div>
            ))}

            <div
              className="absolute bottom-[4%] w-28 sm:w-32 h-12 sm:h-14 transition-[left] duration-75 ease-linear"
              style={{ left: `${basketX}%`, transform: 'translateX(-50%)' }}
              aria-label="Корзина"
            >
              <div className="absolute inset-0 border-[3px] border-foreground/75 border-t-0 rounded-b-2xl bg-background/90 shadow-sm" />
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-[115%] h-[3px] rounded-full bg-foreground/75" />
            </div>

            {status !== 'playing' && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/82 backdrop-blur-[2px] p-6 text-center">
                <div className="max-w-md">
                  {status === 'idle' && (
                    <>
                      <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3">Задача</p>
                      <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] font-medium mb-3">12 идей. 3 жизни.</h2>
                      <p className="text-foreground/50 leading-relaxed mb-6">
                        Ловите «Идеи» корзиной и пропускайте «Правки». Каждая пойманная идея немного ускоряет игру.
                      </p>
                    </>
                  )}

                  {status === 'won' && (
                    <>
                      <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3">12 / 12</p>
                      <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-display)] font-medium mb-3">Идея поймана</h2>
                      <p className="text-foreground/50 leading-relaxed mb-6">Вы пережили поток правок и собрали все 12 идей.</p>
                    </>
                  )}

                  {status === 'lost' && (
                    <>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#e6007e] mb-3">Правок многовато</p>
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
            Пропущенная «Идея» не отнимает жизнь. Жизнь теряется только если поймать «Правку».
          </p>
        </section>
      </div>
    </main>
  );
}
