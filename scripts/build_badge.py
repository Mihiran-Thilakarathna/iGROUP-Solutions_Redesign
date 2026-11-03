"""Rebuild the round iGS badge as a crisp vector SVG.

Usage: python scripts/build_badge.py _source_assets/logo-igs-badge.png <out.svg> [--no-rim]
--no-rim drops the black ring and crops to the orange disc (used for the favicon).
The rings and the "i" are pure geometry measured from the 500x500 source; the
"G" and "s" outlines are traced from it at 8x so their custom shapes survive.
"""
import sys
import cv2
import numpy as np

ORANGE = "#F7941D"
SRC = 500
CX = CY = 250            # badge centre in the source
R_OUT, R_IN = 216.5, 184.5  # black rim outer edge / orange disc edge
UP = 8                   # trace resolution multiplier
OUT = 512                # output viewBox size
K = (OUT / 2) / R_OUT    # source px -> output units


def to_out(x, y):
    return (x - CX) * K + OUT / 2, (y - CY) * K + OUT / 2


def fmt(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


def rdp(pts, eps):
    """Ramer-Douglas-Peucker on a closed-ish polyline (iterative)."""
    keep = np.zeros(len(pts), bool)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        if b - a < 2:
            continue
        p, q = pts[a], pts[b]
        d = q - p
        seg = pts[a + 1:b] - p
        n = np.hypot(*d)
        dist = np.abs(d[0] * seg[:, 1] - d[1] * seg[:, 0]) / n if n else np.hypot(seg[:, 0], seg[:, 1])
        i = int(np.argmax(dist))
        if dist[i] > eps:
            keep[a + 1 + i] = True
            stack += [(a, a + 1 + i), (a + 1 + i, b)]
    return pts[keep]


def gauss(sigma):
    r = max(1, int(sigma * 3))
    k = np.exp(-0.5 * (np.arange(-r, r + 1) / sigma) ** 2)
    return k / k.sum(), r


def smooth_open(seg, sigma):
    """Smooth an open run of points with its two ends pinned in place."""
    if len(seg) < 5:
        return seg
    k, r = gauss(min(sigma, len(seg) / 4))
    # odd reflection about the ends keeps them fixed and the tangent continuous
    head = 2 * seg[0] - seg[1:r + 1][::-1]
    tail = 2 * seg[-1] - seg[-r - 1:-1][::-1]
    ext = np.concatenate([head, seg, tail])
    return np.stack([np.convolve(ext[:, i], k, "valid") for i in range(2)], 1)


def find_corners(pts, w):
    """Indices where the outline turns sharply (serif tips, terminals, stem joins)."""
    prev, nxt = np.roll(pts, w, 0) - pts, np.roll(pts, -w, 0) - pts
    cos = (prev * nxt).sum(1) / (np.hypot(*prev.T) * np.hypot(*nxt.T) + 1e-9)
    sharp = cos > -0.8  # interior angle under ~143 degrees
    out = []
    for i in np.flatnonzero(sharp):
        win = [(i + j) % len(pts) for j in range(-w, w + 1)]
        if cos[i] >= max(cos[j] for j in win if sharp[j]):
            if not out or i - out[-1] > w:
                out.append(int(i))
    return out


def smooth_closed(pts, sigma, w):
    """Smooth a closed contour piecewise between its corners so corners stay crisp."""
    corners = find_corners(pts, w)
    if not corners:
        k, r = gauss(sigma)
        ext = np.concatenate([pts[-r:], pts, pts[:r]])
        return np.stack([np.convolve(ext[:, i], k, "valid") for i in range(2)], 1)
    pts = np.roll(pts, -corners[0], 0)
    cs = [c - corners[0] for c in corners] + [len(pts)]
    loop = np.vstack([pts, pts[:1]])
    out = []
    for a, b in zip(cs, cs[1:]):
        out.append(smooth_open(loop[a:b + 1], sigma)[:-1])
    return np.vstack(out)


def trace_glyphs(img):
    b = img[:, :, 0].astype(np.float32)  # blue channel: white 255, orange ~29
    yy, xx = np.mgrid[0:SRC, 0:SRC]
    b[np.hypot(xx - CX, yy - CY) > R_IN - 6] = 0
    b[228:322, 228:268] = 0  # the "i" is drawn as geometry
    b = cv2.GaussianBlur(b, (0, 0), 0.6)  # calm the source's compression noise
    big = cv2.resize(b, (SRC * UP, SRC * UP), interpolation=cv2.INTER_CUBIC)
    mask = (big > 142).astype(np.uint8)
    contours, hier = cv2.findContours(mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
    parts = []
    for c in contours:
        if cv2.contourArea(c) < 400 * UP * UP / 64:
            continue
        pts = c[:, 0, :].astype(float) / UP + 0.5 / UP
        pts = smooth_closed(pts, sigma=2.4 * UP, w=int(1.5 * UP))
        pts = rdp(np.vstack([pts, pts[:1]]), 0.04)[:-1]
        out = [to_out(x, y) for x, y in pts]
        parts.append("M" + "L".join(f"{fmt(x)} {fmt(y)}" for x, y in out) + "Z")
    return "".join(parts)


def i_glyph():
    # stem x 237..261, y 256.8..316; dot: a flattened lozenge-ish ellipse
    x0, y0 = to_out(237, 256.8)
    x1, y1 = to_out(261, 316)
    stem = f"M{fmt(x0)} {fmt(y0)}H{fmt(x1)}V{fmt(y1)}H{fmt(x0)}Z"
    cx, cy = to_out(248.6, 239.8)
    return stem, (fmt(cx), fmt(cy), fmt(15.2 * K), fmt(6.9 * K))


def build(src, dst, rim=True):
    img = cv2.imread(src, cv2.IMREAD_COLOR)
    glyphs = trace_glyphs(img)
    stem, (cx, cy, rx, ry) = i_glyph()
    c = OUT / 2
    if rim:
        view = f"0 0 {OUT} {OUT}"
        r = (R_OUT + R_IN) / 2 * K
        disc = f'<circle cx="{fmt(c)}" cy="{fmt(c)}" r="{fmt(r)}" fill="{ORANGE}" stroke="#000" stroke-width="{fmt((R_OUT - R_IN) * K)}"/>'
    else:
        # no black rim: the view is cropped to the orange disc so it fills the whole icon
        r = R_IN * K
        view = f"{fmt(c - r)} {fmt(c - r)} {fmt(2 * r)} {fmt(2 * r)}"
        disc = f'<circle cx="{fmt(c)}" cy="{fmt(c)}" r="{fmt(r)}" fill="{ORANGE}"/>'
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" role="img" aria-label="iGroup Solutions">
  {disc}
  <g fill="#fff">
    <path d="{glyphs}"/>
    <path d="{stem}"/>
    <ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}"/>
  </g>
</svg>
'''
    with open(dst, "w", newline="\n") as f:
        f.write(svg)
    print("wrote", dst, len(svg), "bytes")


if __name__ == "__main__":
    build(sys.argv[1], sys.argv[2], rim="--no-rim" not in sys.argv[3:])
