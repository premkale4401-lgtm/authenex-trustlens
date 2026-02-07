
import { NewsItem } from "@/lib/news-service";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink, Clock, Zap, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Ensure you have this utility or use standard class string

interface NewsCardProps {
  news: NewsItem;
  featured?: boolean;
}

const categoryColors = {
  deepfake: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  cybercrime: "text-rose-400 border-rose-500/30 bg-rose-500/10",
  ai: "text-sky-400 border-sky-500/30 bg-sky-500/10",
  government: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  cases: "text-orange-400 border-orange-500/30 bg-orange-500/10",
  social: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
};

const categoryLabels = {
  deepfake: "Deepfake Alert",
  cybercrime: "Cybercrime",
  ai: "AI Security",
  government: "Legal & Policy",
  cases: "Case Update",
  social: "Social Media",
};

export default function NewsCard({ news, featured = false }: NewsCardProps) {
  const timeAgo = formatDistanceToNow(new Date(news.publishedAt), { addSuffix: true });
  
  return (
    <a 
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-slate-800/60 hover:shadow-2xl hover:shadow-sky-500/5 h-full min-h-[400px]"
    >
      <div className="flex flex-col h-full">
        {/* Image Section */}
        <div className="relative overflow-hidden shrink-0 w-full h-52 bg-slate-800">
          {news.imageUrl ? (
            <Image
              src={news.imageUrl}
              alt={news.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                // Fallback via CSS logic or state is hard in simple map, 
                // so we rely on parent service providing valid URL or we use a conditional render if we had state.
                // For now, we assume service provides data, but we can render a placeholder if url is empty string.
                e.currentTarget.style.display = 'none'; // Hide broken image
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
               <Zap className="w-12 h-12 text-slate-700" />
            </div>
          )}
          
          {/* Fallback pattern if image fails to load (CSS trick for broken images doesn't work well with next/image 'fill') */}
          {/* Instead, let's rely on a robust generic gradient if no image is present */}
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent opacity-80" />
          
          {/* Badge Overlay */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md border shadow-lg",
              categoryColors[news.category]
            )}>
              {categoryLabels[news.category]}
            </span>
            {news.isLive && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white shadow-lg shadow-red-500/20 animate-pulse">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                LIVE
              </span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-6 relative">
          <div className="flex items-center gap-2 mb-3 text-xs text-slate-400 font-medium shrink-0">
             <span className="flex items-center gap-1.5 text-slate-300">
               <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
               <span className="truncate max-w-[150px]">{news.source}</span>
             </span>
             <span className="w-1 h-1 rounded-full bg-slate-700" />
             <span className="flex items-center gap-1 shrink-0">
               <Clock className="w-3.5 h-3.5" />
               {timeAgo}
             </span>
          </div>

          <h3 className="font-extrabold text-slate-100 group-hover:text-primary transition-colors leading-tight mb-3 text-lg line-clamp-2 min-h-[3.5rem]">
            {news.title}
          </h3>
          
          <p className="text-slate-400 font-medium leading-relaxed mb-6 text-sm line-clamp-3">
            {news.summary}
          </p>

          <div className="mt-auto flex items-center text-sm font-semibold text-sky-400 group-hover:text-sky-300 transition-colors pt-2 border-t border-slate-800/50 w-full">
            Read Analysis
            <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </div>
    </a>
  );
}
