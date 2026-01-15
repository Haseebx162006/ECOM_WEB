from pydantic import BaseModel
from typing import Optional
from app.schemas.Category import CategoryResponse

class ProductBase(BaseModel):
    description: str
    price: float
    sku: str
    stock_quantity: int
    discount_percent: float = 0.0
    category_id: int
    image_url: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    description: Optional[str] = None
    price: Optional[float] = None
    stock_quantity: Optional[int] = None
    discount_percent: Optional[float] = None
    image_url: Optional[str] = None

class ProductResponse(ProductBase):
    id: int
    is_available: bool
    category: Optional[CategoryResponse] = None

    class Config:
        orm_mode = True
