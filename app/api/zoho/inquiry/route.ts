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

        // Validate required fields
        if (!firstName || !lastName || !email || !phone) {
            return NextResponse.json(
                { error: 'First name, last name, email, and phone are required' },
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
Name: ${firstName} ${lastName}
Email: ${email}
Phone: +91 ${phone}
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
            First_Name: firstName,
            Last_Name: lastName,
            Email: email,
            Phone: phone,
            Mobile: phone,
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
            Deal_Name: inquiryName || `Website Inquiry - ${firstName} ${lastName}`,
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
