import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    if (
        request.nextUrl.pathname.startsWith('/proxy-api/entur-game-backend/v1')
    ) {
        const newUrl = new URL(
            process.env.apiUrl +
                request.nextUrl.pathname.replace(
                    '/proxy-api/entur-game-backend/v1',
                    '',
                ) +
                request.nextUrl.search,
        )
        return NextResponse.rewrite(newUrl)
    }
}
