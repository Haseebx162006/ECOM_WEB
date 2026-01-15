# app/app.models/order.py
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    order_number = Column(String, unique=True, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    subtotal = Column(Float, nullable=False)
    tax = Column(Float, default=0.0)
    shipping = Column(Float, default=0.0)
    discount = Column(Float, default=0.0)
    total_amount = Column(Float, nullable=False)

    status = Column(String, default="pending")  # pending, shipped, delivered
    payment_status = Column(String, default="unpaid")

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", backref="orders")
