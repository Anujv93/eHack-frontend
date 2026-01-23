import { NextRequest, NextResponse } from 'next/server';
import { createZohoDeal, upsertZohoContact } from '@/lib/zoho-bigin';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            // Contact information
            name,
            email,
            phone,
            city,
            message,

            // Deal information
            dealName,
            pipeline,
            stage,
            amount,
            closingDate,
            leadSource = 'Website',

            // Add any custom fields
            ...customFields
        } = body;

        // Validate required fields
        if (!name || !email || !dealName || !pipeline || !stage) {
            return NextResponse.json(
                { error: 'Name, email, deal name, pipeline, and stage are required' },
                { status: 400 }
            );
        }

        // Split name into first and last name
        const nameParts = name.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || firstName;

        // First, create or update the contact
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

        const contactId = await upsertZohoContact(contactData);

        // Then create the deal
        const dealData = {
            Deal_Name: dealName,
            Pipeline: pipeline,
            Stage: stage,
            Amount: amount,
            Contact_Name: contactId, // Link to the contact
            Description: message,
            Closing_Date: closingDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default to 30 days from now
            Lead_Source: leadSource,
            ...customFields, // Include any custom fields
        };

        const dealId = await createZohoDeal(dealData);

        return NextResponse.json({
            success: true,
            contactId,
            dealId,
            message: 'Contact and deal created successfully',
        });
    } catch (error) {
        console.error('Error in deal API:', error);
        return NextResponse.json(
            {
                error: 'Failed to create deal',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
