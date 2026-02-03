# Viral Summer Products Research Tool

A comprehensive Python tool for researching viral summer products to sell online. This tool provides curated product recommendations, supplier information, Facebook Ads insights, and profit calculators for ecommerce/dropshipping businesses.

## Features

- **12 Curated Viral Summer Products** with detailed analysis
- **Supplier Research** - Information on Alibaba, AliExpress, DHgate, Doba, and more
- **Facebook Ads Research** - Methods to find winning products through Meta Ad Library
- **Profit Calculator** - Calculate margins, break-even prices, and CPA targets
- **Export Functionality** - Export all research data to JSON

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd Ecommerce-AIAssistant

# Install dependencies
pip install -r requirements.txt
```

## Usage

### Interactive Mode
```bash
python main.py
```

### Command Line Options
```bash
python main.py --products      # List all viral products
python main.py --top           # Show top 5 trending products
python main.py --suppliers     # Show supplier platforms guide
python main.py --facebook      # Show Facebook Ads research methods
python main.py --calculate     # Run profit calculator
python main.py --export        # Export all research data to JSON
python main.py --search "fan"  # Search products by keyword
```

## Viral Products Included

| Product | Category | Profit Margin | Trending Score |
|---------|----------|---------------|----------------|
| Red Light Therapy Belt | Health & Wellness | 65-75% | 92/100 |
| Natural Honey Sticks | Health & Wellness | 75-80% | 85/100 |
| Peeling Exfoliating Serum | Beauty & Skincare | 81-85% | 95/100 |
| Portable Mini Fan | Cooling Products | 50-70% | 88/100 |
| Boneless Couch | Home & Living | 50-70% | 90/100 |
| Insulated Water Bottle | Beach & Outdoor | 60-75% | 82/100 |
| UV-Protective Clothing | Fashion | 55-70% | 78/100 |
| Cooling Towel | Cooling Products | 75-85% | 75/100 |
| Barrel Leg Jeans | Fashion | 55-70% | 85/100 |
| Roulette Watch | Accessories | 60-75% | 80/100 |
| LED Face Mask | Beauty & Skincare | 60-75% | 88/100 |
| Novelty Pool Float | Beach & Outdoor | 55-70% | 82/100 |

## Supplier Platforms

The tool includes detailed information about:

- **Alibaba** - Bulk wholesale, custom products
- **AliExpress** - No MOQ, dropshipping friendly
- **DHgate** - Single piece at wholesale prices
- **Doba** - US-based fast shipping
- **CJ Dropshipping** - Automation and sourcing
- **SaleHoo** - Verified supplier directory
- **Global Sources** - Verified manufacturers

## Facebook Ads Research Methods

- **Meta Ad Library** (Free) - Official Facebook tool
- **PipiAds** - AI-powered ad spy tool
- **Minea** - Multi-platform ad tracking
- **Ecomhunt** - Daily winning products
- **Sell The Trend** - Facebook Ad Collector
- **Manual Research** - Free algorithm-based method

## Project Structure

```
Ecommerce-AIAssistant/
├── main.py                          # Main CLI application
├── requirements.txt                 # Python dependencies
├── README.md                        # This file
└── src/
    ├── __init__.py
    ├── models/
    │   ├── __init__.py
    │   └── product.py              # Product data models
    ├── data/
    │   ├── __init__.py
    │   └── viral_products_database.py  # Product database
    ├── services/
    │   ├── __init__.py
    │   ├── supplier_research.py    # Supplier platform info
    │   └── facebook_ads_research.py # FB Ads research tools
    └── utils/
        ├── __init__.py
        └── profit_calculator.py    # Profit calculations
```

## Research Sources

This tool is based on comprehensive market research from:

- [AutoDS - Summer Dropshipping Products](https://www.autods.com/blog/dropshipping-niches/best-summer-dropshipping-products/)
- [Spocket - Best Summer Products 2026](https://www.spocket.co/blogs/6-best-summer-products-to-sell-this-year)
- [TrueProfit - Trending Dropshipping Products](https://trueprofit.io/blog/trending-dropshipping-products)
- [Shopify - How Alibaba Works](https://www.shopify.com/blog/16665772-alibaba-101-how-to-safely-source-products-from-the-worlds-biggest-supplier-directory)
- [Shopify - Meta Ad Library Guide](https://www.shopify.com/blog/ad-library-facebook)
- [SaleHoo - Market Insights](https://www.salehoo.com/trends/portable-fan)
- [Doba - Dropshipping Suppliers](https://www.doba.com/dropshipping/portable-fan.html)

## License

MIT License

## Disclaimer

Product recommendations and profit margins are based on market research at the time of creation. Actual results may vary. Always conduct your own due diligence before making business decisions.
