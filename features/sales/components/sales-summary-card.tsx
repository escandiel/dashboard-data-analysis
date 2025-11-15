"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import currency from "@/helpers/money";
import type { Sale } from "@/types/sale";
import { revenueStats } from "@/lib/analytics";

interface SalesSummaryCardsProps {
  sales: Sale[];
}

export function SalesSummaryCards({ sales }: SalesSummaryCardsProps) {
  const totalRevenue = sales.reduce((acc, s) => acc + s.total, 0);
  const ordersCount = sales.length;
  const avgTicket = ordersCount ? totalRevenue / ordersCount : 0;

  const stats = revenueStats(sales);

  return (
    <div className="grid gap-4 md:grid-cols-[2fr,1.5fr]">
      <Card className="bg-black text-white">
        <CardContent className="p-5 flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wide text-zinc-400">
            Visão geral
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold">
              {currency(totalRevenue)}
            </span>
            <span className="text-xs text-zinc-400">em vendas</span>
          </div>
          <div className="flex gap-6 mt-3 text-xs text-zinc-300">
            <div className="flex flex-col">
              <span className="text-zinc-400">Pedidos</span>
              <span className="font-semibold text-white">{ordersCount}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-400">Ticket médio</span>
              <span className="font-semibold text-white">
                {currency(avgTicket)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Distribuição dos tickets
            </span>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <p className="text-muted-foreground">Média</p>
              <p className="text-base font-semibold">{currency(stats.mean)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Mediana</p>
              <p className="text-base font-semibold">
                {currency(stats.median)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Mínimo</p>
              <p className="text-base font-semibold">{currency(stats.min)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Máximo</p>
              <p className="text-base font-semibold">{currency(stats.max)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
