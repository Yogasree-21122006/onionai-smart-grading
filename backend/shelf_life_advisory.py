"""
Shelf-Life & Zero-Waste Storage Advisory Engine
Calculates remaining storage days & suggests value-added processing (Powder/Paste)
"""
from typing import Dict, Any

def generate_storage_advisory(grade: str, defect_pct: float, quantity_kg: float) -> Dict[str, Any]:
    if grade == "Grade A":
        days_range = "14 - 21 Days"
        days_num = 18
        risk_level = "Low"
        summary = "Premium Batch with robust outer tunic and minimal moisture loss."
        guidelines = [
            "Store in well-aerated slatted wooden crates or bamboo mesh racks.",
            "Maintain optimal storage temperature (0°C - 2°C or well-ventilated ambient 24°C - 28°C).",
            "Maintain 65% - 70% Relative Humidity to prevent root sprout initiation.",
            "Ideal for top-tier mandi auction or supermarket direct dispatch."
        ]
        value_add_advice = {
            "needed": False,
            "title": "Fresh Market Direct Sale Recommended",
            "description": "High market value as whole bulbs. No emergency processing needed.",
            "est_product_output_kg": 0,
            "est_product_value": 0
        }
    elif grade == "Grade B":
        days_range = "8 - 12 Days"
        days_num = 10
        risk_level = "Moderate"
        summary = "Good domestic batch. Minor skin defects or mixed sizes detected."
        guidelines = [
            "Sort and segregate medium from small bulbs before long transit.",
            "Avoid direct contact with damp ground; keep 6 inches elevated on pallets.",
            "Ensure cross-ventilation to disperse heat from natural bulb respiration.",
            "Sell within 7 to 10 days to maximize profit before weight loss occurs."
        ]
        value_add_advice = {
            "needed": False,
            "title": "Selective Dehydration Optional",
            "description": "Any smaller bulbs (<45mm) can be peeled and solar dried into flakes.",
            "est_product_output_kg": round(quantity_kg * 0.10, 1),
            "est_product_value": round(quantity_kg * 0.10 * 220, 2)
        }
    else:  # Grade C
        days_range = "3 - 6 Days"
        days_num = 4
        risk_level = "High / Spoilage Alert"
        summary = "High defect density or active mold/sprouting detected. Immediate action required!"
        guidelines = [
            "Isolate this batch immediately to prevent fungal spore contagion to healthy onions.",
            "Do NOT store in closed sacks or humid rooms.",
            "Do not sell at distress scrap price! Immediately divert to processing units."
        ]
        
        # Value add calculation: 100 kg fresh onions yield ~10 kg dehydrated onion powder (sells at ₹220/kg)
        powder_yield_kg = round(quantity_kg * 0.09, 1)
        powder_revenue = round(powder_yield_kg * 230, 2)
        paste_yield_kg = round(quantity_kg * 0.75, 1)
        paste_revenue = round(paste_yield_kg * 45, 2)
        
        value_add_advice = {
            "needed": True,
            "title": "Zero-Waste Value Addition: Onion Powder & Puree",
            "description": "Convert vulnerable onions into high-demand shelf-stable products to recover 2.5x more revenue than distress scrap sale.",
            "options": [
                {
                    "product": "Dehydrated Onion Flakes / Powder",
                    "yield_kg": powder_yield_kg,
                    "market_rate_per_kg": 230,
                    "est_revenue": powder_revenue,
                    "shelf_life": "12 Months"
                },
                {
                    "product": "Culinary Onion Paste / Puree (Retort Pouch)",
                    "yield_kg": paste_yield_kg,
                    "market_rate_per_kg": 45,
                    "est_revenue": paste_revenue,
                    "shelf_life": "6 Months"
                }
            ]
        }
        
    return {
        "estimated_days_range": days_range,
        "days_numeric": days_num,
        "risk_level": risk_level,
        "summary": summary,
        "guidelines": guidelines,
        "value_addition": value_add_advice
    }
