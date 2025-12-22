from fastapi import APIRouter
from .. import crud
from fastapi.responses import FileResponse
import os

router = APIRouter(prefix="/bill", tags=["Billing"])

@router.post("/")
def generate_bill(cart: list[dict]):
    """
    cart example:
    [
        {"id": "P001", "qty": 2},
        {"id": "P002", "qty": 1}
    ]
    """

    # convert frontend cart → expected format
    formatted_cart = [(item["id"], item["qty"]) for item in cart]

    bill = crud.make_bill(formatted_cart)
    pdf_path = crud.make_pdf(bill)

    return {
        "bill": bill,
        "pdf": pdf_path
    }


@router.get("/download")
def download_bill(pdf_path: str):
    """
    Example:
    /bill/download?pdf_path=output/bills/bill_2025-09-10_10-30-00.pdf
    """
    if not os.path.exists(pdf_path):
        return {"error": "File not found"}

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename=os.path.basename(pdf_path)
    )
