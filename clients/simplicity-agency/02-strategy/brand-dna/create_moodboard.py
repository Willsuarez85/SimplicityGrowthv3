#!/usr/bin/env python3
"""
Marble Circuitry - Mood Board Generator
Simplicity Agency: Classical Wisdom Meets Digital Innovation

A meticulously crafted visual identity artifact.
"""

from reportlab.lib.pagesizes import A3, landscape
from reportlab.pdfgen import canvas
from reportlab.lib.colors import Color, HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import math
import os

# === CONFIGURATION ===
OUTPUT_PATH = "/Users/willsuarez/Vibecoding Cursor/SimplicityAgents v3/clients/simplicity-agency/02-strategy/brand-dna/simplicity-moodboard.pdf"
FONTS_PATH = "/Users/willsuarez/Vibecoding Cursor/SimplicityAgents v3/.claude/skills/canvas-design/canvas-fonts"

# === GOLDEN RATIO ===
PHI = 1.618033988749

# === COLOR PALETTE (Refined) ===
DEEP_BLACK = HexColor("#0a0a0f")
PURE_WHITE = HexColor("#FAFAFA")
GOLD = HexColor("#C9A227")
GOLD_MUTED = HexColor("#A08420")
STONE_GRAY = HexColor("#3D3D45")
STONE_LIGHT = HexColor("#7A7A85")
CYAN_TECH = HexColor("#00D4FF")
DEEP_BLUE = HexColor("#0A1628")
MARBLE_WHITE = HexColor("#F0F0EC")
SHADOW = HexColor("#14141a")
OBSIDIAN = HexColor("#0d0d12")

# === REGISTER FONTS ===
def register_fonts():
    fonts = [
        ("CrimsonPro", "CrimsonPro-Regular.ttf"),
        ("CrimsonPro-Bold", "CrimsonPro-Bold.ttf"),
        ("CrimsonPro-Italic", "CrimsonPro-Italic.ttf"),
        ("Italiana", "Italiana-Regular.ttf"),
        ("InstrumentSans", "InstrumentSans-Regular.ttf"),
        ("InstrumentSans-Bold", "InstrumentSans-Bold.ttf"),
        ("GeistMono", "GeistMono-Regular.ttf"),
        ("Outfit", "Outfit-Regular.ttf"),
        ("Jura", "Jura-Light.ttf"),
        ("PoiretOne", "PoiretOne-Regular.ttf"),
        ("LibreBaskerville", "LibreBaskerville-Regular.ttf"),
    ]
    for font_name, font_file in fonts:
        try:
            pdfmetrics.registerFont(TTFont(font_name, os.path.join(FONTS_PATH, font_file)))
        except:
            pass

# === DRAWING UTILITIES ===
def draw_golden_frame(c, x, y, w, h, thickness=1):
    """Draw elegant golden frame with corner accents"""
    c.setStrokeColor(GOLD)
    c.setLineWidth(thickness)
    # Main rectangle
    c.rect(x, y, w, h, stroke=1, fill=0)
    # Corner accents
    corner_size = 12
    for cx, cy, dx, dy in [(x, y+h, 1, -1), (x+w, y+h, -1, -1), (x, y, 1, 1), (x+w, y, -1, 1)]:
        c.line(cx, cy, cx + corner_size*dx, cy)
        c.line(cx, cy, cx, cy + corner_size*dy)

def draw_color_swatch(c, x, y, size, color, label):
    """Draw a sophisticated color swatch with label"""
    # Shadow
    c.setFillColor(Color(0, 0, 0, alpha=0.3))
    c.rect(x+3, y-3, size, size, stroke=0, fill=1)
    # Main swatch
    c.setFillColor(color)
    c.rect(x, y, size, size, stroke=0, fill=1)
    # Gold border
    c.setStrokeColor(GOLD)
    c.setLineWidth(0.5)
    c.rect(x, y, size, size, stroke=1, fill=0)
    # Label
    c.setFillColor(STONE_LIGHT)
    c.setFont("GeistMono", 7)
    c.drawCentredString(x + size/2, y - 14, label)

def draw_marble_texture_panel(c, x, y, w, h):
    """Draw museum-quality marble texture with depth and luminosity"""
    c.saveState()
    import random
    random.seed(42)

    # Base marble with subtle warm undertone
    c.setFillColor(Color(0.945, 0.942, 0.935, alpha=1))
    c.rect(x, y, w, h, stroke=0, fill=1)

    # Subtle light gradient from top-left (chiaroscuro)
    c.setFillColor(Color(0.98, 0.975, 0.97, alpha=0.6))
    c.rect(x, y + h * 0.5, w * 0.6, h * 0.5, stroke=0, fill=1)

    # Deep gray veins - primary structure
    c.setStrokeColor(Color(0.35, 0.35, 0.4, alpha=0.08))
    c.setLineWidth(2)
    for _ in range(3):
        start_x = x + random.random() * w * 0.3
        start_y = y + h - random.random() * h * 0.3
        path = c.beginPath()
        path.moveTo(start_x, start_y)
        for _ in range(3):
            ctrl_x = start_x + random.random() * w * 0.4
            ctrl_y = start_y - random.random() * h * 0.5
            end_x = start_x + random.random() * w * 0.7
            end_y = start_y - random.random() * h * 0.8
            path.curveTo(ctrl_x, ctrl_y, (ctrl_x + end_x)/2, (ctrl_y + end_y)/2, end_x, end_y)
            start_x, start_y = end_x, end_y
        c.drawPath(path, stroke=1, fill=0)

    # Golden veins - accent
    c.setStrokeColor(Color(0.79, 0.64, 0.15, alpha=0.12))
    c.setLineWidth(0.75)
    for _ in range(5):
        start_x = x + random.random() * w
        start_y = y + random.random() * h
        path = c.beginPath()
        path.moveTo(start_x, start_y)
        for _ in range(2):
            ctrl_x = start_x + (random.random() - 0.5) * w * 0.4
            ctrl_y = start_y + (random.random() - 0.5) * h * 0.4
            end_x = start_x + (random.random() - 0.5) * w * 0.6
            end_y = start_y + (random.random() - 0.5) * h * 0.6
            path.curveTo(ctrl_x, ctrl_y, ctrl_x, ctrl_y, end_x, end_y)
            start_x, start_y = end_x, end_y
        c.drawPath(path, stroke=1, fill=0)

    # Hairline veins - fine detail
    c.setStrokeColor(Color(0.5, 0.5, 0.55, alpha=0.06))
    c.setLineWidth(0.3)
    for _ in range(8):
        start_x = x + random.random() * w
        start_y = y + random.random() * h
        end_x = start_x + (random.random() - 0.5) * w * 0.4
        end_y = start_y + (random.random() - 0.5) * h * 0.4
        c.line(start_x, start_y, end_x, end_y)

    # Crystalline sparkle points
    c.setFillColor(Color(1, 1, 1, alpha=0.4))
    for _ in range(6):
        px = x + random.random() * w
        py = y + random.random() * h
        c.circle(px, py, 0.5, stroke=0, fill=1)

    c.restoreState()

def draw_tech_grid_panel(c, x, y, w, h):
    """Draw museum-quality neural grid with layered depth and luminosity"""
    c.saveState()
    import random
    random.seed(123)

    # Deep layered background with gradient simulation
    c.setFillColor(Color(0.039, 0.086, 0.157, alpha=1))  # DEEP_BLUE base
    c.rect(x, y, w, h, stroke=0, fill=1)

    # Subtle radial gradient simulation - darker edges
    c.setFillColor(Color(0.02, 0.04, 0.08, alpha=0.6))
    c.rect(x, y, w * 0.2, h, stroke=0, fill=1)
    c.rect(x + w * 0.8, y, w * 0.2, h, stroke=0, fill=1)

    # Primary grid - faint structural lines
    grid_spacing = 15
    c.setStrokeColor(Color(0, 0.83, 1, alpha=0.08))
    c.setLineWidth(0.2)
    for gx in range(int(x), int(x + w) + 1, grid_spacing):
        c.line(gx, y, gx, y + h)
    for gy in range(int(y), int(y + h) + 1, grid_spacing):
        c.line(x, gy, x + w, gy)

    # Secondary grid - even finer detail
    c.setStrokeColor(Color(0, 0.83, 1, alpha=0.04))
    c.setLineWidth(0.1)
    for gx in range(int(x) + grid_spacing // 2, int(x + w), grid_spacing):
        c.line(gx, y, gx, y + h)

    # Neural network layer - golden connections first (behind nodes)
    neural_nodes = [(x + 25 + random.random() * (w - 50), y + 20 + random.random() * (h - 40)) for _ in range(7)]
    c.setLineWidth(0.4)
    for i, (nx, ny) in enumerate(neural_nodes):
        for mx, my in neural_nodes[i+1:]:
            if random.random() > 0.45:
                # Gradient line simulation via alpha
                dist = math.sqrt((mx - nx)**2 + (my - ny)**2)
                alpha = max(0.08, 0.25 - dist / 400)
                c.setStrokeColor(Color(0.79, 0.64, 0.15, alpha=alpha))
                c.line(nx, ny, mx, my)

    # Grid intersection nodes - layered glow effect
    for gx in range(int(x) + grid_spacing, int(x + w), grid_spacing * 2):
        for gy in range(int(y) + grid_spacing, int(y + h), grid_spacing * 2):
            # Outer glow
            c.setFillColor(Color(0, 0.83, 1, alpha=0.08))
            c.circle(gx, gy, 5, stroke=0, fill=1)
            # Inner glow
            c.setFillColor(Color(0, 0.83, 1, alpha=0.25))
            c.circle(gx, gy, 2.5, stroke=0, fill=1)
            # Core
            c.setFillColor(Color(0.3, 0.9, 1, alpha=0.7))
            c.circle(gx, gy, 1, stroke=0, fill=1)

    # Focal neural nodes with golden accent
    for nx, ny in neural_nodes[:3]:
        # Outer halo
        c.setFillColor(Color(0.79, 0.64, 0.15, alpha=0.12))
        c.circle(nx, ny, 7, stroke=0, fill=1)
        # Mid ring
        c.setStrokeColor(Color(0.79, 0.64, 0.15, alpha=0.3))
        c.setLineWidth(0.3)
        c.circle(nx, ny, 5, stroke=1, fill=0)
        # Core
        c.setFillColor(Color(0.85, 0.72, 0.25, alpha=0.9))
        c.circle(nx, ny, 2.5, stroke=0, fill=1)

    # Ambient data particles - subtle depth
    for _ in range(25):
        px = x + random.random() * w
        py = y + random.random() * h
        alpha = random.random() * 0.12 + 0.03
        c.setFillColor(Color(0, 0.83, 1, alpha=alpha))
        c.circle(px, py, random.random() * 0.6 + 0.2, stroke=0, fill=1)

    c.restoreState()

def draw_data_particles(c, x, y, w, h):
    """Draw cosmic golden data particles with depth layers"""
    c.saveState()
    import random
    random.seed(789)

    # Deep layered background
    c.setFillColor(OBSIDIAN)
    c.rect(x, y, w, h, stroke=0, fill=1)

    # Subtle gradient depth
    c.setFillColor(Color(0.04, 0.04, 0.06, alpha=1))
    c.rect(x, y, w, h * 0.4, stroke=0, fill=1)

    # Connection lines (neural network) - drawn first, behind particles
    nodes = [(x + 20 + random.random() * (w - 40), y + 15 + random.random() * (h - 30)) for _ in range(5)]
    c.setStrokeColor(Color(0.79, 0.64, 0.15, alpha=0.08))
    c.setLineWidth(0.3)
    for i, (nx, ny) in enumerate(nodes):
        for mx, my in nodes[i+1:]:
            if random.random() > 0.4:
                c.line(nx, ny, mx, my)

    # Background dust layer - very small, very faint
    for _ in range(50):
        px = x + random.random() * w
        py = y + random.random() * h
        alpha = random.random() * 0.15 + 0.05
        c.setFillColor(Color(0.79, 0.64, 0.15, alpha=alpha))
        c.circle(px, py, random.random() * 0.8 + 0.2, stroke=0, fill=1)

    # Mid-layer particles
    for _ in range(20):
        px = x + random.random() * w
        py = y + random.random() * h
        size = random.random() * 1.5 + 0.5
        alpha = random.random() * 0.4 + 0.2
        c.setFillColor(Color(0.79, 0.64, 0.15, alpha=alpha))
        c.circle(px, py, size, stroke=0, fill=1)

    # Focal particles with glow rings
    focal_nodes = [(x + 25 + random.random() * (w - 50), y + 20 + random.random() * (h - 40)) for _ in range(4)]
    for px, py in focal_nodes:
        # Outer glow
        c.setFillColor(Color(0.79, 0.64, 0.15, alpha=0.1))
        c.circle(px, py, 8, stroke=0, fill=1)
        # Mid glow
        c.setFillColor(Color(0.79, 0.64, 0.15, alpha=0.25))
        c.circle(px, py, 4, stroke=0, fill=1)
        # Core
        c.setFillColor(Color(0.85, 0.72, 0.25, alpha=0.9))
        c.circle(px, py, 2, stroke=0, fill=1)
        # Ring accent
        c.setStrokeColor(Color(0.79, 0.64, 0.15, alpha=0.2))
        c.setLineWidth(0.3)
        c.circle(px, py, 6, stroke=1, fill=0)

    # Single cyan tech accent
    c.setFillColor(Color(0, 0.83, 1, alpha=0.5))
    c.circle(x + w * 0.75, y + h * 0.3, 1.5, stroke=0, fill=1)

    c.restoreState()

def draw_statue_silhouette(c, x, y, w, h):
    """Draw refined classical bust silhouette with chiaroscuro lighting"""
    c.saveState()

    # Deep obsidian background
    c.setFillColor(OBSIDIAN)
    c.rect(x, y, w, h, stroke=0, fill=1)

    # Center positioning
    center_x = x + w/2
    center_y = y + h * 0.42

    # Dramatic lighting: upper left source (45°)
    # Shadow layer (offset)
    c.setFillColor(Color(0.15, 0.15, 0.18, alpha=1))
    path_shadow = c.beginPath()
    offset = 4
    path_shadow.moveTo(center_x - 22 + offset, center_y - 35 - offset/2)
    path_shadow.curveTo(center_x - 28 + offset, center_y + offset, center_x - 22 + offset, center_y + 28, center_x - 8 + offset, center_y + 45)
    path_shadow.lineTo(center_x + 18 + offset, center_y + 45)
    path_shadow.curveTo(center_x + 32 + offset, center_y + 25, center_x + 36 + offset, center_y - 8, center_x + 22 + offset, center_y - 35)
    path_shadow.curveTo(center_x + 12 + offset, center_y - 48, center_x - 12 + offset, center_y - 48, center_x - 22 + offset, center_y - 35)
    path_shadow.close()
    c.drawPath(path_shadow, stroke=0, fill=1)

    # Main bust form
    c.setFillColor(STONE_GRAY)
    path = c.beginPath()
    path.moveTo(center_x - 22, center_y - 35)
    path.curveTo(center_x - 28, center_y, center_x - 22, center_y + 28, center_x - 8, center_y + 45)
    path.lineTo(center_x + 18, center_y + 45)
    path.curveTo(center_x + 32, center_y + 25, center_x + 36, center_y - 8, center_x + 22, center_y - 35)
    path.curveTo(center_x + 12, center_y - 48, center_x - 12, center_y - 48, center_x - 22, center_y - 35)
    path.close()
    c.drawPath(path, stroke=0, fill=1)

    # Rim light (golden, from upper left)
    c.setStrokeColor(Color(0.79, 0.64, 0.15, alpha=0.5))
    c.setLineWidth(1.2)
    path_rim = c.beginPath()
    path_rim.moveTo(center_x - 22, center_y - 35)
    path_rim.curveTo(center_x - 12, center_y - 48, center_x + 5, center_y - 48, center_x + 10, center_y - 42)
    c.drawPath(path_rim, stroke=1, fill=0)

    # Shoulders/draped toga
    c.setFillColor(Color(0.22, 0.22, 0.26, alpha=1))
    path2 = c.beginPath()
    path2.moveTo(center_x - 42, center_y + 45)
    path2.curveTo(center_x - 48, center_y + 72, center_x - 38, center_y + 88, center_x, center_y + 92)
    path2.curveTo(center_x + 38, center_y + 88, center_x + 48, center_y + 72, center_x + 42, center_y + 45)
    path2.close()
    c.drawPath(path2, stroke=0, fill=1)

    # Subtle tech element: single cyan point (earbud glow)
    c.setFillColor(Color(0, 0.83, 1, alpha=0.7))
    c.circle(center_x + 24, center_y - 2, 2.5, stroke=0, fill=1)
    # Outer glow ring
    c.setStrokeColor(Color(0, 0.83, 1, alpha=0.25))
    c.setLineWidth(0.5)
    c.circle(center_x + 24, center_y - 2, 5, stroke=1, fill=0)
    c.circle(center_x + 24, center_y - 2, 8, stroke=1, fill=0)

    # Floating particles (golden data)
    import random
    random.seed(42)
    c.setFillColor(Color(0.79, 0.64, 0.15, alpha=0.4))
    for _ in range(12):
        px = x + 15 + random.random() * (w - 30)
        py = y + 15 + random.random() * (h - 30)
        size = random.random() * 1.2 + 0.3
        c.circle(px, py, size, stroke=0, fill=1)

    c.restoreState()

def draw_typography_sample(c, x, y, w, h):
    """Draw refined typography specimens with museum-quality hierarchy"""
    c.saveState()

    # Layered background for depth
    c.setFillColor(OBSIDIAN)
    c.rect(x, y, w, h, stroke=0, fill=1)

    # Subtle gradient simulation via overlapping rectangles
    c.setFillColor(Color(0.06, 0.06, 0.08, alpha=1))
    c.rect(x, y, w, h * 0.6, stroke=0, fill=1)

    # Headline serif - classical weight
    c.setFillColor(PURE_WHITE)
    c.setFont("Italiana", 32)
    c.drawString(x + 24, y + h - 48, "Wisdom")

    # Subtle gold underline accent
    c.setStrokeColor(Color(0.79, 0.64, 0.15, alpha=0.4))
    c.setLineWidth(0.5)
    c.line(x + 24, y + h - 54, x + 105, y + h - 54)

    # Subhead - italic elegance
    c.setFillColor(GOLD)
    c.setFont("CrimsonPro-Italic", 13)
    c.drawString(x + 24, y + h - 76, "Strategic Clarity")

    # Body sans - restrained
    c.setFillColor(STONE_LIGHT)
    c.setFont("InstrumentSans", 9)
    c.drawString(x + 24, y + h - 100, "Growth through deliberate action")

    # Mono/tech - digital whisper
    c.setFillColor(Color(0, 0.83, 1, alpha=0.7))
    c.setFont("GeistMono", 7)
    c.drawString(x + 24, y + h - 120, "data.insight.strategy")

    # Letter spacing demo - spaced capitals
    c.setFillColor(GOLD_MUTED)
    c.setFont("Jura", 10)
    c.drawString(x + 24, y + h - 145, "E L E G A N C E")

    # Vertical type label
    c.setFillColor(Color(0.79, 0.64, 0.15, alpha=0.25))
    c.setFont("GeistMono", 6)
    c.saveState()
    c.translate(x + w - 12, y + 20)
    c.rotate(90)
    c.drawString(0, 0, "TYPOGRAPHY SYSTEM")
    c.restoreState()

    c.restoreState()

def draw_ui_elements(c, x, y, w, h):
    """Draw refined minimalist UI component concepts"""
    c.saveState()

    # Deep layered background
    c.setFillColor(OBSIDIAN)
    c.rect(x, y, w, h, stroke=0, fill=1)

    # Section label
    c.setFillColor(Color(0.79, 0.64, 0.15, alpha=0.3))
    c.setFont("GeistMono", 6)
    c.drawString(x + 15, y + h - 18, "INTERFACE ELEMENTS")

    # Primary button - refined proportions
    btn_x, btn_y = x + 15, y + h - 50
    btn_w, btn_h = 72, 26
    c.setFillColor(GOLD)
    c.roundRect(btn_x, btn_y, btn_w, btn_h, 2, stroke=0, fill=1)
    c.setFillColor(DEEP_BLACK)
    c.setFont("InstrumentSans-Bold", 7)
    c.drawCentredString(btn_x + btn_w/2, btn_y + 9, "DISCOVER")

    # Ghost button - elegant outline
    btn2_x = btn_x + btn_w + 12
    c.setStrokeColor(GOLD)
    c.setLineWidth(0.75)
    c.roundRect(btn2_x, btn_y, btn_w, btn_h, 2, stroke=1, fill=0)
    c.setFillColor(GOLD)
    c.drawCentredString(btn2_x + btn_w/2, btn_y + 9, "EXPLORE")

    # Minimal input field
    inp_y = btn_y - 38
    c.setStrokeColor(Color(0.24, 0.24, 0.27, alpha=1))
    c.setLineWidth(0.5)
    c.line(x + 15, inp_y, x + w - 20, inp_y)
    c.setFillColor(STONE_GRAY)
    c.setFont("InstrumentSans", 8)
    c.drawString(x + 15, inp_y + 6, "Enter your vision...")
    # Cursor blink indicator
    c.setFillColor(Color(0, 0.83, 1, alpha=0.6))
    c.rect(x + 100, inp_y + 4, 1, 12, stroke=0, fill=1)

    # Toggle - refined proportions
    pill_y = inp_y - 32
    c.setFillColor(SHADOW)
    c.roundRect(x + 15, pill_y, 42, 18, 9, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.circle(x + 15 + 34, pill_y + 9, 7, stroke=0, fill=1)
    c.setFillColor(STONE_GRAY)
    c.setFont("GeistMono", 7)
    c.drawString(x + 65, pill_y + 5, "Active")

    # Progress indicator - golden ratio proportion
    prog_y = pill_y - 26
    prog_w = w - 35
    c.setFillColor(SHADOW)
    c.roundRect(x + 15, prog_y, prog_w, 4, 2, stroke=0, fill=1)
    c.setFillColor(GOLD)
    c.roundRect(x + 15, prog_y, prog_w / PHI, 4, 2, stroke=0, fill=1)
    c.setFillColor(STONE_GRAY)
    c.setFont("GeistMono", 6)
    c.drawRightString(x + w - 20, prog_y + 1, "61.8%")

    # Subtle corner accent
    c.setStrokeColor(Color(0.79, 0.64, 0.15, alpha=0.15))
    c.setLineWidth(0.5)
    c.line(x + w - 25, y + 10, x + w - 10, y + 10)
    c.line(x + w - 10, y + 10, x + w - 10, y + 25)

    c.restoreState()

def create_moodboard():
    """Generate the complete mood board"""
    register_fonts()

    # A3 Landscape
    page_w, page_h = landscape(A3)
    c = canvas.Canvas(OUTPUT_PATH, pagesize=landscape(A3))

    # === BACKGROUND ===
    c.setFillColor(DEEP_BLACK)
    c.rect(0, 0, page_w, page_h, stroke=0, fill=1)

    # === OUTER GOLDEN FRAME ===
    margin = 25
    draw_golden_frame(c, margin, margin, page_w - 2*margin, page_h - 2*margin, 1.5)

    # === HEADER ===
    # Subtle glow behind title
    c.setFillColor(Color(0.79, 0.64, 0.15, alpha=0.03))
    c.ellipse(page_w/2 - 180, page_h - 100, page_w/2 + 180, page_h - 40, stroke=0, fill=1)

    c.setFillColor(PURE_WHITE)
    c.setFont("Italiana", 42)
    c.drawCentredString(page_w/2, page_h - 70, "SIMPLICITY")

    c.setFillColor(Color(0.79, 0.64, 0.15, alpha=0.85))
    c.setFont("Jura", 11)
    tagline = "C L A S S I C A L   W I S D O M   M E E T S   D I G I T A L   I N N O V A T I O N"
    c.drawCentredString(page_w/2, page_h - 95, tagline)

    # Decorative divider with diamond center
    c.setStrokeColor(Color(0.79, 0.64, 0.15, alpha=0.6))
    c.setLineWidth(0.5)
    line_w = 280
    c.line(page_w/2 - line_w/2, page_h - 112, page_w/2 - 8, page_h - 112)
    c.line(page_w/2 + 8, page_h - 112, page_w/2 + line_w/2, page_h - 112)
    # Center diamond
    c.setFillColor(Color(0.79, 0.64, 0.15, alpha=0.7))
    c.saveState()
    c.translate(page_w/2, page_h - 112)
    c.rotate(45)
    c.rect(-3, -3, 6, 6, stroke=0, fill=1)
    c.restoreState()

    # === MAIN CONTENT GRID ===
    content_top = page_h - 140
    content_bottom = 80
    content_height = content_top - content_bottom

    # Left column
    left_x = 50
    col_w = 200

    # Panel 1: Statue silhouette
    panel_h = 180
    draw_statue_silhouette(c, left_x, content_top - panel_h, col_w, panel_h)
    draw_golden_frame(c, left_x, content_top - panel_h, col_w, panel_h, 0.5)

    # Panel 2: Marble texture
    panel2_y = content_top - panel_h - 15 - 100
    draw_marble_texture_panel(c, left_x, panel2_y, col_w, 100)
    draw_golden_frame(c, left_x, panel2_y, col_w, 100, 0.5)
    c.setFillColor(STONE_LIGHT)
    c.setFont("GeistMono", 7)
    c.drawCentredString(left_x + col_w/2, panel2_y - 12, "MARBLE TEXTURE")

    # Panel 3: Data particles
    panel3_y = panel2_y - 25 - 80
    draw_data_particles(c, left_x, panel3_y, col_w, 80)
    draw_golden_frame(c, left_x, panel3_y, col_w, 80, 0.5)
    c.setFillColor(STONE_LIGHT)
    c.setFont("GeistMono", 7)
    c.drawCentredString(left_x + col_w/2, panel3_y - 12, "GOLDEN PARTICLES")

    # Center-left column
    center_left_x = left_x + col_w + 20

    # Color palette section - refined header
    c.setFillColor(Color(0.79, 0.64, 0.15, alpha=0.4))
    c.setFont("GeistMono", 7)
    c.drawString(center_left_x, content_top - 12, "COLOR PALETTE")
    # Subtle accent line
    c.setStrokeColor(Color(0.79, 0.64, 0.15, alpha=0.2))
    c.setLineWidth(0.3)
    c.line(center_left_x + 80, content_top - 9, center_left_x + 200, content_top - 9)

    swatch_size = 45
    swatch_y = content_top - 30 - swatch_size
    swatches = [
        (DEEP_BLACK, "#0A0A14"),
        (PURE_WHITE, "#FFFFFF"),
        (GOLD, "#C9A227"),
        (STONE_GRAY, "#4A4A52"),
    ]
    for i, (color, label) in enumerate(swatches):
        draw_color_swatch(c, center_left_x + i * (swatch_size + 10), swatch_y, swatch_size, color, label)

    # Tech accent colors
    swatch_y2 = swatch_y - swatch_size - 30
    tech_swatches = [
        (CYAN_TECH, "#00D4FF"),
        (DEEP_BLUE, "#0A1628"),
    ]
    for i, (color, label) in enumerate(tech_swatches):
        draw_color_swatch(c, center_left_x + i * (swatch_size + 10), swatch_y2, swatch_size, color, label)
    c.setFillColor(STONE_LIGHT)
    c.setFont("GeistMono", 7)
    c.drawString(center_left_x + 120, swatch_y2 + swatch_size/2, "Tech Accents")

    # Tech grid panel
    grid_y = swatch_y2 - 25 - 100
    draw_tech_grid_panel(c, center_left_x, grid_y, 200, 100)
    draw_golden_frame(c, center_left_x, grid_y, 200, 100, 0.5)
    c.setFillColor(STONE_LIGHT)
    c.setFont("GeistMono", 7)
    c.drawCentredString(center_left_x + 100, grid_y - 12, "NEURAL GRID PATTERN")

    # Center-right column: Typography
    center_right_x = center_left_x + 220

    draw_typography_sample(c, center_right_x, content_top - 180, 200, 180)
    draw_golden_frame(c, center_right_x, content_top - 180, 200, 180, 0.5)
    c.setFillColor(STONE_LIGHT)
    c.setFont("GeistMono", 7)
    c.drawCentredString(center_right_x + 100, content_top - 195, "TYPOGRAPHY")

    # UI Elements
    ui_y = content_top - 180 - 15 - 160
    draw_ui_elements(c, center_right_x, ui_y, 200, 160)
    draw_golden_frame(c, center_right_x, ui_y, 200, 160, 0.5)
    c.setFillColor(STONE_LIGHT)
    c.setFont("GeistMono", 7)
    c.drawCentredString(center_right_x + 100, ui_y - 12, "UI COMPONENTS")

    # Right column
    right_x = center_right_x + 220
    right_col_w = 200

    # Design principles panel with contained background
    principles_panel_h = 170
    principles_panel_y = content_top - principles_panel_h
    c.setFillColor(OBSIDIAN)
    c.rect(right_x, principles_panel_y, right_col_w, principles_panel_h, stroke=0, fill=1)
    draw_golden_frame(c, right_x, principles_panel_y, right_col_w, principles_panel_h, 0.5)

    # Section header with subtle line
    c.setFillColor(Color(0.79, 0.64, 0.15, alpha=0.3))
    c.setFont("GeistMono", 7)
    c.drawString(right_x + 12, principles_panel_y + principles_panel_h - 18, "DESIGN PRINCIPLES")

    principles = [
        "40%+ Whitespace",
        "Premium Boutique",
        "Minimalist UI",
        "Classical Forms",
        "Subtle Technology",
        "Strategic Restraint"
    ]

    c.setFont("CrimsonPro", 10)
    for i, principle in enumerate(principles):
        py = principles_panel_y + principles_panel_h - 42 - i * 21
        # Subtle line connector
        c.setStrokeColor(Color(0.79, 0.64, 0.15, alpha=0.15))
        c.setLineWidth(0.3)
        c.line(right_x + 12, py - 3, right_x + 22, py - 3)
        # Diamond bullet
        c.setFillColor(Color(0.79, 0.64, 0.15, alpha=0.6))
        c.saveState()
        c.translate(right_x + 26, py - 1)
        c.rotate(45)
        c.rect(-2, -2, 4, 4, stroke=0, fill=1)
        c.restoreState()
        # Text
        c.setFillColor(PURE_WHITE)
        c.drawString(right_x + 38, py - 4, principle)

    # Mood keywords panel
    keywords_panel_h = 150
    keywords_panel_y = principles_panel_y - 15 - keywords_panel_h
    c.setFillColor(OBSIDIAN)
    c.rect(right_x, keywords_panel_y, right_col_w, keywords_panel_h, stroke=0, fill=1)
    draw_golden_frame(c, right_x, keywords_panel_y, right_col_w, keywords_panel_h, 0.5)

    c.setFillColor(Color(0.79, 0.64, 0.15, alpha=0.3))
    c.setFont("GeistMono", 7)
    c.drawString(right_x + 12, keywords_panel_y + keywords_panel_h - 18, "MOOD ESSENCE")

    keywords = [
        ("Sophisticated", PURE_WHITE, 0.9),
        ("Timeless", STONE_LIGHT, 0.7),
        ("Strategic", GOLD, 1.0),
        ("Innovative", CYAN_TECH, 0.6),
        ("Premium", PURE_WHITE, 0.8),
    ]

    for i, (word, color, intensity) in enumerate(keywords):
        ky = keywords_panel_y + keywords_panel_h - 42 - i * 24
        # Faint horizontal accent bar
        c.setFillColor(Color(0.79, 0.64, 0.15, alpha=0.08 * intensity))
        c.rect(right_x + 10, ky - 6, right_col_w - 20, 18, stroke=0, fill=1)
        # Keyword text
        c.setFillColor(color)
        c.setFont("Italiana", 15)
        c.drawString(right_x + 16, ky - 2, word)

    # Brand personality panel - matching museum-quality treatment
    pers_panel_h = 95
    pers_panel_y = keywords_panel_y - 15 - pers_panel_h
    c.setFillColor(OBSIDIAN)
    c.rect(right_x, pers_panel_y, right_col_w, pers_panel_h, stroke=0, fill=1)
    draw_golden_frame(c, right_x, pers_panel_y, right_col_w, pers_panel_h, 0.5)

    c.setFillColor(Color(0.79, 0.64, 0.15, alpha=0.3))
    c.setFont("GeistMono", 7)
    c.drawString(right_x + 12, pers_panel_y + pers_panel_h - 18, "BRAND PERSONALITY")

    personality = [
        ("Wise Strategist", 0.9),
        ("Trusted Advisor", 0.7),
        ("Confident Restraint", 0.8),
    ]
    for i, (trait, intensity) in enumerate(personality):
        ty = pers_panel_y + pers_panel_h - 42 - i * 22
        # Subtle accent line
        c.setStrokeColor(Color(0.79, 0.64, 0.15, alpha=0.12 * intensity))
        c.setLineWidth(0.3)
        c.line(right_x + 12, ty - 3, right_x + 20, ty - 3)
        # Small diamond marker
        c.setFillColor(Color(0.79, 0.64, 0.15, alpha=0.5 * intensity))
        c.saveState()
        c.translate(right_x + 24, ty - 1)
        c.rotate(45)
        c.rect(-1.5, -1.5, 3, 3, stroke=0, fill=1)
        c.restoreState()
        # Text
        c.setFillColor(Color(0.98, 0.98, 0.96, alpha=0.85))
        c.setFont("CrimsonPro", 10)
        c.drawString(right_x + 34, ty - 4, trait)

    # === FOOTER ===
    # Decorative divider above footer
    c.setStrokeColor(Color(0.79, 0.64, 0.15, alpha=0.3))
    c.setLineWidth(0.3)
    c.line(page_w/2 - 200, 65, page_w/2 + 200, 65)

    # Central diamond ornament
    c.setFillColor(Color(0.79, 0.64, 0.15, alpha=0.6))
    diamond_x, diamond_y = page_w/2, 65
    c.saveState()
    c.translate(diamond_x, diamond_y)
    c.rotate(45)
    c.rect(-3, -3, 6, 6, stroke=0, fill=1)
    c.restoreState()

    c.setFillColor(GOLD)
    c.setFont("GeistMono", 8)
    c.drawCentredString(page_w/2, 48, "MARBLE CIRCUITRY  ·  VISUAL IDENTITY SYSTEM  ·  MMXXIV")

    c.setFont("CrimsonPro-Italic", 10)
    c.setFillColor(STONE_LIGHT)
    c.drawCentredString(page_w/2, 32, '"Ancient wisdom applied to modern challenges"')

    # Corner decorations - refined double-line treatment
    corner_offset = 40
    corner_length = 35
    corner_gap = 4

    for cx, cy, dx, dy in [
        (corner_offset, page_h - corner_offset, 1, -1),  # Top left
        (page_w - corner_offset, page_h - corner_offset, -1, -1),  # Top right
        (corner_offset, corner_offset, 1, 1),  # Bottom left
        (page_w - corner_offset, corner_offset, -1, 1),  # Bottom right
    ]:
        # Outer line (brighter)
        c.setStrokeColor(Color(0.79, 0.64, 0.15, alpha=0.8))
        c.setLineWidth(1)
        c.line(cx, cy, cx + corner_length * dx, cy)
        c.line(cx, cy, cx, cy + corner_length * dy)

        # Inner line (softer, offset inward)
        c.setStrokeColor(Color(0.79, 0.64, 0.15, alpha=0.3))
        c.setLineWidth(0.5)
        inner_x = cx + corner_gap * dx
        inner_y = cy + corner_gap * dy
        c.line(inner_x, inner_y, inner_x + (corner_length - corner_gap) * dx, inner_y)
        c.line(inner_x, inner_y, inner_x, inner_y + (corner_length - corner_gap) * dy)

        # Corner accent dot
        c.setFillColor(Color(0.79, 0.64, 0.15, alpha=0.5))
        c.circle(cx, cy, 2, stroke=0, fill=1)

    # Save
    c.save()
    print(f"Mood board saved to: {OUTPUT_PATH}")

if __name__ == "__main__":
    create_moodboard()
