export interface Product {
  id: string;
  name: string;
  brand: string;
  sku: string;
  size: string;
  color: string;
  location: string;
  stock: number;
  price: number;
  cost: number;
  condition: "Novo" | "Usado";
  stockDate?: string;
  createdAt: string;
  updatedAt: string;
}
