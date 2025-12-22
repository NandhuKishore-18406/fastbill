from pydantic import BaseModel

class ProductBase(BaseModel):
    id: str
    name: str
    price: float
    stock: int
    category: str
    refill_limit: int

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    pass
