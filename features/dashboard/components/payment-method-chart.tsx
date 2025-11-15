"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Pie, PieChart, ResponsiveContainer, Cell, Label } from "recharts";
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
  const raw = paymentBreakdown(sales);
  const totalRevenue = raw.reduce((acc, r) => acc + r.total, 0);

  const data = raw.map((row) => ({
    ...row,
    methodLabel:
      row.method === "pix"
        ? "Pix"
        : row.method === "card"
          ? "Cartão"
          : "Dinheiro",
    percent: totalRevenue ? (row.total / totalRevenue) * 100 : 0,
  }));

  const hasData = data.length > 0 && totalRevenue > 0;

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-base">Métodos de pagamento</CardTitle>
        <p className="text-xs text-muted-foreground">
          Proporção de receita por método no período filtrado.
        </p>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="flex h-72 items-center justify-center text-xs text-muted-foreground">
            Sem vendas no período selecionado.
          </div>
        ) : (
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
                  <Label
                    position="center"
                    content={({ viewBox }) => {
                      if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox))
                        return null;
                      const { cx, cy } = viewBox;
                      return (
                        <text
                          x={cx}
                          y={cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={cx}
                            y={cy}
                            className="text-xl font-semibold fill-foreground"
                          >
                            {data[0] ? `${data[0].percent.toFixed(0)}%` : "—"}
                          </tspan>
                          <tspan
                            x={cx}
                            y={(cy ?? 0) + 18}
                            className="text-[10px] fill-muted-foreground"
                          >
                            maior participação
                          </tspan>
                        </text>
                      );
                    }}
                  />
                </Pie>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name, props) => {
                        const percent = (props?.payload as any)?.percent as
                          | number
                          | undefined;
                        return [
                          `R$ ${Number(value).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}`,
                          `${name} · ${percent?.toFixed(1)}%`,
                        ];
                      }}
                    />
                  }
                />
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
