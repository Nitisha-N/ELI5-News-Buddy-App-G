
import React, { useState, useMemo, useCallback } from 'react';
import { Article, Category } from './types';
import { sampleArticles } from './data/sampleArticles';
import { useProgress } from './hooks/useProgress';
import ArticleCard from './components/ArticleCard';
import ArticleDetailView from './components/ArticleDetailView';
import ProgressTracker from './components/ProgressTracker';
import ArticleSubmitForm from './components/ArticleSubmitForm';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import { LogoIcon, ChatBubbleIcon } from './components/icons';
import LiveChat from './components/LiveChat';

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(sampleArticles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { progress, completeArticle } = useProgress();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSelectArticle = useCallback((article: Article) => {
    setSelectedArticle(article);
  }, []);

  const handleCloseArticle = useCallback(() => {
    setSelectedArticle(null);
  }, []);

  const handleQuizComplete = useCallback((articleId: string, score: number) => {
    completeArticle(articleId, score);
    handleCloseArticle();
  }, [completeArticle, handleCloseArticle]);
  
  const handleAddArticle = useCallback((newArticle: Article) => {
    setArticles(prev => [newArticle, ...prev]);
    setSelectedArticle(newArticle);
    setIsSubmitting(false);
  }, []);

  const handleUpdateArticle = useCallback((articleId: string, updates: Partial<Article>) => {
    setArticles(prevArticles =>
      prevArticles.map(article =>
        article.id === articleId ? { ...article, ...updates } : article
      )
    );
    // Also update the selected article if it's the one being changed
    setSelectedArticle(prevSelected => 
        prevSelected && prevSelected.id === articleId 
            ? { ...prevSelected, ...updates } 
            : prevSelected
    );
  }, []);

  const filteredArticles = useMemo(() => {
    return articles
      .filter(article => activeCategory === 'All' || article.category === activeCategory)
      .filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [articles, activeCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <LogoIcon className="h-10 w-10 text-blue-600" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                ELI5 NEWS Buddy
              </h1>
            </div>
            <ProgressTracker progress={progress} />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
              <h2 className="text-xl font-bold mb-4 text-slate-700">Explore News</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
              </div>
            </div>
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map(article => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onSelectArticle={handleSelectArticle}
                    isCompleted={progress.completedArticles.includes(article.id)}
                  />
                ))}
              </div>
            ) : (
                 <div className="text-center py-16 bg-white rounded-2xl shadow-md">
                    <p className="text-slate-500 text-lg">No articles found. Try changing your search or filter.</p>
                </div>
            )}
          </div>
          <div className="md:col-span-1">
            <ArticleSubmitForm onAddArticle={handleAddArticle} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} />
          </div>
        </div>
      </main>

      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Open Live Chat"
        >
          <ChatBubbleIcon className="h-8 w-8" />
        </button>
      </div>

      {isChatOpen && <LiveChat onClose={() => setIsChatOpen(false)} />}

      {selectedArticle && (
        <ArticleDetailView
          article={selectedArticle}
          onClose={handleCloseArticle}
          onQuizComplete={handleQuizComplete}
          isCompleted={progress.completedArticles.includes(selectedArticle.id)}
          onUpdateArticle={handleUpdateArticle}
        />
      )}
    </div>
  );
};

export default App;
