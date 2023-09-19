import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { ApiResponse } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchApi<T = any>(
  url: RequestInfo | URL,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  body?: Record<string, unknown>
) {
  const response = await fetch(process.env.API_URL! + url, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const data = await response.json()
  return data as ApiResponse<T>
}
