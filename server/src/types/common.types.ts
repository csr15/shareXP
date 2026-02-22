export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}
