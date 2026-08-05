/**
 * PLACEHOLDER HTTP client.
 *
 * TODO(integration): features/auth already has a fetch wrapper with
 * httpOnly-cookie session handling. Once that's promoted to a shared
 * location (it's used by 2+ features), delete this file and import that
 * instead. Until then, this keeps Profile's services self-contained.
 *
 * Every service function below currently returns mock data and does NOT
 * call this yet — each has a commented-out line showing where the real
 * call goes once /api/... routes exist on the Express backend.
 */
export async function apiRequest<TResponse>(
  path: string,
  options?: RequestInit,
): Promise<TResponse> {
  const response = await fetch(path, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }
  return response.json() as Promise<TResponse>;
}
