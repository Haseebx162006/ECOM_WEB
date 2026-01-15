from sqlalchemy import Column, Integer , String, ForeignKey,Boolean, DateTime,func,Float
from sqlalchemy.orm import relationship
from database import Base


class Product(Base):
    __tablename__="products"
    
    id= Column(Integer, primary_key=True, nullable=False,index=True)
    price=Column(float,nullable=False)
    description=Column(String,nullable=True)
    discount_percent=Column(float,nullable=True)
    stock_quantity = Column(Integer, default=0)
    sku = Column(String, unique=True, nullable=False)
    is_available = Column(Boolean, default=True)
    category_id=Column(Integer,ForeignKey("categories.id"),nullable=False)
    
    category=relationship("Category",backref="prodcuts")
    