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
import { ticketHistogram } from "@/lib/analytics";

interface TicketDistributionChartProps {
  sales: Sale[];
}

export function TicketDistributionChart({
  sales,
}: TicketDistributionChartProps) {
  const data = ticketHistogram(sales);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            count: { label: "Vendas", color: "hsl(var(--chart-3))" },
          }}
          className="h-72"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" tickLine={false} />
              <YAxis allowDecimals={false} tickLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="count"
                radius={[6, 6, 0, 0]}
                fill="var(--color-count)"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
