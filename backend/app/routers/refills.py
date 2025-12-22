from fastapi import APIRouter
from ..database import load_refills

router = APIRouter(prefix="/refills", tags=["Refills"])

@router.get("/")
def get_refills():
    return list(load_refills().values())
