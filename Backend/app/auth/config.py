import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY=os.getenv("SECRET_KEY")
    ALGORITHM=os.getenv("ALGORITHM")
    DB_URL=os.getenv("DB_URL")
    ACCESS_TOKEN_EXPIRE_MINUTES=os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
    REFRESH_TOKEN_EXPRE_DAYS=os.getenv("REFRESH_TOKEN_EXPRE_DAYS")
    
settings=Config()