import { ApiResponse } from '@/types'

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export function fetcher<T = any>(method: HttpMethod = HttpMethod.GET) {
  return async (
    url: RequestInfo | URL,
    options?: { arg: Record<string, unknown> }
  ) => {
    const response = await fetch(process.env.API_URL! + url, {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options?.arg)
    })
    const data = await response.json()
    return data as ApiResponse<T>
  }
}
