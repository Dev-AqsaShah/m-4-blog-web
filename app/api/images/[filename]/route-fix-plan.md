# Image API Route Fix Plan

## Current Issues
1. Incorrect file path - pointing to `public/images` instead of `public/uploads`
2. Using synchronous `fs.readFileSync()` in an async function
3. No proper mime type detection for different image formats
4. Basic error handling

## Proposed Solution

### 1. Fix File Path
Change from:
```javascript
const filePath = path.join(process.cwd(), "public", "images", params.filename);
```

To:
```javascript
const filePath = path.join(process.cwd(), "public", "uploads", params.filename);
```

### 2. Update fs Import
Change from:
```javascript
import fs from "fs";
```

To:
```javascript
import { promises as fs } from "fs";
```

### 3. Implement Proper Async Handling
Change from:
```javascript
const fileBuffer = fs.readFileSync(filePath);
```

To:
```javascript
const fileBuffer = await fs.readFile(filePath);
```

### 4. Add Mime Type Detection
```javascript
const ext = path.extname(filename).toLowerCase();
const mimeType = getMimeType(ext);

function getMimeType(ext: string): string {
  switch (ext) {
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.webp': return 'image/webp';
    case '.gif': return 'image/gif';
    case '.svg': return 'image/svg+xml';
    default: return 'application/octet-stream';
  }
}
```

## Final Implementation Plan
1. Update imports
2. Fix file path construction
3. Implement async file reading
4. Add proper mime type detection
5. Improve error handling