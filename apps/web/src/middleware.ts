import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const isPublicFile = /\.(.*)$/.test(request.nextUrl.pathname)

  if (isPublicFile) return

  const sessionId = request.cookies.get('sessionId')

  const publicRoutes = ['/sign-in', '/sign-up']
  const isRequestedRoutePublic = publicRoutes.includes(request.nextUrl.pathname)

  if (!isRequestedRoutePublic && !sessionId) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
  if (isRequestedRoutePublic && sessionId) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
