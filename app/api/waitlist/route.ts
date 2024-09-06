import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const result = await sql`
      INSERT INTO waitlist_emails (email) 
      VALUES (${email})
      RETURNING *;
    `;

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to add email" }, { status: 500 });
  }
}
