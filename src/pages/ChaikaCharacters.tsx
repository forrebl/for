import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

type CharacterGroup = 'main' | 'gang' | 'civilians';

type Character = {
  id: string;
  group: CharacterGroup;
  name: string;
  role: string;
  spriteIndex: number;
  image?: string;
  secondaryImage?: string;
  description: string;
};

const characters: Character[] = [
  {
    id: 'main-hero',
    group: 'main',
    name: 'Автомеханик «ГАЗ»',
    role: 'Главный герой',
    spriteIndex: 0,
    image: '/images/chaika/characters/main-hero/hero.gif',
    secondaryImage: '/images/chaika/characters/main-hero/hero-emotions.png',
    description:
      'Главный герой – миролюбивый автомеханик «ГАЗ», подрабатывающий таксистом на своей Волге 2110, которую по сюжету угоняет банда. Ему 30 лет, средний рост, непримечательная внешность и обычное телосложение. Лицо вытянутое, волосы пострижены в модный маллет, под носом красуются роскошные усы. Одежда простого работяги: клетчатая рубашка, комбинезон с карманами, кеды «два мяча». Его облик сделан удобным для анимации и активной мимики.',
  },
  {
    id: 'tyulen',
    group: 'gang',
    name: 'Тюлень',
    role: 'Байкер, силовик банды',
    spriteIndex: 1,
    description:
      'Байкер по кличке Тюлень, в прошлом моряк, о чём свидетельствуют татуировка якоря и тельняшка. Очень сильный и крепкий: может таскать большой груз и, как стена, не давать пройти на некоторые локации.',
  },
  {
    id: 'shurup',
    group: 'gang',
    name: 'Шуруп',
    role: 'Угонщик',
    spriteIndex: 2,
    description:
      'Один из двух братьев-близнецов, первоклассных угонщиков. Выглядит «не по-советски», говорит с акцентом. Мелкий пакостник, которому лучше не попадаться на глаза. Вместе с Болтом выполняет грязную работу банды.',
  },
  {
    id: 'vladimir',
    group: 'gang',
    name: 'Владимир',
    role: 'Один из лидеров ОПГ',
    spriteIndex: 3,
    description:
      'Цыган Владимир с собакой Шариком. Коренастый, полный, внешне напоминает Тугарина Змея. Раздаёт указания братьям и имеет слабость к животным. Если помочь ему найти Шарика, он даст отмычку для дверей. Спорить с ним не стоит: иначе близнецы могут посадить героя в подвал.',
  },
  {
    id: 'bolt',
    group: 'gang',
    name: 'Болт',
    role: 'Угонщик',
    spriteIndex: 4,
    description:
      'Второй из братьев-близнецов, первоклассных угонщиков. Выглядит «не по-советски», говорит с акцентом и работает в паре с Шурупом. Мелкий пакостник, которому лучше не попадаться на глаза.',
  },
  {
    id: 'svetlana',
    group: 'gang',
    name: 'Светлана Николаевна',
    role: 'Помощница главаря',
    spriteIndex: 5,
    description:
      'Молодая, стройная и очень ухоженная помощница главаря. Любит дорогие украшения и меха, сидит в офисе и перебирает бумаги как секретарь. Умная, хитрая и умеет манипулировать, но лояльна к главному герою и при должном усилии может помочь в расследовании. Её образ соединяет клише роковой красотки, «глупой блондинки» и жены бандита 90-х.',
  },
  {
    id: 'akademik',
    group: 'gang',
    name: 'Семён Семёнович Ракета',
    role: 'Главарь банды «Академик»',
    spriteIndex: 6,
    description:
      'Семён Семёнович Ракета по кличке «Академик» — главарь банды. Ему около 50 лет, за плечами несколько высших образований и кража чертежей летательных аппаратов. Именно он собирает приспешников и строит космический корабль. В потерянный глаз встроена камера; он носит белый пиджак и кожаные перчатки, чтобы не оставлять следы.',
  },
  {
    id: 'felix',
    group: 'gang',
    name: 'Феликс',
    role: 'Жулик и торгаш',
    spriteIndex: 7,
    description:
      'Рыжий, скользкий и очень пластичный мужчина, хороший вор и торгаш. Вертикальная полоска серо-зелёного костюма подчёркивает его длинное лицо и нос, а маленькие глаза смотрят с хитростью из-под кепи. У Феликса можно выменивать одни вещи на другие.',
  },
  {
    id: 'marusya',
    group: 'civilians',
    name: 'Маруся',
    role: 'Мирная жительница',
    spriteIndex: 8,
    description:
      'Маленькая девочка, которая постоянно теряется, потому что боится ворон и убегает от них. Если игрок не знает, что делать, можно прийти к Марусе за подсказкой: она даст дельный совет, но не прямыми словами. Прообразом стали детские фотографии из личного архива и «кулёма» — фольклорный образ укутанного потеплее ребёнка.',
  },
  {
    id: 'sergey',
    group: 'civilians',
    name: 'Сергей',
    role: 'Друг главного героя',
    spriteIndex: 9,
    description:
      '25-летний парень атлетического телосложения, в гараж которого герой приходит на отдых. Всегда готов помочь и дать совет, хорошо чинит роботов. С ним можно вести долгие философские беседы, которые в конце концов всё равно сведутся к спорту. Носит белые шорты, олимпийку и импортную кепку с рынка, а солнцезащитные очки не снимает, потому что считает себя крутым парнем с магнитофоном.',
  },
  {
    id: 'alisa',
    group: 'civilians',
    name: 'Алиса',
    role: 'Панк-рокер',
    spriteIndex: 10,
    description:
      'Девушка-панк-рокер. Носит футболку с группой «Алиса», тяжёлые ботинки фирмы «Мартинс» и короткую протестную юбку. Волосы осветлены дома, причёска с начёсом напоминает див 80-х. Она хорошо рисует, дерзит всем подряд и никого не боится. По сюжету нравится Сергею и мечтает выступать на сцене; игрок может помочь паре сойтись и устроить концерт в парке.',
  },
  {
    id: 'maksim',
    group: 'civilians',
    name: 'Максим Георгиевич',
    role: 'Продавец на рынке',
    spriteIndex: 11,
    description:
      'Продавец на рынке, очень недовольный работой своих роботов-помощников. Ворчливый, но добрый пожилой мужчина с южными корнями. Очень торопливый и знает много шуток, которые с радостью расскажет. Как «Папа Карло», хранит секреты за ширмой прилавка. Одет в свитер поверх рубашки, фартук и удобные сандалии поверх носков.',
  },
  {
    id: 'militsioner',
    group: 'civilians',
    name: 'Товарищ милиционер',
    role: 'Милиционер',
    spriteIndex: 12,
    description:
      'Очень высокий стройный мужчина — настоящий дядя Стёпа. Приходит на помощь в самый опасный момент и старается помочь главному герою найти машину, но занят делом о массовых угонах в целом, поэтому его сложно застать в участке. Если встреча всё-таки состоится, он расскажет досье бандитов. Его форма соответствует форме милиции СССР.',
  },
  {
    id: 'valya',
    group: 'civilians',
    name: 'Тётя Валя',
    role: 'Мирная жительница',
    spriteIndex: 13,
    description:
      'Деревенская девушка, приехавшая покорять город. Главная сплетница, которая постоянно теряет вещи. Кожаные сапоги — её главная гордость «модницы»; носит их с красным платком в горошек и маловатым пальто. Её прототипом стала героиня фильма «Любовь и голуби».',
  },
];

const groups: { id: CharacterGroup; title: string }[] = [
  { id: 'main', title: 'Главный герой' },
  { id: 'gang', title: 'ОПГ' },
  { id: 'civilians', title: 'Мирные жители' },
];

const spritePosition = (index: number) => {
  const column = index % 4;
  const row = Math.floor(index / 4);
  return `${(column / 3) * 100}% ${(row / 3) * 100}%`;
};

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

          <Reveal delay={140}>
            <div className="chaika-character-select chaika-character-select--right">
              <section className="chaika-character-select__stage" aria-live="polite">
                {selectedCharacter.image ? (
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
                ) : (
                  <div className="chaika-character-select__visuals">
                    <div
                      key={selectedCharacter.id}
                      className="chaika-character-select__full-sprite"
                      role="img"
                      aria-label={selectedCharacter.name}
                      style={{ backgroundPosition: spritePosition(selectedCharacter.spriteIndex) }}
                    />
                  </div>
                )}

                <div className="chaika-character-select__info">
                  <div className="chaika-character-select__identity">
                    <h2>{selectedCharacter.name}</h2>
                    <p>{selectedCharacter.role}</p>
                  </div>

                  <div className="chaika-character-select__description">
                    <p>{selectedCharacter.description}</p>
                  </div>
                </div>
              </section>

              <aside className="chaika-character-select__sidebar" aria-label="Выбор персонажа">
                <div className="chaika-character-select__sidebar-title">
                  <h1>Персонажи</h1>
                </div>

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
                              title={character.name}
                            >
                              <span
                                className="chaika-character-icon__sprite"
                                style={{ backgroundPosition: spritePosition(character.spriteIndex) }}
                                aria-hidden="true"
                              />
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
