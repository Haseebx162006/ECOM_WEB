from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class StockTransactionBase(BaseModel):
    product_id: Optional[int] = None
    seller_id: Optional[int] = None
    reason: Optional[str] = None
    before_qty: Optional[int] = None
    after_qty: Optional[int] = None

class StockTransactionCreate(StockTransactionBase):
    pass

class StockTransactionResponse(StockTransactionBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
