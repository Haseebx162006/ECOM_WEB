from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PaymentBase(BaseModel):
    order_id: Optional[int] = None
    method: Optional[str] = None
    transaction_id: Optional[str] = None
    amount: Optional[float] = None
    status: Optional[str] = None
    refund_amount: float = 0.0

class PaymentCreate(PaymentBase):
    pass

class PaymentUpdate(BaseModel):
    status: Optional[str] = None
    refund_amount: Optional[float] = None

class PaymentResponse(PaymentBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
