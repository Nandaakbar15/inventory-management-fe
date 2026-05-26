import type { Product } from "./Product";

export type Stock = {
  id: number;
  product_id: number;
  product?: Product;
  quantity: number;
  location: string;
  expiration_date: Date;
};
