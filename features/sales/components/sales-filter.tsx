"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type Range = "7d" | "30d" | "90d" | "all";

interface SalesFiltersProps {
  range: Range;
  onRangeChange: (value: Range) => void;
  query: string;
  onQueryChange: (value: string) => void;
}

export function SalesFilters({
  range,
  onRangeChange,
  query,
  onQueryChange,
}: SalesFiltersProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-2">
        <Select value={range} onValueChange={(v) => onRangeChange(v as Range)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Últimos 7 dias</SelectItem>
            <SelectItem value="30d">Últimos 30 dias</SelectItem>
            <SelectItem value="90d">Últimos 90 dias</SelectItem>
            <SelectItem value="all">Todo período</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-72">
        <Input
          placeholder="Buscar por cliente, método ou valor..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
    </div>
  );
}
