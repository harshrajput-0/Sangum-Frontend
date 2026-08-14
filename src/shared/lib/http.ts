import { API_BASE_URL } from "../config/env";
import type { ApiError, ApiResponse } from "../types/apiResponse.types";

/**
 * Base request helper. `credentials: "include"` is required on every
 * call — without it the refresh cookie is never sent or received (see
 * auth-api-reference.md §1).
 */
export async function publicRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      credentials: "include",
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });
  } catch {
    const error: ApiError = {
      statusCode: 0,
      message: "Unable to reach the server. Check your connection and try again.",
      errors: [],
    };
    throw error;
  }

  const body = (await response.json().catch(() => null)) as ApiResponse<T> | null;

  if (!body || !body.success) {
    const error: ApiError = {
      statusCode: body?.statusCode ?? response.status,
      message: body?.message ?? "Something went wrong. Please try again.",
      errors: body && "errors" in body ? body.errors : [],
    };
    throw error;
  }

  return body.data;
}