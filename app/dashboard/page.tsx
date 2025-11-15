import { getSales } from "@/features/sales/services/get-sales";
import { getProducts } from "@/features/products/services/get-products";
import { SalesSummaryCards } from "@/components/dashboard/sales-summary-cards";
import { RevenueOverTimeChart } from "@/components/dashboard/revenue-over-time-chart";
import { PaymentMethodsChart } from "@/components/dashboard/payment-methods-chart";
import { TicketDistributionChart } from "@/components/dashboard/ticket-distribution-chart";
import { TopProductsTable } from "@/components/dashboard/top-products-table";
import { SalesFilters } from "@/components/dashboard/sales-filters";

export default async function DashboardPage() {
  const [sales, products] = await Promise.all([getSales(), getProducts()]);

  const range: "7d" | "30d" | "90d" | "all" = "90d";
  const filteredSales = sales;

  return (
    <div className="flex flex-col gap-6 p-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Painel de vendas
        </h1>
        <p className="text-sm text-muted-foreground">
          Análise quantitativa das vendas e do estoque.
        </p>
      </header>

      <SalesFilters
        range={range}
        onRangeChange={() => {}}
        query={""}
        onQueryChange={() => {}}
      />

      <SalesSummaryCards sales={filteredSales} />

      <div className="grid gap-4 md:grid-cols-3">
        <RevenueOverTimeChart sales={filteredSales} />
        <div className="flex flex-col gap-4">
          <PaymentMethodsChart sales={filteredSales} />
          <TicketDistributionChart sales={filteredSales} />
        </div>
      </div>

      <TopProductsTable products={products} />
    </div>
  );
}
