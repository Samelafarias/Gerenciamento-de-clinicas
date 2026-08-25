export function getInitials(nomeCompleto: string): string {
  if (!nomeCompleto) return "";

  const partes = nomeCompleto.trim().split(" ").filter(Boolean);

  if (partes.length === 1) {
    return partes[0].substring(0, 2).toUpperCase();
  }

  const primeira = partes[0][0];
  const ultima = partes[partes.length - 1][0];

  return (primeira + ultima).toUpperCase();
}