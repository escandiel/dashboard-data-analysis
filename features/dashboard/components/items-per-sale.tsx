"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import type { Sale } from "@/types/sale";

interface ItemsPerSaleChartProps {
  sales: Sale[];
}

export function ItemsPerSaleChart({ sales }: ItemsPerSaleChartProps) {
  const map = new Map<number, number>();

  sales.forEach((s) => {
    const key = s.items || 0;
    map.set(key, (map.get(key) ?? 0) + 1);
  });

  const data = Array.from(map.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([items, count]) => ({ items, count }));

  const hasData = data.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Itens por venda</CardTitle>
        <p className="text-xs text-muted-foreground">
          Distribuição da quantidade de itens por venda.
        </p>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="flex h-64 items-center justify-center text-xs text-muted-foreground">
            Sem vendas para analisar a distribuição de itens.
          </div>
        ) : (
          <ChartContainer
            config={{
              count: { label: "Vendas", color: "hsl(var(--chart-4))" },
            }}
            className="h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="items"
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  tickFormatter={(v) => `${v} itens`}
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  width={40}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, _name, props) => [
                        `${value} venda(s)`,
                        `${(props?.payload as any)?.items} item(ns)`,
                      ]}
                    />
                  }
                />
                <Bar
                  dataKey="count"
                  radius={[6, 6, 0, 0]}
                  fill="var(--color-count)"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
