"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Sale } from "@/types/sale";
import currency from "@/helpers/money";

interface DescriptiveStatsCardProps {
  sales: Sale[];
}

function computeDescriptiveStats(values: number[]) {
  if (!values.length) {
    return { mean: 0, median: 0, min: 0, max: 0, std: 0, count: 0 };
  }

  const sorted = [...values].sort((a, b) => a - b);
  const count = values.length;
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const mean = values.reduce((acc, v) => acc + v, 0) / count;

  const middle = Math.floor(count / 2);
  const median =
    count % 2 === 0
      ? (sorted[middle - 1] + sorted[middle]) / 2
      : sorted[middle];

  const variance =
    values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / count;
  const std = Math.sqrt(variance);

  return { mean, median, min, max, std, count };
}

export function DescriptiveStatsCard({ sales }: DescriptiveStatsCardProps) {
  const values = sales.map((s) => s.total);
  const { mean, median, min, max, std, count } =
    computeDescriptiveStats(values);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Estatísticas descritivas (tickets)
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Análise quantitativa dos valores de venda (total por venda).
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 text-xs md:grid-cols-3">
        <div>
          <p className="text-muted-foreground mb-1">Amostra</p>
          <p className="font-semibold">{count} vendas</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">Média</p>
          <p className="font-semibold">{currency(mean)}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">Mediana</p>
          <p className="font-semibold">{currency(median)}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">Mínimo</p>
          <p className="font-semibold">{currency(min)}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">Máximo</p>
          <p className="font-semibold">{currency(max)}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">Desvio padrão</p>
          <p className="font-semibold">{currency(std)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
