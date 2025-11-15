"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import type { Sale } from "@/types/sale";
import { buildDailySeries } from "@/lib/analytics";
import currency from "@/helpers/money";

interface RevenueOverTimeChartProps {
  sales: Sale[];
}

export function RevenueOverTimeChart({ sales }: RevenueOverTimeChartProps) {
  const data = buildDailySeries(sales);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Receita diária</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            revenue: {
              label: "Receita",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-72"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={(v) =>
                  new Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                  }).format(new Date(v))
                }
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `R$ ${Math.round(v / 1000)}k`}
                tickLine={false}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => currency(Number(value))}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Area
                dataKey="revenue"
                type="monotone"
                stroke="var(--color-revenue)"
                fill="var(--color-revenue)"
                fillOpacity={0.18}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
