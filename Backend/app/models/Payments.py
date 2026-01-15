# app/app.models/payment.py
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("orders.id"))

    method = Column(String)  # card, stripe, paypal
    transaction_id = Column(String, unique=True)
    amount = Column(Float)
    status = Column(String)  # success, failed, refunded
    refund_amount = Column(Float, default=0.0)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    order = relationship("Order", backref="payments")
