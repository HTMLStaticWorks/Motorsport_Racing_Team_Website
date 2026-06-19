import os
try:
    from PIL import Image
except ImportError:
    print("Error: The 'Pillow' library is not installed. Please run 'pip install Pillow' to use this script.")
    import sys
    sys.exit(1)
def process_image(filename):
    if not filename.endswith('.png') or 'icon_' not in filename: return
    try:
        img = Image.open(filename).convert("RGBA")
        datas = img.getdata()
        newData = []
        for item in datas:
            r, g, b, a = item
            lum = max(r, g, b)
            
            # Remove black background by mapping luminance to alpha
            if lum < 15:
                new_a = 0
            elif lum < 40:
                new_a = int((lum - 15) / 25.0 * lum)
            else:
                new_a = lum
            
            # Since we are reducing alpha based on luminance, we should un-premultiply RGB so it stays bright
            if new_a > 0 and new_a < 255:
                # scale rgb up so that when browser premultiplies by alpha, it equals original luminosity
                scale = 255.0 / new_a
                # But don't scale too much to avoid blowing out colors
                scale = min(scale, 3.0)
                new_r = int(min(255, r * scale))
                new_g = int(min(255, g * scale))
                new_b = int(min(255, b * scale))
                newData.append((new_r, new_g, new_b, new_a))
            else:
                newData.append((r, g, b, new_a))
                
        img.putdata(newData)
        img.save(filename)
        print(f"Processed {filename} successfully.")
    except Exception as e:
        print(f"Error processing {filename}: {e}")

for f in os.listdir('.'):
    process_image(f)
