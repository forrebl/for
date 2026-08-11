import Reveal from '../components/Reveal';

const socials = [
  { name: 'Telegram', url: 'https://t.me/forrebl' },
  { name: 'ВКонтакте', url: 'https://vk.com/for_rebl' },
];

export default function Contact() {
  return (
    <main className="pt-24 lg:pt-32 pb-20 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4 font-medium">
            Контакты
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="text-3xl lg:text-5xl font-[family-name:var(--font-display)] font-medium mb-6 leading-tight">
            Свяжитесь
            <br />
            <span className="text-foreground/30">со мной</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-foreground/50 leading-relaxed mb-10 max-w-sm">
            Открыта для заказов, сотрудничества и интересных проектов.
            Напишите — обсудим детали.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mb-12">
            <a
              href="mailto:forrebl@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-background text-sm font-medium hover:bg-accent/80 transition-colors rounded-full"
            >
              forrebl@gmail.com
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <h3 className="text-xs uppercase tracking-[0.15em] text-accent mb-4 font-medium">
            Социальные сети
          </h3>
          <ul className="space-y-3">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/50 hover:text-accent transition-colors inline-flex items-center gap-1.5"
                >
                  {s.name}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </main>
  );
}
