import type { Categories } from "./Categories";

export type Stock = {
  id: number;
  product_id: number;
  quantity: number;
  location: string | null;
  expiration_date: string | null;
};

export type Product = {
  id: number;
  category_id: number;
  image: string;
  sku: string;
  name: string;
  description: string | null; // Gunakan null jika di DB boleh kosong
  min_stock: number;
  purchase_price: number;
  sell_price: number;

  category?: Categories;
  stocks?: Stock[];
  expiring_stock?: Stock;

  created_at?: string;
  updated_at?: string;
};
