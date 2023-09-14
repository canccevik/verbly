import { NextRequest, NextResponse } from 'next/server'

export const publicRoutes = [
  '/sign-in',
  '/sign-up',
  '/sign-up/otp',
  '/forgot-password',
  '/reset-password'
]

export function middleware(request: NextRequest) {
  const isPublicFile = /\.(.*)$/.test(request.nextUrl.pathname)

  if (isPublicFile) return

  const sessionId = request.cookies.get('sessionId')

  const isRequestedRoutePublic = publicRoutes.includes(request.nextUrl.pathname)

  if (!isRequestedRoutePublic && !sessionId) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
  if (isRequestedRoutePublic && sessionId) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
