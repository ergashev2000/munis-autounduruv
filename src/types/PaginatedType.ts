export interface PaginatedData<T> {
  pageCount: number;
  currentPage: number;
  total: number;
  data: T[];
}
