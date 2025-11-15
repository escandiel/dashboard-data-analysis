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
import currency from "@/helpers/money";

interface WeekdayRevenueChartProps {
  sales: Sale[];
}

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function WeekdayRevenueChart({ sales }: WeekdayRevenueChartProps) {
  const acc = new Array(7).fill(0) as number[];

  sales.forEach((s) => {
    const d = new Date(s.createdAt);
    const day = d.getDay(); // 0-6
    acc[day] += s.total;
  });

  const data = acc.map((value, index) => ({
    weekday: WEEKDAYS[index],
    value,
  }));

  const hasData = sales.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Receita por dia da semana</CardTitle>
        <p className="text-xs text-muted-foreground">
          Identifique padrões de venda ao longo da semana.
        </p>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="flex h-64 items-center justify-center text-xs text-muted-foreground">
            Sem dados suficientes para análise por dia da semana.
          </div>
        ) : (
          <ChartContainer
            config={{
              value: { label: "Receita", color: "hsl(var(--chart-2))" },
            }}
            className="h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="weekday"
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
                      formatter={(value, _name, props) => [
                        currency(Number(value)),
                        `Receita em ${(props?.payload as any)?.weekday}`,
                      ]}
                    />
                  }
                />
                <Bar
                  dataKey="value"
                  radius={[6, 6, 0, 0]}
                  fill="var(--color-value)"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
