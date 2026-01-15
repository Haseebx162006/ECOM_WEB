from sqlalchemy import Column, Integer , String, ForeignKey,Boolean, DateTime,func
from sqlalchemy.orm import relationship
from database import Base


class Category(Base):
    
    __tablename__="categories"
    
    id=Column(Integer,nullable=False,unique=True,primary_key=True, index=True)
    name=Column(String,nullable=False,unique=True)
    slug=Column(String,nullable=False,unique=True)
    description=Column(String,nullable=True)
    icon=Column(String,nullable=True)
    
    
    parent_id=Column(Integer,ForeignKey("categories.id"),nullable=True)
    parent=relationship("Category",remote_side=[id],backref="subcatogries")
    
    
    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())