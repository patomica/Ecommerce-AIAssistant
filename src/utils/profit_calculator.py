"""
Profit Margin Calculator
Tools for calculating profitability and ROI for ecommerce products.
"""
from dataclasses import dataclass
from typing import Optional


@dataclass
class ProfitAnalysis:
    """Complete profit analysis for a product."""
    product_cost: float
    selling_price: float
    shipping_cost_to_customer: float
    platform_fees: float
    payment_processing_fees: float
    ad_cost_per_sale: float
    other_costs: float

    @property
    def total_costs(self) -> float:
        return (
            self.product_cost +
            self.shipping_cost_to_customer +
            self.platform_fees +
            self.payment_processing_fees +
            self.ad_cost_per_sale +
            self.other_costs
        )

    @property
    def gross_profit(self) -> float:
        return self.selling_price - self.product_cost

    @property
    def net_profit(self) -> float:
        return self.selling_price - self.total_costs

    @property
    def gross_margin_percent(self) -> float:
        if self.selling_price == 0:
            return 0
        return (self.gross_profit / self.selling_price) * 100

    @property
    def net_margin_percent(self) -> float:
        if self.selling_price == 0:
            return 0
        return (self.net_profit / self.selling_price) * 100

    @property
    def roi_percent(self) -> float:
        if self.total_costs == 0:
            return 0
        return (self.net_profit / self.total_costs) * 100

    def to_dict(self) -> dict:
        return {
            "selling_price": round(self.selling_price, 2),
            "product_cost": round(self.product_cost, 2),
            "shipping_cost": round(self.shipping_cost_to_customer, 2),
            "platform_fees": round(self.platform_fees, 2),
            "payment_fees": round(self.payment_processing_fees, 2),
            "ad_cost_per_sale": round(self.ad_cost_per_sale, 2),
            "other_costs": round(self.other_costs, 2),
            "total_costs": round(self.total_costs, 2),
            "gross_profit": round(self.gross_profit, 2),
            "net_profit": round(self.net_profit, 2),
            "gross_margin_%": round(self.gross_margin_percent, 1),
            "net_margin_%": round(self.net_margin_percent, 1),
            "roi_%": round(self.roi_percent, 1)
        }


def calculate_profit(
    selling_price: float,
    product_cost: float,
    shipping_cost: float = 0.0,
    platform_fee_percent: float = 0.0,
    payment_fee_percent: float = 2.9,
    payment_fee_fixed: float = 0.30,
    ad_cost_per_sale: float = 0.0,
    other_costs: float = 0.0
) -> ProfitAnalysis:
    """
    Calculate complete profit analysis for a product.

    Args:
        selling_price: Price you sell the product for
        product_cost: Cost to acquire the product (including shipping to you)
        shipping_cost: Cost to ship to customer (if not included in selling price)
        platform_fee_percent: Platform fees (e.g., Shopify, Amazon)
        payment_fee_percent: Payment processing % (default 2.9% for Stripe/PayPal)
        payment_fee_fixed: Fixed payment fee (default $0.30)
        ad_cost_per_sale: Estimated advertising cost per sale
        other_costs: Any other per-unit costs

    Returns:
        ProfitAnalysis object with all calculations
    """
    platform_fees = selling_price * (platform_fee_percent / 100)
    payment_fees = (selling_price * (payment_fee_percent / 100)) + payment_fee_fixed

    return ProfitAnalysis(
        product_cost=product_cost,
        selling_price=selling_price,
        shipping_cost_to_customer=shipping_cost,
        platform_fees=platform_fees,
        payment_processing_fees=payment_fees,
        ad_cost_per_sale=ad_cost_per_sale,
        other_costs=other_costs
    )


def calculate_break_even_price(
    product_cost: float,
    shipping_cost: float = 0.0,
    platform_fee_percent: float = 0.0,
    payment_fee_percent: float = 2.9,
    payment_fee_fixed: float = 0.30,
    target_margin_percent: float = 0.0
) -> float:
    """
    Calculate the minimum selling price to break even or hit target margin.

    Args:
        product_cost: Cost to acquire the product
        shipping_cost: Cost to ship to customer
        platform_fee_percent: Platform fees percentage
        payment_fee_percent: Payment processing percentage
        payment_fee_fixed: Fixed payment fee
        target_margin_percent: Target profit margin (0 for break-even)

    Returns:
        Minimum selling price
    """
    # Total fixed costs per unit
    fixed_costs = product_cost + shipping_cost + payment_fee_fixed

    # Combined percentage deductions
    percentage_deductions = (platform_fee_percent + payment_fee_percent) / 100

    # Add target margin to percentage
    target_factor = (100 - target_margin_percent) / 100

    # Calculate price
    # Price = Fixed Costs / (Target Factor - Percentage Deductions)
    denominator = target_factor - percentage_deductions
    if denominator <= 0:
        return float('inf')  # Not achievable

    return fixed_costs / denominator


def calculate_roas(
    revenue: float,
    ad_spend: float
) -> dict:
    """
    Calculate Return on Ad Spend (ROAS).

    Args:
        revenue: Total revenue generated from ads
        ad_spend: Total amount spent on advertising

    Returns:
        Dict with ROAS calculations
    """
    if ad_spend == 0:
        return {"roas": float('inf'), "roas_formatted": "N/A"}

    roas = revenue / ad_spend

    return {
        "roas": round(roas, 2),
        "roas_formatted": f"{roas:.2f}x",
        "revenue": round(revenue, 2),
        "ad_spend": round(ad_spend, 2),
        "profit_from_ads": round(revenue - ad_spend, 2),
        "interpretation": get_roas_interpretation(roas)
    }


def get_roas_interpretation(roas: float) -> str:
    """Get interpretation of ROAS value."""
    if roas < 1:
        return "Losing money on ads - need to optimize or pause"
    elif roas < 2:
        return "Marginal - may be losing money after other costs"
    elif roas < 3:
        return "Acceptable - likely profitable depending on margins"
    elif roas < 4:
        return "Good - healthy return on ad spend"
    elif roas < 6:
        return "Very Good - strong performance"
    else:
        return "Excellent - exceptional ad performance"


def calculate_cpa_target(
    selling_price: float,
    product_cost: float,
    target_profit: float,
    other_costs: float = 0.0
) -> dict:
    """
    Calculate target Cost Per Acquisition for Facebook Ads.

    Args:
        selling_price: Price you sell the product for
        product_cost: Cost to acquire the product
        target_profit: Desired profit per sale
        other_costs: Other per-unit costs

    Returns:
        Dict with CPA target and recommendations
    """
    max_cpa = selling_price - product_cost - target_profit - other_costs

    return {
        "max_cpa": round(max_cpa, 2),
        "selling_price": round(selling_price, 2),
        "product_cost": round(product_cost, 2),
        "target_profit": round(target_profit, 2),
        "other_costs": round(other_costs, 2),
        "recommendation": get_cpa_recommendation(max_cpa, selling_price)
    }


def get_cpa_recommendation(max_cpa: float, selling_price: float) -> str:
    """Get recommendation based on CPA target."""
    if max_cpa <= 0:
        return "Warning: No room for ad spend. Reduce costs or increase price."
    elif max_cpa < 5:
        return "Challenging: Very tight ad budget. Focus on organic traffic."
    elif max_cpa < 15:
        return "Moderate: Achievable with optimized campaigns."
    elif max_cpa < 30:
        return "Good: Healthy room for testing and scaling."
    else:
        return "Excellent: Strong margins allow aggressive ad spend."


def bulk_product_analysis(products: list) -> list:
    """
    Analyze multiple products and rank by profitability.

    Args:
        products: List of dicts with product data

    Returns:
        List of analysis results sorted by net margin
    """
    results = []
    for product in products:
        analysis = calculate_profit(
            selling_price=product.get('selling_price', 0),
            product_cost=product.get('product_cost', 0),
            shipping_cost=product.get('shipping_cost', 0),
            platform_fee_percent=product.get('platform_fee', 0),
            ad_cost_per_sale=product.get('ad_cost', 0)
        )
        results.append({
            'name': product.get('name', 'Unknown'),
            'analysis': analysis.to_dict()
        })

    # Sort by net margin
    results.sort(key=lambda x: x['analysis']['net_margin_%'], reverse=True)
    return results


# Common platform fee structures
PLATFORM_FEES = {
    "shopify": {
        "name": "Shopify",
        "monthly_fee": "$29-$299/month",
        "transaction_fee": "0% (with Shopify Payments)",
        "payment_processing": "2.9% + $0.30"
    },
    "amazon": {
        "name": "Amazon FBA",
        "monthly_fee": "$39.99/month (Professional)",
        "referral_fee": "8-15% (category dependent)",
        "fba_fees": "Varies by size/weight"
    },
    "ebay": {
        "name": "eBay",
        "monthly_fee": "$0 (up to 250 listings)",
        "final_value_fee": "12.9% + $0.30",
        "payment_processing": "Included"
    },
    "etsy": {
        "name": "Etsy",
        "listing_fee": "$0.20 per listing",
        "transaction_fee": "6.5%",
        "payment_processing": "3% + $0.25"
    },
    "woocommerce": {
        "name": "WooCommerce",
        "monthly_fee": "$0 (self-hosted)",
        "transaction_fee": "0%",
        "payment_processing": "2.9% + $0.30 (Stripe)"
    }
}


def get_platform_fees(platform: str) -> Optional[dict]:
    """Get fee structure for a specific platform."""
    return PLATFORM_FEES.get(platform.lower())


def get_all_platform_fees() -> dict:
    """Get all platform fee structures."""
    return PLATFORM_FEES
