"""
Product data models for viral summer products research.
"""
from dataclasses import dataclass, field
from typing import Optional
from enum import Enum


class ProductCategory(Enum):
    BEACH_OUTDOOR = "Beach & Outdoor"
    HEALTH_WELLNESS = "Health & Wellness"
    BEAUTY_SKINCARE = "Beauty & Skincare"
    FASHION = "Fashion"
    HOME_LIVING = "Home & Living"
    COOLING_PRODUCTS = "Cooling Products"
    ACCESSORIES = "Accessories"
    ELECTRONICS = "Electronics"


class ProfitabilityRating(Enum):
    LOW = "Low (15-30%)"
    MEDIUM = "Medium (30-50%)"
    HIGH = "High (50-75%)"
    VERY_HIGH = "Very High (75%+)"


@dataclass
class PriceRange:
    min_price: float
    max_price: float
    currency: str = "USD"

    def __str__(self):
        return f"${self.min_price:.2f} - ${self.max_price:.2f}"

    def average(self) -> float:
        return (self.min_price + self.max_price) / 2


@dataclass
class Supplier:
    name: str
    platform: str  # Alibaba, AliExpress, DHgate, etc.
    url: str
    price_range: PriceRange
    moq: int = 1  # Minimum Order Quantity
    shipping_time: str = "7-21 days"
    rating: float = 0.0
    verified: bool = False

    def __str__(self):
        verified_str = " [Verified]" if self.verified else ""
        return f"{self.name} ({self.platform}){verified_str} - {self.price_range}"


@dataclass
class FacebookAdInsight:
    ad_active: bool = False
    estimated_spend: str = ""
    ad_duration_days: int = 0
    engagement_level: str = ""  # Low, Medium, High
    platforms: list = field(default_factory=lambda: ["Facebook", "Instagram"])
    call_to_action: str = "Shop Now"
    notes: str = ""


@dataclass
class ViralProduct:
    name: str
    category: ProductCategory
    description: str
    retail_price: PriceRange
    supplier_cost: PriceRange
    profit_margin: ProfitabilityRating
    suppliers: list = field(default_factory=list)
    facebook_ads: Optional[FacebookAdInsight] = None
    trending_score: int = 0  # 1-100
    seasonality: str = "Summer"
    target_audience: str = ""
    selling_points: list = field(default_factory=list)
    competition_level: str = "Medium"
    recommendation: str = ""

    def calculate_profit_margin_percentage(self) -> tuple:
        """Calculate actual profit margin percentage range."""
        min_margin = ((self.retail_price.min_price - self.supplier_cost.max_price)
                      / self.retail_price.min_price) * 100
        max_margin = ((self.retail_price.max_price - self.supplier_cost.min_price)
                      / self.retail_price.max_price) * 100
        return (round(min_margin, 1), round(max_margin, 1))

    def calculate_profit_per_unit(self) -> tuple:
        """Calculate profit per unit range."""
        min_profit = self.retail_price.min_price - self.supplier_cost.max_price
        max_profit = self.retail_price.max_price - self.supplier_cost.min_price
        return (round(min_profit, 2), round(max_profit, 2))
