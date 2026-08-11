import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <h3 className="text-sm font-medium uppercase tracking-widest mb-4 text-accent">
              Навигация
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-foreground/60 hover:text-accent transition-colors">Главная</Link></li>
              <li><Link to="/projects" className="text-sm text-foreground/60 hover:text-accent transition-colors">Проекты</Link></li>
              <li><Link to="/about" className="text-sm text-foreground/60 hover:text-accent transition-colors">Обо мне</Link></li>
              <li><Link to="/contact" className="text-sm text-foreground/60 hover:text-accent transition-colors">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-widest mb-4 text-accent">
              Контакты
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:forrebl@gmail.com" className="text-sm text-foreground/60 hover:text-accent transition-colors">
                  forrebl@gmail.com
                </a>
              </li>
              <li>
                <a href="https://t.me/forrebl" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/60 hover:text-accent transition-colors">
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-foreground/30">
            © {year} Фомина Анастасия. Все права защищены.
          </p>
          <p className="text-xs text-foreground/30">
            Дизайн и разработка
          </p>
        </div>
      </div>
    </footer>
  );
}
