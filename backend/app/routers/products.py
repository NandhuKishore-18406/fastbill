from fastapi import APIRouter
from .. import crud, schemas

router = APIRouter(prefix="/products", tags=["Products"])

# -------------------------------------------------
# GET all products
# -------------------------------------------------

@router.get("/", response_model=list[schemas.Product])
def read_products():
    return crud.all_prod()

# -------------------------------------------------
# ADD new product
# -------------------------------------------------

@router.post("/", response_model=dict)
def add_product(product: schemas.ProductCreate):
    crud.add_prod(
        product.id,
        product.name,
        product.price,
        product.stock,
        product.category,
        product.refill_limit
    )
    return {"message": "Product added successfully"}

# -------------------------------------------------
# DELETE product
# -------------------------------------------------

@router.delete("/{pid}", response_model=dict)
def delete_product(pid: str):
    deleted = crud.del_prod(pid)
    return {"deleted": deleted}


@router.put("/{pid}/stock")
def update_stock(pid: str, stock: int):
    crud.upd_stock(pid, stock)
    return {"message": "Stock updated"}
