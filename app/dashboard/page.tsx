import { getSales } from "@/features/sales/services/get-sales";
import { getProducts } from "@/features/products/services/get-products";
import { DashboardContent } from "@/features/dashboard/components/dashboard-content";

export default async function DashboardPage() {
  const [sales, products] = await Promise.all([getSales(), getProducts()]);

  return <DashboardContent initialSales={sales} products={products} />;
}
