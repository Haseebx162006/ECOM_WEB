from fastapi import APIRouter, Depends, HTTPException, Form, File, UploadFile
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models.Product import Product
from app.models.Category import Category
from app.schemas.Product import ProductResponse
from app.auth.dependecies import get_current_user
from app.models.User import User

router = APIRouter(prefix="/api/products", tags=["Products"])

@router.get("")
def get_products(
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    sort: Optional[str] = None,
    seller_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Product)
    
    if category and category != "All":
        cat = db.query(Category).filter(Category.name == category).first()
        if cat:
            query = query.filter(Product.category_id == cat.id)
    
    if min_price is not None:
        query = query.filter(Product.price >= min_price)
    
    if max_price is not None:
        query = query.filter(Product.price <= max_price)
        
    if seller_id is not None:
        query = query.filter(Product.seller_id == seller_id)
    
    products = query.all()
    
    if sort == "price-low":
        products.sort(key=lambda p: p.price)
    elif sort == "price-high":
        products.sort(key=lambda p: p.price, reverse=True)
    
    return products

@router.get("/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("")
@router.post("")
async def create_product(
    description: str = Form(...),
    price: float = Form(...),
    sku: str = Form(...),
    stock_quantity: int = Form(...),
    discount_percent: float = Form(0.0),
    category_id: int = Form(...),
    image: Optional[UploadFile] = File(None),
    image_url: Optional[str] = Form(None), # Allow URL fallback
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    final_image_url = image_url
    
    if image:
        # Save file
        import shutil
        import os
        import uuid
        
        # Generate unique filename
        file_extension = os.path.splitext(image.filename)[1]
        filename = f"{uuid.uuid4()}{file_extension}"
        file_path = f"app/static/images/{filename}"
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
            
        final_image_url = f"/static/images/{filename}"

    new_product = Product(
        description=description,
        price=price,
        sku=sku,
        stock_quantity=stock_quantity,
        discount_percent=discount_percent,
        category_id=category_id,
        image_url=final_image_url,
        is_available=True,
        seller_id=current_user.id
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product
