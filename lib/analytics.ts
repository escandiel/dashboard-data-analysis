import type { Sale } from "@/types/sale";
import type { Product } from "@/types/product";

export function mean(values: number[]) {
  if (!values.length) return 0;
  const sum = values.reduce((acc, v) => acc + v, 0);
  return sum / values.length;
}

export function median(values: number[]) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

export function revenueStats(sales: Sale[]) {
  const totals = sales.map((s) => s.total);
  return {
    mean: mean(totals),
    median: median(totals),
    max: totals.length ? Math.max(...totals) : 0,
    min: totals.length ? Math.min(...totals) : 0,
  };
}

export function buildDailySeries(sales: Sale[]) {
  const map = new Map<string, { revenue: number; count: number }>();

  for (const sale of sales) {
    const d = new Date(sale.createdAt);
    const key = new Date(d.getFullYear(), d.getMonth(), d.getDate())
      .toISOString()
      .slice(0, 10); // yyyy-mm-dd

    if (!map.has(key)) {
      map.set(key, { revenue: 0, count: 0 });
    }
    const curr = map.get(key)!;
    curr.revenue += sale.total;
    curr.count += 1;
  }

  return Array.from(map.entries())
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .map(([date, { revenue, count }]) => ({
      date,
      revenue,
      count,
    }));
}

export function paymentBreakdown(sales: Sale[]) {
  const map = new Map<string, number>();
  for (const sale of sales) {
    map.set(sale.method, (map.get(sale.method) ?? 0) + sale.total);
  }
  return Array.from(map.entries()).map(([method, total]) => ({
    method,
    total,
  }));
}

export function ticketHistogram(sales: Sale[]) {
  // buckets em R$
  const buckets = [
    { label: "0–200", min: 0, max: 200 },
    { label: "200–400", min: 200, max: 400 },
    { label: "400–600", min: 400, max: 600 },
    { label: "600–800", min: 600, max: 800 },
    { label: "800+", min: 800, max: Infinity },
  ];

  return buckets.map((b) => ({
    label: b.label,
    count: sales.filter((s) => s.total >= b.min && s.total < b.max).length,
  }));
}

export function topProductsByStockValue(products: Product[], limit = 5) {
  return [...products]
    .map((p) => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      stock: p.stock,
      price: p.price,
      stockValue: p.price * p.stock,
    }))
    .sort((a, b) => b.stockValue - a.stockValue)
    .slice(0, limit);
}
