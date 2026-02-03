"""
Viral Summer Products Database - 2026
Curated list of trending products with supplier info and profit margins.
Based on comprehensive market research.
"""
from src.models import (
    ProductCategory, ProfitabilityRating, PriceRange,
    Supplier, FacebookAdInsight, ViralProduct
)


def get_viral_summer_products() -> list:
    """
    Returns a curated list of viral summer products for 2026.
    Each product includes pricing, supplier info, and Facebook Ads insights.
    """
    products = [
        # 1. Red Light Therapy Belt
        ViralProduct(
            name="Red Light Therapy Belt",
            category=ProductCategory.HEALTH_WELLNESS,
            description="At-home wellness device for fat metabolism, muscle recovery, and overall health. Viral on TikTok and Instagram.",
            retail_price=PriceRange(120.00, 180.00),
            supplier_cost=PriceRange(35.00, 60.00),
            profit_margin=ProfitabilityRating.HIGH,
            trending_score=92,
            target_audience="Health-conscious adults 25-45, fitness enthusiasts",
            selling_points=[
                "Non-invasive wellness solution",
                "At-home spa experience",
                "Visible results marketing",
                "High perceived value",
                "Repeat customer potential"
            ],
            competition_level="Medium",
            recommendation="HIGH POTENTIAL - Strong margins and growing wellness trend. Focus on before/after content.",
            suppliers=[
                Supplier(
                    name="Shenzhen Beauty Device Co.",
                    platform="Alibaba",
                    url="https://www.alibaba.com/product-detail/Red-Light-Therapy-Belt_1600xxx.html",
                    price_range=PriceRange(35.00, 45.00),
                    moq=10,
                    shipping_time="7-15 days",
                    rating=4.7,
                    verified=True
                ),
                Supplier(
                    name="GuangZhou Health Tech",
                    platform="AliExpress",
                    url="https://www.aliexpress.com/item/Red-Light-Therapy-Belt.html",
                    price_range=PriceRange(45.00, 60.00),
                    moq=1,
                    shipping_time="15-25 days",
                    rating=4.5,
                    verified=False
                ),
            ],
            facebook_ads=FacebookAdInsight(
                ad_active=True,
                estimated_spend="$5,000-15,000/month",
                ad_duration_days=90,
                engagement_level="High",
                platforms=["Facebook", "Instagram", "TikTok"],
                call_to_action="Shop Now",
                notes="Multiple competitors running video ads showcasing results. UGC content performs best."
            )
        ),

        # 2. Natural Honey Sticks
        ViralProduct(
            name="Natural Honey Sticks",
            category=ProductCategory.HEALTH_WELLNESS,
            description="Easy, nutrient-rich snacks perfect for outdoor summer activities. Appeals to health-conscious consumers.",
            retail_price=PriceRange(25.00, 35.00),
            supplier_cost=PriceRange(5.00, 7.00),
            profit_margin=ProfitabilityRating.VERY_HIGH,
            trending_score=85,
            target_audience="Health-conscious women 20-40, outdoor enthusiasts, parents",
            selling_points=[
                "Natural and organic appeal",
                "Portable snacking",
                "Great for outdoor activities",
                "Gift potential",
                "Repeat purchases"
            ],
            competition_level="Low",
            recommendation="EXCELLENT - 75-80% margins, low competition, consumable product for repeat sales.",
            suppliers=[
                Supplier(
                    name="Henan Honey Products",
                    platform="Alibaba",
                    url="https://www.alibaba.com/product-detail/Natural-Honey-Sticks_1600xxx.html",
                    price_range=PriceRange(5.00, 6.00),
                    moq=100,
                    shipping_time="10-20 days",
                    rating=4.8,
                    verified=True
                ),
                Supplier(
                    name="US Honey Wholesale",
                    platform="Doba",
                    url="https://www.doba.com/honey-sticks",
                    price_range=PriceRange(6.00, 7.00),
                    moq=1,
                    shipping_time="3-7 days",
                    rating=4.6,
                    verified=True
                ),
            ],
            facebook_ads=FacebookAdInsight(
                ad_active=True,
                estimated_spend="$1,000-5,000/month",
                ad_duration_days=60,
                engagement_level="Medium",
                platforms=["Facebook", "Instagram"],
                call_to_action="Shop Now",
                notes="Lifestyle imagery with outdoor activities performs well. Target hiking/camping interests."
            )
        ),

        # 3. Peeling Exfoliating Serum
        ViralProduct(
            name="Peeling Exfoliating Serum",
            category=ProductCategory.BEAUTY_SKINCARE,
            description="Viral skincare essential driven by 'glass skin' and 'clean girl' trends on TikTok and Instagram.",
            retail_price=PriceRange(20.00, 30.00),
            supplier_cost=PriceRange(4.00, 5.00),
            profit_margin=ProfitabilityRating.VERY_HIGH,
            trending_score=95,
            target_audience="Women 18-35, skincare enthusiasts, beauty influencer followers",
            selling_points=[
                "Viral TikTok trend",
                "Visible results",
                "Low price point = impulse buy",
                "High repeat purchase rate",
                "Easy to demonstrate"
            ],
            competition_level="High",
            recommendation="HIGH POTENTIAL - 81-85% margins but competitive. Differentiate with unique branding.",
            suppliers=[
                Supplier(
                    name="Guangzhou Beauty Labs",
                    platform="Alibaba",
                    url="https://www.alibaba.com/product-detail/Peeling-Serum_1600xxx.html",
                    price_range=PriceRange(4.00, 4.50),
                    moq=50,
                    shipping_time="10-15 days",
                    rating=4.6,
                    verified=True
                ),
                Supplier(
                    name="Korean Beauty Wholesale",
                    platform="AliExpress",
                    url="https://www.aliexpress.com/item/Peeling-Serum.html",
                    price_range=PriceRange(4.50, 5.00),
                    moq=1,
                    shipping_time="12-20 days",
                    rating=4.4,
                    verified=False
                ),
            ],
            facebook_ads=FacebookAdInsight(
                ad_active=True,
                estimated_spend="$10,000-50,000/month",
                ad_duration_days=180,
                engagement_level="Very High",
                platforms=["Facebook", "Instagram", "TikTok"],
                call_to_action="Shop Now",
                notes="Video ads showing before/after. UGC and influencer content dominates. High ad spend in market."
            )
        ),

        # 4. Portable Mini Fan
        ViralProduct(
            name="Portable Mini Fan (USB Rechargeable)",
            category=ProductCategory.COOLING_PRODUCTS,
            description="Compact cooling solution for summer. USB rechargeable, perfect for commuting, outdoor events, desk use.",
            retail_price=PriceRange(12.00, 26.00),
            supplier_cost=PriceRange(3.00, 8.00),
            profit_margin=ProfitabilityRating.HIGH,
            trending_score=88,
            target_audience="Everyone, especially commuters, office workers, outdoor enthusiasts",
            selling_points=[
                "Universal appeal",
                "Low price = impulse buy",
                "Lightweight shipping",
                "Multi-unit potential",
                "Peak demand in July"
            ],
            competition_level="High",
            recommendation="GOOD - 30.8% growth rate. Focus on unique designs or bundle deals to stand out.",
            suppliers=[
                Supplier(
                    name="Shenzhen Fan Factory",
                    platform="Alibaba",
                    url="https://www.alibaba.com/product-detail/Mini-Portable-Fan_1600xxx.html",
                    price_range=PriceRange(3.00, 5.00),
                    moq=50,
                    shipping_time="7-14 days",
                    rating=4.5,
                    verified=True
                ),
                Supplier(
                    name="Portable Fan Direct",
                    platform="Doba",
                    url="https://www.doba.com/dropshipping/portable-fan.html",
                    price_range=PriceRange(6.00, 8.00),
                    moq=1,
                    shipping_time="3-7 days",
                    rating=4.3,
                    verified=True
                ),
                Supplier(
                    name="DHgate Cooling Store",
                    platform="DHgate",
                    url="https://www.dhgate.com/mini-fan",
                    price_range=PriceRange(4.00, 6.00),
                    moq=1,
                    shipping_time="10-20 days",
                    rating=4.2,
                    verified=False
                ),
            ],
            facebook_ads=FacebookAdInsight(
                ad_active=True,
                estimated_spend="$2,000-10,000/month",
                ad_duration_days=120,
                engagement_level="Medium",
                platforms=["Facebook", "Instagram"],
                call_to_action="Shop Now",
                notes="Seasonal spike in May-August. Video demos showing portability work well."
            )
        ),

        # 5. Boneless Couch / Modular Foam Sofa
        ViralProduct(
            name="Boneless Couch (Modular Foam Sofa)",
            category=ProductCategory.HOME_LIVING,
            description="Viral frameless sofa using high-density foam for complete modularity. Dramatic spike in search interest.",
            retail_price=PriceRange(299.00, 599.00),
            supplier_cost=PriceRange(80.00, 180.00),
            profit_margin=ProfitabilityRating.HIGH,
            trending_score=90,
            target_audience="Young adults 22-35, apartment dwellers, modern home enthusiasts",
            selling_points=[
                "Viral home decor trend",
                "High ticket item",
                "Unique selling proposition",
                "Great for social content",
                "Modular/customizable"
            ],
            competition_level="Medium",
            recommendation="HIGH TICKET OPPORTUNITY - Larger margins per sale. Requires quality supplier vetting.",
            suppliers=[
                Supplier(
                    name="Foshan Furniture Factory",
                    platform="Alibaba",
                    url="https://www.alibaba.com/product-detail/Modular-Foam-Sofa_1600xxx.html",
                    price_range=PriceRange(80.00, 120.00),
                    moq=5,
                    shipping_time="20-35 days",
                    rating=4.4,
                    verified=True
                ),
                Supplier(
                    name="Modern Living Wholesale",
                    platform="Alibaba",
                    url="https://www.alibaba.com/product-detail/Boneless-Couch_1600xxx.html",
                    price_range=PriceRange(100.00, 180.00),
                    moq=2,
                    shipping_time="25-40 days",
                    rating=4.6,
                    verified=True
                ),
            ],
            facebook_ads=FacebookAdInsight(
                ad_active=True,
                estimated_spend="$15,000-40,000/month",
                ad_duration_days=60,
                engagement_level="Very High",
                platforms=["Facebook", "Instagram", "TikTok", "Pinterest"],
                call_to_action="Shop Now",
                notes="Room transformation videos viral on TikTok. High engagement, premium pricing accepted."
            )
        ),

        # 6. Insulated Water Bottle
        ViralProduct(
            name="Insulated Water Bottle (40oz)",
            category=ProductCategory.BEACH_OUTDOOR,
            description="Must-have for outdoor activities. Keeps beverages cold for hours. Eco-friendly alternative to plastic.",
            retail_price=PriceRange(25.00, 45.00),
            supplier_cost=PriceRange(6.00, 12.00),
            profit_margin=ProfitabilityRating.HIGH,
            trending_score=82,
            target_audience="Fitness enthusiasts, outdoor lovers, eco-conscious consumers",
            selling_points=[
                "Eco-friendly appeal",
                "Year-round demand",
                "Customization potential",
                "Brand building opportunity",
                "Gift-worthy"
            ],
            competition_level="High",
            recommendation="STABLE CHOICE - Proven market, focus on unique colors/designs for differentiation.",
            suppliers=[
                Supplier(
                    name="Zhejiang Drinkware Co.",
                    platform="Alibaba",
                    url="https://www.alibaba.com/product-detail/Insulated-Water-Bottle_1600xxx.html",
                    price_range=PriceRange(6.00, 8.00),
                    moq=100,
                    shipping_time="10-20 days",
                    rating=4.7,
                    verified=True
                ),
                Supplier(
                    name="US Bottle Wholesale",
                    platform="Doba",
                    url="https://www.doba.com/water-bottles",
                    price_range=PriceRange(10.00, 12.00),
                    moq=1,
                    shipping_time="3-5 days",
                    rating=4.5,
                    verified=True
                ),
            ],
            facebook_ads=FacebookAdInsight(
                ad_active=True,
                estimated_spend="$5,000-20,000/month",
                ad_duration_days=365,
                engagement_level="Medium",
                platforms=["Facebook", "Instagram"],
                call_to_action="Shop Now",
                notes="Evergreen product. Lifestyle imagery at gym/beach/hiking performs well."
            )
        ),

        # 7. UV-Protective Clothing
        ViralProduct(
            name="UV-Protective Clothing (UPF 50+)",
            category=ProductCategory.FASHION,
            description="Functional fashion combining sun protection with style. Perfect for beach, outdoor activities.",
            retail_price=PriceRange(35.00, 75.00),
            supplier_cost=PriceRange(10.00, 25.00),
            profit_margin=ProfitabilityRating.HIGH,
            trending_score=78,
            target_audience="Outdoor enthusiasts, beach-goers, health-conscious parents, travelers",
            selling_points=[
                "Health benefit (sun protection)",
                "Fashion meets function",
                "Growing awareness of UV damage",
                "Multiple product variations",
                "Premium pricing accepted"
            ],
            competition_level="Medium",
            recommendation="GROWING NICHE - Health trend supports premium pricing. Good for brand building.",
            suppliers=[
                Supplier(
                    name="Hangzhou Sportswear",
                    platform="Alibaba",
                    url="https://www.alibaba.com/product-detail/UV-Protective-Clothing_1600xxx.html",
                    price_range=PriceRange(10.00, 18.00),
                    moq=20,
                    shipping_time="12-20 days",
                    rating=4.5,
                    verified=True
                ),
                Supplier(
                    name="Sun Protection Apparel",
                    platform="AliExpress",
                    url="https://www.aliexpress.com/item/UV-Protection-Shirt.html",
                    price_range=PriceRange(15.00, 25.00),
                    moq=1,
                    shipping_time="15-25 days",
                    rating=4.3,
                    verified=False
                ),
            ],
            facebook_ads=FacebookAdInsight(
                ad_active=True,
                estimated_spend="$3,000-10,000/month",
                ad_duration_days=90,
                engagement_level="Medium",
                platforms=["Facebook", "Instagram"],
                call_to_action="Shop Now",
                notes="Educational content about UV protection works. Target parents and outdoor activity interests."
            )
        ),

        # 8. Cooling Towel
        ViralProduct(
            name="Cooling Towel (Instant Cool Technology)",
            category=ProductCategory.COOLING_PRODUCTS,
            description="Designed to retain moisture and cool body temperature. Popular with athletes and outdoor workers.",
            retail_price=PriceRange(12.00, 25.00),
            supplier_cost=PriceRange(2.00, 5.00),
            profit_margin=ProfitabilityRating.VERY_HIGH,
            trending_score=75,
            target_audience="Athletes, fitness enthusiasts, outdoor workers, sports parents",
            selling_points=[
                "Instant relief demonstration",
                "Low cost, high margin",
                "Lightweight shipping",
                "Multi-pack potential",
                "Sports team bulk orders"
            ],
            competition_level="Medium",
            recommendation="EXCELLENT MARGINS - Easy to demo, impulse buy price point. Bundle with other cooling products.",
            suppliers=[
                Supplier(
                    name="Ningbo Textile Co.",
                    platform="Alibaba",
                    url="https://www.alibaba.com/product-detail/Cooling-Towel_1600xxx.html",
                    price_range=PriceRange(2.00, 3.00),
                    moq=100,
                    shipping_time="10-18 days",
                    rating=4.6,
                    verified=True
                ),
                Supplier(
                    name="Sports Cooling Direct",
                    platform="Doba",
                    url="https://www.doba.com/cooling-towel",
                    price_range=PriceRange(4.00, 5.00),
                    moq=1,
                    shipping_time="3-7 days",
                    rating=4.4,
                    verified=True
                ),
            ],
            facebook_ads=FacebookAdInsight(
                ad_active=True,
                estimated_spend="$1,000-5,000/month",
                ad_duration_days=90,
                engagement_level="Medium",
                platforms=["Facebook", "Instagram"],
                call_to_action="Shop Now",
                notes="Demo videos showing instant cooling effect. Target sports, fitness, construction interests."
            )
        ),

        # 9. Barrel Leg Jeans
        ViralProduct(
            name="Barrel Leg Jeans",
            category=ProductCategory.FASHION,
            description="The next big fashion trend - high-waisted, ultra-relaxed through thigh with '80s/'90s vibes.",
            retail_price=PriceRange(45.00, 85.00),
            supplier_cost=PriceRange(15.00, 30.00),
            profit_margin=ProfitabilityRating.HIGH,
            trending_score=85,
            target_audience="Fashion-forward women 18-35, vintage fashion lovers",
            selling_points=[
                "Trending fashion item",
                "Retro nostalgia appeal",
                "Instagram/TikTok viral potential",
                "Multiple washes/styles",
                "Seasonal but ongoing"
            ],
            competition_level="Medium",
            recommendation="FASHION TREND - Ride the wave while trending. Focus on quality and fit guides.",
            suppliers=[
                Supplier(
                    name="Guangzhou Denim Factory",
                    platform="Alibaba",
                    url="https://www.alibaba.com/product-detail/Barrel-Leg-Jeans_1600xxx.html",
                    price_range=PriceRange(15.00, 22.00),
                    moq=30,
                    shipping_time="15-25 days",
                    rating=4.4,
                    verified=True
                ),
                Supplier(
                    name="Fashion Denim Direct",
                    platform="AliExpress",
                    url="https://www.aliexpress.com/item/Barrel-Jeans.html",
                    price_range=PriceRange(20.00, 30.00),
                    moq=1,
                    shipping_time="12-20 days",
                    rating=4.2,
                    verified=False
                ),
            ],
            facebook_ads=FacebookAdInsight(
                ad_active=True,
                estimated_spend="$5,000-25,000/month",
                ad_duration_days=60,
                engagement_level="High",
                platforms=["Facebook", "Instagram", "TikTok"],
                call_to_action="Shop Now",
                notes="Outfit styling videos, try-on hauls perform best. Target fashion interests."
            )
        ),

        # 10. Roulette Watch
        ViralProduct(
            name="Roulette Watch (Las Vegas Dial)",
            category=ProductCategory.ACCESSORIES,
            description="Unique watch with Las Vegas roulette dial. Viral fashion accessory for fashion-forward shoppers.",
            retail_price=PriceRange(35.00, 65.00),
            supplier_cost=PriceRange(8.00, 18.00),
            profit_margin=ProfitabilityRating.HIGH,
            trending_score=80,
            target_audience="Fashion-forward adults 21-40, casino/gambling enthusiasts, unique gift seekers",
            selling_points=[
                "Unique conversation starter",
                "Perfect gift item",
                "Vegas/gambling niche appeal",
                "Instagram-worthy",
                "Low shipping cost"
            ],
            competition_level="Low",
            recommendation="NICHE OPPORTUNITY - Low competition, unique product. Great for gifting seasons.",
            suppliers=[
                Supplier(
                    name="Shenzhen Watch Factory",
                    platform="Alibaba",
                    url="https://www.alibaba.com/product-detail/Roulette-Watch_1600xxx.html",
                    price_range=PriceRange(8.00, 12.00),
                    moq=20,
                    shipping_time="10-18 days",
                    rating=4.5,
                    verified=True
                ),
                Supplier(
                    name="Novelty Watch Store",
                    platform="AliExpress",
                    url="https://www.aliexpress.com/item/Roulette-Watch.html",
                    price_range=PriceRange(12.00, 18.00),
                    moq=1,
                    shipping_time="15-25 days",
                    rating=4.3,
                    verified=False
                ),
            ],
            facebook_ads=FacebookAdInsight(
                ad_active=True,
                estimated_spend="$2,000-8,000/month",
                ad_duration_days=45,
                engagement_level="High",
                platforms=["Facebook", "Instagram"],
                call_to_action="Shop Now",
                notes="Product showcase videos work well. Target Vegas trip planners, poker/casino interests."
            )
        ),

        # 11. Beauty Facial Device (LED Mask)
        ViralProduct(
            name="LED Face Mask (Beauty Device)",
            category=ProductCategory.BEAUTY_SKINCARE,
            description="At-home facial device with LED light therapy. High perceived value, strong margins.",
            retail_price=PriceRange(40.00, 80.00),
            supplier_cost=PriceRange(10.00, 25.00),
            profit_margin=ProfitabilityRating.HIGH,
            trending_score=88,
            target_audience="Women 25-50, skincare enthusiasts, at-home spa lovers",
            selling_points=[
                "High perceived value",
                "At-home spa trend",
                "Visible results content",
                "Gift potential",
                "Upsell with serums"
            ],
            competition_level="High",
            recommendation="PROVEN WINNER - 40%+ margins, strong demand. Quality differentiation key.",
            suppliers=[
                Supplier(
                    name="Shenzhen Beauty Tech",
                    platform="Alibaba",
                    url="https://www.alibaba.com/product-detail/LED-Face-Mask_1600xxx.html",
                    price_range=PriceRange(10.00, 18.00),
                    moq=20,
                    shipping_time="10-18 days",
                    rating=4.6,
                    verified=True
                ),
                Supplier(
                    name="Beauty Device Wholesale",
                    platform="DHgate",
                    url="https://www.dhgate.com/led-mask",
                    price_range=PriceRange(15.00, 25.00),
                    moq=1,
                    shipping_time="12-22 days",
                    rating=4.4,
                    verified=True
                ),
            ],
            facebook_ads=FacebookAdInsight(
                ad_active=True,
                estimated_spend="$10,000-40,000/month",
                ad_duration_days=180,
                engagement_level="Very High",
                platforms=["Facebook", "Instagram", "TikTok"],
                call_to_action="Shop Now",
                notes="Before/after transformation content. UGC and influencer partnerships dominate."
            )
        ),

        # 12. Pool Float (Unique/Novelty Design)
        ViralProduct(
            name="Novelty Pool Float",
            category=ProductCategory.BEACH_OUTDOOR,
            description="Unique, Instagram-worthy pool floats. Summer viral essential for social media content.",
            retail_price=PriceRange(25.00, 55.00),
            supplier_cost=PriceRange(8.00, 18.00),
            profit_margin=ProfitabilityRating.HIGH,
            trending_score=82,
            target_audience="Young adults 18-35, pool owners, vacation goers, social media users",
            selling_points=[
                "Highly shareable/viral",
                "Seasonal demand spike",
                "Great photo opportunity",
                "Party essential",
                "Gift potential"
            ],
            competition_level="Medium",
            recommendation="SEASONAL PEAK - Plan inventory for May-August. Unique designs differentiate.",
            suppliers=[
                Supplier(
                    name="Yiwu Pool Products",
                    platform="Alibaba",
                    url="https://www.alibaba.com/product-detail/Pool-Float_1600xxx.html",
                    price_range=PriceRange(8.00, 12.00),
                    moq=30,
                    shipping_time="15-25 days",
                    rating=4.4,
                    verified=True
                ),
                Supplier(
                    name="Summer Fun Direct",
                    platform="AliExpress",
                    url="https://www.aliexpress.com/item/Pool-Float.html",
                    price_range=PriceRange(12.00, 18.00),
                    moq=1,
                    shipping_time="18-30 days",
                    rating=4.2,
                    verified=False
                ),
            ],
            facebook_ads=FacebookAdInsight(
                ad_active=True,
                estimated_spend="$5,000-20,000/month",
                ad_duration_days=90,
                engagement_level="High",
                platforms=["Facebook", "Instagram", "TikTok"],
                call_to_action="Shop Now",
                notes="Lifestyle content at pools/beaches. Target travel, summer party, pool owner interests."
            )
        ),
    ]

    return products


def get_products_by_category(category: ProductCategory) -> list:
    """Filter products by category."""
    return [p for p in get_viral_summer_products() if p.category == category]


def get_products_by_profit_margin(min_margin: ProfitabilityRating) -> list:
    """Filter products by minimum profit margin rating."""
    margin_order = [
        ProfitabilityRating.LOW,
        ProfitabilityRating.MEDIUM,
        ProfitabilityRating.HIGH,
        ProfitabilityRating.VERY_HIGH
    ]
    min_index = margin_order.index(min_margin)
    return [
        p for p in get_viral_summer_products()
        if margin_order.index(p.profit_margin) >= min_index
    ]


def get_top_trending_products(limit: int = 5) -> list:
    """Get top trending products by score."""
    products = get_viral_summer_products()
    return sorted(products, key=lambda x: x.trending_score, reverse=True)[:limit]


def search_products(query: str) -> list:
    """Search products by name or description."""
    query = query.lower()
    return [
        p for p in get_viral_summer_products()
        if query in p.name.lower() or query in p.description.lower()
    ]
