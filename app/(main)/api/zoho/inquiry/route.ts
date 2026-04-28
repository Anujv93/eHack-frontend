import { NextRequest, NextResponse } from 'next/server';
import { createZohoDeal, createZohoNote, upsertZohoContact } from '@/lib/zoho-bigin';

interface CourseInfo {
    name: string;
    price: number;
    category: string;
    code: string;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // 1. Honeypot check for bot protection
        if (body.website) {
            console.log('Bot submission blocked (honeypot):', body.email);
            return NextResponse.json(
                { success: true, message: 'Inquiry submitted successfully' },
                { status: 200 }
            );
        }

        const {
            // Student data
            firstName,
            lastName,
            email,
            phone,
            city,

            // Inquiry data
            inquiryName,
            courses,
            totalAmount,
            message,
            leadSource,
            agreeWhatsApp,

            // Pipeline info
            pipeline,
            stage,
        } = body;

        // Clean and sanitize inputs
        const cleanFirstName = firstName?.trim() || '';
        const cleanLastName = lastName?.trim() || '-';
        const cleanEmail = email?.trim().toLowerCase() || '';
        const cleanPhone = phone?.trim().replace(/\s+/g, '') || '';

        // Validate required fields
        if (!cleanFirstName || !cleanEmail || !cleanPhone) {
            return NextResponse.json(
                { error: 'First name, email, and phone are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(cleanEmail)) {
            return NextResponse.json(
                { error: 'Invalid email format', details: 'Please provide a valid email address' },
                { status: 400 }
            );
        }

        // Validate phone format (10-digit Indian mobile starting with 6-9)
        // Strip leading +91 or 91 in case user typed it
        const phoneDigits = cleanPhone.replace(/^\+?91/, '').replace(/\D/g, '');
        if (phoneDigits.length !== 10 || !/^[6-9]/.test(phoneDigits)) {
            return NextResponse.json(
                { error: 'Invalid phone number', details: 'Please provide a valid 10-digit phone number' },
                { status: 400 }
            );
        }
        // Phone with country code for Zoho (required for WhatsApp automation)
        const phoneWithCountryCode = `+91${phoneDigits}`;

        if (!courses || courses.length === 0) {
            return NextResponse.json(
                { error: 'At least one course must be selected' },
                { status: 400 }
            );
        }

        // Format courses list for description
        const coursesDetails = (courses as CourseInfo[]).map((c, idx) =>
            `${idx + 1}. ${c.name} - \u20B9${c.price.toLocaleString('en-IN')} (${c.category})`
        ).join('\n');

        // Build description
        const description = `
=== WEBSITE INQUIRY ===
Submitted: ${new Date().toISOString()}

--- Student Information ---
Name: ${cleanFirstName} ${cleanLastName}
Email: ${cleanEmail}
Phone: +91 ${cleanPhone}
City: ${city || 'Not provided'}

--- Courses Interested ---
${coursesDetails}

Total Value: \u20B9${totalAmount.toLocaleString('en-IN')}

--- Additional Information ---
Message: ${message || 'None'}
Lead Source: ${leadSource}
WhatsApp Opt-in: ${agreeWhatsApp ? 'Yes' : 'No'}
`.trim();

        // Step 1: Create or update Student (Contact)
        const contactData = {
            First_Name: cleanFirstName,
            Last_Name: cleanLastName,
            Email: cleanEmail,
            Phone: phoneWithCountryCode,
            Mobile: phoneWithCountryCode,
            City: city || '',
            Description: `Inquiry received on ${new Date().toLocaleDateString()}. Interested in: ${(courses as CourseInfo[]).map(c => c.name).join(', ')}`,
            Lead_Source: leadSource || 'Website Inquiry Form',
            // Add custom fields if configured in Zoho
            // WhatsApp_Opt_in: agreeWhatsApp,
        };

        const contactId = await upsertZohoContact(contactData);
        console.log('Student (Contact) created/updated:', contactId);

        // Step 2: Create Inquiry (Deal) in Lead Pipeline
        // Calculate closing date (30 days from now)
        const closingDate = new Date();
        closingDate.setDate(closingDate.getDate() + 30);

        const dealData = {
            Deal_Name: inquiryName || `Website Inquiry - ${cleanFirstName} ${cleanLastName}`,
            Pipeline: pipeline || 'eHack Academy Leads', // Actual Zoho Bigin pipeline name
            Stage: stage || 'New Inquiry',              // First valid stage in "Sales Pipeline Standard"
            Contact_Name: contactId,                          // Link to Student
            Amount: totalAmount,                   // Total course value
            Closing_Date: closingDate.toISOString().split('T')[0],
            Description: description,
            Lead_Source: leadSource || 'Website Inquiry Form',
            // Custom fields for the inquiry
            // Courses_Interested: (courses as CourseInfo[]).map(c => c.code).join(', '),
            // Number_of_Courses: courses.length,
        };

        const dealId = await createZohoDeal(dealData);
        console.log('Inquiry (Deal) created:', dealId);

        // Step 3: Create a Note on the deal with detailed form info
        // This makes career status, experience, etc. visible in Bigin's Notes tab
        try {
            const noteTitle = `Lead Details - ${leadSource || 'Website Inquiry'}`;

            // Parse the message field to extract structured info
            const messageLines = message ? message.split('\n') : [];
            const noteContentParts: string[] = [
                'LEAD INQUIRY DETAILS',
                '===========================',
                '',
                `Name: ${cleanFirstName} ${cleanLastName}`,
                `Email: ${cleanEmail}`,
                `Phone: +91 ${phoneDigits}`,
                '',
            ];

            // Add each line from the message (contains Career Status, Experience, etc.)
            for (const line of messageLines) {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith('Source:')) {
                    noteContentParts.push(trimmed);
                }
            }

            noteContentParts.push('');
            noteContentParts.push(`Lead Source: ${leadSource || 'Website'}`);
            noteContentParts.push(`Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);

            const noteContent = noteContentParts.join('\n');

            const noteId = await createZohoNote(dealId, noteTitle, noteContent);
            console.log('Note created on deal:', noteId);
        } catch (noteError) {
            // Don't fail the entire submission if note creation fails
            console.error('Failed to create note (non-critical):', noteError);
        }

        return NextResponse.json({
            success: true,
            contactId,
            dealId,
            message: 'Inquiry submitted successfully',
            inquiryName: dealData.Deal_Name,
        });

    } catch (error) {
        console.error('Error in inquiry API:', error);
        return NextResponse.json(
            {
                error: 'Failed to submit inquiry',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
