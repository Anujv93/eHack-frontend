import { NextRequest, NextResponse } from 'next/server';
import { createZohoDeal, upsertZohoContact } from '@/lib/zoho-bigin';

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
        const phoneDigits = cleanPhone.replace(/\D/g, '');
        if (phoneDigits.length !== 10 || !/^[6-9]/.test(phoneDigits)) {
            return NextResponse.json(
                { error: 'Invalid phone number', details: 'Please provide a valid 10-digit phone number' },
                { status: 400 }
            );
        }

        if (!courses || courses.length === 0) {
            return NextResponse.json(
                { error: 'At least one course must be selected' },
                { status: 400 }
            );
        }

        // Format courses list for description
        const coursesDetails = (courses as CourseInfo[]).map((c, idx) =>
            `${idx + 1}. ${c.name} - ₹${c.price.toLocaleString('en-IN')} (${c.category})`
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

Total Value: ₹${totalAmount.toLocaleString('en-IN')}

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
            Phone: cleanPhone,
            Mobile: cleanPhone,
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
            Pipeline: pipeline || 'Leads Pipeline Standard', // Actual Zoho Bigin pipeline name
            Stage: stage || 'New Inquiry',                    // Actual Zoho Bigin stage name
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

        // Note: For Associated Courses (Products), you would need to use 
        // Zoho's Products subform API which requires additional setup.
        // The course details are captured in the Description field for now.
        // If you want to add products to deals, that requires Bigin's Products association API.

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
