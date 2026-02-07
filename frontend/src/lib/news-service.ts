import { formatDistanceToNow } from 'date-fns';

export type NewsCategory = 'deepfake' | 'cybercrime' | 'ai' | 'government' | 'cases' | 'social';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  imageUrl: string;
  url: string;
  category: NewsCategory;
  isLive?: boolean;
}

// Backend API URL - Update this if your backend runs on a different port
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const getNews = async (category?: NewsCategory | 'all', limit: number = 20): Promise<NewsItem[]> => {
  try {
    const categoryParam = category || 'all';
    const response = await fetch(`${API_BASE_URL}/api/news?category=${categoryParam}&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    const data = await response.json();
    
    if (data.success && data.news) {
      return data.news;
    }
    
    // Fallback to mock data if API fails
    return getMockNews(categoryParam, limit);
  } catch (error) {
    console.error('Error fetching news:', error);
    // Return mock data as fallback
    return getMockNews(category || 'all', limit);
  }
};

export const getBreakingNews = async (): Promise<NewsItem[]> => {
  try {
    const allNews = await getNews('all');
    return allNews.filter(item => item.isLive);
  } catch (error) {
    console.error('Error fetching breaking news:', error);
    return [];
  }
};

// Fallback mock data
const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Deepfake Detection Technology Advances with New AI Models',
    summary: 'Researchers have developed advanced AI models capable of detecting deepfakes with higher accuracy, marking a significant step in combating misinformation.',
    source: 'TechCrunch',
    publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    url: '#',
    category: 'deepfake',
    isLive: true,
  },
  {
    id: '2',
    title: 'New AI Regulation Bill Proposed in Parliament',
    summary: 'The government has tabled a new bill aiming to regulate the use of Artificial Intelligence in critical sectors, emphasizing data privacy and ethical use.',
    source: 'TechPolicy Watch',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    url: '#',
    category: 'ai',
  },
  {
    id: '3',
    title: 'Massive Data Breach Exposes Millions of User Records',
    summary: 'Security researchers have discovered a massive unprotected database containing personal information of millions of users from a popular e-commerce platform.',
    source: 'SecureNet News',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    url: '#',
    category: 'cybercrime',
  },
  {
    id: '4',
    title: 'AI Tool Detects Deepfakes with 99% Accuracy',
    summary: 'Researchers at IIT Bombay have developed a new AI tool capable of detecting deepfake videos with unprecedented accuracy, a major step forward in the fight against misinformation.',
    source: 'India Tech Daily',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    url: '#',
    category: 'ai',
  },
  {
    id: '5',
    title: 'Cybercrime Cells Launched in 50 New Districts',
    summary: 'To combat the rising tide of digital crimes, the Home Ministry has announced the establishment of dedicated cybercrime cells in 50 new districts across the country.',
    source: 'GovNews Live',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    url: '#',
    category: 'cybercrime',
  },
];

// Helper function to get mock news data (fallback when API fails)
const getMockNews = (category: string, limit: number = 20): NewsItem[] => {
  if (category === 'all') {
    return MOCK_NEWS.slice(0, limit);
  }
  
  return MOCK_NEWS.filter(item => item.category === category).slice(0, limit);
};
