export type PaymentMethod = "pix" | "card" | "cash";

export type SaleStatus = "paid" | "pending";

export interface Sale {
  id: string;
  customer: string | null;
  items: number;
  total: number;
  method: PaymentMethod;
  status: SaleStatus;
  createdAt: string;
  updatedAt: string;
}
