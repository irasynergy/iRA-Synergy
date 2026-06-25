import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, details, timestamp, userEmail, userAgent } = body;

    // Log the security violation to the server console
    console.warn(
      `[SECURITY AUDIT] Event: ${event} | User: ${userEmail || "Anonymous"} | Time: ${timestamp} | Details: ${JSON.stringify(details)} | Agent: ${userAgent}`
    );

    // In a full production application, you would also write this to a database,
    // a security information and event management (SIEM) system, or log aggregator (like Datadog/Vercel Logs).

    return NextResponse.json({ success: true, logged: true });
  } catch (error) {
    console.error("[SECURITY AUDIT] Error logging security event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to log event" },
      { status: 400 }
    );
  }
}
