from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routes import auth, products, categories, cart, orders, wishlist

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Cartopia API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(products.router)
app.include_router(categories.router)
app.include_router(cart.router)
app.include_router(orders.router)
app.include_router(wishlist.router)

from fastapi.staticfiles import StaticFiles
import os

# Create static directory if not exists
if not os.path.exists("app/static/images"):
    os.makedirs("app/static/images")

app.mount("/static", StaticFiles(directory="app/static"), name="static")

@app.get("/")
def root():
    return {"message": "Welcome to Cartopia API"}