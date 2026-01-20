# Website Deployment Guide

## 📁 Project Structure

```
website/
├── src/                    # ✏️ EDIT THESE FILES
│   ├── main.js            # JavaScript logic
│   ├── style.css          # Styling
│   └── assets/            # Images (15 marketing JPGs)
├── index.html             # ✏️ Main HTML file
├── out/                   # 🚀 UPLOAD THIS TO HOSTINGER
│   ├── index.html         # (Optimized version)
│   └── assets/            # (Optimized images with hashes)
├── node_modules/          # 🚫 NEVER UPLOAD
├── package.json           # Dependency config
├── vite.config.js         # Build config
└── .gitignore             # Git exclusions
```

## 🔄 Development Workflow

### 1. Make Changes
Edit files in the `src/` directory or `index.html` at the root.

### 2. Build for Production
```bash
npm run build
```
This compiles your code and creates optimized files in the `out/` folder.

### 3. Deploy to Hostinger
**CRITICAL**: Upload **ONLY** the **contents** of the `out/` folder to Hostinger.

**Steps:**
1. Open your Hostinger File Manager
2. Navigate to `public_html` (or your domain's root directory)
3. Upload these files from `website/out/`:
   - `index.html`
   - `assets/` folder (contains all images, CSS, and JS)
4. **DO NOT** upload: `src/`, `node_modules/`, `package.json`, or any other files from `website/`

## ⚠️ Common Mistakes to Avoid

❌ **Wrong**: Uploading the entire `website/` folder  
✅ **Correct**: Uploading **only** the contents of `website/out/`

❌ **Wrong**: Uploading `node_modules/`  
✅ **Correct**: Never upload `node_modules/` - it's massive and unnecessary

❌ **Wrong**: Editing files in `out/` directly  
✅ **Correct**: Always edit files in `src/` or `index.html`, then rebuild

## 🧹 What Was Cleaned

Removed obsolete files:
- `public/` (empty directory)
- `redesign_plan.md`, `website_copy_draft.md`, `shadow_workbook_pages_final.csv`
- 19 unused PNG assets from previous version

**Result**: Clean, minimal project with only essential files.
