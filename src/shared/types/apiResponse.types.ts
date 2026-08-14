export interface ApiSuccessResponse<T> {
  success: true;
  statusCode: number;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  errors: string[];
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Normalized shape thrown by shared/lib/http.ts and apiClient.ts on any
 * non-2xx response or network failure, so callers never need to branch
 * on the raw envelope shape.
 */
export interface ApiError {
  statusCode: number;
  message: string;
  errors: string[];
}