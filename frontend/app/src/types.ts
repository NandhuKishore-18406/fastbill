// src/types.ts

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  refill_limit: number;
};

export type BillItem = {
  id: string;
  name: string;
  qty: number;
  unit_price: number;
  amount: number;
};

export type BillResponse = {
  items: BillItem[];
  total: number;
};
