
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class ProductImage(Base):
    __tablename__ = "product_images"

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)

    image_url = Column(String, nullable=False)
    alt_text = Column(String, nullable=True)
    display_order = Column(Integer, default=0)
    is_primary = Column(Boolean, default=False)

    product = relationship("Product", backref="images")
