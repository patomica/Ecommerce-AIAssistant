"""
Facebook Ads Research Service
Tools and methods for researching product ads on Facebook/Meta platforms.
"""
from dataclasses import dataclass
from typing import Optional


@dataclass
class AdResearchMethod:
    name: str
    description: str
    steps: list
    pros: list
    cons: list
    cost: str


# Ad research methods and tools
AD_RESEARCH_METHODS = {
    "meta_ad_library": AdResearchMethod(
        name="Meta Ad Library (Free)",
        description="Facebook's official tool to view all active ads running on Meta platforms",
        steps=[
            "Go to https://www.facebook.com/ads/library",
            "Select country (e.g., United States)",
            "Choose 'All Ads' category",
            "Search for product keywords or competitor names",
            "Use filters: Active ads, Date range, Platform",
            "Analyze ad creatives, copy, and engagement",
            "Note ads running for 30+ days (usually profitable)",
            "Study call-to-action buttons and landing pages"
        ],
        pros=[
            "Completely free to use",
            "Official Facebook tool",
            "See all active ads",
            "Filter by country and category",
            "No registration required"
        ],
        cons=[
            "No engagement/spend data",
            "Manual searching required",
            "Limited historical data",
            "Can be time-consuming"
        ],
        cost="Free"
    ),

    "pipiads": AdResearchMethod(
        name="PipiAds",
        description="AI-powered ad spy tool for TikTok and Facebook ads",
        steps=[
            "Sign up at pipiads.com",
            "Search for products or keywords",
            "Filter by ad type, engagement, duration",
            "Analyze trending products and ads",
            "Check ad metrics and performance estimates",
            "Save winning ads to collections"
        ],
        pros=[
            "Large ad database",
            "TikTok and Facebook coverage",
            "Engagement metrics available",
            "AI-powered recommendations",
            "Product trend analysis"
        ],
        cons=[
            "Paid subscription required",
            "Data may not be real-time"
        ],
        cost="Starting $77/month"
    ),

    "minea": AdResearchMethod(
        name="Minea",
        description="Multi-platform ad spy tool with AI features",
        steps=[
            "Register at minea.com",
            "Connect your ad accounts (optional)",
            "Search product niches or keywords",
            "Browse winning products",
            "Analyze competitor ads across platforms",
            "Use AI tools to find opportunities"
        ],
        pros=[
            "Multi-platform tracking",
            "Influencer marketing data",
            "AI-powered product finder",
            "Comprehensive ad metrics"
        ],
        cons=[
            "Higher price point",
            "Learning curve for features"
        ],
        cost="Starting $49/month"
    ),

    "ecomhunt": AdResearchMethod(
        name="Ecomhunt",
        description="Daily winning product recommendations with Facebook ad data",
        steps=[
            "Visit ecomhunt.com",
            "Browse daily trending products",
            "Review Facebook ad examples",
            "Check profit margins and analytics",
            "Access supplier links"
        ],
        pros=[
            "Curated winning products",
            "Includes Facebook ad examples",
            "Profit margin data",
            "Supplier links included"
        ],
        cons=[
            "Products available to everyone",
            "High competition on listed products"
        ],
        cost="Free tier available, Pro from $29/month"
    ),

    "sell_the_trend": AdResearchMethod(
        name="Sell The Trend",
        description="Product research platform with Facebook Ad Collector",
        steps=[
            "Sign up at sellthetrend.com",
            "Use NEXUS product explorer",
            "Access Facebook Ad Collector",
            "Analyze competitor stores",
            "Track product trends over time"
        ],
        pros=[
            "Facebook Ad Collector feature",
            "Store analysis tools",
            "Product trend tracking",
            "AliExpress integration"
        ],
        cons=[
            "Monthly subscription",
            "Can be overwhelming for beginners"
        ],
        cost="Starting $39.97/month"
    ),

    "manual_research": AdResearchMethod(
        name="Manual Facebook Research",
        description="Free method using Facebook's algorithm",
        steps=[
            "Create a fresh Facebook account for research",
            "Search and engage with ecommerce products",
            "Click on product ads when you see them",
            "Your feed will show more ecommerce ads",
            "Save ads that catch your attention",
            "Analyze patterns in successful ads",
            "Visit advertiser pages to see all their ads",
            "Check comments for social proof and objections"
        ],
        pros=[
            "Completely free",
            "See ads as customers see them",
            "Real engagement perspective",
            "Good for understanding ad flow"
        ],
        cons=[
            "Time-consuming",
            "Not systematic",
            "Limited data collection",
            "Algorithm dependent"
        ],
        cost="Free"
    ),
}


def get_ad_research_method(method_name: str) -> Optional[AdResearchMethod]:
    """Get detailed information about an ad research method."""
    return AD_RESEARCH_METHODS.get(method_name.lower().replace(" ", "_"))


def get_all_research_methods() -> dict:
    """Get all ad research methods."""
    return AD_RESEARCH_METHODS


def get_free_methods() -> list:
    """Get only free ad research methods."""
    return [m for m in AD_RESEARCH_METHODS.values() if m.cost == "Free"]


def winning_ad_signals() -> list:
    """Returns signals that indicate a winning/profitable ad."""
    return [
        {
            "signal": "Long Ad Runtime",
            "description": "Ads running 30+ days are likely profitable",
            "importance": "High",
            "how_to_check": "Use Meta Ad Library date filter"
        },
        {
            "signal": "Multiple Ad Variations",
            "description": "Advertiser testing many creatives indicates serious investment",
            "importance": "High",
            "how_to_check": "Search advertiser in Ad Library, count variations"
        },
        {
            "signal": "High Engagement",
            "description": "Many likes, comments, shares indicate resonance",
            "importance": "Medium",
            "how_to_check": "View ad engagement on Facebook posts"
        },
        {
            "signal": "Professional Creatives",
            "description": "High-quality video, UGC, or lifestyle imagery",
            "importance": "Medium",
            "how_to_check": "Visual assessment of ad creative quality"
        },
        {
            "signal": "Clear Call-to-Action",
            "description": "'Shop Now' buttons with clear value proposition",
            "importance": "Medium",
            "how_to_check": "Review ad copy and CTA buttons"
        },
        {
            "signal": "Consistent Messaging",
            "description": "Same product promoted across multiple ad sets",
            "importance": "High",
            "how_to_check": "Review all ads from same advertiser"
        },
        {
            "signal": "Social Proof in Comments",
            "description": "Positive customer comments and tagged friends",
            "importance": "High",
            "how_to_check": "Read ad comments section"
        },
        {
            "signal": "Scarcity/Urgency",
            "description": "Limited time offers, low stock messaging",
            "importance": "Low",
            "how_to_check": "Review ad copy for urgency language"
        },
    ]


def ad_creative_best_practices() -> dict:
    """Returns best practices for ad creatives in 2026."""
    return {
        "video_ads": {
            "optimal_length": "15-30 seconds",
            "format": "Vertical (9:16) for Stories/Reels, Square (1:1) for Feed",
            "tips": [
                "Hook viewers in first 3 seconds",
                "Show product in action immediately",
                "Include captions (85% watch without sound)",
                "End with clear CTA",
                "UGC style outperforms polished content"
            ]
        },
        "image_ads": {
            "format": "Square (1:1) or Vertical (4:5)",
            "tips": [
                "Show product clearly",
                "Use lifestyle imagery",
                "Include before/after when relevant",
                "Minimal text (under 20% of image)",
                "Eye-catching colors"
            ]
        },
        "copy_tips": [
            "Lead with benefit, not feature",
            "Address pain points directly",
            "Use social proof (reviews, testimonials)",
            "Create urgency (limited time, low stock)",
            "Keep primary text under 125 characters",
            "Use emojis sparingly for visual breaks",
            "Include clear CTA"
        ],
        "2026_trends": [
            "Authentic/UGC content outperforms polished ads",
            "Short-form video dominates",
            "Influencer partnerships for credibility",
            "Interactive elements (polls, quizzes)",
            "Behind-the-scenes content",
            "Customer testimonial videos"
        ]
    }


def meta_ad_library_search_tips() -> list:
    """Tips for effectively using Meta Ad Library."""
    return [
        "Use quotation marks for exact phrase matching",
        "Use | symbol to search multiple keywords",
        "Filter by country to see region-specific ads",
        "Filter by date range to find long-running (successful) ads",
        "Search competitor brand names directly",
        "Search product category keywords",
        "Look for patterns across similar products",
        "Save interesting ads for later analysis",
        "Check the advertiser's Page for more context",
        "Note the platforms (Facebook, Instagram, Audience Network)"
    ]
