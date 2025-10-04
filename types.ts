
export type Category = 'All' | 'Technology' | 'Science' | 'World' | 'Health' | 'Environment';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Article {
  id: string;
  title: string;
  originalText: string;
  simplifiedText: string;
  imageUrl: string;
  category: Category;
  quiz: QuizQuestion[];
  illustrationPrompt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; 
}

export interface UserProgress {
  level: number;
  xp: number;
  streak: number;
  completedArticles: string[];
  badges: Badge[];
}

export interface Language {
    code: string;
    name: string;
}
