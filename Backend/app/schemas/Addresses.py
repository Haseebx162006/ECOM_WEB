from pydantic import BaseModel
from typing import Optional

class AddressBase(BaseModel):
    street: str
    city: str
    state: str
    zip: str
    country: str
    default_shipping: bool = False
    default_billing: bool = False

class AddressCreate(AddressBase):
    user_id: int

class AddressUpdate(BaseModel):
    street: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip: Optional[str] = None
    country: Optional[str] = None
    default_shipping: Optional[bool] = None
    default_billing: Optional[bool] = None

class AddressResponse(AddressBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
