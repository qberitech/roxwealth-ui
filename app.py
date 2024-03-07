import os
from PIL import Image

def compress_images_in_folder(folder_path, output_folder, quality=70):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for root, dirs, files in os.walk(folder_path):
        for filename in files:
            if filename.endswith((".jpg", ".jpeg", ".png")):
                image_path = os.path.join(root, filename)
                relative_path = os.path.relpath(image_path, folder_path)
                output_path = os.path.join(output_folder, relative_path)
                output_dir = os.path.dirname(output_path)
                if not os.path.exists(output_dir):
                    os.makedirs(output_dir)
                try:
                    with Image.open(image_path) as img:
                        img.save(output_path, optimize=True, quality=quality)
                except Exception as e:
                    print(f"Error compressing image: {image_path}")
                    print(f"Error message: {str(e)}")

# folder_path = "./src/assets/img"
# output_folder = "output_folder_path"
# compression_quality = 70

# compress_images_in_folder(folder_path, output_folder, compression_quality)

