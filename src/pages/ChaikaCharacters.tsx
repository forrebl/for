import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

export default function ChaikaCharacters() {
  return (
    <main
      className="pt-16 lg:pt-20 min-h-screen"
      style={{
        backgroundColor: '#ddd5ba',
        backgroundImage: "url('/images/chaika-bg.jpg')",
        backgroundRepeat: 'repeat-y',
        backgroundSize: '100% auto',
        backgroundPosition: 'top center',
      }}
    >
      <section className="chaika-project-section relative overflow-hidden min-h-[calc(100vh-4rem)]">
        <div className="chaika-content-shell max-w-6xl mx-auto px-5 sm:px-6 lg:px-12 py-10 sm:py-14 lg:py-16">
          <Reveal>
            <Link
              to="/project/project-1"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#6e321c] hover:text-[#244f80] transition-colors mb-8 sm:mb-10"
            >
              ← Вернуться к&nbsp;проекту «Чайка»
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <div className="chaika-project-heading">
              <div className="chaika-project-heading__top">
                <span className="chaika-project-heading__kicker">Чайка</span>
                <span className="chaika-project-heading__status" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <h1
                className="chaika-project-heading__title font-bold uppercase"
                style={{
                  fontFamily: "'Natasha', Impact, 'Arial Narrow', sans-serif",
                  letterSpacing: '0.025em',
                }}
              >
                Персонажи
              </h1>
            </div>
          </Reveal>

          <div className="min-h-[48vh] sm:min-h-[54vh]" aria-hidden="true" />
        </div>
      </section>
    </main>
  );
}
