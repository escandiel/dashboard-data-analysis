export default function currency(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
