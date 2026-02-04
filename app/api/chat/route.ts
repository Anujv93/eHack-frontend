import { NextRequest, NextResponse } from "next/server";

// const BACKEND_URL = "http://66.116.226.107:8000/chat"; // or domain
const BACKEND_URL = "http://localhost:8000/chat";

export async function POST(req: NextRequest) {
    const body = await req.json();

    const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
}
