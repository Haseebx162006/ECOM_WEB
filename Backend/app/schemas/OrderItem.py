from pydantic import BaseModel

class OrderItemBase(BaseModel):
    order_id: int
    product_id: int
    seller_id: int
    quantity: int
    price_at_purchase: float

class OrderItemCreate(OrderItemBase):
    pass

class OrderItemResponse(OrderItemBase):
    id: int

    class Config:
        from_attributes = True
