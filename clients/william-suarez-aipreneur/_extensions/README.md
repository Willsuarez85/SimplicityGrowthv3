# Extensions: William Suarez - AIPRENEUR

> Extensiones personalizadas para el cliente AIPRENEUR

## Por qué este cliente tiene extensiones

William Suarez / AIPRENEUR es diferente al cliente típico de Simplicity:

| Aspecto | Cliente Típico | AIPRENEUR |
|---------|----------------|-----------|
| **Industria** | Restaurant, Realtor | AI Education |
| **Contenido** | 30-90s Reels | 8-15 min YouTube |
| **Objetivo** | Brand awareness | Course sales |
| **Técnico** | No | Sí |
| **Productos** | Servicios locales | Cursos digitales |

## Extensiones Activas

### 🤖 Agentes Custom

| Agente | Propósito | Archivo |
|--------|-----------|---------|
| `ai-course-creator` | Contenido educativo de AI | `agents/ai-course-creator.md` |

### 📝 Templates Custom

| Template | Propósito | Archivo |
|----------|-----------|---------|
| `youtube_longform_script` | Scripts para videos 8-15 min | `templates/youtube_longform_script.md` |
| `course_module_outline` | Estructura de módulos | `templates/course_module_outline.md` (pending) |

### 📊 Knowledge Custom

| Knowledge | Propósito | Archivo |
|-----------|-----------|---------|
| `ai_education_market_2026` | Inteligencia de mercado | `knowledge/ai_education_market_2026.md` |

## Cómo se usan

### Automáticamente

El sistema lee `client_config.yaml` y carga las extensiones:

```yaml
# En client_config.yaml
extensions:
  agents:
    - ai-course-creator.md
  templates:
    - youtube_longform_script.md
  knowledge:
    - ai_education_market_2026.md
```

### Manualmente

Puedes invocar el agente directamente:

```
"Usa ai-course-creator para crear un tutorial de YouTube sobre agentes AI"
```

## Agregar nuevas extensiones

### Nuevo Agente

1. Crear archivo en `_extensions/agents/new-agent.md`
2. Seguir formato estándar de agentes
3. Agregar a `client_config.yaml` en `extensions.agents`

### Nuevo Template

1. Crear archivo en `_extensions/templates/new-template.md`
2. Agregar a `client_config.yaml` en `extensions.templates`

### Nuevo Knowledge

1. Crear archivo en `_extensions/knowledge/new-knowledge.md`
2. Agregar a `client_config.yaml` en `extensions.knowledge`

---

*Parte del sistema híbrido SimplicityAgents v3*



