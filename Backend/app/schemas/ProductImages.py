from pydantic import BaseModel
from typing import Optional

class ProductImageBase(BaseModel):
    product_id: int
    image_url: str
    alt_text: Optional[str] = None
    display_order: int = 0
    is_primary: bool = False

class ProductImageCreate(ProductImageBase):
    pass

class ProductImageUpdate(BaseModel):
    image_url: Optional[str] = None
    alt_text: Optional[str] = None
    display_order: Optional[int] = None
    is_primary: Optional[bool] = None

class ProductImageResponse(ProductImageBase):
    id: int

    class Config:
        from_attributes = True
