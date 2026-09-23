import { Link } from 'react-router-dom';

const sections = [
  { title: 'Персонажи', path: '/project/project-1/characters' },
  { title: 'Техника', path: '/project/project-1/tech' },
] as const;

type SectionTitle = (typeof sections)[number]['title'];

export default function ChaikaSectionNav({ current }: { current: SectionTitle }) {
  const currentIndex = sections.findIndex((section) => section.title === current);
  const previous = sections[currentIndex - 1];
  const next = sections[currentIndex + 1];

  return (
    <nav className="chaika-section-nav" aria-label="Навигация по разделам проекта «Чайка»">
      <Link to="/project/project-1" className="chaika-section-nav__project">
        ← Вернуться к&nbsp;проекту «Чайка»
      </Link>

      <div className="chaika-section-nav__sections">
        {previous && (
          <Link to={previous.path} className="chaika-section-nav__link">
            ← Вернуться в&nbsp;«{previous.title}»
          </Link>
        )}
        {next && (
          <Link to={next.path} className="chaika-section-nav__link">
            Перейти в&nbsp;«{next.title}» →
          </Link>
        )}
      </div>
    </nav>
  );
}
