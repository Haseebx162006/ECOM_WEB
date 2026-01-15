from datetime import datetime, timedelta
from jose import jwt, JWTError
from config import settings
from fastapi import HTTPException, requests, status
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import get_db
from models.User import User


oAuth_2_Scheme= OAuth2PasswordBearer(tokenUrl="/auth/login")
def create_token(data:dict, expire_time: int):
    
    to_encode= data.copy()
    expire=datetime.utcnow()+timedelta(minutes=int(expire_time))
    
    to_encode.update({
        "exp":expire
    })
    
    try:
        encoded_jwt=jwt.encode(to_encode,settings.SECRET_KEY,algorithm=settings.ALGORITHM)
    except JWTError:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,detail="Unable to encode")
    
    
    return encoded_jwt



def get_current_user(token:str=Depends(oAuth_2_Scheme),db:Session=Depends(get_db)):
    credential_exception= HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="User not Authorized", headers={"WWW-Authenticate": "Bearer"})
    
    try:
        payload=jwt.decode(token=token,key=settings.SECRET_KEY,algorithms=[settings.ALGORITHM])
        user_id=payload.get("sub")
    except:
        raise credential_exception
    
    if not user_id:
        raise credential_exception
    
    user= db.query(User).filter(User.id==user_id).first()
    
    if not user:
        raise credential_exception
    
    
    return user
        
    
    