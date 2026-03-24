import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
    process.env.CHATBOT_BACKEND_URL || "http://localhost:8000/chat";

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const res = await fetch(BACKEND_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            console.error(`Chatbot backend error: ${res.status} ${res.statusText}`);
            return NextResponse.json(
                { error: "Chatbot service unavailable" },
                { status: 502 }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Failed to reach chatbot backend:", error);
        return NextResponse.json(
            { error: "Could not connect to chatbot service" },
            { status: 503 }
        );
    }
}
