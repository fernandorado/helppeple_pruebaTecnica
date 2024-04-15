import { Product } from "./Product";

export interface UpdateProduct {
  id: number;
  update: Partial<Omit<Product, "id">> & { id?: never };
}
