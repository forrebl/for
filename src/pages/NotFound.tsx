import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4 font-medium">
          Ошибка 404
        </p>
        <h1 className="text-4xl lg:text-6xl font-[family-name:var(--font-display)] font-medium mb-6">
          Страница не найдена
        </h1>
        <p className="text-foreground/50 mb-8 max-w-sm mx-auto">
          Возможно, она была перемещена или никогда не существовала.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background text-sm font-medium hover:bg-accent/80 transition-colors rounded-full"
        >
          На главную
        </Link>
      </div>
    </main>
  );
}
