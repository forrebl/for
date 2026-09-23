import { Link } from 'react-router-dom';
import { useState } from 'react';
import Reveal from '../components/Reveal';

export default function ChaikaCharacters() {
  const [showHeroBack, setShowHeroBack] = useState(false);

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

          <Reveal delay={140}>
            <section className="chaika-character-feature">
              <div className="chaika-character-feature__heading">
                <p className="chaika-character-feature__heading-line">Главный герой</p>
                <h2 className="chaika-character-feature__heading-line">Автомеханик «ГАЗ»</h2>
              </div>

              <div className="chaika-character-showcase chaika-character-showcase--simple">
                <div className="chaika-character-art">
                  <img
                    src="/images/chaika/characters/main-hero/hero.gif"
                    alt="Анимация главного героя"
                    className="chaika-character-art__image"
                  />
                </div>

                <button
                  type="button"
                  className={`chaika-hero-turnaround chaika-hero-turnaround--simple ${showHeroBack ? 'is-back' : ''}`}
                  onClick={() => setShowHeroBack((value) => !value)}
                  aria-label={showHeroBack ? 'Показать героя спереди' : 'Показать героя сзади'}
                  aria-pressed={showHeroBack}
                >
                  <img
                    src="/images/chaika/characters/main-hero/hero-turnaround.png"
                    alt=""
                    className="chaika-hero-turnaround__sprite chaika-hero-turnaround__sprite--front"
                    aria-hidden="true"
                  />
                  <img
                    src="/images/chaika/characters/main-hero/hero-turnaround.png"
                    alt=""
                    className="chaika-hero-turnaround__sprite chaika-hero-turnaround__sprite--back"
                    aria-hidden="true"
                  />
                </button>

                <div className="chaika-character-art">
                  <img
                    src="/images/chaika/characters/main-hero/hero-emotions.png"
                    alt="Эмоции главного героя"
                    className="chaika-character-art__image"
                  />
                </div>
              </div>

              <div className="chaika-character-description chaika-character-description--simple">
                <p>
                  Главный герой – миролюбивый автомеханик «ГАЗ», подрабатывающий таксистом
                  на&nbsp;своей Волге 2110, которую по&nbsp;сюжету угоняет банда. Ему 30 лет,
                  средний рост, непримечательная внешность и&nbsp;обычное телосложение. Лицо
                  вытянутое, волосы пострижены в&nbsp;модный маллет, под носом красуются
                  роскошные усы. Одежда простого работяги: клетчатая рубашка, комбинезон
                  с&nbsp;карманами, кеды «два мяча». Его облик сделан удобным
                  для&nbsp;анимации и&nbsp;активной мимики.
                </p>
              </div>
            </section>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
