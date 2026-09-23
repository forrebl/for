import Reveal from '../components/Reveal';
import ChaikaSectionNav from '../components/ChaikaSectionNav';

export default function ChaikaTech() {
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
              <p>
                Концепты транспорта и роботов внутриигрового мира
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <section className="chaika-tech-showcase" aria-label="Техника проекта «Чайка»">
              <div className="chaika-tech-showcase__art">
                <img
                  src="/images/chaika-nav-props.png"
                  alt="Техника проекта «Чайка»"
                />
              </div>

              <div className="chaika-tech-showcase__info">
                <span className="chaika-tech-showcase__label">Техника проекта</span>
                <h2>Концепты и&nbsp;детали</h2>
                <p>
                  Здесь будут собраны отдельные разработки техники: основные формы,
                  вариации, функциональные детали и&nbsp;финальные концепты.
                </p>
              </div>
            </section>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
