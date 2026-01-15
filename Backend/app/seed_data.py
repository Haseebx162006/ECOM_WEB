import sys
import os

# Add the 'app' directory to sys.path so 'from app.database import ...' works in app.models
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import session_Local, engine, Base
from app.models.Category import Category
from app.models.User import User
from app.models.Product import Product
from app.models.Cart import Cart
from app.models.Order import Order
from app.models.OrderItem import OrderItem
from app.models.Wishlist import Wishlist
# Import Transaction if needed, but at least these are core
from app.auth.security import hash_password

# Create tables
Base.metadata.create_all(bind=engine)

def seed():
    db = session_Local()
    
    # Check if we have categories
    if db.query(Category).first():
        print("Data already exists.")
        return

    # Categories
    categories = [
        ("Electronics", "electronics"), 
        ("Fashion", "fashion"), 
        ("Home & Garden", "home-garden"), 
        ("Sports", "sports"), 
        ("Toys", "toys"), 
        ("Automotive", "automotive")
    ]
    
    for cat_name, cat_slug in categories:
        db.add(Category(name=cat_name, slug=cat_slug))
    
    # Admin User
    admin_user = User(
        email="admin@example.com",
        name="Admin User",
        password=hash_password("admin123"),
        role="admin"
    )
    db.add(admin_user)
    
    db.commit()
    print("Seeding complete!")
    db.close()

if __name__ == "__main__":
    seed()
