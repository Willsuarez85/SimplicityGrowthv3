# fal.ai Integration Documentation

> **Integration Type:** MCP Server
> **Package:** fal-image-video-mcp
> **Purpose:** AI-powered image and video generation for content production

---

## Overview

This integration connects the Simplicity Growth Marketing agent system to [fal.ai](https://fal.ai), providing access to 21+ generative AI models for image and video creation.

**Primary User:** `prompt-asset-engineer` agent

---

## Configuration

### MCP Server Setup

Location: `.mcp.json`

```json
{
  "fal-ai": {
    "command": "npx",
    "args": ["-y", "fal-image-video-mcp"],
    "env": {
      "FAL_KEY": "YOUR_FAL_API_KEY",
      "DOWNLOAD_PATH": "/path/to/generated-assets",
      "AUTOOPEN": "false"
    }
  }
}
```

### Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `FAL_KEY` | Yes | fal.ai API key from [fal.ai/dashboard](https://fal.ai/dashboard) | - |
| `DOWNLOAD_PATH` | No | Directory for auto-saved generated assets | `~/Downloads` |
| `AUTOOPEN` | No | Auto-open generated files | `true` |
| `ENABLE_DATA_URLS` | No | Include base64 encoded URLs | `false` |
| `MAX_DATA_URL_SIZE` | No | Max size for data URLs | `2MB` |

---

## Available Models

### Image Generation (9 models)

| Model ID | Name | Best Use Case |
|----------|------|---------------|
| `nano_banana_pro` | Nano Banana Pro (Gemini) | Premium 4K hero images, character consistency |
| `imagen4` | Google Imagen 4 | High-quality hero images |
| `flux_kontext` | FLUX Kontext | Context-aware editing |
| `flux_dev` | FLUX Dev | Fast iteration, versatile |
| `ideogram_v3` | Ideogram v3 | Text-heavy graphics |
| `recraft_v3` | Recraft v3 | Clean design assets |
| `stable_diffusion_35` | Stable Diffusion 3.5 | Wide style range |
| `hidream` | HiDream | Artistic styles |
| `janus` | Janus | Complex multi-modal |

### Image-to-Image / Edit (2 models)

| Model ID | Name | Best Use Case |
|----------|------|---------------|
| `nano_banana_pro_edit` | Nano Banana Pro Edit | Premium editing, multi-image reference (up to 10) |
| `flux_kontext` | FLUX Kontext | Style-consistent transformations |

### Text-to-Video (7 models)

| Model ID | Name | Best Use Case |
|----------|------|---------------|
| `veo3` | Google Veo 3 | Premium cinematic video |
| `kling_master_text` | Kling Master | Reliable quality |
| `luma_ray2` | Luma Ray 2 | Dynamic camera work |
| `magi` | Magi | Creative/experimental |
| `pixverse_text` | PixVerse | Quick short clips |
| `wan_pro_text` | Wan Pro | Realistic motion |
| `vidu_text` | Vidu | Character consistency |

### Image-to-Video (6 models)

| Model ID | Name | Best Use Case |
|----------|------|---------------|
| `kling_master_image` | Kling Master I2V | Smooth animation |
| `luma_ray2_image` | Luma Ray 2 I2V | Cinematic motion |
| `pixverse_image` | PixVerse I2V | Fast simple motion |
| `hunyuan_image` | Hunyuan I2V | Character animation |
| `wan_pro_image` | Wan Pro I2V | Natural movement |
| `vidu_image` | Vidu I2V | Facial expressions |

---

## MCP Tool Commands

### Discovery

```
list_available_models
```
Returns all available models categorized by type.

### Image Generation

```
generate_nano_banana_pro
generate_flux_dev
generate_imagen4
generate_ideogram_v3
generate_recraft_v3
generate_stable_diffusion_35
generate_flux_kontext
generate_hidream
generate_janus
```

### Image-to-Image / Edit

```
generate_nano_banana_pro_edit
generate_flux_kontext
```

### Text-to-Video

```
generate_veo3
generate_kling_master_text
generate_luma_ray2
generate_magi
generate_pixverse_text
generate_wan_pro_text
generate_vidu_text
```

### Image-to-Video

```
generate_kling_master_image
generate_luma_ray2_image
generate_pixverse_image
generate_hunyuan_image
generate_wan_pro_image
generate_vidu_image
```

### Custom Model Access

```
execute_custom_model
```
Access any fal.ai endpoint beyond the curated registry.

---

## Workflow Examples

### Basic Image Generation

```
1. Call generate_nano_banana_pro or generate_flux_dev with prompt
2. Asset auto-saves to /generated-assets/
3. Tool returns: public URL, local path, metadata
```

### Image-to-Image Editing

```
1. Generate or obtain base image URL
2. Call generate_nano_banana_pro_edit with image URL(s) and edit prompt
3. Can reference up to 10 images for style/character consistency
4. Edited image auto-saves to /generated-assets/
```

### Image-to-Video Chain

```
1. Generate base image with generate_nano_banana_pro or generate_imagen4
2. Use image URL with generate_luma_ray2_image
3. Video auto-saves with motion applied
```

### Production Workflow

```
1. prompt-asset-engineer receives creative brief
2. Selects appropriate model based on content type
3. Generates asset with brand-aligned prompt
4. Asset auto-saves to client folder
5. Documents prompt in prompt library
6. Hands off to delivery-documentation-manager
```

---

## Output Structure

Each generation returns:

```json
{
  "publicUrl": "https://fal.media/files/...",
  "localPath": "/generated-assets/filename.png",
  "dataUrl": "data:image/png;base64,...",
  "metadata": {
    "width": 1024,
    "height": 1024,
    "model": "flux_dev",
    "prompt": "...",
    "seed": 12345
  }
}
```

---

## File Organization

Generated assets are stored in:

```
/generated-assets/
├── images/
│   └── {client}_{model}_{timestamp}.{ext}
└── videos/
    └── {client}_{model}_{timestamp}.{ext}
```

---

## Pricing Notes

fal.ai charges per generation. Costs vary by:
- Model complexity (Veo 3 > FLUX Dev)
- Resolution/duration
- Image vs video

Check [fal.ai/pricing](https://fal.ai/pricing) for current rates.

---

## Troubleshooting

### "FAL_KEY not found"
- Verify API key is set in `.mcp.json`
- Restart Claude Code to reload MCP servers

### "Model not available"
- Use `list_available_models` to see current registry
- Try `execute_custom_model` for unlisted endpoints

### "Generation failed"
- Check fal.ai dashboard for API status
- Review prompt for prohibited content
- Try different model for complex requests

---

## Related Documentation

- [prompt-asset-engineer.md](../.claude/agents/prompt-asset-engineer.md) - Primary agent using this integration
- [fal.ai Documentation](https://fal.ai/docs) - Official API docs
- [fal-image-video-mcp](https://github.com/RamboRogers/fal-image-video-mcp) - MCP server source

---

## Setup Checklist

- [ ] Get API key from [fal.ai/dashboard](https://fal.ai/dashboard)
- [ ] Replace `YOUR_FAL_API_KEY_HERE` in `.mcp.json`
- [ ] Restart Claude Code to load MCP server
- [ ] Test with `list_available_models`
- [ ] Verify asset download path exists
