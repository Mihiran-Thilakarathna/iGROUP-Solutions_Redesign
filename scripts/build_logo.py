"""Rebuild the iGS logo as a font-independent vector SVG.

Usage: python scripts/build_logo.py <out_dir> [top_font] [band_font]
Layout is measured from the original 200x90 PNG and doubled (viewBox 400x180).
"""
import sys, os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen

FONTS = "C:/Windows/Fonts/"
ORANGE = "#F79420"


def text_paths(font_file, text, tracking=0):
    """Return (list of (glyphset, glyphname, x_offset)), total advance, ascender info."""
    f = TTFont(FONTS + font_file)
    gs = f.getGlyphSet()
    cmap = f.getBestCmap()
    x = 0
    items = []
    for ch in text:
        g = cmap[ord(ch)]
        items.append((g, x))
        x += gs[g].width + tracking
    return f, gs, items


def fit_path(font_file, text, box, tracking=0):
    """Place `text` so its ink bounds exactly fill box=(x0,y0,x1,y1). Returns SVG path d."""
    f, gs, items = text_paths(font_file, text, tracking)
    bp = BoundsPen(gs)
    for g, x in items:
        gs[g].draw(TransformPen(bp, (1, 0, 0, 1, x, 0)))
    bx0, by0, bx1, by1 = bp.bounds
    x0, y0, x1, y1 = box
    sx = (x1 - x0) / (bx1 - bx0)
    sy = (y1 - y0) / (by1 - by0)
    # font units are y-up; flip into SVG y-down
    pen = SVGPathPen(gs, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
    t = (sx, 0, 0, -sy, x0 - bx0 * sx, y1 + by0 * sy)
    for g, x in items:
        gs[g].draw(TransformPen(TransformPen(pen, t), (1, 0, 0, 1, x, 0)))
    return pen.getCommands()


def build(top_font, band_font, ink, band_text_color="#000"):
    # "iGS" ink box (from x=16..139, y=4..62 at 1x) — includes the i-dot at top
    igs = fit_path(top_font, "iGS", (32, 6, 278, 126), tracking=-20)
    # orange band: slanted left edge, runs to the right edge
    band = "M26 134 L400 134 L400 174 L18 174 Z"
    words = fit_path(band_font, "iGROUPSOLUTIONS", (32, 140, 386, 168), tracking=10)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 180" role="img" aria-label="iGroup Solutions">
  <path fill="{ink}" d="{igs}"/>
  <path fill="{ORANGE}" d="{band}"/>
  <path fill="{band_text_color}" d="{words}"/>
</svg>
'''


def build_icon(top_font):
    """Square app/favicon mark: white iGS over an orange bar on near-black."""
    igs = fit_path(top_font, "iGS", (10, 12, 118, 82), tracking=-20)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="iGroup Solutions">
  <rect width="128" height="128" rx="28" fill="#0b0b0d"/>
  <path fill="#fff" d="{igs}"/>
  <path fill="{ORANGE}" d="M16 94 L118 94 L118 110 L12 110 Z"/>
</svg>
'''


if __name__ == "__main__":
    out = sys.argv[1]
    top = sys.argv[2] if len(sys.argv) > 2 else "times.ttf"
    bandf = sys.argv[3] if len(sys.argv) > 3 else "BOD_CR.TTF"
    suffix = sys.argv[4] if len(sys.argv) > 4 else ""
    os.makedirs(out, exist_ok=True)
    open(os.path.join(out, f"logo-light{suffix}.svg"), "w").write(build(top, bandf, "#000"))
    open(os.path.join(out, f"logo-dark{suffix}.svg"), "w").write(build(top, bandf, "#fff"))
    open(os.path.join(out, f"icon{suffix}.svg"), "w").write(build_icon(top))
    print("written", top, bandf)
