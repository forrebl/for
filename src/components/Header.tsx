import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Главная' },
  { path: '/projects', label: 'Проекты' },
  { path: '/about', label: 'Обо мне' },
  { path: '/contact', label: 'Контакты' },
  { path: '/game', label: 'Игры', featured: true },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isDarkPage = location.pathname === '/projects' || location.pathname.startsWith('/project/');

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDarkPage
            ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10'
            : 'bg-background/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-16 lg:h-20 flex items-center justify-between">
        <Link
          to="/"
          className={`text-sm lg:text-base font-medium tracking-wide uppercase font-[family-name:var(--font-display)] transition-colors duration-200 ${
            isDarkPage ? 'text-white' : 'text-foreground'
          }`}
        >
          Фомина Анастасия
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-7 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const isFeatured = Boolean(link.featured);

            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-sm tracking-wide transition-all duration-200 ${
                    isFeatured
                      ? isActive
                        ? 'px-3.5 py-1.5 rounded-full bg-accent text-background border border-accent shadow-sm'
                        : 'px-3.5 py-1.5 rounded-full border border-accent/35 bg-accent/10 text-accent hover:bg-accent hover:text-background hover:-translate-y-0.5'
                      : `hover:text-accent ${
                          isActive
                            ? 'text-accent'
                            : isDarkPage
                              ? 'text-white/60 hover:text-white'
                              : 'text-foreground/40'
                        }`
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile burger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative w-6 h-6 flex flex-col justify-center items-center gap-1.5"
          aria-label="Меню"
        >
          <span
            className={`block w-5 h-px transition-all duration-300 ${
              isDarkPage ? 'bg-white' : 'bg-foreground'
            } ${isOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`}
          />
          <span
            className={`block w-5 h-px transition-all duration-300 ${
              isDarkPage ? 'bg-white' : 'bg-foreground'
            } ${isOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 top-16 transition-all duration-500 ease-out ${
          isDarkPage ? 'bg-[#0a0a0a]' : 'bg-background'
        } ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-8 sm:gap-10">
          {navLinks.map((link, i) => {
            const isActive = location.pathname === link.path;
            const isFeatured = Boolean(link.featured);

            return (
              <li
                key={link.path}
                className={`transition-all duration-500 ${
                  isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: isOpen ? `${i * 70}ms` : '0ms' }}
              >
                <Link
                  to={link.path}
                  className={`text-2xl sm:text-3xl font-[family-name:var(--font-display)] tracking-tight transition-all duration-200 ${
                    isFeatured
                      ? isActive
                        ? 'px-5 py-2.5 rounded-full bg-accent text-background'
                        : 'px-5 py-2.5 rounded-full border border-accent/35 bg-accent/10 text-accent'
                      : isActive
                        ? 'text-accent'
                        : isDarkPage
                          ? 'text-white/55'
                          : 'text-foreground/30'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
