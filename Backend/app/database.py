from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from auth.config import settings
Base=declarative_base()

engine=create_engine(
    settings.DB_URL,
    pool_pre_ping=True, # verify the connection before using it 
    pool_recycle=3600, # Recycle connection every Hour
    )

session_Local= sessionmaker(bind=engine,autoflush=False,autocommit=False)

def get_db():
    db=session_Local()
    try:
        yield db
    finally:
        db.close()