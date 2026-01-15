from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

import os

Base = declarative_base()

# Use absolute path to avoid CWD issues
DB_DIR = os.path.dirname(os.path.abspath(__file__))
SQLALCHEMY_DATABASE_URL = f"sqlite:///{os.path.join(DB_DIR, 'cartopia.db')}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}
)

session_Local = sessionmaker(bind=engine, autoflush=False, autocommit=False)

def get_db():
    db = session_Local()
    try:
        yield db
    finally:
        db.close()