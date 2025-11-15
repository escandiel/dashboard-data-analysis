"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/features/products/types/product-model";
import { topProductsByStockValue } from "@/lib/analytics";
import currency from "@/helpers/money";

interface TopProductsTableProps {
  products: Product[];
}

export function TopProductsTable({ products }: TopProductsTableProps) {
  const rows = topProductsByStockValue(products, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top produtos por valor em estoque</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="py-2 text-left">Produto</th>
                <th className="py-2 text-right">Estoque</th>
                <th className="py-2 text-right">Preço</th>
                <th className="py-2 text-right">Valor total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id} className="border-b last:border-0">
                  <td className="py-2 pr-4">
                    <div className="flex flex-col">
                      <span className="font-medium">{p.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {p.brand}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 text-right">{p.stock}</td>
                  <td className="py-2 text-right">{currency(p.price)}</td>
                  <td className="py-2 text-right font-medium">
                    {currency(p.stockValue)}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-4 text-center text-sm text-muted-foreground"
                  >
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
