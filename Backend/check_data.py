import sqlite3
import os

db_path = "app/cartopia.db"  # Updated to match new absolute path
if not os.path.exists(db_path):
    print(f"app.database file {db_path} not found!")
else:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    print("\n--- Categories Table Data ---")
    try:
        cursor.execute("SELECT * FROM categories;")
        rows = cursor.fetchall()
        if not rows:
            print("No categories found!")
        else:
            for row in rows:
                print(row)
    except Exception as e:
        print(f"Error reading categories: {e}")
        
    conn.close()
