import { NextRequest, NextResponse } from "next/server";

const BOT_UA_PATTERN =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|curl|wget|python-requests|scrapy|headless|phantomjs|selenium|puppeteer|go-http-client|libwww|httpclient|okhttp|axios|node-fetch|postman/i;

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";

  if (userAgent.trim() === "" || BOT_UA_PATTERN.test(userAgent)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
