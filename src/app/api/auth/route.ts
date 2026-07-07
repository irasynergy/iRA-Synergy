import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // Simple hardcoded password for now. Can be moved to env vars.
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true });
      
      // Set an httpOnly cookie that expires in 7 days
      response.cookies.set({
        name: "ira_admin_auth",
        value: "true",
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      
      return response;
    }

    return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
