import type { Product } from "./Product";
import type { Categories } from "./Categories";

export type Penjualan = {
  id: number;
  product_id: number;
  category_id: number;

  product?: Product;
  categories?: Categories;

  total_penjualan: number;
  tgl_penjualan: Date;
};
