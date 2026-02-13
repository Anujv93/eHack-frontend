import { NextRequest, NextResponse } from 'next/server';
import { createZohoContact, createZohoDeal, searchContactByEmail, updateZohoContact } from '@/lib/zoho-bigin';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            // Application metadata
            applicationId,
            submittedAt,

            // Personal Information
            fullName,
            email,
            phone,
            whatsapp,
            dateOfBirth,
            gender,
            guardianName,

            // Address
            address,
            city,
            state,
            pincode,
            country,

            // Educational Background
            qualification,
            institution,
            yearOfPassing,
            percentage,
            existingCertifications,

            // Professional Background
            isWorking,
            companyName,
            designation,
            experience,
            currentCtc,

            // Program Selection
            programInterest,
            learningMode,
            batchTiming,
            expectedJoiningDate,

            // Payment & Reference
            paymentMode,
            leadSource,
            referralCode,

            // Consent
            agreeWhatsApp,
            agreeEmail,
        } = body;

        // Validate required fields
        if (!fullName || !email || !phone || !programInterest) {
            return NextResponse.json(
                { error: 'Required fields missing' },
                { status: 400 }
            );
        }

        // Split name into first and last name
        const nameParts = fullName.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || firstName;

        // Format program name for display
        const programLabels: Record<string, string> = {
            'ceh-v13': 'Certified Ethical Hacker (CEH v13)',
            'ceh-master': 'CEH Master Program',
            'cnd': 'Certified Network Defender (CND)',
            'chfi': 'Computer Hacking Forensic Investigator (CHFI)',
            'masters-ethical-hacking': 'Masters in Ethical Hacking',
            'graduate-ethical-hacking': 'Graduate in Ethical Hacking',
            'bscs': 'Bachelor of Science in Cyber Security',
            'mscs': 'Master of Science in Cyber Security',
            'bscs-mscs-integrated': 'Integrated BSCS + MSCS',
            'corporate-training': 'Corporate Training',
            'other': 'Other / Need Guidance',
        };
        const programName = programLabels[programInterest] || programInterest;

        // Build description with all details
        const description = `
=== ADMISSION APPLICATION ===
Application ID: ${applicationId}
Submitted: ${submittedAt}

--- Personal Information ---
Name: ${fullName}
DOB: ${dateOfBirth}
Gender: ${gender || 'Not provided'}
Guardian: ${guardianName || 'Not provided'}
WhatsApp: ${whatsapp || phone}

--- Address ---
${address || 'Not provided'}
${city}, ${state} - ${pincode}
${country || 'India'}

--- Educational Background ---
Qualification: ${qualification}
Institution: ${institution}
Year: ${yearOfPassing || 'Not provided'}
Percentage: ${percentage || 'Not provided'}
Existing Certifications: ${existingCertifications || 'None'}

--- Professional Background ---
Currently Working: ${isWorking || 'Not provided'}
${isWorking === 'yes' ? `Company: ${companyName || 'Not provided'}
Designation: ${designation || 'Not provided'}
Experience: ${experience || 'Not provided'}
Current CTC: ${currentCtc || 'Not provided'}` : ''}

--- Program Selection ---
Program: ${programName}
Learning Mode: ${learningMode}
Batch Timing: ${batchTiming}
Expected Joining: ${expectedJoiningDate || 'ASAP'}

--- Payment ---
Payment Mode: ${paymentMode}
Lead Source: ${leadSource || 'Not provided'}
Referral Code: ${referralCode || 'None'}

--- Consent ---
WhatsApp Updates: ${agreeWhatsApp ? 'Yes' : 'No'}
Email Updates: ${agreeEmail ? 'Yes' : 'No'}
`.trim();

        // Prepare contact data
        const contactData = {
            First_Name: firstName,
            Last_Name: lastName,
            Full_Name: fullName,
            Email: email,
            Phone: phone,
            Mobile: whatsapp || phone,
            City: city,
            Description: description,
            Lead_Source: leadSource || 'Online Admission Form',
            // Custom fields - add these in Zoho Bigin first
            // Date_of_Birth: dateOfBirth,
            // Qualification: qualification,
            // Institution: institution,
            // Currently_Working: isWorking,
            // Program_Interest: programInterest,
        };

        let contactId: string;

        // Check if contact exists
        const existingContact = await searchContactByEmail(email);

        if (existingContact) {
            // Update existing contact
            await updateZohoContact(existingContact.id, contactData);
            contactId = existingContact.id;
        } else {
            // Create new contact
            contactId = await createZohoContact(contactData);
        }

        // Create deal in Student Admission pipeline
        const dealData = {
            Deal_Name: `${applicationId} - ${fullName} - ${programName}`,
            Pipeline: 'Admission Pipeline', // Updated to match diagram
            Stage: 'Application Submitted', // Initial stage after form submission
            Contact_Name: contactId,
            Description: description,
            Closing_Date: expectedJoiningDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            Lead_Source: 'Online Admission Form',
            // Custom fields for the deal
            // Application_ID: applicationId,
            // Program: programInterest,
            // Learning_Mode: learningMode,
            // Batch_Timing: batchTiming,
            // Payment_Mode: paymentMode,
        };

        const dealId = await createZohoDeal(dealData);

        return NextResponse.json({
            success: true,
            applicationId,
            contactId,
            dealId,
            message: 'Application submitted successfully',
        });

    } catch (error) {
        console.error('Error in admission API:', error);
        return NextResponse.json(
            {
                error: 'Failed to submit application',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
