export function parseInteger({ value }: any): number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  return parseInt(value);
}

export function parseBoolean({ value }: any): boolean | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  return value === 'true' || ((typeof value === 'boolean') && value);
}

export function parseDecimal({ value }: any): number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  return parseFloat(value);
}

export interface Pagination<T> {
  total: number
  data: T[]
}

export const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0
});
