
import { Category, Language, Badge } from './types';

export const CATEGORIES: Category[] = ['All', 'Technology', 'Science', 'World', 'Health', 'Environment'];

export const LANGUAGES: Language[] = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'es-ES', name: 'Spanish' },
  { code: 'fr-FR', name: 'French' },
  { code: 'de-DE', name: 'German' },
  { code: 'ja-JP', name: 'Japanese' },
  { code: 'zh-CN', name: 'Chinese (Mandarin)' },
];

export const XP_PER_ARTICLE = 100;
export const XP_PER_QUIZ_CORRECT = 50;
export const XP_FOR_LEVEL_UP = 500;

export const BADGES: Badge[] = [
    { id: 'first-read', name: 'First Step', description: 'Read your first article!', icon: '🌟' },
    { id: 'five-reads', name: 'Bookworm', description: 'Read 5 articles!', icon: '🐛' },
    { id: 'ten-reads', name: 'Scholar', description: 'Read 10 articles!', icon: '🎓' },
    { id: 'perfect-quiz', name: 'Quiz Master', description: 'Get a perfect score on a quiz!', icon: '🎯' },
    { id: 'tech-whiz', name: 'Tech Whiz', description: 'Read 3 technology articles!', icon: '💻' }
];
