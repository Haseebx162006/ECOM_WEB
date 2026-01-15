from app.database import Base
from sqlalchemy import Column,String,Integer,func,DateTime,Double,Float
class User(Base):
    
    __tablename__="users"
     
    id=Column(Integer, primary_key=True, index=True)
    name=Column(String, nullable=False)
    email=Column(String,unique=True,nullable=False)
    password=Column(String,nullable=False)
    created_at=Column(DateTime(timezone=True),server_default=func.now())
    updated_at=Column(DateTime(timezone=True),server_default=func.now(),onupdate=func.now())
    
    
    role=Column(String,nullable=False,default="user")
    
    
    
    seller_name = Column(String, nullable=True)
    seller_description = Column(String, nullable=True)
    seller_rating = Column(Float, default=0.0)
    