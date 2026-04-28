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

    // The module name in Zoho Bigin - default is "Pipelines"
    const moduleName = process.env.ZOHO_PIPELINES_MODULE || 'Pipelines';

    // -------------------------------------------------------------------------
    // Verified live Zoho org data (fetched 2026-04-28 from correct account):
    //
    //   Pipeline / Layout name          | Layout ID              | Sub_Pipeline actual value
    //   --------------------------------|------------------------|----------------------------
    //   "eHack Academy Leads"           | 1182543000000442086    | "Leads Pipeline Standard"
    //   "Global Services Leads"         | 1182543000000498517    | "Leads Pipeline Standard"
    //   "Sales Pipeline" (Admission)    | 1182543000000000173    | "Sales Pipeline Standard"
    //
    //   Valid Stage actual values (same across all layouts):
    //   "New Enquiry" (display: "New Inquiry"), "Attempted Contact", "Contacted",
    //   "Interested", "Demo/Counseling Scheduled", "Pitch/Demo", "Enrolled", etc.
    //
    // NOTE: "Pipeline" field must be passed as object {id, name}. "Sub_Pipeline"
    //       is the string actual_value from the picklist.
    // -------------------------------------------------------------------------

    // Pipeline config map: logical name → { layoutId, layoutName, subPipeline }
    const PIPELINE_CONFIG: { [key: string]: { layoutId: string; layoutName: string; subPipeline: string } } = {
        // eHack Academy Leads (main leads pipeline - website enquiries go here)
        'eHack Academy Leads':          { layoutId: '1182543000000442086', layoutName: 'eHack Academy Leads',   subPipeline: 'Leads Pipeline Standard' },
        'Leads Pipeline Standard':      { layoutId: '1182543000000442086', layoutName: 'eHack Academy Leads',   subPipeline: 'Leads Pipeline Standard' },
        'Leads Pipeline':               { layoutId: '1182543000000442086', layoutName: 'eHack Academy Leads',   subPipeline: 'Leads Pipeline Standard' },
        // Global Services Leads
        'Global Services Leads':        { layoutId: '1182543000000498517', layoutName: 'Global Services Leads', subPipeline: 'Leads Pipeline Standard' },
        'corporate services Pipeline':  { layoutId: '1182543000000498517', layoutName: 'Global Services Leads', subPipeline: 'Sales Pipeline Standard1' },
        // Sales / Admission pipeline
        'Sales Pipeline':               { layoutId: '1182543000000000173', layoutName: 'Sales Pipeline',        subPipeline: 'Sales Pipeline Standard' },
        'Sales Pipeline Standard':      { layoutId: '1182543000000000173', layoutName: 'Sales Pipeline',        subPipeline: 'Sales Pipeline Standard' },
        'Admission Pipeline':           { layoutId: '1182543000000000173', layoutName: 'Sales Pipeline',        subPipeline: 'Sales Pipeline Standard' },
    };

    // Resolve config — default to eHack Academy Leads if not specified
    const pipelineKey = dealData.Pipeline || 'eHack Academy Leads';
    const config = PIPELINE_CONFIG[pipelineKey] || PIPELINE_CONFIG['eHack Academy Leads'];

    const biginData: any = {
        Layout:       { id: config.layoutId, name: config.layoutName },
        Sub_Pipeline: config.subPipeline,
    };

    // Deal_Name - The name of the inquiry/deal (required)
    if (dealData.Deal_Name) {
        biginData.Deal_Name = dealData.Deal_Name;
    }

    // Stage - Required field
    // Common actual values: "New Enquiry", "Attempted Contact", "Contacted",
    // "Interested", "Demo/Counseling Scheduled", "Enrolled", "Closed Won", "Closed Lost"
    if (dealData.Stage) {
        biginData.Stage = dealData.Stage;
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
 * Create a note on a Zoho Bigin record (e.g., a Pipeline/Deal record)
 * This shows up in the "Notes" tab of the record in Zoho Bigin CRM.
 */
export async function createZohoNote(
    parentId: string,
    noteTitle: string,
    noteContent: string,
    parentModule: string = 'Pipelines'
): Promise<string> {
    const accessToken = await getAccessToken();
    const apiUrl = process.env.ZOHO_BIGIN_API || 'https://www.zohoapis.in/bigin/v2';

    const formattedData = {
        data: [
            {
                Note_Title: noteTitle,
                Note_Content: noteContent,
                Parent_Id: parentId,
                se_module: parentModule,
            }
        ]
    };

    console.log(`Creating Bigin Note on ${parentModule}/${parentId}:`, JSON.stringify(formattedData, null, 2));

    try {
        const response = await fetch(`${apiUrl}/Notes`, {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedData),
        });

        const responseText = await response.text();
        console.log('Zoho Note API Response:', response.status, responseText);

        if (!response.ok) {
            throw new Error(`Failed to create note: ${response.status} - ${responseText}`);
        }

        const result: ZohoApiResponse = JSON.parse(responseText);

        if (result.data && result.data[0] && result.data[0].code === 'SUCCESS') {
            console.log('Successfully created note with ID:', result.data[0].details.id);
            return result.data[0].details.id;
        } else {
            throw new Error(`Failed to create note: ${result.data[0]?.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error creating Zoho note:', error);
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
