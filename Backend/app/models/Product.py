from sqlalchemy import Column, Integer , String, ForeignKey,Boolean, DateTime,func,Float
from sqlalchemy.orm import relationship
from app.database import Base


class Product(Base):
    __tablename__="products"
    
    id= Column(Integer, primary_key=True, nullable=False,index=True)
    price=Column(Float,nullable=False)
    description=Column(String,nullable=True)
    discount_percent=Column(Float,nullable=True)
    stock_quantity = Column(Integer, default=0)
    sku = Column(String, unique=True, nullable=False)
    image_url = Column(String, nullable=True) # Main product image
    is_available = Column(Boolean, default=True)
    category_id=Column(Integer,ForeignKey("categories.id"),nullable=False)
    seller_id = Column(Integer, ForeignKey("users.id"), nullable=True) # Link to Seller
    
    category=relationship("Category",backref="prodcuts")
    seller = relationship("app.models.User.User", backref="products")
    