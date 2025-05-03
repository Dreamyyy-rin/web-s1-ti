export interface PaginationQueryParams{
  search?: string;
  page?: number;
  per_page?: number;
  from_date?: PaginationDate;
  to_date?: PaginationDate;
  sort_by?: "oldest" | "latest"
}
export const tes : PaginationDate = "20-023-0234"

export type PaginationDate = `${number}-${number}-${number}`