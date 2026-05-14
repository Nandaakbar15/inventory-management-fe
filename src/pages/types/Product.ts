import type { Categories } from "./Categories";

export type Product = {
  id: number;
  category_id: number;
  sku: string;
  name: string;
  description: string | null; // Gunakan null jika di DB boleh kosong
  min_stock: number;
  purchase_price: number;
  sell_price: number;

  category?: Categories;

  created_at?: string;
  updated_at?: string;
};
