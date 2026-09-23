import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

type CharacterGroup = 'main' | 'gang' | 'civilians';

type Character = {
  id: string;
  group: CharacterGroup;
  name: string;
  role: string;
  image: string;
  secondaryImage?: string;
  icon: string;
  description: string;
};

const characters: Character[] = [
  {
    id: 'main-hero',
    group: 'main',
    name: 'Автомеханик «ГАЗ»',
    role: 'Главный герой',
    image: '/images/chaika/characters/main-hero/hero.gif',
    secondaryImage: '/images/chaika/characters/main-hero/hero-emotions.png',
    icon: '/images/chaika/characters/main-hero/hero-emotions.png',
    description:
      'Главный герой – миролюбивый автомеханик «ГАЗ», подрабатывающий таксистом на своей Волге 2110, которую по сюжету угоняет банда. Ему 30 лет, средний рост, непримечательная внешность и обычное телосложение. Лицо вытянутое, волосы пострижены в модный маллет, под носом красуются роскошные усы. Одежда простого работяги: клетчатая рубашка, комбинезон с карманами, кеды «два мяча». Его облик сделан удобным для анимации и активной мимики.',
  },
];

const groups: { id: CharacterGroup; title: string }[] = [
  { id: 'main', title: 'Главный герой' },
  { id: 'gang', title: 'ОПГ' },
  { id: 'civilians', title: 'Мирные жители' },
];

export default function ChaikaCharacters() {
  const [selectedId, setSelectedId] = useState('main-hero');
  const selectedCharacter = characters.find((character) => character.id === selectedId) ?? characters[0];

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
            <div className="chaika-character-select chaika-character-select--right">
              <section className="chaika-character-select__stage" aria-live="polite">
                <div className={`chaika-character-select__visuals ${selectedCharacter.secondaryImage ? 'has-secondary' : ''}`}>
                  <div className="chaika-character-select__portrait">
                    <img
                      key={`${selectedCharacter.id}-main`}
                      src={selectedCharacter.image}
                      alt={selectedCharacter.name}
                    />
                  </div>

                  {selectedCharacter.secondaryImage && (
                    <div className="chaika-character-select__portrait chaika-character-select__portrait--secondary">
                      <img
                        key={`${selectedCharacter.id}-secondary`}
                        src={selectedCharacter.secondaryImage}
                        alt={`Эмоции персонажа ${selectedCharacter.name}`}
                      />
                    </div>
                  )}
                </div>

                <div className="chaika-character-select__info-card">
                  <h2>{selectedCharacter.name}</h2>
                  <p className="chaika-character-select__role">{selectedCharacter.role}</p>
                  <p className="chaika-character-select__text">{selectedCharacter.description}</p>
                </div>
              </section>

              <aside className="chaika-character-select__sidebar" aria-label="Выбор персонажа">
                {groups.map((group) => {
                  const groupCharacters = characters.filter((character) => character.group === group.id);

                  return (
                    <section
                      key={group.id}
                      className={`chaika-character-select__group chaika-character-select__group--${group.id}`}
                    >
                      <div className="chaika-character-select__group-heading">
                        <h2 className="chaika-character-select__group-title">{group.title}</h2>
                      </div>

                      <div className="chaika-character-select__icons">
                        {groupCharacters.map((character) => {
                          const active = character.id === selectedCharacter.id;

                          return (
                            <button
                              key={character.id}
                              type="button"
                              className={`chaika-character-icon chaika-character-icon--${group.id} ${active ? 'is-active' : ''}`}
                              onClick={() => setSelectedId(character.id)}
                              aria-pressed={active}
                              aria-label={`Выбрать персонажа: ${character.name}`}
                            >
                              <img src={character.icon} alt="" aria-hidden="true" />
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </aside>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
