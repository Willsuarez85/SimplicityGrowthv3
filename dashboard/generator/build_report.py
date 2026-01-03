#!/usr/bin/env python3
"""
SimplicityAgents Visual Delivery Dashboard - Report Generator
Generates interactive HTML reports from delivery documentation.

Usage:
    python build_report.py --client [client-slug] --project [project-name]
    python build_report.py --delivery-path [path/to/delivery_summary.md]
"""

import os
import re
import json
import argparse
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional, Any


# ============================================
# CONFIGURATION
# ============================================

BASE_DIR = Path(__file__).parent.parent.parent
CLIENTS_DIR = BASE_DIR / "clients"
DASHBOARD_DIR = BASE_DIR / "dashboard"
TEMPLATES_DIR = DASHBOARD_DIR / "templates"
REPORTS_DIR = DASHBOARD_DIR / "reports"
ASSETS_DIR = DASHBOARD_DIR / "assets"


# ============================================
# PARSERS
# ============================================

class DeliverySummaryParser:
    """Parses delivery_summary.md files."""

    def __init__(self, content: str):
        self.content = content
        self.data = {}

    def parse(self) -> Dict[str, Any]:
        """Parse the delivery summary and return structured data."""
        self.data = {
            'client': self._extract_client(),
            'project': self._extract_project(),
            'delivery_date': self._extract_date(),
            'workflow': self._extract_workflow(),
            'status': self._extract_status(),
            'assets': self._extract_assets(),
            'documents': self._extract_documents(),
            'workflow_phases': self._extract_workflow_phases(),
        }
        return self.data

    def _extract_client(self) -> str:
        """Extract client name from header."""
        match = re.search(r'\*\*Client:\*\*\s*(.+)', self.content)
        return match.group(1).strip() if match else "Unknown Client"

    def _extract_project(self) -> str:
        """Extract project type from header."""
        match = re.search(r'\*\*Project:\*\*\s*(.+)', self.content)
        return match.group(1).strip() if match else "Unknown Project"

    def _extract_date(self) -> str:
        """Extract delivery date."""
        match = re.search(r'\*\*Delivery Date:\*\*\s*(.+)', self.content)
        return match.group(1).strip() if match else datetime.now().strftime("%Y-%m-%d")

    def _extract_workflow(self) -> str:
        """Extract workflow type."""
        match = re.search(r'\*\*Workflow:\*\*\s*(.+)', self.content)
        return match.group(1).strip() if match else "Standard"

    def _extract_status(self) -> str:
        """Extract delivery status."""
        match = re.search(r'## Delivery Status:\s*(\w+)', self.content)
        return match.group(1).strip() if match else "IN PROGRESS"

    def _extract_assets(self) -> List[Dict[str, str]]:
        """Extract assets from markdown tables."""
        assets = []

        # Find asset tables (look for tables with Asset/Filename columns)
        table_pattern = r'\| Asset \| Filename \| Size \| Scene Use \|[\s\S]*?(?=\n\n|\n###|\Z)'
        table_match = re.search(table_pattern, self.content)

        if table_match:
            table_text = table_match.group(0)
            rows = table_text.strip().split('\n')

            for row in rows[2:]:  # Skip header and separator
                if row.strip() and row.startswith('|'):
                    cells = [c.strip() for c in row.split('|')[1:-1]]
                    if len(cells) >= 4:
                        # Extract filename from backticks
                        filename_match = re.search(r'`([^`]+)`', cells[1])
                        filename = filename_match.group(1) if filename_match else cells[1]

                        assets.append({
                            'title': cells[0],
                            'filename': filename,
                            'size': cells[2],
                            'scene': cells[3],
                        })

        return assets

    def _extract_documents(self) -> List[Dict[str, str]]:
        """Extract related documents from tables."""
        documents = []

        # Find document tables
        table_pattern = r'\| Document \| Location \| Lines \| Purpose \|[\s\S]*?(?=\n\n|\n###|\Z)'
        table_match = re.search(table_pattern, self.content)

        if table_match:
            table_text = table_match.group(0)
            rows = table_text.strip().split('\n')

            for row in rows[2:]:
                if row.strip() and row.startswith('|'):
                    cells = [c.strip() for c in row.split('|')[1:-1]]
                    if len(cells) >= 4:
                        # Extract path from backticks
                        path_match = re.search(r'`([^`]+)`', cells[1])
                        path = path_match.group(1) if path_match else cells[1]

                        documents.append({
                            'name': cells[0],
                            'path': path,
                            'lines': cells[2],
                            'purpose': cells[3],
                        })

        return documents

    def _extract_workflow_phases(self) -> List[Dict[str, str]]:
        """Extract workflow completion status."""
        phases = []

        # Find workflow status table
        table_pattern = r'\| Phase \| Agent \| Status \|[\s\S]*?(?=\n\n|\n###|\Z)'
        table_match = re.search(table_pattern, self.content)

        if table_match:
            table_text = table_match.group(0)
            rows = table_text.strip().split('\n')

            for row in rows[2:]:
                if row.strip() and row.startswith('|'):
                    cells = [c.strip() for c in row.split('|')[1:-1]]
                    if len(cells) >= 3:
                        phases.append({
                            'phase': cells[0],
                            'agent': cells[1],
                            'status': cells[2],
                        })

        return phases


class PromptPackageParser:
    """Parses prompt package files with [PROMPT ID] blocks."""

    def __init__(self, content: str):
        self.content = content

    def parse(self) -> Dict[str, Dict[str, str]]:
        """Extract all prompts indexed by ID."""
        prompts = {}

        # Split by prompt blocks
        blocks = re.split(r'(?=\[PROMPT ID\]:)', self.content)

        for block in blocks:
            if '[PROMPT ID]:' not in block:
                continue

            prompt_data = {}

            # Extract PROMPT ID
            id_match = re.search(r'\[PROMPT ID\]:\s*(.+)', block)
            if not id_match:
                continue
            prompt_id = id_match.group(1).strip()

            # Extract MODEL
            model_match = re.search(r'\[MODEL\]:\s*(.+)', block)
            prompt_data['model'] = model_match.group(1).strip() if model_match else 'unknown'

            # Extract TYPE
            type_match = re.search(r'\[TYPE\]:\s*(.+)', block)
            prompt_data['type'] = type_match.group(1).strip() if type_match else 'image'

            # Extract MAIN PROMPT - everything between [MAIN PROMPT]: and next marker or end
            main_match = re.search(
                r'\[MAIN PROMPT\]:\s*\n([\s\S]*?)(?=\n\[(?:NEGATIVE PROMPT|PROMPT ID)\]|\Z)',
                block
            )
            if main_match:
                prompt_data['main_prompt'] = main_match.group(1).strip()

            # Extract NEGATIVE PROMPT if present
            neg_match = re.search(
                r'\[NEGATIVE PROMPT\]:\s*\n([\s\S]*?)(?=\n\[PROMPT ID\]|\Z)',
                block
            )
            if neg_match:
                prompt_data['negative_prompt'] = neg_match.group(1).strip()

            prompts[prompt_id] = prompt_data

        return prompts


class ScriptParser:
    """Parses script files with timestamp sections."""

    def __init__(self, content: str):
        self.content = content

    def parse(self) -> Dict[str, Any]:
        """Extract script data including scenes."""
        data = {
            'full_script': self._extract_full_script(),
            'scenes': self._extract_scenes(),
            'duration': self._calculate_duration(),
        }
        return data

    def _extract_full_script(self) -> str:
        """Extract the complete script text."""
        # Look for script content section
        script_match = re.search(
            r'## (?:Complete )?Script[\s\S]*?```[\s\S]*?```|'
            r'## Script Content\s*\n([\s\S]*?)(?=\n##|\Z)',
            self.content
        )

        if script_match:
            return script_match.group(0)

        # Alternative: extract all scene text
        scenes = self._extract_scenes()
        return '\n\n'.join([f"[{s['timestamp']}] {s['title']}\n{s['content']}" for s in scenes])

    def _extract_scenes(self) -> List[Dict[str, str]]:
        """Extract timestamped scenes."""
        scenes = []

        # Pattern for timestamp headers like ### [0:00-0:03] HOOK
        pattern = r'###\s*\[(\d+:\d+(?:-\d+:\d+)?)\]\s*(.+?)\n([\s\S]*?)(?=\n###|\Z)'
        matches = re.findall(pattern, self.content)

        for idx, (timestamp, title, content) in enumerate(matches):
            scenes.append({
                'id': f'scene_{idx + 1}',
                'timestamp': timestamp,
                'title': title.strip(),
                'content': content.strip(),
            })

        return scenes

    def _calculate_duration(self) -> str:
        """Calculate total duration from timestamps."""
        scenes = self._extract_scenes()
        if not scenes:
            return "Unknown"

        # Get the last timestamp
        last_timestamp = scenes[-1]['timestamp']
        if '-' in last_timestamp:
            end_time = last_timestamp.split('-')[1]
        else:
            end_time = last_timestamp

        return f"~{end_time}"


class BrandDNAParser:
    """Parses brand DNA files for visual and voice guidelines."""

    def __init__(self, content: str):
        self.content = content

    def parse(self) -> Dict[str, Any]:
        """Extract brand DNA data."""
        return {
            'colors': self._extract_colors(),
            'typography': self._extract_typography(),
            'voice_style': self._extract_voice_style(),
            'voice_do': self._extract_voice_do(),
            'voice_dont': self._extract_voice_dont(),
            'emotional_posture': self._extract_emotional_posture(),
            'audio_direction': self._extract_audio_direction(),
        }

    def _extract_colors(self) -> List[Dict[str, str]]:
        """Extract color palette."""
        colors = []

        # Look for hex codes with names
        hex_pattern = r'(#[A-Fa-f0-9]{6})\s*[-–]\s*([^,\n]+)|([^:\n]+):\s*(#[A-Fa-f0-9]{6})'
        matches = re.findall(hex_pattern, self.content)

        for match in matches:
            if match[0]:  # Format: #HEX - Name
                colors.append({'hex': match[0], 'name': match[1].strip()})
            elif match[3]:  # Format: Name: #HEX
                colors.append({'hex': match[3], 'name': match[2].strip()})

        # Deduplicate
        seen = set()
        unique_colors = []
        for c in colors:
            if c['hex'] not in seen:
                seen.add(c['hex'])
                unique_colors.append(c)

        return unique_colors[:6]  # Limit to 6 colors

    def _extract_typography(self) -> Dict[str, str]:
        """Extract typography guidelines."""
        typography = {}

        # Look for font mentions
        font_match = re.search(r'(?:Font|Typography)[^:]*:\s*([^\n]+)', self.content, re.IGNORECASE)
        if font_match:
            typography['primary'] = font_match.group(1).strip()

        # Look for heading/body font specs
        heading_match = re.search(r'(?:Heading|Header|Title)[^:]*:\s*([^\n]+)', self.content, re.IGNORECASE)
        if heading_match:
            typography['heading'] = heading_match.group(1).strip()

        body_match = re.search(r'(?:Body|Text)[^:]*:\s*([^\n]+)', self.content, re.IGNORECASE)
        if body_match:
            typography['body'] = body_match.group(1).strip()

        return typography

    def _extract_voice_style(self) -> str:
        """Extract voice/language style."""
        match = re.search(
            r'(?:Voice Style|Language Style|Tone)[^:]*:\s*([^\n]+)',
            self.content, re.IGNORECASE
        )
        return match.group(1).strip() if match else "Professional and engaging"

    def _extract_voice_do(self) -> List[str]:
        """Extract 'Do' guidelines for voice."""
        do_items = []

        # Look for Do section
        do_match = re.search(
            r'(?:###?\s*)?(?:Do|Should|Best Practices)[:\s]*\n((?:[-*]\s*[^\n]+\n?)+)',
            self.content, re.IGNORECASE
        )

        if do_match:
            items = re.findall(r'[-*]\s*([^\n]+)', do_match.group(1))
            do_items = [item.strip() for item in items[:5]]

        return do_items or ["Be authentic and genuine", "Use conversational language"]

    def _extract_voice_dont(self) -> List[str]:
        """Extract 'Don't' guidelines for voice."""
        dont_items = []

        # Look for Don't section
        dont_match = re.search(
            r"(?:###?\s*)?(?:Don'?t|Avoid|Never)[:\s]*\n((?:[-*]\s*[^\n]+\n?)+)",
            self.content, re.IGNORECASE
        )

        if dont_match:
            items = re.findall(r'[-*]\s*([^\n]+)', dont_match.group(1))
            dont_items = [item.strip() for item in items[:5]]

        return dont_items or ["Avoid jargon", "Don't be overly formal"]

    def _extract_emotional_posture(self) -> str:
        """Extract emotional posture/tone."""
        match = re.search(
            r'(?:Emotional Posture|Emotional Tone|Posture)[^:]*:\s*([^\n]+)',
            self.content, re.IGNORECASE
        )
        return match.group(1).strip() if match else "Warm confidence"

    def _extract_audio_direction(self) -> Dict[str, str]:
        """Extract audio/music direction."""
        audio = {}

        # Look for music/audio mentions
        music_match = re.search(
            r'(?:Music|Audio|Sound)[^:]*:\s*([^\n]+)',
            self.content, re.IGNORECASE
        )
        if music_match:
            audio['style'] = music_match.group(1).strip()

        bpm_match = re.search(r'(\d{2,3})\s*(?:BPM|bpm)', self.content)
        if bpm_match:
            audio['bpm'] = bpm_match.group(1)

        return audio


# ============================================
# TEMPLATE ENGINE
# ============================================

class TemplateEngine:
    """Simple template engine using {{variable}} syntax."""

    def __init__(self, template_path: Path):
        with open(template_path, 'r', encoding='utf-8') as f:
            self.template = f.read()

    def render(self, context: Dict[str, Any]) -> str:
        """Render template with context data."""
        result = self.template

        for key, value in context.items():
            placeholder = '{{' + key + '}}'

            if isinstance(value, (dict, list)):
                # Convert to JSON for JavaScript
                replacement = json.dumps(value, ensure_ascii=False, indent=2)
            else:
                replacement = str(value) if value is not None else ''

            result = result.replace(placeholder, replacement)

        return result


# ============================================
# HTML GENERATORS
# ============================================

def generate_asset_cards(assets: List[Dict], assets_dir: str) -> str:
    """Generate HTML for asset cards grid."""
    if not assets:
        return '<p class="no-assets">No assets found</p>'

    cards = []
    for idx, asset in enumerate(assets):
        # Build image path
        img_path = f"{assets_dir}/{asset['filename']}"

        card = f'''
        <div class="asset-card"
             data-id="asset_{idx}"
             data-title="{asset['title']}"
             data-src="{img_path}"
             data-scene="{asset.get('scene', '-')}"
             data-size="{asset.get('size', '-')}"
             data-timestamp="{datetime.now().isoformat()}"
             data-prompt="">
            <div class="asset-preview">
                <img src="{img_path}" alt="{asset['title']}" loading="lazy">
            </div>
            <div class="asset-info">
                <h4>{asset['title']}</h4>
                <span class="asset-meta">{asset.get('scene', '')}</span>
            </div>
        </div>
        '''
        cards.append(card)

    return '\n'.join(cards)


def generate_asset_options(assets: List[Dict]) -> str:
    """Generate HTML options for asset select dropdown."""
    options = []
    for idx, asset in enumerate(assets):
        options.append(f'<option value="asset_{idx}">{asset["title"]}</option>')
    return '\n'.join(options)


def generate_scene_timeline(scenes: List[Dict]) -> str:
    """Generate HTML for scene timeline."""
    if not scenes:
        return '<p class="no-scenes">No scenes defined</p>'

    timeline_items = []
    for scene in scenes:
        item = f'''
        <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <span class="timeline-time">{scene['timestamp']}</span>
                <h4>{scene['title']}</h4>
                <p>{scene['content'][:150]}{'...' if len(scene['content']) > 150 else ''}</p>
            </div>
        </div>
        '''
        timeline_items.append(item)

    return '\n'.join(timeline_items)


def generate_color_swatches(colors: List[Dict]) -> str:
    """Generate HTML for color swatches."""
    if not colors:
        return '<p class="no-colors">No colors defined</p>'

    swatches = []
    for color in colors:
        swatch = f'''
        <div class="color-swatch">
            <div class="swatch-preview" style="background-color: {color['hex']}"></div>
            <div class="swatch-info">
                <span class="swatch-name">{color['name']}</span>
                <span class="swatch-hex">{color['hex']}</span>
            </div>
        </div>
        '''
        swatches.append(swatch)

    return '\n'.join(swatches)


def generate_typography_specs(typography: Dict) -> str:
    """Generate HTML for typography specifications."""
    if not typography:
        return '<p>Typography guidelines not specified</p>'

    specs = []
    for key, value in typography.items():
        specs.append(f'''
        <div class="type-spec">
            <span class="type-label">{key.title()}</span>
            <span class="type-value">{value}</span>
        </div>
        ''')

    return '\n'.join(specs)


def generate_voice_list(items: List[str]) -> str:
    """Generate HTML list items for voice guidelines."""
    if not items:
        return '<li>No guidelines specified</li>'
    return '\n'.join([f'<li>{item}</li>' for item in items])


def generate_audio_specs(audio: Dict) -> str:
    """Generate HTML for audio specifications."""
    if not audio:
        return '<p>Audio direction not specified</p>'

    specs = []
    for key, value in audio.items():
        specs.append(f'<p><strong>{key.title()}:</strong> {value}</p>')

    return '\n'.join(specs)


def generate_workflow_steps(phases: List[Dict]) -> str:
    """Generate HTML for workflow steps."""
    if not phases:
        return '<p>No workflow phases defined</p>'

    steps = []
    for phase in phases:
        status_class = phase['status'].lower().replace(' ', '-')
        icon = '&#10003;' if 'complete' in status_class else '&#8987;'

        step = f'''
        <div class="workflow-step status-{status_class}">
            <span class="step-icon">{icon}</span>
            <div class="step-content">
                <span class="step-title">{phase['phase']}</span>
                <span class="step-agent">{phase['agent']}</span>
            </div>
            <span class="step-status">{phase['status']}</span>
        </div>
        '''
        steps.append(step)

    return '\n'.join(steps)


def generate_related_documents(documents: List[Dict]) -> str:
    """Generate HTML for related documents list."""
    if not documents:
        return '<p>No related documents</p>'

    doc_items = []
    for doc in documents:
        item = f'''
        <div class="document-item">
            <span class="doc-icon">&#128196;</span>
            <div class="doc-info">
                <span class="doc-name">{doc['name']}</span>
                <span class="doc-path">{doc['path']}</span>
            </div>
            <span class="doc-purpose">{doc['purpose']}</span>
        </div>
        '''
        doc_items.append(item)

    return '\n'.join(doc_items)


# ============================================
# REPORT BUILDER
# ============================================

class ReportBuilder:
    """Main report builder class."""

    def __init__(self, client_slug: str, project_slug: str):
        self.client_slug = client_slug
        self.project_slug = project_slug
        self.client_dir = CLIENTS_DIR / client_slug
        self.context = {}

    def find_delivery_summary(self) -> Optional[Path]:
        """Find the delivery summary file for this project."""
        deliverables_dir = self.client_dir / "05-deliverables"

        if not deliverables_dir.exists():
            return None

        # Search for delivery_summary.md files
        for summary_file in deliverables_dir.rglob("delivery_summary.md"):
            return summary_file

        return None

    def find_prompt_file(self) -> Optional[Path]:
        """Find the prompt package file for this project."""
        prompts_dir = self.client_dir / "03-creative" / "prompts"

        if not prompts_dir.exists():
            return None

        # Search for prompt files matching project
        for prompt_file in prompts_dir.glob(f"*{self.project_slug}*prompts*.md"):
            return prompt_file

        # Fall back to any prompts file
        for prompt_file in prompts_dir.glob("*prompts*.md"):
            return prompt_file

        return None

    def find_script_file(self) -> Optional[Path]:
        """Find the script file for this project."""
        scripts_dir = self.client_dir / "03-creative" / "scripts"

        if not scripts_dir.exists():
            return None

        for script_file in scripts_dir.glob(f"*{self.project_slug}*.md"):
            return script_file

        for script_file in scripts_dir.glob("*.md"):
            return script_file

        return None

    def find_brand_dna(self) -> Optional[Path]:
        """Find the brand DNA file."""
        brand_dir = self.client_dir / "02-strategy" / "brand-dna"

        if not brand_dir.exists():
            return None

        # Look for brand profile or DNA files
        for brand_file in brand_dir.glob("*brand*profile*.md"):
            return brand_file

        for brand_file in brand_dir.glob("*brand*dna*.md"):
            return brand_file

        for brand_file in brand_dir.glob("*.md"):
            return brand_file

        return None

    def find_assets_directory(self) -> Optional[Path]:
        """Find the assets directory for this project."""
        assets_dir = self.client_dir / "04-assets" / "images"

        if not assets_dir.exists():
            return None

        # Look for project-specific folder
        for subdir in assets_dir.iterdir():
            if subdir.is_dir() and self.project_slug in subdir.name.lower():
                return subdir

        return assets_dir

    def build(self) -> str:
        """Build the complete report."""
        print(f"Building report for {self.client_slug}/{self.project_slug}...")

        # Parse delivery summary
        delivery_path = self.find_delivery_summary()
        if delivery_path:
            print(f"  Found delivery summary: {delivery_path}")
            with open(delivery_path, 'r', encoding='utf-8') as f:
                delivery_data = DeliverySummaryParser(f.read()).parse()
        else:
            print("  No delivery summary found, using defaults")
            delivery_data = {
                'client': self.client_slug,
                'project': self.project_slug,
                'delivery_date': datetime.now().strftime("%Y-%m-%d"),
                'status': 'IN PROGRESS',
                'assets': [],
                'documents': [],
                'workflow_phases': [],
            }

        # Parse prompts
        prompt_path = self.find_prompt_file()
        prompts = {}
        if prompt_path:
            print(f"  Found prompts: {prompt_path}")
            with open(prompt_path, 'r', encoding='utf-8') as f:
                prompts = PromptPackageParser(f.read()).parse()

        # Parse script
        script_path = self.find_script_file()
        script_data = {'full_script': '', 'scenes': [], 'duration': 'Unknown'}
        if script_path:
            print(f"  Found script: {script_path}")
            with open(script_path, 'r', encoding='utf-8') as f:
                script_data = ScriptParser(f.read()).parse()

        # Parse brand DNA
        brand_path = self.find_brand_dna()
        brand_data = {
            'colors': [],
            'typography': {},
            'voice_style': 'Professional',
            'voice_do': [],
            'voice_dont': [],
            'emotional_posture': 'Confident',
            'audio_direction': {},
        }
        if brand_path:
            print(f"  Found brand DNA: {brand_path}")
            with open(brand_path, 'r', encoding='utf-8') as f:
                brand_data = BrandDNAParser(f.read()).parse()

        # Find assets directory
        assets_dir = self.find_assets_directory()
        assets_rel_path = ""
        if assets_dir:
            # Calculate relative path from reports to assets
            assets_rel_path = f"../../clients/{self.client_slug}/04-assets/images/{assets_dir.name}"

        # Update asset prompts from parsed prompts
        assets_with_prompts = {}
        for idx, asset in enumerate(delivery_data['assets']):
            asset_id = f"asset_{idx}"
            assets_with_prompts[asset_id] = {
                'path': f"{assets_rel_path}/{asset['filename']}",
                'title': asset['title'],
                'scene': asset.get('scene', ''),
            }

        # Build prompts JSON (map asset IDs to prompts)
        prompts_json = {}
        for prompt_id, prompt_data in prompts.items():
            prompts_json[prompt_id] = prompt_data.get('main_prompt', '')

        # Determine status class
        status = delivery_data.get('status', 'IN PROGRESS')
        status_class = 'complete' if 'complete' in status.lower() else 'progress'

        # Build template context
        self.context = {
            # Project meta
            'PROJECT_TITLE': delivery_data.get('project', self.project_slug),
            'DELIVERY_DATE': delivery_data.get('delivery_date', datetime.now().strftime("%Y-%m-%d")),
            'PROJECT_TYPE': delivery_data.get('workflow', 'Content'),
            'STATUS': status,
            'STATUS_CLASS': status_class,
            'CLIENT_SLUG': self.client_slug,
            'PROJECT_SLUG': self.project_slug,
            'GENERATION_TIMESTAMP': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),

            # Overview
            'FORMAT': 'Short-form Video',
            'DURATION': script_data.get('duration', 'Unknown'),
            'SCENE_COUNT': len(script_data.get('scenes', [])),
            'ASSET_COUNT': len(delivery_data.get('assets', [])),
            'CORE_MESSAGE': self._extract_core_message(delivery_data),

            # Assets
            'ASSET_CARDS': generate_asset_cards(delivery_data.get('assets', []), assets_rel_path),
            'ASSET_OPTIONS': generate_asset_options(delivery_data.get('assets', [])),
            'ASSETS_JSON': assets_with_prompts,
            'PROMPTS_JSON': prompts_json,

            # Scripts
            'SCENE_TIMELINE': generate_scene_timeline(script_data.get('scenes', [])),
            'FULL_SCRIPT': script_data.get('full_script', 'Script not available'),
            'INSTAGRAM_CAPTION': self._find_caption('instagram'),
            'TIKTOK_CAPTION': self._find_caption('tiktok'),

            # Brand
            'COLOR_SWATCHES': generate_color_swatches(brand_data.get('colors', [])),
            'TYPOGRAPHY_SPECS': generate_typography_specs(brand_data.get('typography', {})),
            'VOICE_STYLE': brand_data.get('voice_style', ''),
            'EMOTIONAL_POSTURE': brand_data.get('emotional_posture', ''),
            'VOICE_DO': generate_voice_list(brand_data.get('voice_do', [])),
            'VOICE_DONT': generate_voice_list(brand_data.get('voice_dont', [])),
            'AUDIO_SPECS': generate_audio_specs(brand_data.get('audio_direction', {})),

            # Workflow
            'WORKFLOW_STEPS': generate_workflow_steps(delivery_data.get('workflow_phases', [])),

            # Documents
            'RELATED_DOCUMENTS': generate_related_documents(delivery_data.get('documents', [])),
        }

        # Render template
        template_path = TEMPLATES_DIR / "visual_report_template.html"
        engine = TemplateEngine(template_path)
        html = engine.render(self.context)

        return html

    def _extract_core_message(self, delivery_data: Dict) -> str:
        """Extract or generate core message."""
        # Try to find in documents or use project name
        project = delivery_data.get('project', self.project_slug)
        return f"Key delivery for {project}"

    def _find_caption(self, platform: str) -> str:
        """Find platform-specific caption."""
        # Look in creative package or handoff files
        creative_dir = self.client_dir / "03-creative"

        for md_file in creative_dir.rglob("*.md"):
            try:
                with open(md_file, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Look for platform caption section
                pattern = rf'(?:###?\s*)?{platform}(?:\s+Caption)?[:\s]*\n```([\s\S]*?)```'
                match = re.search(pattern, content, re.IGNORECASE)

                if match:
                    return match.group(1).strip()
            except:
                continue

        return f"Caption for {platform} not found"

    def save(self, html: str) -> Path:
        """Save the report to the reports directory."""
        # Create client reports directory
        client_reports_dir = REPORTS_DIR / self.client_slug
        client_reports_dir.mkdir(parents=True, exist_ok=True)

        # Generate filename
        timestamp = datetime.now().strftime("%Y%m%d")
        filename = f"{self.project_slug}_{timestamp}.html"
        output_path = client_reports_dir / filename

        # Write HTML
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(html)

        print(f"  Report saved: {output_path}")
        return output_path


# ============================================
# CLI
# ============================================

def main():
    parser = argparse.ArgumentParser(
        description='Generate visual delivery dashboard reports'
    )

    parser.add_argument(
        '--client', '-c',
        required=True,
        help='Client slug (e.g., william-suarez-aipreneur)'
    )

    parser.add_argument(
        '--project', '-p',
        default='latest',
        help='Project slug (e.g., como-monetizar-con-ia)'
    )

    parser.add_argument(
        '--open', '-o',
        action='store_true',
        help='Open report in browser after generation'
    )

    args = parser.parse_args()

    # Build report
    builder = ReportBuilder(args.client, args.project)
    html = builder.build()
    output_path = builder.save(html)

    print(f"\nReport generated successfully!")
    print(f"Location: {output_path}")

    # Open in browser if requested
    if args.open:
        import webbrowser
        webbrowser.open(f'file://{output_path}')


if __name__ == '__main__':
    main()
