from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.Category import Category

router = APIRouter(prefix="/api/categories", tags=["Categories"])

from typing import List
from app.schemas.Category import CategoryResponse

@router.get("", response_model=List[CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).filter(Category.is_active == True).all()
    return categories
