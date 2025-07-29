// Formata um número como moeda brasileira (R$ 1.234,56)
export function formatarMoedaBR(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}

// Formata um número como decimal (1.234,56)
export function decimalFormat(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Formata um número como porcentagem (50,00%)
export function formatarPorcentagem(valor: number): string {
  return (valor / 100).toLocaleString('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
  });
}

// Formata uma data como dd/MM/yyyy
export function formatarData(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR');
}

// Formata uma data com hora: dd/MM/yyyy HH:mm
export function formatarDataHora(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Formata um CNPJ (ex: 12.345.678/0001-90)
export function formatarCNPJ(cnpj: string): string {
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

// Formata um CPF (ex: 123.456.789-09)
export function formatarCPF(cpf: string): string {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}

export function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}