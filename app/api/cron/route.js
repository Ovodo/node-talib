import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  // if (
  //   NextRequest.headers.get("Authorization") !==
  //   `Bearer ${process.env.CRON_SECRET}`
  // ) {
  //   return res.status(401).end("Unauthorized");
  // }

  // let num = 2;
  // const yes = (num += 1);
  // let interval = setInterval(() => console.log("yes", yes), 2000);

  // yes >= 100 && clearInterval(interval);
  return NextResponse.json({ data: Date.now(), ok: true });
}
