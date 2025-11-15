"use client";

import { useMemo, useState } from "react";
import type { Sale } from "@/types/sale";
import type { Product } from "@/types/product";

import { SalesSummaryCards } from "@/features/sales/components/sales-summary-card";
import { RevenueOverTimeChart } from "@/features/dashboard/components/revenue-over-chart";
import { PaymentMethodsChart } from "@/features/dashboard/components/payment-method-chart";
import { TicketDistributionChart } from "@/features/dashboard/components/ticket-distribution-chart";
import { TopProductsTable } from "@/features/products/components/top-products-table";
import { SalesFilters } from "@/features/sales/components/sales-filter";

import { DescriptiveStatsCard } from "./descriptive-stats";
import { WeekdayRevenueChart } from "./weekday-revenue";
import { ItemsPerSaleChart } from "./items-per-sale";

export type Range = "7d" | "30d" | "90d" | "all";

interface DashboardContentProps {
  initialSales: Sale[];
  products: Product[];
}

function getMinDateForRange(range: Range): Date {
  const now = new Date();

  if (range === "all") return new Date(0);

  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;

  return new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
}

export function DashboardContent({
  initialSales,
  products,
}: DashboardContentProps) {
  const [range, setRange] = useState<Range>("90d");
  const [query, setQuery] = useState("");

  const filteredSales = useMemo(() => {
    const minDate = getMinDateForRange(range);

    return initialSales
      .filter((sale) => new Date(sale.createdAt) >= minDate)
      .filter((sale) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();

        return (
          (sale.customer ?? "").toLowerCase().includes(q) ||
          sale.method.toLowerCase().includes(q) ||
          String(sale.total).includes(q)
        );
      })
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }, [initialSales, range, query]);

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
        onRangeChange={setRange}
        query={query}
        onQueryChange={setQuery}
      />

      <SalesSummaryCards sales={filteredSales} />

      {/* Linha 1 – tendência + composição de vendas */}
      <div className="grid gap-4 md:grid-cols-3">
        <RevenueOverTimeChart sales={filteredSales} />
        <div className="flex flex-col gap-4">
          <PaymentMethodsChart sales={filteredSales} />
          <TicketDistributionChart sales={filteredSales} />
        </div>
      </div>

      {/* Linha 2 – análise quantitativa pesada */}
      <div className="grid gap-4 md:grid-cols-3">
        <DescriptiveStatsCard sales={filteredSales} />
        <WeekdayRevenueChart sales={filteredSales} />
        <ItemsPerSaleChart sales={filteredSales} />
      </div>

      <TopProductsTable products={products} />
    </div>
  );
}
