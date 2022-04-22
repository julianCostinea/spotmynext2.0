import { NextRequest, NextResponse } from 'next/server'
const jwt = require('@tsndr/cloudflare-worker-jwt');

const USER_TOKEN = process.env.USER_TOKEN;

export async function middleware(req: NextRequest, res:NextResponse) {
  const token = await jwt.sign({exp: Math.floor(Date.now() / 1000) + (2 * (60 * 60))}, USER_TOKEN);
  return NextResponse.next().cookie("token", token);
}
