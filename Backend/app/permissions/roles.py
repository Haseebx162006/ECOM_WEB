from auth.dependecies import get_current_user
from fastapi import Depends,HTTPException,status
from models.User import User


def require_role(*allowed_roles):
    def role_checker(user:User=Depends(get_current_user)):
        if user.role not in allowed_roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Forbidden Access")
        
        return user
    return role_checker

