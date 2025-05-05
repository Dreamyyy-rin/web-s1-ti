export interface PaginationResponse<T>{
  data: T[];
  meta: PaginationResponseMeta;
}

export interface PaginationResponseMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

