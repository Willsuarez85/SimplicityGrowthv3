# Visual Delivery Dashboard

> Interactive HTML reports for creative asset delivery and review.

## Overview

The Visual Delivery Dashboard is a static HTML report generation system that creates professional, interactive delivery reports for client projects. Each report provides a comprehensive view of generated assets, scripts, captions, and brand guidelines with built-in action capabilities.

## Directory Structure

```
dashboard/
├── assets/
│   ├── dashboard.css      # Shared styles (CSS custom properties)
│   └── dashboard.js       # Interactive functionality
├── generator/
│   └── build_report.py    # Python report generator
├── reports/
│   └── [client-slug]/     # Generated reports by client
│       └── [project]_[YYYYMMDD].html
├── templates/
│   └── visual_report_template.html  # Main report template
├── index.html             # Master dashboard entry point
└── README.md              # This file
```

## Quick Start

### Generate a Report

```bash
cd dashboard/generator
python build_report.py --client william-suarez-aipreneur --project como-monetizar-con-ia --open
```

### View All Reports

Open `dashboard/index.html` in a browser to see all client reports.

## Report Generator

The `build_report.py` script automates report generation by:

1. **Parsing delivery summaries** from `clients/[slug]/05-deliverables/delivery_summary.md`
2. **Extracting prompts** from prompt package files
3. **Processing scripts** with timestamp sections
4. **Loading brand guidelines** from Brand DNA documents
5. **Rendering templates** with all collected data

### CLI Usage

```bash
python build_report.py --client [client-slug] --project [project-name] [--open]

Options:
  --client    Client folder slug (e.g., william-suarez-aipreneur)
  --project   Project name for the report
  --open      Auto-open in browser after generation
```

### Parser Classes

| Class | Purpose | Source File |
|-------|---------|-------------|
| `DeliverySummaryParser` | Extracts delivery metadata | `delivery_summary.md` |
| `PromptPackageParser` | Parses `[PROMPT ID]` blocks | `prompt_package.md` |
| `ScriptParser` | Extracts timestamped scenes | `script_*.md` |
| `BrandDNAParser` | Colors, typography, voice | `brand_dna_*.md` |
| `TemplateEngine` | `{{variable}}` replacement | Template files |

## Template Variables

The HTML template uses Mustache-style `{{VARIABLE}}` placeholders:

### Project Info
| Variable | Description |
|----------|-------------|
| `{{PROJECT_TITLE}}` | Display name of the project |
| `{{CLIENT_SLUG}}` | URL-safe client identifier |
| `{{PROJECT_SLUG}}` | URL-safe project identifier |
| `{{DELIVERY_DATE}}` | Formatted delivery date |
| `{{PROJECT_TYPE}}` | Content format (Reel, Post, etc.) |
| `{{STATUS}}` | Delivery status text |
| `{{STATUS_CLASS}}` | CSS class (`complete` or `pending`) |

### Content Metrics
| Variable | Description |
|----------|-------------|
| `{{FORMAT}}` | Video format (Vertical 9:16, etc.) |
| `{{DURATION}}` | Content length (75-90 seconds) |
| `{{SCENE_COUNT}}` | Number of scenes |
| `{{ASSET_COUNT}}` | Number of generated files |
| `{{CORE_MESSAGE}}` | Central theme/message |

### Dynamic HTML Content
| Variable | Description |
|----------|-------------|
| `{{WORKFLOW_STEPS}}` | HTML workflow status steps |
| `{{ASSET_CARDS}}` | HTML grid of asset cards |
| `{{SCENE_TIMELINE}}` | HTML timeline items |
| `{{FULL_SCRIPT}}` | Complete script text |
| `{{INSTAGRAM_CAPTION}}` | Platform-specific caption |
| `{{TIKTOK_CAPTION}}` | Platform-specific caption |
| `{{COLOR_SWATCHES}}` | HTML color palette |
| `{{TYPOGRAPHY_SPECS}}` | HTML font specs |
| `{{VOICE_DO}}` | HTML list items |
| `{{VOICE_DONT}}` | HTML list items |
| `{{AUDIO_SPECS}}` | HTML audio direction |
| `{{ASSET_OPTIONS}}` | HTML select options |
| `{{RELATED_DOCUMENTS}}` | HTML document links |

### Data Objects
| Variable | Description |
|----------|-------------|
| `{{ASSETS_JSON}}` | JSON object of asset paths/metadata |
| `{{PROMPTS_JSON}}` | JSON object of generation prompts |

## Report Features

### Asset Gallery
- Visual grid of all generated images
- Click to open modal with full details
- Toggle between grid and list views
- Download individual or all assets

### Script & Copy
- Full script with copy-to-clipboard
- Scene-by-scene timeline
- Platform-specific captions (Instagram/TikTok tabs)

### Brand Guidelines
- Color palette with hex values
- Typography specifications
- Tone of voice do's and don'ts
- Audio direction notes

### Quick Actions
1. **Regenerate Asset** - Copy prompt for fal.ai regeneration
2. **Improve Copy** - Generate improvement prompts for Claude
3. **Generate Variations** - Create alternative hooks/thumbnails
4. **Export Package** - Prepare download bundle

## JavaScript API

The dashboard exposes these global functions:

```javascript
// View Controls
toggleViewMode()           // Switch grid/list view

// Modal
closeModal()               // Close asset modal

// Copy Functions
copyScript()               // Copy full script
copyCaption(platform)      // Copy platform caption ('instagram'/'tiktok')
copyPrompt()               // Copy asset generation prompt

// Actions
regenerateAsset()          // Prepare regeneration request
regenerateFromModal()      // Regenerate from modal view
improveCopy()              // Generate improvement prompt
generateVariations()       // Create variation prompts
exportPackage()            // Prepare export bundle
downloadAllAssets()        // List all asset paths

// Notifications
showToast(message, type, duration)  // Show toast notification
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `G` | Toggle grid/list view |
| `1-5` | Navigate to sections |
| `Esc` | Close modal |

## CSS Theme

The dashboard uses CSS custom properties for consistent theming:

```css
/* Primary Colors */
--primary-50 through --primary-950

/* Gray Scale */
--gray-50 through --gray-950

/* Accent Colors */
--accent-green, --accent-amber, --accent-red, --accent-blue

/* Typography */
--font-sans: 'Inter', system-ui, sans-serif
--font-mono: 'JetBrains Mono', monospace
```

## Integration with Agents

The `delivery-documentation-manager` agent triggers report generation after creative work is complete:

1. Agent gathers project data from client folder structure
2. Queries MCP Knowledge Graph for brand context
3. Calls the Python generator or manually renders template
4. Updates master dashboard index with new report

### Memory Queries Used

```javascript
// Get brand context
mcp__memory__open_nodes(["[client-slug]-brand", "[client-slug]-voice", "[client-slug]-visual"])

// Get avatar information
mcp__memory__search_nodes("[client-slug]-avatar")
```

## File Dependencies

Reports reference assets using relative paths:

```
../../../clients/[client]/04-assets/images/[project]/[file].jpg
```

Ensure generated assets exist in the client folder structure before generating reports.

## Extending

### Adding New Report Sections

1. Add HTML section in `visual_report_template.html`
2. Define new `{{VARIABLE}}` placeholders
3. Update parser in `build_report.py` to extract new data
4. Add CSS styles in `dashboard.css`
5. Add interactivity in `dashboard.js` if needed

### Adding New Parsers

```python
class NewParser:
    """Parse new file format."""

    def __init__(self, file_path: Path):
        self.file_path = file_path

    def parse(self) -> Dict[str, Any]:
        """Extract data from file."""
        content = self.file_path.read_text()
        # Parsing logic here
        return extracted_data
```

## Known Limitations

- **Static HTML**: Reports are static snapshots, not live-updating
- **Local Assets**: Asset paths assume local file structure
- **Browser-Only**: Export features require manual file handling
- **Caption Parsing**: Some edge cases may show "not found" for complex captions

## Version

- **Dashboard**: 1.0
- **Generator**: 1.0
- **Template**: 1.0

---

*Part of SimplicityAgents v3.0 - Simplicity Growth Marketing*
