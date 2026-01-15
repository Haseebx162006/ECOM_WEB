import sqlite3
import os

db_path = "cartopia.db"
if not os.path.exists(db_path):
    print(f"app.database file {db_path} not found!")
else:
    print(f"Inspecting {db_path}...")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # List tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    print("Tables:", [t[0] for t in tables])
    
    # Inspect products table
    try:
        cursor.execute("PRAGMA table_info(products);")
        columns = cursor.fetchall()
        print("\nColumns in 'products' table:")
        for col in columns:
            print(col) # cid, name, type, notnull, dflt_value, pk
    except Exception as e:
        print(f"\nError inspecting products table: {e}")
        
    conn.close()
