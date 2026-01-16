# Element Creation & Management Guide

This guide explains how to create new elements and variations using the auto-generating element registry system.

## Quick Start: Adding a Variation (< 3 minutes)

### 1. Create the Variation Folder

Create a new folder in the element's `variations/` directory with the naming pattern `NN-name` (two-digit number + kebab-case name):

```bash
mkdir packages/registry/src/elements/Header/variations/03-compact
```

### 2. Create the Component with JSDoc Metadata

Create `index.tsx` with JSDoc tags describing the variation:

```typescript
/**
 * @elementVariation
 * @name Compact Header
 * @description Minimal header design for space-constrained layouts
 */
export function CompactHeader() {
  return (
    <div className="h-12 bg-background-800 border-b border-background-700">
      {/* Component implementation */}
    </div>
  );
}
```

**JSDoc Tags Required:**
- `@elementVariation` - Marks this as an element variation
- `@name` - Display name for the variation
- `@description` - Brief description of the variation

### 3. Implement Supporting Files

Create any supporting components in subdirectories:

```
03-compact/
├── index.tsx              (required - exported component with JSDoc)
├── layout/
│   └── Header.tsx         (optional - layout components)
└── components/
    └── SearchBar.tsx      (optional - helper components)
```

### 4. Generate & Done!

```bash
cd packages/registry
pnpm generate
```

The system will:
- Extract metadata from your JSDoc comments
- Discover the component export name
- Generate preview file with auto-imports
- Generate demo component map
- Validate the structure
- Show any errors with helpful suggestions

That's it! Your variation is now registered and appears in the element gallery.

---

## Creating a New Element

### 1. Create Element Folder Structure

```bash
mkdir -p packages/registry/src/elements/MyElement
cd packages/registry/src/elements/MyElement
```

### 2. Create metadata.json

Define element-level metadata:

```json
{
  "id": "my-element",
  "name": "My Element",
  "description": "A powerful element that does cool things",
  "category": "layout",
  "tags": ["element", "layout", "component"],
  "layout": {
    "layoutClass": "my-element",
    "columnSpan": 2,
    "rowSpan": 1
  }
}
```

**Category Options:** `layout`, `form`, `navigation`, `content`, `card`, `other`

### 3. Create First Variation

```bash
mkdir -p variations/01-basic/layout
mkdir -p variations/01-basic/components
```

Create `variations/01-basic/index.tsx`:

```typescript
/**
 * @elementVariation
 * @name Basic My Element
 * @description Default appearance of the element
 */
export function BasicMyElement() {
  return (
    <div>
      {/* Component content */}
    </div>
  );
}
```

### 4. Create index.ts for Element Exports

Create `index.ts` in the element folder:

```typescript
import MyElement from './MyElement.preview';
export * from './MyElement.preview';
export default MyElement;
```

### 5. Generate

```bash
pnpm generate
```

Your new element will be discovered and registered automatically!

---

## Variation Naming Convention

Variations use the pattern: `NN-descriptive-name`

- **NN**: Two-digit number (01, 02, 03, etc.)
- **descriptive-name**: Kebab-case description

**Examples:**
- `01-basic` - Default variation
- `02-with-actions` - Version with action buttons
- `03-compact` - Space-optimized version
- `04-with-sidebar` - Variation with integrated sidebar

Numbers determine sort order in the gallery.

---

## Build System

### Generate All Files

```bash
pnpm generate
```

This runs the complete pipeline:
1. Discovers element variations using JSDoc parsing
2. Generates preview files with auto-imports
3. Generates demo component maps
4. Generates TypeScript manifests
5. Validates structure and detects errors

### Type Checking

```bash
pnpm type-check
```

All generated code is fully typed - no `any` types or unsafe casts.

### Building

```bash
pnpm build
```

Builds the registry package and generates all artifacts.

---

## File Structure Reference

```
elements/
├── Header/
│   ├── index.ts                    # Element exports
│   ├── Header.preview.tsx          # Auto-generated preview file
│   ├── demo-map.ts                 # Generated per-element map
│   ├── manifest.ts                 # Generated demo path manifests
│   ├── metadata.json               # Element metadata (manual)
│   ├── variations.json             # Generated variation metadata
│   └── variations/
│       ├── 01-basic/
│       │   ├── index.tsx           # Component + JSDoc (manual)
│       │   ├── layout/
│       │   │   └── Header.tsx      # Implementation
│       │   └── components/
│       │       └── Nav.tsx         # Helpers
│       └── 02-with-actions/
│           ├── index.tsx
│           └── layout/
│               └── Header.tsx
```

**Manual Files:**
- `variations/NN-name/index.tsx` - Variation component with JSDoc
- `variations/NN-name/layout/*.tsx` - Layout implementation
- `variations/NN-name/components/*.tsx` - Helper components
- `metadata.json` - Element metadata

**Auto-Generated Files:**
- `{ElementName}.preview.tsx` - Preview component (regenerate: `pnpm generate`)
- `demo-map.ts` - Demo component mapping
- `manifest.ts` - TypeScript manifest
- `variations.json` - Discovered variation metadata

---

## Troubleshooting

### "No exported component found"

The script couldn't find an exported function or const in your variation's `index.tsx`.

**Fix:**
```typescript
// ✅ Correct
export function MyVariation() { ... }
// or
export const MyVariation = () => { ... }

// ❌ Wrong
const MyVariation = () => { ... }  // Missing export
function MyVariation() { ... }     // Missing export
```

### "Missing JSDoc @elementVariation"

The script found your component but no JSDoc metadata.

**Fix:** Add JSDoc tags:
```typescript
/**
 * @elementVariation
 * @name My Variation
 * @description What this variation does
 */
export function MyVariation() { ... }
```

If JSDoc is missing, the system will auto-generate a name from the export name (e.g., `MyVariation` → "My Variation"), but you'll see a warning asking you to add proper documentation.

### "Duplicate demoPath"

Two different variations have the same demo path.

**Causes:**
- Folder naming mistake (should be `NN-` + unique name)
- Export name collision

**Fix:** Ensure variation folder names are unique within the element.

### Type checking fails

Generated code has TypeScript errors.

**Likely causes:**
- Corruption in metadata.json
- Invalid metadata structure

**Fix:** Check metadata.json matches the expected schema and run `pnpm generate` again.

---

## Best Practices

### 1. Follow the Naming Convention

**Good:**
- `01-basic` - Main variation
- `02-with-sidebar` - Clear additional feature
- `03-mobile` - Specific use case

**Bad:**
- `1-basic` - Missing leading zero
- `basic` - No number prefix
- `01_basic` - Wrong separator (use `-`)
- `01-basicVariationWithLotsOfText` - Too verbose

### 2. Write Clear JSDoc

```typescript
/**
 * @elementVariation
 * @name Descriptive Name (2-4 words)
 * @description One sentence explaining what's different or special about this variant
 */
export function ComponentName() { ... }
```

### 3. Keep Variations Focused

Each variation should demonstrate one distinct feature or use case. Create multiple variations rather than combining features:

```typescript
// ✅ Good: Separate concerns
// 01-basic
// 02-with-search
// 03-with-user-menu

// ❌ Avoid: Too many features
// 01-kitchen-sink (has search AND user menu AND actions)
```

### 4. Component Files Organization

```
variations/02-with-actions/
├── index.tsx              # Main component
├── layout/
│   └── Header.tsx         # Reusable layout component
└── components/
    └── ActionButton.tsx   # Action-specific component
```

Don't nest too deeply - keep the structure flat and discoverable.

### 5. Export Naming

Export name should be PascalCase and descriptive:

```typescript
// ✅ Good
export function HeaderWithActions() { ... }
export function CompactHeader() { ... }

// ❌ Avoid
export function Header2() { ... }
export function H() { ... }
export const h = () => { ... }
```

---

## Advanced: Custom Metadata

If you need additional metadata beyond name and description, you can extend the JSDoc tags. The system will warn about unknown tags but won't fail.

---

## Git Workflow

When adding a variation:

```bash
# 1. Create variation folder and component
mkdir -p packages/registry/src/elements/Header/variations/03-custom
# ... create index.tsx with JSDoc

# 2. Generate registry
pnpm generate

# 3. Verify it works locally
pnpm dev:frontend  # Run app and check gallery

# 4. Commit
git add packages/registry/src/elements/Header/variations/03-custom/
git commit -m "feat(elements): add custom header variation"
```

The generated files (`variations.json`, preview files, etc.) are auto-generated during build. Check your `.gitignore` to ensure you're only committing source files.

---

## Next Steps

- Add more variations to existing elements
- Create new elements for reusable patterns
- Document component APIs in metadata
- Use the element gallery to showcase components to your team
