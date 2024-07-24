export interface PaginatedData<T> {
  minPaymentDate: any;
  pageCount: number;
  currentPage: number;
  total: number;
  data: T[];
}
