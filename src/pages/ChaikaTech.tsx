import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Reveal from '../components/Reveal';
import ChaikaSectionNav from '../components/ChaikaSectionNav';

const robots = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  name: `Робот №${index + 1}`,
  image: `/images/chaika/robots/${index + 1}.png`,
  description: 'Описание этого робота появится здесь.',
}));

function RobotImage({ id, image }: { id: number; image: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className="chaika-robot__art">
      {!loaded && <span className="chaika-robot__placeholder" aria-hidden="true">{id}</span>}
      <img
        className="chaika-robot__image"
        src={image}
        alt=""
        draggable="false"
        style={{ visibility: loaded ? 'visible' : 'hidden' }}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />
    </span>
  );
}

export default function ChaikaTech() {
  const [selected, setSelected] = useState<{ id: number; copy: number; shift: number } | null>(null);
  const [closing, setClosing] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const selectedButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const selectRobot = (id: number, copy: number, button: HTMLButtonElement) => {
    if (selected || !viewportRef.current) return;

    const viewport = viewportRef.current.getBoundingClientRect();
    const robot = button.getBoundingClientRect();
    selectedButtonRef.current = button;
    setSelected({ id, copy, shift: viewport.left + viewport.width / 2 - robot.left - robot.width / 2 });
  };

  const closeRobot = () => {
    if (!selected || closing) return;
    setClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setSelected(null);
      setClosing(false);
      selectedButtonRef.current?.focus({ preventScroll: true });
      selectedButtonRef.current = null;
      closeTimerRef.current = null;
    }, 520);
  };

  const activeRobot = robots.find((robot) => robot.id === selected?.id);

  return (
    <main
      className="chaika-tech-page pt-16 lg:pt-20 min-h-screen"
      style={{
        backgroundColor: '#f6df9d',
        backgroundImage: "url('/images/chaika-bg.jpg')",
        backgroundRepeat: 'repeat-y',
        backgroundSize: '100% auto',
        backgroundPosition: 'top center',
      }}
    >
      <section className="chaika-project-section relative overflow-hidden min-h-[calc(100vh-4rem)]">
        <div className="chaika-content-shell max-w-6xl mx-auto px-5 sm:px-6 lg:px-12 py-8 sm:py-10 lg:py-12">
          <Reveal>
            <ChaikaSectionNav current="Техника" />
          </Reveal>

          <Reveal delay={90}>
            <div className="chaika-tech-page__heading">
              <h1>Техника</h1>
              <p>Концепты транспорта и роботов внутриигрового мира</p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <section className="chaika-robots" aria-label="Роботы проекта «Чайка»">
              <div className="chaika-robots__header">
                <h2>Роботы</h2>
                <p>Выберите робота, чтобы рассмотреть его поближе</p>
              </div>

              <div className="chaika-robots__viewport" ref={viewportRef}>
                <div className={`chaika-robots__track${selected ? ' is-paused' : ''}`}>
                  {[0, 1].map((copy) => (
                    <div className="chaika-robots__group" key={copy}>
                      {robots.map((robot) => {
                        const isActive = selected?.id === robot.id && selected.copy === copy;

                        return (
                          <button
                            key={robot.id}
                            type="button"
                            className={`chaika-robot${isActive && !closing ? ' is-active' : ''}`}
                            style={isActive ? { '--focus-shift': `${selected.shift}px` } as CSSProperties : undefined}
                            aria-label={`Рассмотреть ${robot.name.toLowerCase()}`}
                            aria-pressed={isActive && !closing}
                            aria-expanded={isActive && !closing}
                            aria-controls="chaika-robot-details"
                            aria-hidden={copy === 1 ? true : undefined}
                            tabIndex={copy === 1 ? -1 : 0}
                            disabled={!!selected && !isActive}
                            onClick={(event) => selectRobot(robot.id, copy, event.currentTarget)}
                          >
                            <RobotImage id={robot.id} image={robot.image} />
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div id="chaika-robot-details" className={`chaika-robots__details${activeRobot && !closing ? ' is-open' : ''}`} aria-live="polite">
                <div className="chaika-robots__details-inner">
                  {activeRobot && (
                    <div className="chaika-robots__details-content">
                      <div>
                        <span className="chaika-robots__number">{String(activeRobot.id).padStart(2, '0')} / 08</span>
                        <h3>{activeRobot.name}</h3>
                        <p>{activeRobot.description}</p>
                      </div>
                      <button type="button" className="chaika-robots__close" aria-label="Закрыть описание и продолжить движение" onClick={closeRobot}>×</button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
