# 3D Blender Office — Setup

## 1. Files already in repo
- `components/ui/OfficeScene.jsx`      – the 3D scene component
- `components/sections/Work.jsx`       – uses OfficeScene
- `components/data/portfolio-data.js`  – your project list
- `public/paths/office_path.json`      – camera path (drop-in ready)
- `scripts/generate-office-path.mjs`   – regenerates the JSON
- `scripts/blender_office.py`          – builds office + exports GLB

## 2. Blender (once)
1. Open Blender → Scripting tab → paste `scripts/blender_office.py` → Run.
2. In Blender's file browser, save the .blend first (so `//` paths resolve).
3. Copy `office.glb` → `public/models/office.glb`.
4. Copy `office_path.json` → `public/paths/office_path.json`.

**No Blender?** The component builds a procedural office automatically, so it
works out of the box before you model anything.

## 3. If you have a different number of projects
Edit `N_PROJECTS` in `scripts/blender_office.py`, rerun it, and regenerate:
```bash
npm run gen:path