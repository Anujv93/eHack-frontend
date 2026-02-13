import { NextRequest, NextResponse } from 'next/server';
import { createZohoContact, upsertZohoContact } from '@/lib/zoho-bigin';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            name,
            email,
            phone,
            city,
            message,
            leadSource = 'Website',
            // Add any other fields you want to capture
        } = body;

        // Validate required fields
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required' },
                { status: 400 }
            );
        }

        // Split name into first and last name
        const nameParts = name.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || firstName;

        // Prepare contact data for Zoho Bigin
        const contactData = {
            First_Name: firstName,
            Last_Name: lastName,
            Full_Name: name,
            Email: email,
            Phone: phone,
            Mobile: phone,
            City: city,
            Description: message,
            Lead_Source: leadSource,
        };

        // Create or update contact in Zoho Bigin
        const contactId = await upsertZohoContact(contactData);

        return NextResponse.json({
            success: true,
            contactId,
            message: 'Contact created/updated successfully',
        });
    } catch (error) {
        console.error('Error in contact API:', error);
        return NextResponse.json(
            {
                error: 'Failed to create contact',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
