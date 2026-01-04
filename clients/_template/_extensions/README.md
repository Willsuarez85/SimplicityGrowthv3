# Client Extensions

> Extensiones personalizadas para este cliente específico.

## Propósito

Esta carpeta contiene recursos **específicos de este cliente** que extienden o sobrescriben el sistema base:

- **agents/** - Agentes personalizados para este cliente
- **templates/** - Templates específicos para este cliente  
- **knowledge/** - Conocimiento de industria específico

## ¿Cuándo usar extensiones?

| Situación | ¿Usar extensión? |
|-----------|------------------|
| Cliente tiene necesidades únicas | ✅ Sí |
| Cliente necesita formato especial (ej: cursos) | ✅ Sí |
| Cliente tiene templates propios | ✅ Sí |
| Cliente es similar a otros | ❌ No, usar sistema base |

## Estructura

```
_extensions/
├── agents/              # Agentes custom
│   └── example-agent.md
├── templates/           # Templates custom
│   └── example-template.md
├── knowledge/           # Knowledge específica
│   └── industry-insights.md
└── README.md           # Este archivo
```

## Cómo crear una extensión

### 1. Agente Custom

Crear archivo en `agents/` siguiendo el formato estándar:

```markdown
---
name: [agent-name]
description: [Descripción del agente y cuándo usarlo]
model: sonnet
color: blue
---

[Instrucciones del agente...]
```

### 2. Template Custom

Crear archivo en `templates/` con el formato deseado.

### 3. Knowledge Custom

Crear archivo en `knowledge/` con insights específicos de la industria del cliente.

## Carga de Extensiones

El sistema carga extensiones automáticamente cuando detecta archivos en estas carpetas:

1. Primero carga agentes/templates BASE de `/.claude/agents/` y `/templates/`
2. Luego verifica si existe `_extensions/`
3. Si existe, carga y combina las extensiones

## Importante

- Las extensiones **extienden**, no reemplazan completamente el sistema base
- Si un agente custom tiene el mismo nombre que uno base, se usa el custom
- Documenta siempre POR QUÉ existe cada extensión

---

*Parte del sistema SimplicityAgents v3 - Modelo Híbrido*

