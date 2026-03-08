import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const lead = await req.json();

    console.log("NEW LEAD:", lead);
    // TODO: save to DB / CRM / Sheet / WhatsApp

    return NextResponse.json({ success: true });
}
