# Generated Assets

Carpeta para assets generados por IA usando fal.ai y otros modelos.

## Estructura

```
generated-assets/
├── _archive/       # Imágenes de prueba/experimentales (no usar en producción)
├── production/     # Assets finales listos para usar
├── scripts/        # Scripts de generación (Python, etc.)
└── README.md
```

## Convención de Nombres

Los archivos generados por fal.ai siguen este patrón:
```
fal_[modelo]_[timestamp-ISO].jpg
```

**Ejemplos:**
- `fal_imagen4_2026-01-08T01-37-21-640Z.jpg`
- `fal_flux_dev_2026-01-02T14-58-39-397Z.jpg`
- `fal_ideogram_v3_2026-01-06T15-11-31-098Z.jpg`

## Modelos Disponibles

| Modelo | Mejor Para | Comando |
|--------|------------|---------|
| Ideogram v3 | Texto, diagramas, gráficos | `mcp__fal-ai__ideogram_v3` |
| FLUX Dev | Iteración rápida | `mcp__fal-ai__flux_dev` |
| Imagen 4 | Hero images de alta calidad | `mcp__fal-ai__imagen4` |
| Nano Banana Pro | Premium 4K | `mcp__fal-ai__nano_banana_pro` |

## Flujo de Trabajo

1. **Generar** → Los assets caen en `_archive/` por defecto
2. **Revisar** → Evaluar calidad y relevancia
3. **Promover** → Mover assets aprobados a `production/`
4. **Usar** → Copiar a `clients/[client]/04-assets/` cuando se asignen

## Limpieza

La carpeta `_archive/` puede limpiarse periódicamente.
Los assets en `production/` deben mantenerse hasta que se copien a un cliente.
