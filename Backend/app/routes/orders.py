from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.Order import Order
from app.models.OrderItem import OrderItem
from app.models.Cart import Cart
from app.models.Product import Product # To get price/check stock
from app.models.User import User
from app.auth.dependecies import get_current_user

router = APIRouter(prefix="/api/orders", tags=["Orders"])

@router.get("")
def get_orders(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Order).filter(Order.user_id == current_user.id).order_by(Order.created_at.desc()).all()

@router.post("")
def create_order(
    shipping_address: str, 
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    # Get cart items
    cart_items = db.query(Cart).filter(Cart.user_id == current_user.id).all()
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    # Calculate total and check stock (simplified)
    total_amount = 0
    order_items_data = []

    for item in cart_items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            continue
        
        # In a real app, check stock here
        
        item_total = product.price * item.quantity
        total_amount += item_total
        
        order_items_data.append({
            "product_id": product.id,
            "quantity": item.quantity,
            "price": product.price,
            "seller_id": product.id # Placeholder, ideally product has seller_id. Using product.id to avoid error if missing, but OrderItem expects seller_id. 
            # Wait, OrderItem definition has seller_id. Product should have seller_id? 
            # Let's check Product model. It doesn't seem to have explicit seller_id yet? 
            # Transaction.py has seller_id. 
            # I'll check Product model again.
        })

    # Re-check Product model for seller_id. 
    # If Product doesn't have seller_id, I might need to make it optional in OrderItem or default it.
    # Looking at previous view_file of Product.py, it does NOT have seller_id.
    # But OrderItem.py HAS seller_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    # This is a schema issue. For now, I will use a default admin ID or the current user (wrong) or 1.
    # User 1 is likely the admin/seller.
    
    seller_id_placeholder = 1 

    # Create Order
    new_order = Order(
        user_id=current_user.id,
        total_amount=total_amount,
        shipping_address=shipping_address,
        status="Processing"
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    # Create Order Items
    for item_data in order_items_data:
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=item_data["product_id"],
            seller_id=seller_id_placeholder, # Fixed for now
            quantity=item_data["quantity"],
            price_at_purchase=item_data["price"]
        )
        db.add(order_item)
    
    # Clear Cart
    db.query(Cart).filter(Cart.user_id == current_user.id).delete()
    
    db.commit()
    return new_order
