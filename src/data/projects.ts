export type ProjectArea = 'art' | 'design' | 'game';

export interface Project {
  id: string;
  title: string;
  category: string;
  categorySlug: ProjectArea;
  areas: ProjectArea[];
  tags?: string[];
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
  { slug: 'all', label: 'Все проекты', color: '#2a3fc7' },
  { slug: 'art', label: 'Art', color: '#2a3fc7' },
  { slug: 'design', label: 'Design', color: '#2a3fc7' },
  { slug: 'game', label: 'Game Development', color: '#2a3fc7' },
] as const;

export function getCategoryColor(_slug: string): string {
  return '#2a3fc7';
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Чайка',
    category: 'Game Development',
    categorySlug: 'game',
    areas: ['game', 'art'],
    tags: ['Game', 'Visual Development', 'Art', 'Interactive'],
    thumbnail: '/images/chaika-promo-art.jpg',
    cover: '/images/chaika-cover.JPG',
    task: 'Концепт приключенческой point-and-click игры в сеттинге атомикпанка и альтернативного СССР 1970–1980-х.',
    role: 'Разработка концепции мира, визуального направления и презентационных материалов проекта.',
    description: 'Игровой мир, персонажи, окружение, техника и интерактивная подача в одном авторском проекте.',
    processImages: [],
    resultImages: [],
    nextProjectId: 'project-10',
    featured: true,
  },
  {
    id: 'project-10',
    title: '20:30',
    category: 'Art · Design',
    categorySlug: 'design',
    areas: ['art', 'design'],
    tags: ['Art', 'Graphic', 'Digital'],
    thumbnail: '/images/twenty-thirty.jpg',
    cover: '/images/twenty-thirty.jpg',
    task: 'Создать самостоятельную визуальную работу, которая одновременно работает как образ и как вход в digital-среду.',
    role: 'Концепция, иллюстрация и графическое решение.',
    description: 'Иллюстрация с QR-кодом рабочего Telegram-канала. Название соединяет возраст аудитории — 20–30 лет — и знакомое время вечернего ритуала из детства.',
    processImages: [],
    resultImages: [],
    nextProjectId: 'project-8',
    featured: true,
  },
  {
    id: 'project-8',
    title: 'К себе',
    category: 'Art',
    categorySlug: 'art',
    areas: ['art'],
    tags: ['Art', 'Comics', 'Storytelling'],
    thumbnail: '/images/comics/k-sebe/cover.JPG',
    cover: '/images/comics/k-sebe/cover.JPG',
    task: '',
    role: '',
    description: 'Комикс как самостоятельное визуальное повествование.',
    processImages: [],
    resultImages: [],
    nextProjectId: 'project-9',
  },
  {
    id: 'project-9',
    title: 'Омут',
    category: 'Art',
    categorySlug: 'art',
    areas: ['art'],
    tags: ['Art', 'Comics', 'Storytelling'],
    thumbnail: '/images/comics/omut/2.webp',
    cover: '/images/comics/omut/2.webp',
    task: '',
    role: '',
    description: 'Комикс и эксперимент с ритмом, композицией и визуальным повествованием.',
    processImages: [],
    resultImages: [],
    nextProjectId: 'project-1',
  },
];
