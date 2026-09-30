"""
Generates realistic sample onion test images for 1-click hackathon demo presets
"""
import cv2
import numpy as np
import os

def create_sample_dataset(output_dir: str):
    os.makedirs(output_dir, exist_ok=True)
    
    # Preset 1: Grade A Export Quality (Healthy Red/Purple Onion)
    img_a = np.ones((500, 500, 3), dtype=np.uint8) * 245  # Warm bright background
    # Background texture
    cv2.circle(img_a, (250, 250), 220, (235, 235, 235), -1)
    
    # Outer Onion Body (Red/Crimson/Purplish-Pink)
    center = (250, 260)
    axes = (140, 130)
    # Layered gradient onion bulb
    for r in range(130, 0, -5):
        alpha = r / 130.0
        # Color transition from deep onion crimson to juicy interior
        b = int(40 * alpha + 70 * (1 - alpha))
        g = int(30 * alpha + 50 * (1 - alpha))
        r_col = int(175 * alpha + 200 * (1 - alpha))
        cv2.ellipse(img_a, center, (int(axes[0] * (r/130)), int(axes[1] * (r/130))), 0, 0, 360, (b, g, r_col), -1)
        
    # Vertical onion skin striations/lines
    for angle in range(-45, 50, 8):
        rad = np.deg2rad(angle)
        pt1 = (int(center[0] + np.sin(rad) * 40), int(center[1] - axes[1] + 10))
        pt2 = (int(center[0] + np.sin(rad) * 120), int(center[1] + axes[1] - 15))
        cv2.line(img_a, pt1, pt2, (45, 25, 140), 2, cv2.LINE_AA)
        
    # Top neck & dry root tassel
    cv2.ellipse(img_a, (250, 135), (18, 12), 0, 0, 360, (30, 60, 110), -1)
    cv2.ellipse(img_a, (250, 390), (22, 8), 0, 0, 360, (40, 80, 130), -1)
    
    cv2.imwrite(os.path.join(output_dir, "grade_a_export.jpg"), img_a)
    
    # Preset 2: Grade B Medium Domestic (Medium size with minor dry surface skin)
    img_b = np.ones((500, 500, 3), dtype=np.uint8) * 245
    center_b = (250, 260)
    axes_b = (105, 98)
    for r in range(98, 0, -5):
        alpha = r / 98.0
        b = int(45 * alpha + 60 * (1 - alpha))
        g = int(50 * alpha + 80 * (1 - alpha))
        r_col = int(160 * alpha + 180 * (1 - alpha))
        cv2.ellipse(img_b, center_b, (int(axes_b[0] * (r/98)), int(axes_b[1] * (r/98))), 0, 0, 360, (b, g, r_col), -1)
        
    # Dry peel patches
    cv2.ellipse(img_b, (230, 240), (25, 18), 20, 0, 360, (50, 100, 170), -1)
    cv2.imwrite(os.path.join(output_dir, "grade_b_medium.jpg"), img_b)
    
    # Preset 3: Grade C Mold & Sprouted (Black mold patches + emerging green sprout shoot)
    img_c = np.ones((500, 500, 3), dtype=np.uint8) * 245
    center_c = (250, 270)
    axes_c = (115, 110)
    for r in range(110, 0, -5):
        alpha = r / 110.0
        b = int(35 * alpha + 50 * (1 - alpha))
        g = int(35 * alpha + 60 * (1 - alpha))
        r_col = int(135 * alpha + 150 * (1 - alpha))
        cv2.ellipse(img_c, center_c, (int(axes_c[0] * (r/110)), int(axes_c[1] * (r/110))), 0, 0, 360, (b, g, r_col), -1)
        
    # Green Sprout Shoots from neck
    pts_sprout1 = np.array([[250, 160], [240, 80], [248, 60], [255, 90]], np.int32)
    pts_sprout2 = np.array([[255, 160], [268, 70], [276, 50], [266, 95]], np.int32)
    cv2.fillPoly(img_c, [pts_sprout1, pts_sprout2], (25, 180, 45))  # Bright green shoot
    
    # Black Mold (Aspergillus niger) dark fungal colonies
    cv2.circle(img_c, (210, 260), 28, (20, 20, 20), -1)
    cv2.circle(img_c, (285, 290), 32, (15, 15, 15), -1)
    cv2.circle(img_c, (250, 340), 22, (25, 25, 25), -1)
    # Neck rot soft brown decay
    cv2.ellipse(img_c, (250, 180), (35, 18), 0, 0, 360, (30, 60, 90), -1)
    
    cv2.imwrite(os.path.join(output_dir, "grade_c_mold_sprout.jpg"), img_c)
    
    # Preset 4: Batch Multi-Onion Tray (6 Onions together in farm basket)
    img_tray = np.ones((600, 600, 3), dtype=np.uint8) * 240
    # Basket boundary
    cv2.circle(img_tray, (300, 300), 270, (80, 120, 160), 12)
    
    onions = [
        {"center": (220, 210), "axes": (65, 60), "color": (40, 30, 175), "mold": False},
        {"center": (380, 200), "axes": (70, 65), "color": (35, 25, 180), "mold": False},
        {"center": (190, 350), "axes": (55, 50), "color": (45, 40, 160), "mold": False},
        {"center": (330, 340), "axes": (68, 62), "color": (40, 30, 170), "mold": False},
        {"center": (430, 370), "axes": (50, 45), "color": (50, 50, 150), "mold": True},
        {"center": (300, 470), "axes": (62, 58), "color": (35, 25, 175), "mold": False},
    ]
    
    for o in onions:
        cv2.ellipse(img_tray, o["center"], o["axes"], 0, 0, 360, o["color"], -1)
        # Skin striations
        cv2.line(img_tray, (o["center"][0]-15, o["center"][1]-o["axes"][1]+10), (o["center"][0]+10, o["center"][1]+o["axes"][1]-10), (25, 15, 130), 2)
        if o["mold"]:
            cv2.circle(img_tray, (o["center"][0]+10, o["center"][1]), 14, (20, 20, 20), -1)
            
    cv2.imwrite(os.path.join(output_dir, "batch_tray.jpg"), img_tray)
    print("Preset images generated successfully.")

if __name__ == "__main__":
    create_sample_dataset("backend/sample_images")
