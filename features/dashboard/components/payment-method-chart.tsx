"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";
import type { Sale } from "@/types/sale";
import { paymentBreakdown } from "@/lib/analytics";

interface PaymentMethodsChartProps {
  sales: Sale[];
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
];

export function PaymentMethodsChart({ sales }: PaymentMethodsChartProps) {
  const data = paymentBreakdown(sales).map((row) => ({
    ...row,
    methodLabel:
      row.method === "pix"
        ? "Pix"
        : row.method === "card"
          ? "Cartão"
          : "Dinheiro",
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Métodos de pagamento</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            total: { label: "Total", color: "hsl(var(--chart-1))" },
          }}
          className="h-72"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="total"
                nameKey="methodLabel"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.method}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
