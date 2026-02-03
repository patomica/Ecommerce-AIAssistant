#!/usr/bin/env python3
"""
Viral Summer Products Research Tool
====================================
A comprehensive tool for researching viral products, suppliers, and Facebook Ads
for ecommerce/dropshipping businesses.

Usage:
    python main.py                    # Run interactive menu
    python main.py --products         # List all viral products
    python main.py --top              # Show top trending products
    python main.py --suppliers        # Show supplier platforms
    python main.py --facebook         # Show Facebook Ads research methods
    python main.py --calculate        # Run profit calculator
    python main.py --export           # Export all research data
"""

import argparse
import json
import sys
from datetime import datetime

# Add src to path for imports
sys.path.insert(0, '.')

from src.models import (
    ProductCategory, ProfitabilityRating, PriceRange,
    ViralProduct
)
from src.data import (
    get_viral_summer_products,
    get_products_by_category,
    get_products_by_profit_margin,
    get_top_trending_products,
    search_products
)
from src.services import (
    get_all_platforms,
    get_platform_info,
    supplier_evaluation_checklist,
    get_negotiation_tips,
    calculate_landed_cost,
    get_all_research_methods,
    winning_ad_signals,
    ad_creative_best_practices,
    meta_ad_library_search_tips
)
from src.utils import (
    calculate_profit,
    calculate_break_even_price,
    calculate_cpa_target,
    get_all_platform_fees
)


def print_header(title: str):
    """Print a formatted header."""
    print("\n" + "=" * 70)
    print(f"  {title}")
    print("=" * 70)


def print_section(title: str):
    """Print a section header."""
    print(f"\n--- {title} ---\n")


def display_product(product: ViralProduct, detailed: bool = True):
    """Display a single product's information."""
    margin_range = product.calculate_profit_margin_percentage()
    profit_range = product.calculate_profit_per_unit()

    print(f"\n{'='*60}")
    print(f"  {product.name}")
    print(f"{'='*60}")
    print(f"  Category:        {product.category.value}")
    print(f"  Trending Score:  {product.trending_score}/100")
    print(f"  Profit Rating:   {product.profit_margin.value}")
    print(f"  Competition:     {product.competition_level}")
    print(f"\n  Description:")
    print(f"    {product.description}")

    print(f"\n  PRICING:")
    print(f"    Retail Price:    {product.retail_price}")
    print(f"    Supplier Cost:   {product.supplier_cost}")
    print(f"    Profit/Unit:     ${profit_range[0]:.2f} - ${profit_range[1]:.2f}")
    print(f"    Margin:          {margin_range[0]}% - {margin_range[1]}%")

    if detailed and product.suppliers:
        print(f"\n  SUPPLIERS ({len(product.suppliers)}):")
        for supplier in product.suppliers:
            verified = "[VERIFIED]" if supplier.verified else ""
            print(f"    - {supplier.name} ({supplier.platform}) {verified}")
            print(f"      Price: {supplier.price_range} | MOQ: {supplier.moq} | Shipping: {supplier.shipping_time}")

    if detailed and product.facebook_ads:
        fb = product.facebook_ads
        print(f"\n  FACEBOOK ADS INSIGHT:")
        print(f"    Active Ads:       {'Yes' if fb.ad_active else 'No'}")
        print(f"    Est. Spend:       {fb.estimated_spend}")
        print(f"    Ad Duration:      {fb.ad_duration_days} days")
        print(f"    Engagement:       {fb.engagement_level}")
        print(f"    Platforms:        {', '.join(fb.platforms)}")
        if fb.notes:
            print(f"    Notes:            {fb.notes}")

    if detailed and product.selling_points:
        print(f"\n  SELLING POINTS:")
        for point in product.selling_points:
            print(f"    - {point}")

    print(f"\n  TARGET AUDIENCE: {product.target_audience}")
    print(f"\n  RECOMMENDATION: {product.recommendation}")


def display_all_products():
    """Display all viral products."""
    products = get_viral_summer_products()
    print_header(f"VIRAL SUMMER PRODUCTS 2026 ({len(products)} products)")

    for product in products:
        display_product(product, detailed=True)

    print(f"\n{'='*70}")
    print(f"  Total Products: {len(products)}")
    print(f"{'='*70}\n")


def display_top_products(limit: int = 5):
    """Display top trending products."""
    products = get_top_trending_products(limit)
    print_header(f"TOP {limit} TRENDING SUMMER PRODUCTS")

    for i, product in enumerate(products, 1):
        margin_range = product.calculate_profit_margin_percentage()
        print(f"\n{i}. {product.name}")
        print(f"   Trending Score: {product.trending_score}/100")
        print(f"   Category: {product.category.value}")
        print(f"   Margin: {margin_range[0]}% - {margin_range[1]}%")
        print(f"   Retail: {product.retail_price} | Cost: {product.supplier_cost}")
        print(f"   Recommendation: {product.recommendation}")


def display_products_by_category():
    """Display products organized by category."""
    print_header("PRODUCTS BY CATEGORY")

    for category in ProductCategory:
        products = get_products_by_category(category)
        if products:
            print(f"\n{category.value} ({len(products)} products):")
            for product in products:
                margin = product.calculate_profit_margin_percentage()
                print(f"  - {product.name} (Score: {product.trending_score}, Margin: {margin[0]}-{margin[1]}%)")


def display_supplier_platforms():
    """Display all supplier platform information."""
    platforms = get_all_platforms()
    print_header("SUPPLIER PLATFORMS GUIDE")

    for name, platform in platforms.items():
        print(f"\n{'='*50}")
        print(f"  {platform.name}")
        print(f"{'='*50}")
        print(f"  URL: {platform.url}")
        print(f"  Type: {platform.platform_type}")
        print(f"  Typical MOQ: {platform.moq_typical}")
        print(f"  Shipping: {platform.shipping_time}")

        print(f"\n  Best For:")
        for item in platform.best_for:
            print(f"    - {item}")

        print(f"\n  Pros:")
        for item in platform.pros:
            print(f"    + {item}")

        print(f"\n  Cons:")
        for item in platform.cons:
            print(f"    - {item}")

        print(f"\n  Tips:")
        for tip in platform.tips:
            print(f"    * {tip}")


def display_facebook_ads_research():
    """Display Facebook Ads research methods and tips."""
    methods = get_all_research_methods()
    print_header("FACEBOOK ADS RESEARCH GUIDE")

    for name, method in methods.items():
        print(f"\n{'='*50}")
        print(f"  {method.name}")
        print(f"  Cost: {method.cost}")
        print(f"{'='*50}")
        print(f"\n  {method.description}")

        print(f"\n  Steps:")
        for i, step in enumerate(method.steps, 1):
            print(f"    {i}. {step}")

        print(f"\n  Pros:")
        for pro in method.pros:
            print(f"    + {pro}")

        print(f"\n  Cons:")
        for con in method.cons:
            print(f"    - {con}")

    print_section("WINNING AD SIGNALS")
    for signal in winning_ad_signals():
        print(f"\n  {signal['signal']} [{signal['importance']} importance]")
        print(f"    {signal['description']}")
        print(f"    How to check: {signal['how_to_check']}")

    print_section("META AD LIBRARY SEARCH TIPS")
    for tip in meta_ad_library_search_tips():
        print(f"  - {tip}")

    print_section("AD CREATIVE BEST PRACTICES")
    practices = ad_creative_best_practices()

    print("\n  Video Ads:")
    print(f"    Optimal length: {practices['video_ads']['optimal_length']}")
    print(f"    Format: {practices['video_ads']['format']}")
    for tip in practices['video_ads']['tips']:
        print(f"      - {tip}")

    print("\n  2026 Trends:")
    for trend in practices['2026_trends']:
        print(f"    - {trend}")


def run_profit_calculator():
    """Interactive profit calculator."""
    print_header("PROFIT MARGIN CALCULATOR")

    print("\nEnter product details (press Enter for defaults):\n")

    try:
        selling_price = float(input("  Selling Price ($): ") or "50")
        product_cost = float(input("  Product Cost ($): ") or "15")
        shipping_cost = float(input("  Shipping to Customer ($) [0]: ") or "0")
        platform_fee = float(input("  Platform Fee (%) [0]: ") or "0")
        ad_cost = float(input("  Estimated Ad Cost per Sale ($) [10]: ") or "10")

        analysis = calculate_profit(
            selling_price=selling_price,
            product_cost=product_cost,
            shipping_cost=shipping_cost,
            platform_fee_percent=platform_fee,
            ad_cost_per_sale=ad_cost
        )

        print_section("PROFIT ANALYSIS")
        result = analysis.to_dict()
        for key, value in result.items():
            formatted_key = key.replace('_', ' ').title()
            if isinstance(value, float):
                if '%' in key:
                    print(f"  {formatted_key}: {value}%")
                else:
                    print(f"  {formatted_key}: ${value:.2f}")
            else:
                print(f"  {formatted_key}: {value}")

        # Break-even price
        break_even = calculate_break_even_price(
            product_cost=product_cost,
            shipping_cost=shipping_cost,
            platform_fee_percent=platform_fee
        )
        print(f"\n  Break-even Price: ${break_even:.2f}")

        # CPA Target
        cpa = calculate_cpa_target(
            selling_price=selling_price,
            product_cost=product_cost,
            target_profit=10  # $10 target profit
        )
        print(f"  Max CPA (for $10 profit): ${cpa['max_cpa']:.2f}")
        print(f"  {cpa['recommendation']}")

    except ValueError:
        print("  Error: Please enter valid numbers.")


def export_research_data():
    """Export all research data to JSON."""
    print_header("EXPORTING RESEARCH DATA")

    products = get_viral_summer_products()
    platforms = get_all_platforms()
    fb_methods = get_all_research_methods()

    # Convert products to serializable format
    products_data = []
    for p in products:
        products_data.append({
            "name": p.name,
            "category": p.category.value,
            "description": p.description,
            "retail_price": {"min": p.retail_price.min_price, "max": p.retail_price.max_price},
            "supplier_cost": {"min": p.supplier_cost.min_price, "max": p.supplier_cost.max_price},
            "profit_margin": p.profit_margin.value,
            "profit_margin_percent": p.calculate_profit_margin_percentage(),
            "profit_per_unit": p.calculate_profit_per_unit(),
            "trending_score": p.trending_score,
            "target_audience": p.target_audience,
            "selling_points": p.selling_points,
            "competition_level": p.competition_level,
            "recommendation": p.recommendation,
            "suppliers": [
                {
                    "name": s.name,
                    "platform": s.platform,
                    "url": s.url,
                    "price_range": {"min": s.price_range.min_price, "max": s.price_range.max_price},
                    "moq": s.moq,
                    "shipping_time": s.shipping_time,
                    "rating": s.rating,
                    "verified": s.verified
                }
                for s in p.suppliers
            ],
            "facebook_ads": {
                "ad_active": p.facebook_ads.ad_active,
                "estimated_spend": p.facebook_ads.estimated_spend,
                "ad_duration_days": p.facebook_ads.ad_duration_days,
                "engagement_level": p.facebook_ads.engagement_level,
                "platforms": p.facebook_ads.platforms,
                "notes": p.facebook_ads.notes
            } if p.facebook_ads else None
        })

    # Convert platforms to serializable format
    platforms_data = {}
    for name, p in platforms.items():
        platforms_data[name] = {
            "name": p.name,
            "url": p.url,
            "platform_type": p.platform_type,
            "moq_typical": p.moq_typical,
            "shipping_time": p.shipping_time,
            "best_for": p.best_for,
            "pros": p.pros,
            "cons": p.cons,
            "tips": p.tips
        }

    # Convert FB methods to serializable format
    fb_data = {}
    for name, m in fb_methods.items():
        fb_data[name] = {
            "name": m.name,
            "description": m.description,
            "steps": m.steps,
            "pros": m.pros,
            "cons": m.cons,
            "cost": m.cost
        }

    export_data = {
        "generated_at": datetime.now().isoformat(),
        "season": "Summer 2026",
        "products": products_data,
        "supplier_platforms": platforms_data,
        "facebook_ads_methods": fb_data,
        "winning_ad_signals": winning_ad_signals(),
        "supplier_checklist": supplier_evaluation_checklist(),
        "negotiation_tips": get_negotiation_tips(),
        "platform_fees": get_all_platform_fees()
    }

    filename = f"viral_summer_products_research_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    with open(filename, 'w') as f:
        json.dump(export_data, f, indent=2)

    print(f"\n  Data exported to: {filename}")
    print(f"  Total products: {len(products_data)}")
    print(f"  Supplier platforms: {len(platforms_data)}")
    print(f"  FB research methods: {len(fb_data)}")


def interactive_menu():
    """Run interactive menu."""
    while True:
        print_header("VIRAL SUMMER PRODUCTS RESEARCH TOOL")
        print("""
  1. View All Viral Products
  2. View Top 5 Trending Products
  3. View Products by Category
  4. View High-Margin Products (50%+)
  5. Search Products
  6. Supplier Platforms Guide
  7. Facebook Ads Research Guide
  8. Profit Calculator
  9. Export All Research Data
  0. Exit
        """)

        choice = input("  Enter your choice: ").strip()

        if choice == '1':
            display_all_products()
        elif choice == '2':
            display_top_products(5)
        elif choice == '3':
            display_products_by_category()
        elif choice == '4':
            products = get_products_by_profit_margin(ProfitabilityRating.HIGH)
            print_header(f"HIGH-MARGIN PRODUCTS ({len(products)} products)")
            for product in products:
                display_product(product, detailed=False)
        elif choice == '5':
            query = input("\n  Enter search term: ").strip()
            results = search_products(query)
            if results:
                print_header(f"SEARCH RESULTS FOR '{query}' ({len(results)} found)")
                for product in results:
                    display_product(product)
            else:
                print(f"\n  No products found for '{query}'")
        elif choice == '6':
            display_supplier_platforms()
        elif choice == '7':
            display_facebook_ads_research()
        elif choice == '8':
            run_profit_calculator()
        elif choice == '9':
            export_research_data()
        elif choice == '0':
            print("\n  Goodbye! Happy selling!\n")
            break
        else:
            print("\n  Invalid choice. Please try again.")

        input("\n  Press Enter to continue...")


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Viral Summer Products Research Tool",
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument('--products', action='store_true', help='List all viral products')
    parser.add_argument('--top', action='store_true', help='Show top trending products')
    parser.add_argument('--suppliers', action='store_true', help='Show supplier platforms')
    parser.add_argument('--facebook', action='store_true', help='Show Facebook Ads research')
    parser.add_argument('--calculate', action='store_true', help='Run profit calculator')
    parser.add_argument('--export', action='store_true', help='Export all research data')
    parser.add_argument('--search', type=str, help='Search products by keyword')

    args = parser.parse_args()

    # Run specific command or interactive menu
    if args.products:
        display_all_products()
    elif args.top:
        display_top_products()
    elif args.suppliers:
        display_supplier_platforms()
    elif args.facebook:
        display_facebook_ads_research()
    elif args.calculate:
        run_profit_calculator()
    elif args.export:
        export_research_data()
    elif args.search:
        results = search_products(args.search)
        if results:
            for product in results:
                display_product(product)
        else:
            print(f"No products found for '{args.search}'")
    else:
        interactive_menu()


if __name__ == "__main__":
    main()
