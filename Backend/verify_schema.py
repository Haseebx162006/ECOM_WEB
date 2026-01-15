import sqlite3

conn = sqlite3.connect("app/cartopia.db")
cursor = conn.cursor()

print("\n--- Products Table Schema ---")
cursor.execute("PRAGMA table_info(products);")
columns = cursor.fetchall()
for col in columns:
    print(f"{col[1]} ({col[2]})")

conn.close()
