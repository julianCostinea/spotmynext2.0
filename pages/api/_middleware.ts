import { NextRequest, NextResponse } from "next/server";
const jwt = require("@tsndr/cloudflare-worker-jwt");

const USER_TOKEN = process.env.USER_TOKEN;

function jsonResponse(status: number, data: any, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    status,
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
    },
  });
}

export function middleware(req: NextRequest, res: NextResponse) {
  if (req.nextUrl.host === "localhost:3000") {
    return NextResponse.next();
  }

  const token = req.cookies["token"];
  let decodedToken;
  if (!token) {
    return jsonResponse(401, { error: { message: "Missing user token" } });
  }

  try {
    decodedToken = jwt.verify(token, USER_TOKEN);
  } catch (error) {
    if (!decodedToken) {
      return jsonResponse(401, {
        error: { message: "Your token has expired." },
      });
    }
  }
  return NextResponse.next();
}
