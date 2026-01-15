from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CartBase(BaseModel):
    user_id: int
    product_id: int
    quantity: int = 1

class CartCreate(CartBase):
    pass

class CartUpdate(BaseModel):
    quantity: Optional[int] = None

class CartResponse(CartBase):
    id: int
    added_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
