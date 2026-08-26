export function getDataISO(offsetDias: number = 0): string {
  const data = new Date();
  data.setDate(data.getDate() + offsetDias);
  return data.toISOString().split("T")[0]; // "YYYY-MM-DD"
}

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}