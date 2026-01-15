from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_db
from app.models.Cart import Cart
from app.models.Product import Product
from app.models.User import User
from app.auth.dependecies import get_current_user

router = APIRouter(prefix="/api/cart", tags=["Cart"])

class CartItemRequest(BaseModel):
    productId: int
    quantity: int = 1

class CartUpdateRequest(BaseModel):
    quantity: int

@router.get("")
def get_cart(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return get_user_cart(current_user.id, db)

@router.post("")
def add_to_cart(item: CartItemRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing = db.query(Cart).filter(Cart.user_id == current_user.id, Cart.product_id == item.productId).first()
    if existing:
        existing.quantity += item.quantity
    else:
        new_item = Cart(user_id=current_user.id, product_id=item.productId, quantity=item.quantity)
        db.add(new_item)
    db.commit()
    return get_user_cart(current_user.id, db)

@router.put("/{product_id}")
def update_cart_item(product_id: int, data: CartUpdateRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    item = db.query(Cart).filter(Cart.user_id == current_user.id, Cart.product_id == product_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    item.quantity = data.quantity
    db.commit()
    return get_user_cart(current_user.id, db)

@router.delete("/{product_id}")
def remove_from_cart(product_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    item = db.query(Cart).filter(Cart.user_id == current_user.id, Cart.product_id == product_id).first()
    if item:
        db.delete(item)
        db.commit()
    return get_user_cart(current_user.id, db)

@router.delete("")
def clear_cart(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db.query(Cart).filter(Cart.user_id == current_user.id).delete()
    db.commit()
    return []

def get_user_cart(user_id: int, db: Session):
    cart_items = db.query(Cart).filter(Cart.user_id == user_id).all()
    result = []
    for item in cart_items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if product:
            result.append({
                "id": item.id,
                "productId": product.id,
                "name": product.description,  # Mapping description to name for frontend compatibility
                "price": product.price,
                "image": "🎧", # Placeholder image since we don't have real images yet
                "quantity": item.quantity,
                "stock": product.stock_quantity
            })
    return result
