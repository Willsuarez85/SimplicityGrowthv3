#!/usr/bin/env python3
"""
Generate Flywheel Marketing Asset - WHITEBOARD SYSTEMS™ v2
"""

import fal_client
import os
import requests
from datetime import datetime

# Set FAL_KEY
os.environ["FAL_KEY"] = "29d8b004-d7f1-4308-80c6-b98d96d7a7e5:1106bc84b41b3c26e16002bf4027829f"

# WHITEBOARD SYSTEMS™ Prompt for Flywheel
PROMPT = """Business infographic flywheel diagram, hand-drawn marker sketch style on white background.

A circular cycle with 3 stages connected by thick black arrows:
• "ATTRACT" (top) - magnet icon
• "ENGAGE" (right) - speech bubble icon  
• "DELIGHT" (bottom) - heart icon with teal underline

"GROWTH" written large in the center.

Hand-drawn black marker illustration style, bold outlines, neat uppercase labels, one teal (#09B9B4) accent color only. Clean professional business diagram, whiteboard aesthetic, minimal design."""

def generate_image():
    print("🎨 Generating Flywheel image with WHITEBOARD SYSTEMS™ style...")
    print(f"📝 Prompt: {PROMPT[:100]}...")
    
    # Use Ideogram V3 for better text rendering
    result = fal_client.subscribe(
        "fal-ai/ideogram/v3",
        arguments={
            "prompt": PROMPT,
            "aspect_ratio": "1:1",
            "style": "DESIGN",
            "rendering_speed": "QUALITY"
        },
    )
    
    print("✅ Image generated!")
    
    # Get the image URL
    image_url = result["images"][0]["url"]
    print(f"🔗 URL: {image_url}")
    
    # Download the image
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"simplicity_flywheel_whiteboard_{timestamp}.png"
    filepath = f"/Users/willsuarez/Vibecoding Cursor/SimplicityAgents v3/generated-assets/{filename}"
    
    response = requests.get(image_url)
    with open(filepath, "wb") as f:
        f.write(response.content)
    
    print(f"💾 Saved to: {filepath}")
    return filepath, image_url

if __name__ == "__main__":
    filepath, url = generate_image()
    print(f"\n🎉 Asset ready!\n   Local: {filepath}\n   URL: {url}")

