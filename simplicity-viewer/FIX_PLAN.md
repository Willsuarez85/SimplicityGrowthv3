# Plan de Corrección: Sistema de Archivos Simplicity Viewer

## 🔴 Problemas Identificados

### 1. **API Route Path Structure - CRÍTICO**
**Problema**: La API route `/api/files/[...path]/route.ts` espera un array de paths que se resuelve desde `CLIENTS_PATH`, pero:
- `ThreePanelLayout` llama a `/api/files/${encodeURIComponent(selectedPath)}` donde `selectedPath` es `"01-research/file.md"` (sin clientSlug)
- `ContentViewer` llama a `/api/files/${clientSlug}/${filePath}` pero la estructura no coincide
- La API espera que el path incluya el `clientSlug` como primer segmento

**Solución**: 
- Cambiar la estructura para que la API route reciba: `[clientSlug, ...restOfPath]`
- O crear una nueva estructura más clara: `/api/files/[clientSlug]/[...path]`

### 2. **FolderTree No Funcional en Página Cliente**
**Problema**: En `/client/[slug]/page.tsx`, el `FolderTree` se muestra pero no tiene `onFileSelect`, entonces los clicks no hacen nada.

**Solución**: Agregar handler para abrir archivos en modal o redirigir a `/client/[slug]/files`

### 3. **No Hay Descarga de Archivos**
**Problema**: No existe funcionalidad para descargar archivos.

**Solución**: 
- Agregar botón de descarga en `FileHeader` y `FilePropertiesPanel`
- Crear API route `GET /api/files/[clientSlug]/[...path]?download=true` que retorne el archivo con headers de descarga

### 4. **No Hay Edición de Archivos**
**Problema**: No existe funcionalidad para editar y guardar archivos.

**Solución**:
- Crear API route `PUT /api/files/[clientSlug]/[...path]` para guardar cambios
- Agregar modo de edición en `MarkdownViewer` o crear componente `MarkdownEditor`
- Agregar botón "Edit" en `FileHeader`

### 5. **ContentViewer No Funciona Correctamente**
**Problema**: `ContentViewer` tiene la URL incorrecta y solo muestra texto plano, no renderiza markdown.

**Solución**: 
- Arreglar la URL del fetch
- Usar `MarkdownViewer` en lugar de mostrar texto plano

### 6. **No Soporta Imágenes**
**Problema**: Las imágenes se retornan como base64 pero no se muestran correctamente.

**Solución**: Crear componente `ImageViewer` para mostrar imágenes con zoom

### 7. **No Soporta YAML/JSON Bonito**
**Problema**: YAML y JSON se muestran como texto plano.

**Solución**: Crear componentes `YAMLViewer` y `JSONViewer` con syntax highlighting

---

## ✅ Plan de Implementación

### Fase 1: Arreglar Estructura de API (PRIORIDAD ALTA)

#### 1.1 Crear Nueva Estructura de API Route
```typescript
// app/api/files/[clientSlug]/[...path]/route.ts
// Estructura más clara: /api/files/[clientSlug]/01-research/file.md
```

#### 1.2 Actualizar Todas las Llamadas
- `ThreePanelLayout.tsx`: Cambiar fetch a nueva estructura
- `ContentViewer.tsx`: Actualizar URL
- Cualquier otro componente que use la API

### Fase 2: Hacer FolderTree Funcional

#### 2.1 En Página de Cliente
- Agregar `onFileSelect` que redirija a `/client/[slug]/files?file=path`
- O abrir modal con preview

#### 2.2 En Página de Files
- Ya tiene `onFileSelect` pero verificar que funcione correctamente

### Fase 3: Agregar Descarga

#### 3.1 API Route para Descarga
```typescript
// GET /api/files/[clientSlug]/[...path]?download=true
// Retorna archivo con Content-Disposition header
```

#### 3.2 UI para Descarga
- Botón en `FileHeader`
- Botón en `FilePropertiesPanel`
- Botón en `FolderTree` (opcional, con menu contextual)

### Fase 4: Agregar Edición

#### 4.1 API Route para Guardar
```typescript
// PUT /api/files/[clientSlug]/[...path]
// Body: { content: string }
```

#### 4.2 Editor de Markdown
- Modo de edición en `MarkdownViewer`
- O crear componente separado `MarkdownEditor`
- Botón "Edit" / "Save" / "Cancel"

### Fase 5: Mejorar Viewers

#### 5.1 ImageViewer
- Componente para mostrar imágenes
- Zoom in/out
- Fullscreen

#### 5.2 YAMLViewer y JSONViewer
- Syntax highlighting
- Formato bonito
- Collapse/expand para JSON

---

## 📋 Checklist de Implementación

### API Routes
- [ ] Crear `/api/files/[clientSlug]/[...path]/route.ts` (GET)
- [ ] Crear `/api/files/[clientSlug]/[...path]/route.ts` (PUT) para editar
- [ ] Agregar query param `?download=true` para descarga
- [ ] Manejar diferentes tipos de archivo (text, image, binary)

### Componentes Frontend
- [ ] Arreglar `ThreePanelLayout.tsx` - URL de fetch
- [ ] Arreglar `ContentViewer.tsx` - URL y usar MarkdownViewer
- [ ] Agregar `onFileSelect` en página de cliente
- [ ] Agregar botones de descarga en `FileHeader`
- [ ] Agregar modo edición en `MarkdownViewer`
- [ ] Crear `ImageViewer.tsx`
- [ ] Crear `YAMLViewer.tsx`
- [ ] Crear `JSONViewer.tsx`

### Testing
- [ ] Probar carga de archivos markdown
- [ ] Probar carga de imágenes
- [ ] Probar descarga de archivos
- [ ] Probar edición y guardado
- [ ] Probar navegación desde página de cliente

---

## 🔧 Cambios Técnicos Detallados

### 1. Nueva Estructura de API Route

**Archivo**: `app/api/files/[clientSlug]/[...path]/route.ts`

```typescript
export async function GET(
  request: Request,
  { params }: { params: Promise<{ clientSlug: string; path: string[] }> }
) {
  const { clientSlug, path } = await params;
  const filePath = path.join(CLIENTS_PATH, clientSlug, ...path);
  // ... resto del código
}
```

### 2. Actualizar ThreePanelLayout

**Cambio en línea 60**:
```typescript
// ANTES:
const response = await fetch(`/api/files/${encodeURIComponent(selectedPath)}`);

// DESPUÉS:
const response = await fetch(`/api/files/${clientSlug}/${selectedPath}`);
```

### 3. Agregar Descarga

**Nueva función en API route**:
```typescript
if (searchParams.get('download') === 'true') {
  const fileBuffer = fs.readFileSync(filePath);
  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`,
      'Content-Type': getMimeType(filePath),
    },
  });
}
```

### 4. Agregar Edición

**Nueva función PUT**:
```typescript
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ clientSlug: string; path: string[] }> }
) {
  const { clientSlug, path } = await params;
  const { content } = await request.json();
  const filePath = path.join(CLIENTS_PATH, clientSlug, ...path);
  
  // Security check
  // Write file
  fs.writeFileSync(filePath, content, 'utf-8');
  
  return NextResponse.json({ success: true });
}
```

---

## 🚀 Orden de Ejecución Recomendado

1. **Paso 1**: Arreglar estructura de API route (más crítico)
2. **Paso 2**: Actualizar todas las llamadas a la API
3. **Paso 3**: Hacer FolderTree funcional en página de cliente
4. **Paso 4**: Agregar descarga
5. **Paso 5**: Agregar edición
6. **Paso 6**: Mejorar viewers (imágenes, YAML, JSON)

---

## 📝 Notas Adicionales

- La estructura actual de `getFolderTree` retorna paths relativos al cliente (sin clientSlug)
- Necesitamos asegurar que todos los paths incluyan el clientSlug cuando se pasen a la API
- Considerar usar query params para algunas operaciones (download, edit mode)
- Agregar validación de seguridad en todas las rutas API


