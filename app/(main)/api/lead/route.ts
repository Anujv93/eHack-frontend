import { NextRequest, NextResponse } from "next/server";
import { upsertZohoContact, createZohoDeal } from "@/lib/zoho-bigin";

export async function POST(req: NextRequest) {
    const lead = await req.json();

    const { name, email, phone, message, city, qualification, interest } = lead;

    console.log("CHATBOT LEAD:", {
        name,
        email,
        phone,
        message,
        timestamp: new Date().toISOString(),
    });

    // Forward to the RAG backend's /lead endpoint (non-critical)
    try {
        await fetch("http://localhost:8000/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name || "", phone: phone || "" }),
        });
    } catch {
        // Silently continue if RAG backend is unreachable
    }

    // Push to Zoho Bigin
    try {
        // Split full name into first / last
        const nameParts = (name || "").trim().split(" ");
        const firstName = nameParts[0] || "Unknown";
        const lastName = nameParts.slice(1).join(" ") || firstName;

        // 1️⃣  Upsert Contact in Zoho Bigin
        const contactId = await upsertZohoContact({
            First_Name: firstName,
            Last_Name: lastName,
            Full_Name: name || "",
            Email: email || "",
            Phone: phone || "",
            Mobile: phone || "",
            Description: message
                ? `Chat enquiry: ${message}`
                : "Lead captured via eHack AI Chatbot",
            Lead_Source: "Chatbot",
        });

        console.log("Zoho Contact upserted:", contactId);

        // 2️⃣  Create a Deal in the Leads Pipeline
        const closingDate = new Date();
        closingDate.setDate(closingDate.getDate() + 30);

        const dealDescription = `
=== CHATBOT LEAD ===
Submitted: ${new Date().toISOString()}

Name          : ${name || "N/A"}
Email         : ${email || "N/A"}
Phone         : ${phone || "N/A"}
City          : ${city || "N/A"}
Qualification : ${qualification || "N/A"}
Interest      : ${interest || "N/A"}
Message       : ${message || "None"}
Source        : eHack AI Chatbot
        `.trim();

        const dealId = await createZohoDeal({
            Deal_Name: `Chatbot Lead – ${name || email || "Unknown"}`,
            Pipeline: "eHack Academy Leads",
            Stage: "New Inquiry",
            Contact_Name: contactId,
            Closing_Date: closingDate.toISOString().split("T")[0],
            Description: dealDescription,
            Lead_Source: "Chatbot",
        });

        console.log("Zoho Deal created:", dealId);

        return NextResponse.json({ success: true, contactId, dealId });
    } catch (error) {
        console.error("Zoho Bigin error:", error);
        // Still return success to the user — CRM failure should not block chat
        return NextResponse.json({
            success: true,
            warning: "Lead saved locally but CRM sync failed",
        });
    }
}
