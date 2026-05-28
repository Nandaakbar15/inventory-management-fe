import type { Product } from "./Product";
import type { Penjualan } from "./Penjualan";

export type Transaksi = {
  id: number;

  product_id: number;
  penjualan_id: number;

  product?: Product;
  penjualan?: Penjualan;

  tgl_transaksi_masuk: Date;
  tgl_transaksi_keluar: Date;
};
