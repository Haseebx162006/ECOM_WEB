from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class OrderBase(BaseModel):
    order_number: str
    user_id: int
    subtotal: float
    tax: float = 0.0
    shipping: float = 0.0
    discount: float = 0.0
    total_amount: float
    status: str = "pending"
    payment_status: str = "unpaid"

class OrderCreate(OrderBase):
    pass

class OrderUpdate(BaseModel):
    status: Optional[str] = None
    payment_status: Optional[str] = None

class OrderResponse(OrderBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
