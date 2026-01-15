from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from app.database import get_db
from app.models.Wishlist import Wishlist
from app.models.Product import Product
from app.models.User import User
from app.auth.dependecies import get_current_user

router = APIRouter(prefix="/api/wishlist", tags=["Wishlist"])

@router.get("")
def get_wishlist(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    wishlist_items = db.query(Wishlist).options(joinedload(Wishlist.product)).filter(Wishlist.user_id == current_user.id).all()
    # Join with Product to return product details
    return wishlist_items

@router.post("/toggle/{product_id}")
def toggle_wishlist(product_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing = db.query(Wishlist).filter(Wishlist.user_id == current_user.id, Wishlist.product_id == product_id).first()
    
    if existing:
        db.delete(existing)
        db.commit()
        return {"message": "Removed from wishlist", "in_wishlist": False}
    else:
        new_item = Wishlist(user_id=current_user.id, product_id=product_id)
        db.add(new_item)
        db.commit()
        return {"message": "Added to wishlist", "in_wishlist": True}

@router.get("/check/{product_id}")
def check_wishlist_status(product_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing = db.query(Wishlist).filter(Wishlist.user_id == current_user.id, Wishlist.product_id == product_id).first()
    return {"in_wishlist": existing is not None}
