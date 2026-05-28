import type { Product } from "./Product";
import type { Penjualan } from "./Penjualan";

export type Laporan = {
  id: number;

  product_id: number;
  penjualan_id: number;

  product?: Product;
  penjualan?: Penjualan;

  tgl_laporan: Date;
};
