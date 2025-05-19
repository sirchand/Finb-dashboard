// src/types.ts
export interface CategoryEntry {
  name: string;
  value: number;
}

export interface CategoriesData {
  last: CategoryEntry[];
  month: CategoryEntry[];
  quarter: CategoryEntry[];
}
