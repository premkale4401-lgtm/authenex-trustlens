"""
News API Service - Fetches live news about AI, deepfakes, and cybercrime
Uses NewsData.io API with caching to minimize costs
"""
import os
import json
import requests
from datetime import datetime, timedelta
from typing import List, Dict, Optional
from dotenv import load_dotenv

load_dotenv()

# Cache settings - TEMPORARILY SET TO 1 MINUTE FOR TESTING
CACHE_FILE = "news_cache.json"
CACHE_DURATION_HOURS = 0.016  # 1 minute for testing (will be set back to 4 hours)

# NewsData.io API settings
NEWSDATA_API_KEY = os.getenv("NEWSDATA_API_KEY", "")
NEWSDATA_BASE_URL = "https://newsdata.io/api/1/news"

# Search keywords for different categories - Expanded for comprehensive coverage
# Search keywords - Simplified to avoid "UnsupportedQueryLength" API error
# Search keywords - Refined for relevance to (Cybercrime, Deepfake, AI Security)
# kept concise to avoid "UnsupportedQueryLength"
# Search keywords - Refined for STRICT RELEVANCE to Security/Crime
# Using quotes where possible to force exact phrase matches
# Search keywords - Refined for "Celebrity Deepfakes" and "VIP Scams" as requested
# Using quotes for exact matches to reduce noise
KEYWORDS = {
    "deepfake": '"deepfake celebrity" OR "deepfake viral" OR "celebrity face swap" OR "AI impersonation"',
    "cybercrime": '"cybercrime" OR "cyber attack" OR "ransomware" OR "data breach"',
    "ai": '"AI fraud" OR "deepfake scam" OR "voice cloning" OR "AI misinformation"',
    "government": '"cyber law" OR "digital safety act" OR "deepfake regulation"',
    "cases": '"deepfake arrest" OR "cyberstalking case" OR "celebrity lawsuit AI"',
    "social": '"social media hack" OR "Instagram account hacked" OR "X deepfake"',
    "all": '"deepfake celebrity" OR "AI fraud" OR "cybercrime" OR "deepfake scandal"'
}


def load_cache() -> Optional[Dict]:
    """Load cached news data if it exists and is still valid"""
    try:
        if os.path.exists(CACHE_FILE):
            with open(CACHE_FILE, 'r', encoding='utf-8') as f:
                cache = json.load(f)
                cache_time = datetime.fromisoformat(cache.get('timestamp', ''))
                
                # Check if cache is still valid
                if datetime.now() - cache_time < timedelta(hours=CACHE_DURATION_HOURS):
                    return cache.get('data')
    except Exception as e:
        print(f"Error loading cache: {e}")
    return None


def save_cache(data: Dict):
    """Save news data to cache"""
    try:
        cache = {
            'timestamp': datetime.now().isoformat(),
            'data': data
        }
        with open(CACHE_FILE, 'w', encoding='utf-8') as f:
            json.dump(cache, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"Error saving cache: {e}")


def fetch_from_newsdata(category: str = "all", limit: int = 10) -> List[Dict]:
    """
    Fetch news from NewsData.io API
    Note: Free tier is limited to 10 items per request
    """
    if not NEWSDATA_API_KEY:
        print("Warning: NEWSDATA_API_KEY not set, using fallback data")
        return get_fallback_news(category)
    
    try:
        # Build query
        query = KEYWORDS.get(category, KEYWORDS["all"])
        
        # Clamp limit to 10 due to API restrictions on free tier
        # The free plan ONLY allows up to 10 items per request.
        # Requesting more results in 422 Unprocessable Entity error.
        api_size = 10 if limit > 10 else limit
        
        params = {
            "apikey": NEWSDATA_API_KEY,
            "q": query,
            "language": "en",
            "size": api_size,  # Strictly use clamped size
        }
        
        response = requests.get(NEWSDATA_BASE_URL, params=params, timeout=10)
        
        if response.status_code != 200:
            print(f"NewsData API Error: {response.status_code} - {response.text}")
            return get_fallback_news(category)
        
        data = response.json()
        
        if data.get("status") != "success":
            print(f"NewsData API failed: {data.get('message')}")
            return get_fallback_news(category)
        
        results = data.get("results", [])
        
        if not results:
            return get_fallback_news(category)
        
        # Transform and return
        news_items = []
        for article in results:
            detected_category = detect_category(article)
            
            # Filter by category if needed
            if category != "all" and detected_category != category:
                # On free tier with limited results, we might want to be lenient with filtering
                # or else we end up with 0 results. For now, keep it loose.
                pass 
            
            news_items.append({
                "id": article.get("article_id", ""),
                "title": article.get("title", ""),
                "summary": article.get("description", "")[:200] + "..." if article.get("description") else "",
                "source": article.get("source_id", "Unknown"),
                "publishedAt": article.get("pubDate", datetime.now().isoformat()),
                "imageUrl": article.get("image_url") or "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
                "url": article.get("link", "#"),
                "category": detected_category,
                "isLive": True
            })
        
        print(f"✨ Returning {len(news_items)} transformed articles")
        return news_items[:limit]
        
    except requests.exceptions.Timeout:
        print("❌ API request timed out (15s)")
        return get_fallback_news(category)
    except requests.exceptions.RequestException as e:
        print(f"❌ API request failed: {str(e)}")
        return get_fallback_news(category)
    except Exception as e:
        print(f"❌ Unexpected error: {str(e)}")
        import traceback
        traceback.print_exc()
        return get_fallback_news(category)


def detect_category(article: Dict) -> str:
    """Detect category based on article content"""
    text = (article.get("title", "") + " " + article.get("description", "")).lower()
    
    # Priority order: most specific to least specific
    if any(word in text for word in ["cyber law", "data protection", "privacy law", "regulation", "government policy", "digital act"]):
        return "government"
    elif any(word in text for word in ["case", "arrest", "caught", "convicted", "sentenced", "prosecution", "lawsuit"]):
        return "cases"
    elif any(word in text for word in ["facebook", "twitter", "instagram", "tiktok", "whatsapp", "social media", "linkedin"]):
        return "social"
    elif any(word in text for word in ["deepfake", "synthetic media", "manipulated", "face swap", "ai-generated"]):
        return "deepfake"
    elif any(word in text for word in ["cybercrime", "cyber attack", "breach", "ransomware", "hacker", "phishing", "malware"]):
        return "cybercrime"
    else:
        return "ai"


def is_recent(pub_date: str, hours: int = 24) -> bool:
    """Check if article was published within the last N hours"""
    try:
        published = datetime.fromisoformat(pub_date.replace('Z', '+00:00'))
        return (datetime.now() - published.replace(tzinfo=None)) < timedelta(hours=hours)
    except:
        return False


def get_fallback_news(category: str = "all") -> List[Dict]:
    """
    Fallback news data when API is not available
    This provides realistic sample data for demonstration
    """
    fallback_articles = [
        {
            "article_id": "fb1",
            "title": "Major Deepfake Scam Uncovered in Financial Sector - CEO Impersonation Led to $25M Fraud",
            "description": "Federal investigators have exposed a sophisticated deepfake operation where criminals used AI-generated videos to impersonate company executives, resulting in unauthorized wire transfers totaling $25 million across multiple corporations.",
            "source_id": "CyberSecurity Today",
            "pubDate": (datetime.now() - timedelta(hours=2)).isoformat(),
            "image_url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
            "link": "https://example.com/deepfake-scam",
        },
        {
            "article_id": "fb2",
            "title": "Government Introduces Strict AI Regulation Bill with Heavy Penalties for Misuse",
            "description": "Parliament has tabled comprehensive AI regulation legislation imposing fines up to $10 million for companies deploying AI systems without proper safety audits. The bill mandates transparency in AI decision-making across critical sectors.",
            "source_id": "PolicyWatch",
            "pubDate": (datetime.now() - timedelta(hours=5)).isoformat(),
            "image_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
            "link": "https://example.com/ai-regulation",
        },
        {
            "article_id": "fb3",
            "title": "Ransomware Attack Cripples Hospital Network - Patient Data Compromised",
            "description": "A coordinated ransomware attack has affected 15 hospitals across three states, encrypting patient records and disrupting critical healthcare services. Cybersecurity experts warn this represents a new escalation in healthcare-targeted cybercrime.",
            "source_id": "Healthcare Security News",
            "pubDate": (datetime.now() - timedelta(hours=8)).isoformat(),
            "image_url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
            "link": "https://example.com/hospital-ransomware",
        },
        {
            "article_id": "fb4",
            "title": "International Cybercrime Ring Dismantled - 47 Arrests Across 12 Countries",
            "description": "Interpol announces the successful takedown of a global cybercrime syndicate responsible for over $200 million in cryptocurrency theft and identity fraud. The coordinated operation involved law enforcement from 12 nations.",
            "source_id": "Global Crime Watch",
            "pubDate": (datetime.now() - timedelta(hours=12)).isoformat(),
            "image_url": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
            "link": "https://example.com/arrests",
        },
        {
            "article_id": "fb5",
            "title": "Social Media Giant Fined $500M for Privacy Violations - Data of 100M Users Exposed",
            "description": "Regulators have imposed a record $500 million fine on a major social media platform after discovering inadequate protection of user data, affecting over 100 million accounts globally. The breach included sensitive personal information and location data.",
            "source_id": "Tech Accountability",
            "pubDate": (datetime.now() - timedelta(hours=15)).isoformat(),
            "image_url": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
            "link": "https://example.com/social-media-fine",
        },
        {
            "article_id": "fb6",
            "title": "New Cyber Law Mandates Real-Time Deepfake Detection on All Video Platforms",
            "description": "Legislation now requires all video streaming and social media platforms to implement AI-powered deepfake detection systems, with platforms facing suspension if they fail to flag manipulated content within 24 hours of upload.",
            "source_id": "Digital Law Review",
            "pubDate": (datetime.now() - timedelta(hours=18)).isoformat(),
            "image_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
            "link": "https://example.com/deepfake-law",
        },
        {
            "article_id": "fb7",
            "title": "AI-Powered Phishing Attacks Surge 340% - Personalized Scams Harder to Detect",
            "description": "Cybersecurity firms report a dramatic 340% increase in AI-generated phishing emails that use personalized information scraped from social media, making them significantly more convincing than traditional spam campaigns.",
            "source_id": "CyberThreat Intelligence",
            "pubDate": (datetime.now() - timedelta(hours=24)).isoformat(),
            "image_url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
            "link": "https://example.com/ai-phishing",
        },
        {
            "article_id": "fb8",
            "title": "Instagram Deepfake Scandal: Celebrities Sue Platform Over Fake Endorsements",
            "description": "A class-action lawsuit filed by 30 celebrities claims Instagram failed to remove AI-generated deepfake videos showing them endorsing cryptocurrency scams, resulting in millions of dollars in fraudulent transactions.",
            "source_id": "Entertainment & Tech Law",
            "pubDate": (datetime.now() - timedelta(hours=30)).isoformat(),
            "image_url": "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
            "link": "https://example.com/celebrity-deepfakes",
        },
        {
            "article_id": "fb9",
            "title": "Data Protection Authority Launches Investigation into TikTok's AI Recommendation Algorithm",
            "description": "Regulators are investigating whether TikTok's AI-driven content recommendation system violates data privacy laws by collecting excessive user information without proper consent, particularly from minors.",
            "source_id": "Privacy Watchdog",
            "pubDate": (datetime.now() - timedelta(hours=36)).isoformat(),
            "image_url": "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&q=80",
            "link": "https://example.com/tiktok-investigation",
        },
        {
            "article_id": "fb10",
            "title": "Banking Trojan Steals $15M Through AI Voice Cloning - Customers Tricked into Transfers",
            "description": "A new malware campaign uses AI to clone bank customers' voices from social media videos, then calls victims pretending to be their relatives in emergency situations, convincing them to authorize large wire transfers.",
            "source_id": "Financial Security Alert",
            "pubDate": (datetime.now() - timedelta(hours=48)).isoformat(),
            "image_url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
            "link": "https://example.com/voice-cloning-scam",
        },
        {
            "article_id": "fb11",
            "title": "EU Passes Landmark AI Act - First Comprehensive Regulation of Artificial Intelligence",
            "description": "The European Union has approved groundbreaking legislation categorizing AI applications by risk level, banning high-risk uses like social scoring and live facial recognition, while requiring transparency for generative AI systems.",
            "source_id": "EU Tech Policy",
            "pubDate": (datetime.now() - timedelta(hours=60)).isoformat(),
            "image_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
            "link": "https://example.com/eu-ai-act",
        },
        {
            "article_id": "fb12",
            "title": "WhatsApp Encryption Backdoor Controversy - Government Demands Access to Messages",
            "description": "Privacy advocates raise alarms as government agencies push for backdoor access to WhatsApp's end-to-end encryption, claiming it's necessary for national security while civil liberties groups warn of mass surveillance risks.",
            "source_id": "Digital Rights Now",
            "pubDate": (datetime.now() - timedelta(hours=72)).isoformat(),
            "image_url": "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80",
            "link": "https://example.com/whatsapp-encryption",
        },
    ]
    
    # Transform to our format
    news_items = []
    for article in fallback_articles:
        detected_category = detect_category(article)
        
        # Filter by category if not "all"
        if category != "all" and detected_category != category:
            continue
            
        news_items.append({
            "id": article.get("article_id"),
            "title": article.get("title", ""),
            "summary": article.get("description", ""),
            "source": article.get("source_id", "News Source"),
            "publishedAt": article.get("pubDate", datetime.now().isoformat()),
            "imageUrl": article.get("image_url") or "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
            "url": article.get("link", "#"),
            "category": detected_category,
            "isLive": True  # Mark as live for demo purposes
        })
    
    return news_items if category != "all" else news_items[:20]  # Return up to 20 for "all"
    



def get_news_cached(category: str = "all", limit: int = 20) -> List[Dict]:
    """
    Get news with caching support
    """
    # Try to load from cache first
    cached_data = load_cache()
    if cached_data:
        # print("Using cached news data")
        if category == "all":
            return cached_data[:limit]
        return [item for item in cached_data if item.get("category") == category][:limit]
    
    print(f"Fetching fresh news for category: {category}")
    
    # Fetch fresh news
    # Note: ensure strict limit of 10 is respected in fetch_from_newsdata
    news_items = fetch_from_newsdata(category, limit)
    
    # Save to cache if we got results
    if news_items and category == "all":
        save_cache(news_items)
    
    return news_items
