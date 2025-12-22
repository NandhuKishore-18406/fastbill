import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

PRODUCTS_FILE = os.path.join(BASE_DIR, "products.json")
REFILL_FILE = os.path.join(BASE_DIR, "refill_alert.json")


def load_db():
    if not os.path.exists(PRODUCTS_FILE):
        return {}
    with open(PRODUCTS_FILE, "r") as f:
        return json.load(f)


def save_db(data):
    with open(PRODUCTS_FILE, "w") as f:
        json.dump(data, f, indent=2)


def load_refills():
    if not os.path.exists(REFILL_FILE):
        return {}
    with open(REFILL_FILE, "r") as f:
        return json.load(f)


def save_refills(data):
    with open(REFILL_FILE, "w") as f:
        json.dump(data, f, indent=2)


def add_refill(product):
    refills = load_refills()
    refills[product["id"]] = product
    save_refills(refills)
