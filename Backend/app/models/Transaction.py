# app/app.models/stock_transaction.py
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class StockTransaction(Base):
    __tablename__ = "stock_transactions"

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    seller_id = Column(Integer, ForeignKey("users.id"))

    reason = Column(String)  # sale, restock, return
    before_qty = Column(Integer)
    after_qty = Column(Integer)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    product = relationship("Product")
    seller = relationship("User")
