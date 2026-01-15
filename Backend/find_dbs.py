import os

print("Searching for cartopia.db files...")
for root, dirs, files in os.walk('M:\\ECOM_WEB\\Backend'):
    for f in files:
        if 'cartopia' in f.lower() and f.endswith('.db'):
            full_path = os.path.join(root, f)
            print(f"Found: {full_path} (Size: {os.path.getsize(full_path)} bytes)")
