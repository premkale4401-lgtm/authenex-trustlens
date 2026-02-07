"use client";

import { useEffect, useState } from 'react';
import { getNews, NewsCategory, NewsItem } from '@/lib/news-service';
import NewsCard from './NewsCard';
import { cn } from '../../lib/utils';
import { Newspaper, Shield, Cpu, Scale, Briefcase, MessageCircle, Globe } from 'lucide-react';

export default function NewsFeed() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory | 'all'>('all');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const data = await getNews(activeCategory, 50); 
        setNews(data);
      } catch (error) {
        console.error("Failed to fetch news", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [activeCategory]);

  const categories = [
    { id: 'all', label: 'Top Stories', icon: Globe },
    { id: 'deepfake', label: 'Deepfakes', icon: Newspaper },
    { id: 'cybercrime', label: 'Cybercrime', icon: Shield },
    { id: 'ai', label: 'AI Security', icon: Cpu },
    { id: 'government', label: 'Policy', icon: Scale },
    { id: 'cases', label: 'Cases', icon: Briefcase },
    { id: 'social', label: 'Social', icon: MessageCircle },
  ];



  return (
    <div className="space-y-8">
      {/* Premium Filter Bar */}
      <div className="sticky top-4 z-30 bg-slate-950/80 backdrop-blur-xl p-1.5 rounded-2xl border border-slate-800/60 shadow-2xl flex flex-nowrap overflow-x-auto no-scrollbar gap-1">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as NewsCategory | 'all')}
              className={cn(
                "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap",
                activeCategory === category.id
                  ? "bg-slate-800 text-white shadow-lg ring-1 ring-slate-700"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              )}
            >
              <Icon className={cn("w-4 h-4", activeCategory === category.id ? "text-sky-400" : "")} />
              {category.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
           {[1, 2, 3, 4, 5, 6].map((i) => (
             <div key={i} className="h-[350px] bg-slate-900/50 rounded-2xl border border-slate-800" />
           ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      )}
    </div>
  );
}
