/**
 * Zoho Bigin CRM Integration
 * 
 * This module handles all interactions with Zoho Bigin CRM API
 * including authentication, token management, and record creation.
 */

interface ZohoTokenResponse {
    access_token: string;
    expires_in: number;
    api_domain: string;
    token_type: string;
}

interface ZohoContact {
    First_Name?: string;
    Last_Name?: string;
    Full_Name?: string;
    Email?: string;
    Phone?: string;
    Mobile?: string;
    City?: string;
    Description?: string;
    Lead_Source?: string;
    // Add any custom fields from your Zoho Bigin setup
    [key: string]: any;
}

interface ZohoPipeline {
    Pipeline: string;
    Stage?: string;
}

interface ZohoDeal {
    Deal_Name: string;
    Amount?: number;
    Stage: string;
    Pipeline: string;
    Contact_Name?: string;
    Description?: string;
    Closing_Date?: string;
    // Add any custom fields from your Zoho Bigin setup
    [key: string]: any;
}

interface ZohoApiResponse {
    data: Array<{
        code: string;
        details: {
            id: string;
        };
        message: string;
        status: string;
    }>;
}

/**
 * Get a fresh access token using the refresh token
 */
async function getAccessToken(): Promise<string> {
    const clientId = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;
    const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
    const accountsUrl = process.env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.in';

    if (!clientId || !clientSecret || !refreshToken) {
        throw new Error('Zoho credentials are not configured properly');
    }

    const tokenUrl = `${accountsUrl}/oauth/v2/token?refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token`;

    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to get access token: ${response.status} - ${errorText}`);
        }

        const data: ZohoTokenResponse = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error getting Zoho access token:', error);
        throw error;
    }
}

/**
 * Create a contact in Zoho Bigin
 */
export async function createZohoContact(contactData: ZohoContact): Promise<string> {
    const accessToken = await getAccessToken();
    const apiUrl = process.env.ZOHO_BIGIN_API || 'https://www.zohoapis.in/bigin/v2';

    // Format the contact data according to Zoho Bigin API requirements
    const formattedData = {
        data: [
            {
                ...contactData,
                // Ensure required fields are present
                Last_Name: contactData.Last_Name || contactData.Full_Name || 'Unknown',
            }
        ]
    };

    try {
        const response = await fetch(`${apiUrl}/Contacts`, {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create contact: ${response.status} - ${errorText}`);
        }

        const result: ZohoApiResponse = await response.json();

        if (result.data && result.data[0] && result.data[0].code === 'SUCCESS') {
            return result.data[0].details.id;
        } else {
            throw new Error(`Failed to create contact: ${result.data[0]?.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error creating Zoho contact:', error);
        throw error;
    }
}

/**
 * Create a deal/pipeline entry in Zoho Bigin
 * Note: In Zoho Bigin API v2, the Deals module is called "Pipelines"
 * If you've renamed it (e.g., to "Inquiries"), update ZOHO_PIPELINES_MODULE in .env.local
 */
export async function createZohoDeal(dealData: ZohoDeal): Promise<string> {
    const accessToken = await getAccessToken();
    const apiUrl = process.env.ZOHO_BIGIN_API || 'https://www.zohoapis.in/bigin/v2';

    // The module name in Zoho Bigin - default is "Pipelines", but user may have renamed it
    const moduleName = process.env.ZOHO_PIPELINES_MODULE || 'Pipelines';

    // Format data for Zoho Bigin API v2
    // Key insight: In Zoho Bigin, "Layout" determines the available stages
    // Layout "Leads Pipeline" has stages like "New Inquiry", "Contacted", etc.
    // Layout "Sales Pipeline" has stages like "Qualification", "Proposal", etc.
    const biginData: any = {};

    // Deal_Name - The name of the inquiry/deal (required)
    if (dealData.Deal_Name) {
        biginData.Deal_Name = dealData.Deal_Name;
    }

    // Stage - Required field
    if (dealData.Stage) {
        biginData.Stage = dealData.Stage;
    }

    // Layout and Sub_Pipeline - Both required in Zoho Bigin
    // Layout determines which stages are available
    // Sub_Pipeline is also a mandatory field
    // "Leads Pipeline" Layout ID: 1182543000000442086 (has New Inquiry, Contacted, etc.)
    // "Sales Pipeline" Layout ID: 1182543000000000173 (has Qualification, Proposal, etc.)
    if (dealData.Pipeline) {
        // Map pipeline names to Layout IDs and Sub_Pipeline values
        let pipelineConfig: { [key: string]: { layoutId: string; subPipeline: string } } = {
            'Leads Pipeline Standard': {
                layoutId: '1182543000000442086',
                subPipeline: 'Leads Pipeline Standard'
            },
            'Leads Pipeline': {
                layoutId: '1182543000000442086',
                subPipeline: 'Leads Pipeline Standard'
            },
            'Sales Pipeline Standard': {
                layoutId: '1182543000000000173',
                subPipeline: 'Sales Pipeline Standard'
            },
            'Sales Pipeline': {
                layoutId: '1182543000000000173',
                subPipeline: 'Sales Pipeline Standard'
            },
        };

        // If pipeline not in static config, try to find it dynamically
        if (!pipelineConfig[dealData.Pipeline]) {
            try {
                // Fetch all pipelines from Zoho
                const pipelines = await getZohoPipelines();
                const matchedPipeline = pipelines.find((p: any) =>
                    p.display_value === dealData.Pipeline ||
                    p.actual_value === dealData.Pipeline ||
                    (p.maps && p.maps.some((m: any) => m.display_value === dealData.Pipeline))
                );

                if (matchedPipeline) {
                    // Found it! Use its layout ID
                    // Note: The API structure for pipelines might vary, we need the Layout ID
                    // Usually available in the pipeline settings response
                    console.log(`Found dynamic match for pipeline: ${dealData.Pipeline}`);

                    // Note: This assumes the dynamic fetch returns usable IDs. 
                    // If complex, we might need the user to run the discovery script first.
                    // For now, we'll log it and let it fail if ID isn't clear, ensuring we don't break existing ones.
                }
            } catch (e) {
                console.warn(`Could not dynamcially resolve pipeline: ${dealData.Pipeline}`);
            }
        }

        const config = pipelineConfig[dealData.Pipeline];
        if (config) {
            biginData.Layout = { id: config.layoutId };
            biginData.Sub_Pipeline = config.subPipeline;
        } else {
            // Fallback: Pass the raw pipeline name if we can't map it (Zoho might reject this without Layout ID)
            // But for custom pipelines, we often MUST provide the Layout ID.
            console.warn(`Pipeline '${dealData.Pipeline}' not found in static config. Ensure it exists in Zoho and update lib/zoho-bigin.ts with its Layout ID.`);
        }
    }

    // Closing Date (optional)
    if (dealData.Closing_Date) {
        biginData.Closing_Date = dealData.Closing_Date;
    }

    // Description (optional)
    if (dealData.Description) {
        biginData.Description = dealData.Description;
    }

    // Link to Contact/Student (lookup field)
    if (dealData.Contact_Name) {
        biginData.Contact_Name = dealData.Contact_Name;
    }

    const formattedData = {
        data: [biginData]
    };

    console.log(`Creating Bigin record in ${moduleName}:`, JSON.stringify(formattedData, null, 2));

    try {
        const response = await fetch(`${apiUrl}/${moduleName}`, {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedData),
        });

        const responseText = await response.text();
        console.log('Zoho API Response:', response.status, responseText);

        if (!response.ok) {
            throw new Error(`Failed to create deal: ${response.status} - ${responseText}`);
        }

        const result: ZohoApiResponse = JSON.parse(responseText);

        if (result.data && result.data[0] && result.data[0].code === 'SUCCESS') {
            console.log('Successfully created record with ID:', result.data[0].details.id);
            return result.data[0].details.id;
        } else {
            throw new Error(`Failed to create deal: ${result.data[0]?.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error creating Zoho deal:', error);
        throw error;
    }
}


/**
 * Get available pipelines from Zoho Bigin
 */
export async function getZohoPipelines(): Promise<any[]> {
    const accessToken = await getAccessToken();
    const apiUrl = process.env.ZOHO_BIGIN_API || 'https://www.zohoapis.in/bigin/v2';

    try {
        const response = await fetch(`${apiUrl}/settings/pipelines`, {
            method: 'GET',
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to get pipelines: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        return result.pipelines || [];
    } catch (error) {
        console.error('Error getting Zoho pipelines:', error);
        throw error;
    }
}

/**
 * Search for existing contact by email
 */
export async function searchContactByEmail(email: string): Promise<any | null> {
    const accessToken = await getAccessToken();
    const apiUrl = process.env.ZOHO_BIGIN_API || 'https://www.zohoapis.in/bigin/v2';

    try {
        const response = await fetch(
            `${apiUrl}/Contacts/search?email=${encodeURIComponent(email)}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                },
            }
        );

        if (!response.ok) {
            if (response.status === 204) {
                // No content means no contact found
                return null;
            }
            const errorText = await response.text();
            throw new Error(`Failed to search contact: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        return result.data && result.data.length > 0 ? result.data[0] : null;
    } catch (error) {
        console.error('Error searching Zoho contact:', error);
        return null;
    }
}

/**
 * Update an existing contact
 */
export async function updateZohoContact(contactId: string, contactData: Partial<ZohoContact>): Promise<boolean> {
    const accessToken = await getAccessToken();
    const apiUrl = process.env.ZOHO_BIGIN_API || 'https://www.zohoapis.in/bigin/v2';

    const formattedData = {
        data: [
            {
                id: contactId,
                ...contactData,
            }
        ]
    };

    try {
        const response = await fetch(`${apiUrl}/Contacts`, {
            method: 'PUT',
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update contact: ${response.status} - ${errorText}`);
        }

        const result: ZohoApiResponse = await response.json();
        return result.data && result.data[0] && result.data[0].code === 'SUCCESS';
    } catch (error) {
        console.error('Error updating Zoho contact:', error);
        throw error;
    }
}

/**
 * Helper function to create or update a contact
 * This checks if a contact exists and updates it, or creates a new one
 */
export async function upsertZohoContact(contactData: ZohoContact): Promise<string> {
    if (contactData.Email) {
        const existingContact = await searchContactByEmail(contactData.Email);

        if (existingContact) {
            // Update existing contact
            await updateZohoContact(existingContact.id, contactData);
            return existingContact.id;
        }
    }

    // Create new contact
    return await createZohoContact(contactData);
}
