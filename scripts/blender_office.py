"""
blender_office.py — Elegant single-office scene with one hero laptop.
Camera path is computed dynamically in OfficeScene.jsx; path.json is
optional/informational only.
"""
import bpy
import json
import math
import os
from mathutils import Matrix

# -------------------- CONFIG --------------------
N_PROJECTS = 10
OUTPUT_DIR = "C:\\current work\\Portfolio-11-May-2026\\scripts\\output"
GLB_FILE   = "office.glb"
PATH_FILE  = "office_path.json"
# ------------------------------------------------

# 1. Clear scene
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
for block in (bpy.data.meshes, bpy.data.materials, bpy.data.lights,
              bpy.data.cameras, bpy.data.curves, bpy.data.images):
    for item in list(block):
        try: block.remove(item)
        except Exception: pass

# 2. Helpers
def hex_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) / 255.0 for i in (0, 2, 4))

def make_mat(name, color, emission=None, strength=0.0, roughness=0.5, metalness=0.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metalness
    if emission is not None:
        bsdf.inputs["Emission Color"].default_value = (*emission, 1.0)
        bsdf.inputs["Emission Strength"].default_value = strength
    return mat

def add_cube(name, loc, scale, mat, bevel=0.02, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(location=loc)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = scale
    obj.rotation_euler = rot
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    if bevel > 0:
        m = obj.modifiers.new(name="Bevel", type='BEVEL')
        m.width = bevel
        m.segments = 2
    return obj

def add_cyl(name, loc, radius, depth, mat, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cylinder_add(radius=radius, depth=depth, location=loc)
    obj = bpy.context.active_object
    obj.name = name
    obj.rotation_euler = rot
    obj.data.materials.append(mat)
    return obj

def add_sphere(name, loc, radius, mat):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=radius, location=loc, segments=16, ring_count=8)
    obj = bpy.context.active_object
    obj.name = name
    obj.data.materials.append(mat)
    return obj

# 3. Materials
M_FLOOR   = make_mat("Floor",     hex_rgb("#0a0a0f"),  roughness=0.18, metalness=0.35)
M_WALL    = make_mat("Wall",      hex_rgb("#0f0f18"),  roughness=0.85)
M_WALLACC = make_mat("WallAccent",hex_rgb("#312e81"),  roughness=0.70)
M_TRIM    = make_mat("Trim",      hex_rgb("#050508"),  roughness=0.45, metalness=0.20)
M_WOOD    = make_mat("Wood",      hex_rgb("#3a2818"),  roughness=0.35)
M_METAL   = make_mat("Metal",     hex_rgb("#1a1a22"),  roughness=0.20, metalness=0.95)
M_LAPTOP  = make_mat("LaptopBody",hex_rgb("#22222e"),  roughness=0.25, metalness=0.85)
M_KEYBOARD= make_mat("Keyboard",  hex_rgb("#0a0a0f"),  roughness=0.60)
M_CHAIR   = make_mat("Chair",     hex_rgb("#0f0f18"),  roughness=0.75)
M_ACCENT  = make_mat("Accent",    hex_rgb("#6366f1"),  emission=hex_rgb("#818cf8"), strength=2.0)
M_ACCENT2 = make_mat("Accent2",   hex_rgb("#f472b6"),  emission=hex_rgb("#f472b6"), strength=2.5)
M_ACCENT3 = make_mat("Accent3",   hex_rgb("#22d3ee"),  emission=hex_rgb("#22d3ee"), strength=2.5)
M_GOLD    = make_mat("Gold",      hex_rgb("#facc15"),  roughness=0.30, metalness=0.80)
M_PLANT   = make_mat("Plant",     hex_rgb("#2d5a3d"),  roughness=0.80)
M_POT     = make_mat("Pot",       hex_rgb("#3a2818"),  roughness=0.55)
M_RUG     = make_mat("Rug",       hex_rgb("#12121a"),  roughness=0.95)
M_LIGHT   = make_mat("LightPanel",(1.0, 1.0, 1.0),     emission=(1.0, 0.97, 0.92), strength=10.0)
M_SCREEN  = make_mat("ScreenMat", (0.01, 0.01, 0.02),  emission=(0.51, 0.55, 0.97), strength=0.6)
M_CITY    = make_mat("CitySky",   hex_rgb("#1e1b4b"),  emission=hex_rgb("#4f46e5"), strength=1.2)
M_MUG     = make_mat("Mug",       hex_rgb("#f1f5f9"),  roughness=0.4)

# 4. Room shell
ROOM_W, ROOM_D, ROOM_H = 4.0, 7.0, 3.6

bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, 0))
f = bpy.context.active_object; f.name = "Floor"
f.scale = (ROOM_W * 2, ROOM_D * 2, 1); f.data.materials.append(M_FLOOR)

bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, ROOM_H))
c = bpy.context.active_object; c.name = "Ceiling"
c.scale = (ROOM_W * 2, ROOM_D * 2, 1); c.data.materials.append(M_WALL)

add_cube("WallL",  (-ROOM_W, 0, ROOM_H / 2), (0.1, ROOM_D, ROOM_H / 2), M_WALL, bevel=0)
add_cube("WallR",  ( ROOM_W, 0, ROOM_H / 2), (0.1, ROOM_D, ROOM_H / 2), M_WALL, bevel=0)
add_cube("WallB",  (0,  ROOM_D, ROOM_H / 2), (ROOM_W, 0.1, ROOM_H / 2), M_WALL, bevel=0)

add_cube("WallAccent", (0, ROOM_D - 0.06, ROOM_H * 0.55),
         (ROOM_W * 0.55, 0.02, ROOM_H * 0.30), M_WALLACC, bevel=0)

add_cube("TrimL", (-ROOM_W + 0.12, 0, 0.08), (0.02, ROOM_D, 0.08), M_TRIM, bevel=0)
add_cube("TrimR", ( ROOM_W - 0.12, 0, 0.08), (0.02, ROOM_D, 0.08), M_TRIM, bevel=0)
add_cube("TrimB", (0,  ROOM_D - 0.12, 0.08),(ROOM_W, 0.02, 0.08), M_TRIM, bevel=0)

for i in range(3):
    for j in range(4):
        x = -2.4 + i * 2.4
        y = -4.5 + j * 3.0
        add_cube(f"CeilLight_{i}_{j}", (x, y, ROOM_H - 0.03),
                 (0.55, 0.55, 0.015), M_LIGHT, bevel=0)

add_cube("LedStrip", (0, ROOM_D - 0.15, 0.05),
         (ROOM_W * 0.85, 0.015, 0.015), M_ACCENT3, bevel=0)

add_cube("WindowSky", (-ROOM_W + 0.03, 0.5, 1.9),
         (0.01, 1.4, 1.4), M_CITY, bevel=0)
add_cube("WindowFrameV1", (-ROOM_W + 0.05, -0.9, 1.9), (0.02, 0.02, 1.4), M_METAL, bevel=0)
add_cube("WindowFrameV2", (-ROOM_W + 0.05,  1.9, 1.9), (0.02, 0.02, 1.4), M_METAL, bevel=0)
add_cube("WindowFrameH1", (-ROOM_W + 0.05, 0.5, 0.55), (0.02, 1.4, 0.02), M_METAL, bevel=0)
add_cube("WindowFrameH2", (-ROOM_W + 0.05, 0.5, 3.25), (0.02, 1.4, 0.02), M_METAL, bevel=0)

bpy.ops.mesh.primitive_plane_add(size=1, location=(0, -0.2, 0.005))
r = bpy.context.active_object; r.name = "Rug"
r.scale = (4.0, 3.2, 1); r.data.materials.append(M_RUG)

# 5. Desk
DESK_TOP = 0.75
DESK_W, DESK_D = 1.5, 0.65
add_cube("DeskTop", (0, 0, DESK_TOP - 0.02),
         (DESK_W, DESK_D, 0.025), M_WOOD, bevel=0.015)
for dx in (-DESK_W + 0.1, DESK_W - 0.1):
    for dy in (-DESK_D + 0.08, DESK_D - 0.08):
        add_cube(f"DeskLeg_{dx}_{dy}", (dx, dy, (DESK_TOP - 0.045) / 2),
                 (0.03, 0.03, (DESK_TOP - 0.045) / 2), M_METAL, bevel=0)

add_cube("DeskLED", (0, -DESK_D + 0.05, DESK_TOP - 0.06),
         (DESK_W - 0.1, 0.008, 0.008), M_ACCENT3, bevel=0)

# 6. Laptop (Slightly bigger for better visibility)
LAP_BASE_W, LAP_BASE_D, LAP_BASE_T = 1.0, 0.65, 0.025
LAP_Y = DESK_TOP
HINGE_Y = LAP_BASE_D / 2
HINGE_Z = LAP_Y + LAP_BASE_T

add_cube("LaptopBase", (0, 0, LAP_Y + LAP_BASE_T / 2),
         (LAP_BASE_W / 2, LAP_BASE_D / 2, LAP_BASE_T / 2), M_LAPTOP, bevel=0.006)
add_cube("Keyboard", (0, 0.02, LAP_Y + LAP_BASE_T + 0.0015),
         (0.4, 0.2, 0.0015), M_KEYBOARD, bevel=0)
add_cube("Trackpad", (0, -LAP_BASE_D / 2 + 0.12, LAP_Y + LAP_BASE_T + 0.0015),
         (0.15, 0.08, 0.001), M_KEYBOARD, bevel=0)

LID_W, LID_D, LID_T = LAP_BASE_W, 0.60, 0.01
bpy.ops.mesh.primitive_cube_add(location=(0, 0, 0))
lid = bpy.context.active_object
lid.name = "LaptopLid"
lid.data.transform(Matrix.Diagonal((LID_W, LID_D, LID_T, 1.0)))
lid.data.transform(Matrix.Translation((0, -LID_D / 2, 0)))
lid.location = (0, HINGE_Y, HINGE_Z)
lid.rotation_euler = (0, 0, 0)
lid.data.materials.append(M_LAPTOP)
mod = lid.modifiers.new(name="Bevel", type='BEVEL')
mod.width = 0.003
mod.segments = 2

SCR_W, SCR_H = LID_W - 0.06, LID_D - 0.06
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, 0))
screen = bpy.context.active_object
screen.name = "Screen_0"
screen.scale = (SCR_W, SCR_H, 1.0)
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
# Face outwards (-Z local) and fix mirrored UVs
screen.rotation_euler = (0, math.pi, 0)
bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
uv = screen.data.uv_layers.active
for luv in uv.data:
    luv.uv[0] = 1.0 - luv.uv[0]
screen.data.transform(Matrix.Translation((0, -LID_D / 2, -LID_T / 2 - 0.001)))
screen.data.materials.append(M_SCREEN)

bpy.ops.object.select_all(action='DESELECT')
screen.select_set(True)
lid.select_set(True)
bpy.context.view_layer.objects.active = lid
bpy.ops.object.parent_set(type='OBJECT', keep_transform=True)

# 7. Chair
add_cyl("ChairBase", (0, 1.1, 0.03), 0.28, 0.04, M_METAL)
add_cyl("ChairPole", (0, 1.1, 0.30), 0.04, 0.5,  M_METAL)
add_cube("ChairSeat", (0, 1.1, 0.55), (0.24, 0.24, 0.03), M_CHAIR, bevel=0.02)
add_cube("ChairBack", (0, 1.1 + 0.22, 0.90), (0.24, 0.03, 0.30), M_CHAIR, bevel=0.02)

# 8. Plant
add_cyl("PlantPot", (-3.3, 6.0, 0.22), 0.22, 0.44, M_POT)
add_sphere("PlantMass1", (-3.3, 6.0, 0.90), 0.45, M_PLANT)
add_sphere("PlantMass2", (-3.15, 5.9, 1.20), 0.30, M_PLANT)
add_sphere("PlantMass3", (-3.45, 6.10, 1.05), 0.28, M_PLANT)

# 9. Bookshelf
SH_Z = 1.3
add_cube("Shelf", (2.5, ROOM_D - 0.25, SH_Z), (0.9, 0.14, 0.02), M_WOOD, bevel=0)
book_colors = ["#4338ca", "#f43f5e", "#22d3ee", "#facc15", "#a5b4fc", "#f472b6"]
for i in range(7):
    bx = 2.5 - 0.70 + i * 0.19
    bh = 0.20 + (i % 3) * 0.04
    bm = make_mat(f"Book_{i}", hex_rgb(book_colors[i % len(book_colors)]), roughness=0.7)
    add_cube(f"Book_{i}", (bx, ROOM_D - 0.25, SH_Z + 0.01 + bh / 2),
             (0.07, 0.11, bh / 2), bm, bevel=0)

# 10. Wall art
add_cube("ArtFrame", (0.9, ROOM_D - 0.08, 2.0), (0.55, 0.015, 0.55), M_TRIM, bevel=0)
add_cube("Art1",     (0.9, ROOM_D - 0.10, 2.0), (0.5, 0.01, 0.5),  M_ACCENT2, bevel=0)
add_cube("Art2",     (0.9, ROOM_D - 0.11, 1.85),(0.35, 0.005, 0.15), M_ACCENT, bevel=0)

# 11. Mug
add_cyl("Mug", (0.65, -0.15, DESK_TOP + 0.06), 0.045, 0.09, M_MUG)

# 12. Ambient lights
bpy.ops.object.light_add(type='AREA', location=(0, -1.5, 3.2))
al = bpy.context.active_object
al.name = "MainSoft"
al.data.energy = 2500
al.data.size = 6.0
bpy.ops.object.light_add(type='POINT', location=(0.8, 0.6, 1.4))
pl = bpy.context.active_object
pl.name = "AccentWarm"
pl.data.energy = 300
pl.data.color = (1.0, 0.85, 0.7)

# 13. Export
os.makedirs(OUTPUT_DIR, exist_ok=True)

bpy.ops.export_scene.gltf(
    filepath=os.path.join(OUTPUT_DIR, GLB_FILE),
    export_format='GLB', export_apply=True, export_yup=True, export_extras=True,
    export_cameras=False, export_lights=False,
)

with open(os.path.join(OUTPUT_DIR, PATH_FILE), "w") as fh:
    json.dump({"lid": {"closed": 0.0, "open": -1.92}}, fh, indent=2)

print(f"✅ Exported office scene → {OUTPUT_DIR}")