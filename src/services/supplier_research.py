"""
Supplier Research Service
Provides tools and information for finding and evaluating product suppliers.
"""
from dataclasses import dataclass
from typing import Optional


@dataclass
class SupplierPlatform:
    name: str
    url: str
    platform_type: str  # wholesale, retail, dropship
    moq_typical: str
    shipping_time: str
    best_for: list
    pros: list
    cons: list
    tips: list


# Major supplier platforms database
SUPPLIER_PLATFORMS = {
    "alibaba": SupplierPlatform(
        name="Alibaba",
        url="https://www.alibaba.com",
        platform_type="wholesale",
        moq_typical="10-1000+ units",
        shipping_time="7-35 days (sea), 3-10 days (air)",
        best_for=[
            "Bulk orders",
            "Private labeling",
            "Custom products",
            "Building supplier relationships"
        ],
        pros=[
            "Lowest per-unit costs",
            "Direct manufacturer access",
            "Custom branding options",
            "Trade Assurance protection",
            "Verified supplier badges"
        ],
        cons=[
            "High MOQ requirements",
            "Longer lead times",
            "Quality varies widely",
            "Communication challenges",
            "Upfront capital required"
        ],
        tips=[
            "Always use Trade Assurance for payment protection",
            "Request samples before bulk orders",
            "Verify supplier with video call",
            "Get multiple quotes (at least 3-5 suppliers)",
            "Negotiate - first price is never final",
            "Check supplier response time and communication quality"
        ]
    ),

    "aliexpress": SupplierPlatform(
        name="AliExpress",
        url="https://www.aliexpress.com",
        platform_type="retail/dropship",
        moq_typical="1 unit",
        shipping_time="15-45 days (standard), 7-15 days (premium)",
        best_for=[
            "Product testing",
            "Dropshipping",
            "Small orders",
            "Beginners"
        ],
        pros=[
            "No MOQ - buy single items",
            "Buyer protection program",
            "Easy to use platform",
            "Great for testing products",
            "Dropshipping friendly"
        ],
        cons=[
            "Higher per-unit costs than Alibaba",
            "Longer shipping times",
            "Less customization options",
            "Quality inconsistency"
        ],
        tips=[
            "Check seller rating and reviews carefully",
            "Look for 'Top Brands' and high transaction counts",
            "Use for testing before moving to Alibaba",
            "Factor in shipping time for customer expectations",
            "Consider ePacket or AliExpress Premium shipping"
        ]
    ),

    "dhgate": SupplierPlatform(
        name="DHgate",
        url="https://www.dhgate.com",
        platform_type="wholesale/retail",
        moq_typical="1-10 units",
        shipping_time="10-30 days",
        best_for=[
            "Single piece at wholesale prices",
            "Testing products",
            "Medium volume orders"
        ],
        pros=[
            "Buy single items at near-wholesale prices",
            "Competitive pricing",
            "Buyer protection",
            "Good for mid-size orders"
        ],
        cons=[
            "Quality can be inconsistent",
            "Longer shipping times",
            "Limited customization"
        ],
        tips=[
            "Check seller tier and reviews",
            "Use DHgate coupons for savings",
            "Great middle ground between Alibaba and AliExpress"
        ]
    ),

    "doba": SupplierPlatform(
        name="Doba",
        url="https://www.doba.com",
        platform_type="dropship",
        moq_typical="1 unit",
        shipping_time="3-7 days (US-based)",
        best_for=[
            "US-based dropshipping",
            "Fast shipping",
            "No inventory management"
        ],
        pros=[
            "US-based suppliers",
            "Fast domestic shipping",
            "Pre-vetted suppliers",
            "Easy integration with ecommerce platforms",
            "No MOQ"
        ],
        cons=[
            "Higher costs than China suppliers",
            "Subscription fee required",
            "Smaller product selection"
        ],
        tips=[
            "Great for US customers wanting fast shipping",
            "Higher margins possible with faster delivery promise",
            "Good for testing products before bulk ordering from China"
        ]
    ),

    "salehoo": SupplierPlatform(
        name="SaleHoo",
        url="https://www.salehoo.com",
        platform_type="supplier directory",
        moq_typical="Varies by supplier",
        shipping_time="Varies",
        best_for=[
            "Finding verified suppliers",
            "Market research",
            "Wholesale directories"
        ],
        pros=[
            "Pre-vetted supplier directory",
            "Market research tools",
            "Training and support",
            "Low-risk suppliers"
        ],
        cons=[
            "Annual membership fee",
            "Still need to contact suppliers individually"
        ],
        tips=[
            "Use for finding reliable US/UK/AU suppliers",
            "Leverage their research tools for product validation"
        ]
    ),

    "cjdropshipping": SupplierPlatform(
        name="CJ Dropshipping",
        url="https://www.cjdropshipping.com",
        platform_type="dropship",
        moq_typical="1 unit",
        shipping_time="8-20 days (CJ Packet), 3-7 days (US warehouse)",
        best_for=[
            "Dropshipping automation",
            "Product sourcing",
            "Print on demand"
        ],
        pros=[
            "Free to join",
            "Product sourcing service",
            "US/EU warehouses available",
            "Shopify/WooCommerce integration",
            "Quality inspection service"
        ],
        cons=[
            "Prices higher than direct Alibaba",
            "Some products out of stock",
            "Service quality varies"
        ],
        tips=[
            "Use US warehouse for faster shipping",
            "Request product sourcing for items not in catalog",
            "Great for beginners"
        ]
    ),

    "global_sources": SupplierPlatform(
        name="Global Sources",
        url="https://www.globalsources.com",
        platform_type="wholesale",
        moq_typical="50-500+ units",
        shipping_time="15-35 days",
        best_for=[
            "Verified manufacturers",
            "Trade shows",
            "Electronics sourcing"
        ],
        pros=[
            "Verified manufacturers only",
            "Quality trade show exhibitions",
            "Good for electronics",
            "Professional B2B platform"
        ],
        cons=[
            "Higher MOQs",
            "Less beginner-friendly",
            "Smaller supplier base than Alibaba"
        ],
        tips=[
            "Great for finding actual manufacturers (not traders)",
            "Attend their trade shows if possible"
        ]
    ),
}


def get_platform_info(platform_name: str) -> Optional[SupplierPlatform]:
    """Get detailed information about a supplier platform."""
    return SUPPLIER_PLATFORMS.get(platform_name.lower())


def get_all_platforms() -> dict:
    """Get all supplier platform information."""
    return SUPPLIER_PLATFORMS


def get_platforms_by_type(platform_type: str) -> list:
    """Get platforms by type (wholesale, dropship, etc.)."""
    return [
        p for p in SUPPLIER_PLATFORMS.values()
        if platform_type.lower() in p.platform_type.lower()
    ]


def calculate_landed_cost(
    product_cost: float,
    shipping_cost: float,
    quantity: int = 1,
    customs_rate: float = 0.0,
    other_fees: float = 0.0
) -> dict:
    """
    Calculate the total landed cost of products including all fees.
    """
    subtotal = product_cost * quantity
    shipping_total = shipping_cost
    customs_fees = subtotal * (customs_rate / 100)
    total_cost = subtotal + shipping_total + customs_fees + other_fees
    cost_per_unit = total_cost / quantity

    return {
        "product_subtotal": round(subtotal, 2),
        "shipping_cost": round(shipping_total, 2),
        "customs_fees": round(customs_fees, 2),
        "other_fees": round(other_fees, 2),
        "total_landed_cost": round(total_cost, 2),
        "cost_per_unit": round(cost_per_unit, 2),
        "quantity": quantity
    }


def supplier_evaluation_checklist() -> list:
    """Returns a checklist for evaluating suppliers."""
    return [
        {
            "category": "Verification",
            "items": [
                "Is the supplier verified/certified on the platform?",
                "Have you conducted a video call with the supplier?",
                "Have you verified their business license?",
                "Have you checked their trade history and transaction count?"
            ]
        },
        {
            "category": "Communication",
            "items": [
                "Response time under 24 hours?",
                "Clear communication in English?",
                "Willing to answer detailed questions?",
                "Professional and organized?"
            ]
        },
        {
            "category": "Product Quality",
            "items": [
                "Have you ordered samples?",
                "Does sample quality match listing photos?",
                "Are materials as described?",
                "Does packaging meet your standards?"
            ]
        },
        {
            "category": "Pricing & Terms",
            "items": [
                "Is pricing competitive (compared 3+ suppliers)?",
                "Are payment terms clear (Trade Assurance, etc.)?",
                "Are MOQ requirements acceptable?",
                "Have you negotiated the price?"
            ]
        },
        {
            "category": "Logistics",
            "items": [
                "Clear shipping options and costs?",
                "Realistic lead times?",
                "Experience shipping to your target market?",
                "Customs/duty information provided?"
            ]
        },
        {
            "category": "Scalability",
            "items": [
                "Can they handle increased order volumes?",
                "Production capacity meets your growth plans?",
                "Willing to do private labeling/custom packaging?",
                "Long-term partnership potential?"
            ]
        }
    ]


def get_negotiation_tips() -> list:
    """Returns tips for negotiating with suppliers."""
    return [
        "Never accept the first price - always negotiate",
        "Get quotes from at least 3-5 suppliers for leverage",
        "Ask about discounts for larger quantities",
        "Inquire about payment terms (30% deposit common)",
        "Request free samples or pay only shipping",
        "Negotiate shipping costs - they often have margins here",
        "Ask about seasonal discounts or promotions",
        "Build relationship first, then negotiate better terms",
        "Be professional and respectful - relationships matter",
        "Consider long-term partnership value, not just price"
    ]
