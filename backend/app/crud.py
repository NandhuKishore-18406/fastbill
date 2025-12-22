import os
import datetime

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import yagmail

from .database import load_db, save_db, add_refill

# -------------------------------------------------
# CONFIG
# -------------------------------------------------

CONFIG = {
    "EMAIL": {
        "ADDRESS": "nandhukishore18406@gmail.com",
        "APP_PASSWORD": "pjvu txen amgx vkjk"
    },
    "PDF": {
        "OUTPUT_DIR": "bills"

    }
}

# -------------------------------------------------
# VALIDATION
# -------------------------------------------------

def check_id(x):
    if not isinstance(x, str) or not x.strip():
        raise ValueError("Invalid product ID")


def check_price(x):
    if not isinstance(x, (int, float)) or x < 0:
        raise ValueError("Invalid price")


def check_stock(x):
    if not isinstance(x, int) or x < 0:
        raise ValueError("Invalid stock value")

# -------------------------------------------------
# INVENTORY
# -------------------------------------------------

def add_prod(pid, name, price, stock, cat, refill):
    check_id(pid); check_price(price); check_stock(stock); check_stock(refill)
    db = load_db()
    if pid in db:
        raise ValueError("ID already exists")

    db[pid] = {
        "id": pid,
        "name": name.strip(),
        "price": float(price),
        "stock": stock,
        "category": cat.strip().lower(),
        "refill_limit": refill
    }
    save_db(db)


def upd_stock(pid, new_stock):
    check_id(pid); check_stock(new_stock)
    db = load_db()
    if pid not in db:
        raise ValueError("Not found")
    db[pid]["stock"] = new_stock
    save_db(db)


def del_prod(pid):
    check_id(pid)
    db = load_db()
    if pid not in db:
        raise ValueError("Not found")
    removed = db.pop(pid)
    save_db(db)
    return removed


def get_prod(pid):
    check_id(pid)
    return load_db().get(pid)


def all_prod():
    return list(load_db().values())

# -------------------------------------------------
# BILLING
# -------------------------------------------------

def make_bill(cart):
    db = load_db()
    items = []
    total = 0

    for pid, qty in cart:
        check_id(pid); check_stock(qty)
        if pid not in db:
            raise ValueError("Product not found")
        if qty > db[pid]["stock"]:
            raise ValueError("Insufficient stock for " + pid)

    for pid, qty in cart:
        p = db[pid]
        amt = p["price"] * qty
        total += amt
        p["stock"] -= qty

        if p["stock"] <= p["refill_limit"]:
            add_refill(p)

        items.append({
            "id": pid,
            "name": p["name"],
            "qty": qty,
            "unit_price": p["price"],
            "amount": amt
        })

    save_db(db)
    return {"items": items, "total": round(total, 2)}

# -------------------------------------------------
# PDF
# -------------------------------------------------

def make_pdf(bill, filename=None):
    output_dir = CONFIG["PDF"]["OUTPUT_DIR"]
    os.makedirs(output_dir, exist_ok=True)

    if filename is None:
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        filename = f"bill_{timestamp}.pdf"

    path = os.path.join(output_dir, filename)

    c = canvas.Canvas(path, pagesize=letter)
    w, h = letter
    y = h - 80

    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, h - 40, "BILL RECEIPT")

    c.setFont("Helvetica", 10)
    for item in bill["items"]:
        c.drawString(
            50, y,
            f"{item['name']} | {item['qty']} x {item['unit_price']} = {item['amount']}"
        )
        y -= 20

    c.drawString(50, y - 20, f"TOTAL: {bill['total']}")
    c.save()
    return path

# -------------------------------------------------
# EMAIL
# -------------------------------------------------

def send_email(to, pdf):
    smtp = yagmail.SMTP(
        CONFIG["EMAIL"]["ADDRESS"],
        CONFIG["EMAIL"]["APP_PASSWORD"]
    )
    smtp.send(to, "Your Receipt", "Attached bill.", attachments=pdf)
