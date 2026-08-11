export interface Project {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  thumbnail: string;
  cover: string;
  task: string;
  role: string;
  description: string;
  processImages: string[];
  resultImages: string[];
  resultVideo?: string;
  nextProjectId: string;
  featured?: boolean;
}

export const categories = [
  { slug: 'all', label: 'Все работы', color: '#0a0a0a' },
  { slug: 'graphic-design', label: 'Графический дизайн', color: '#00bcd4' },
  { slug: 'cgi', label: 'CGI', color: '#ffeb3b' },
  { slug: 'illustrations', label: 'Иллюстрации', color: '#e91e63' },
  { slug: 'fun-folder', label: 'Папка с приколами', color: '#f44336' },
];

export function getCategoryColor(slug: string): string {
  const cat = categories.find((c) => c.slug === slug);
  return cat?.color ?? '#0a0a0a';
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Космическая Одиссея',
    category: 'CGI',
    categorySlug: 'cgi',
    thumbnail: 'https://placehold.co/800x600/1a1a18/fafaf8?text=Project+01',
    cover: 'https://placehold.co/1400x800/1a1a18/fafaf8?text=Космическая+Одиссея',
    task: 'Разработка арт-концепта для научно-фантастической игры. Нужно было создать визуальную основу для мира, где technology и nature сосуществуют в хрупком балансе.',
    role: 'Вела проект от концепта до финальных иллюстраций. Разработала цветовую палитру, систему освещения и ключевые визуальные элементы локаций.',
    description: 'Серия из 12 ключевых артов, определяющих атмосферу и визуальный язык игры.',
    processImages: [
      'https://placehold.co/1200x800/f0efed/6b6b66?text=Скетч+01',
      'https://placehold.co/1200x800/e8e6e1/6b6b66?text=Блокировка+цвета',
      'https://placehold.co/1200x800/d4d2cd/6b6b66?text=Детализация',
    ],
    resultImages: [
      'https://placehold.co/1400x900/1a1a18/fafaf8?text=Финал+01',
      'https://placehold.co/1400x900/2a2a28/fafaf8?text=Финал+02',
      'https://placehold.co/1400x900/1a1a18/fafaf8?text=Финал+03',
    ],
    nextProjectId: 'project-2',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Динамичные миры',
    category: 'CGI',
    categorySlug: 'cgi',
    thumbnail: 'https://placehold.co/800x600/2d2d2a/fafaf8?text=Project+02',
    cover: 'https://placehold.co/1400x800/2d2d2a/fafaf8?text=Динамичные+миры',
    task: 'Создание трейлера для анонса indie-игры. Нужно передать скорость, энергию и характер мира за 90 секунд.',
    role: 'Ответственная за раскадровку, анимацию и композитинг. Разработал motion-дизайн всех титров и переходов.',
    description: 'Кинематографичный трейлер, объединяющий 2D-анимацию и 3D-рендер.',
    processImages: [
      'https://placehold.co/1200x800/f0efed/6b6b66?text=Раскадровка',
      'https://placehold.co/1200x800/e8e6e1/6b6b66?text=Аниматик',
      'https://placehold.co/1200x800/d4d2cd/6b6b66?text=Финальный+кадр',
    ],
    resultImages: [
      'https://placehold.co/1400x900/2d2d2a/fafaf8?text=Кадр+01',
      'https://placehold.co/1400x900/3d3d3a/fafaf8?text=Кадр+02',
    ],
    resultVideo: 'https://placehold.co/1400x800/1a1a18/fafaf8?text=Видео+превью',
    nextProjectId: 'project-3',
    featured: true,
  },
  {
    id: 'project-3',
    title: 'Город будущего',
    category: 'Иллюстрации',
    categorySlug: 'illustrations',
    thumbnail: 'https://placehold.co/800x600/4a4a45/fafaf8?text=Project+03',
    cover: 'https://placehold.co/1400x800/4a4a45/fafaf8?text=Город+будущего',
    task: 'Серия иллюстраций для обложки журнала о современной архитектуре и урбанистике.',
    role: 'Автор концепта и исполнитель. Работала в тесном контакте с арт-директором журнала.',
    description: 'Три обложки, объединённые визуальным языком, но различающиеся по настроению.',
    processImages: [
      'https://placehold.co/1200x800/f0efed/6b6b66?text=Вайфрейм',
      'https://placehold.co/1200x800/e8e6e1/6b6b66?text=Монохром',
      'https://placehold.co/1200x800/d4d2cd/6b6b66?text=Цвет',
    ],
    resultImages: [
      'https://placehold.co/1400x900/4a4a45/fafaf8?text=Обложка+01',
      'https://placehold.co/1400x900/5a5a55/fafaf8?text=Обложка+02',
      'https://placehold.co/1400x900/4a4a45/fafaf8?text=Обложка+03',
    ],
    nextProjectId: 'project-4',
    featured: true,
  },
  {
    id: 'project-4',
    title: 'Интерфейс космопорта',
    category: 'Графический дизайн',
    categorySlug: 'graphic-design',
    thumbnail: 'https://placehold.co/800x600/6b6b66/fafaf8?text=Project+04',
    cover: 'https://placehold.co/1400x800/6b6b66/fafaf8?text=Интерфейс+космопорта',
    task: 'Проектирование пользовательского интерфейса для futuristic-симулятора управления космическим портом.',
    role: 'UI/UX дизайнер и motion-консультант. Разработала дизайн-систему и ключевые экраны.',
    description: 'Дизайн-система из 40+ компонентов и 15 ключевых экранов.',
    processImages: [
      'https://placehold.co/1200x800/f0efed/6b6b66?text=Wireframes',
      'https://placehold.co/1200x800/e8e6e1/6b6b66?text=Прототип',
      'https://placehold.co/1200x800/d4d2cd/6b6b66?text=UI+Kit',
    ],
    resultImages: [
      'https://placehold.co/1400x900/6b6b66/fafaf8?text=Экран+01',
      'https://placehold.co/1400x900/7b7b76/fafaf8?text=Экран+02',
    ],
    nextProjectId: 'project-5',
    featured: true,
  },
  {
    id: 'project-5',
    title: 'Титры инди-игры',
    category: 'Графический дизайн',
    categorySlug: 'graphic-design',
    thumbnail: 'https://placehold.co/800x600/8a8a85/fafaf8?text=Project+05',
    cover: 'https://placehold.co/1400x800/8a8a85/fafaf8?text=Титры+инди-игры',
    task: 'Разработка титровой последовательности для narrative indie-игры.',
    role: 'Автор концепта, аниматор. Создала уникальную визуальную метафору, отражающую тему игры.',
    description: 'Титры длительностью 4 минуты с кастомной типографикой и анимацией.',
    processImages: [
      'https://placehold.co/1200x800/f0efed/6b6b66?text=Концепт',
      'https://placehold.co/1200x800/e8e6e1/6b6b66?text=Типографика',
      'https://placehold.co/1200x800/d4d2cd/6b6b66?text=Рендер',
    ],
    resultImages: [
      'https://placehold.co/1400x900/8a8a85/fafaf8?text=Кадр+01',
      'https://placehold.co/1400x900/9a9a95/fafaf8?text=Кадр+02',
    ],
    resultVideo: 'https://placehold.co/1400x800/1a1a18/fafaf8?text=Видео+превью',
    nextProjectId: 'project-6',
  },
  {
    id: 'project-6',
    title: 'Лесные духи',
    category: 'Иллюстрации',
    categorySlug: 'illustrations',
    thumbnail: 'https://placehold.co/800x600/5a6b4a/fafaf8?text=Project+06',
    cover: 'https://placehold.co/1400x800/5a6b4a/fafaf8?text=Лесные+духи',
    task: 'Серия иллюстраций для настольной игры в жанре фэнтези.',
    role: 'Концепт-художница и иллюстратор. Разработала общий стиль и 8 ключевых персонажей.',
    description: '8 иллюстраций персонажей в единой стилистике.',
    processImages: [
      'https://placehold.co/1200x800/f0efed/6b6b66?text=Скетчи',
      'https://placehold.co/1200x800/e8e6e1/6b6b66?text=Лайнарт',
      'https://placehold.co/1200x800/d4d2cd/6b6b66?text=Колор',
    ],
    resultImages: [
      'https://placehold.co/1400x900/5a6b4a/fafaf8?text=Персонаж+01',
      'https://placehold.co/1400x900/6a7b5a/fafaf8?text=Персонаж+02',
    ],
    nextProjectId: 'project-7',
  },
  {
    id: 'project-7',
    title: 'Папка с приколами',
    category: 'Папка с приколами',
    categorySlug: 'fun-folder',
    thumbnail: 'https://placehold.co/800x600/c4b5a0/1a1a18?text=Project+07',
    cover: 'https://placehold.co/1400x800/c4b5a0/1a1a18?text=Папка+с+приколами',
    task: '[placeholder] Личные эксперименты, мемы, шутки и всё, что не влезло в остальные категории.',
    role: '[placeholder] Автор, исполнитель и единственный участник.',
    description: '[placeholder] Коллекция работ, сделанных ради удовольствия.',
    processImages: [
      'https://placehold.co/1200x800/f0efed/6b6b66?text=Идея',
      'https://placehold.co/1200x800/e8e6e1/6b6b66?text=Процесс',
    ],
    resultImages: [
      'https://placehold.co/1400x900/c4b5a0/1a1a18?text=Результат+01',
      'https://placehold.co/1400x900/d4c5b0/1a1a18?text=Результат+02',
    ],
    nextProjectId: 'project-1',
  },
];
