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
  ReferenceLine,
} from "recharts";
import type { Sale } from "@/types/sale";
import { buildDailySeries } from "@/lib/analytics";
import currency from "@/helpers/money";

interface RevenueOverTimeChartProps {
  sales: Sale[];
}

export function RevenueOverTimeChart({ sales }: RevenueOverTimeChartProps) {
  const data = buildDailySeries(sales);
  const hasData = data.length > 0;

  const mean =
    data.length > 0
      ? data.reduce((acc, d) => acc + d.revenue, 0) / data.length
      : 0;

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-base">Receita diária</CardTitle>
          <p className="text-xs text-muted-foreground">
            Evolução da receita no período filtrado.
          </p>
        </div>
        {hasData && (
          <div className="rounded-md bg-muted px-3 py-1 text-right">
            <p className="text-[10px] uppercase text-muted-foreground">
              Média diária
            </p>
            <p className="text-xs font-semibold">
              {currency(Math.round(mean))}
            </p>
          </div>
        )}
      </CardHeader>

      <CardContent className="h-full pt-2">
        {!hasData ? (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            Sem dados de receita para o período.
          </div>
        ) : (
          <ChartContainer
            config={{
              revenue: {
                label: "Receita",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-full w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 8, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>

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
                  axisLine={false}
                  fontSize={11}
                />

                <YAxis
                  tickFormatter={(v) => `R$ ${Math.round(Number(v) / 1000)}k`}
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  width={60}
                />

                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => currency(Number(value))}
                      labelFormatter={(v) =>
                        new Intl.DateTimeFormat("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        }).format(new Date(v as string))
                      }
                    />
                  }
                />

                <ChartLegend content={<ChartLegendContent />} />

                <ReferenceLine
                  y={mean}
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="4 4"
                  strokeWidth={1}
                  ifOverflow="extendDomain"
                />

                <Area
                  dataKey="revenue"
                  type="monotone"
                  stroke="hsl(var(--chart-1))"
                  fill="url(#revenueGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
