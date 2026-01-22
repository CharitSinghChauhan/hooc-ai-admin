import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  // TODO : add the redirect from here
  return NextResponse.next();
}
