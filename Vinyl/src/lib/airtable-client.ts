import Airtable from 'airtable';
import type { Project, ProjectStatus } from './validators';

// Initialize Airtable
const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY!
}).base(process.env.AIRTABLE_BASE_ID!);

const PROJECTS_TABLE = 'Projects';

/**
 * Airtable field mapping
 */
interface AirtableProject {
    Token: string;
    Order_ID?: string;
    Status: string;
    Product_Type: string;
    Customer_Email: string;
    Created_Date: string;
    SideA_Audio_URL?: string;
    SideB_Audio_URL?: string;
    Front_Art_URL?: string;
    Back_Art_URL?: string;
    Label_Art_URL?: string;
    Inner_Sleeve_URL?: string;
    Kunaki_Product_ID?: string;
    Design_Service_Required: boolean;
    Design_Service_Complete: boolean;
    Shipping_Name?: string;
    Shipping_Address?: string;
    Shipping_City?: string;
    Shipping_State?: string;
    Shipping_Zip?: string;
    Shipping_Country?: string;
    Error_Log?: string;
}

/**
 * Create a new project in Airtable
 */
export async function createProject(data: Partial<Project>): Promise<{ id: string; token: string }> {
    const record = await base(PROJECTS_TABLE).create({
        Token: data.token!,
        Order_ID: data.orderId,
        Status: data.status || 'awaiting_assets',
        Product_Type: data.productType!,
        Customer_Email: data.customerEmail!,
        Created_Date: new Date().toISOString(),
        Design_Service_Required: data.designServiceRequired || false,
        Design_Service_Complete: false,
        Shipping_Name: data.shippingName,
        Shipping_Address: data.shippingAddress,
        Shipping_City: data.shippingCity,
        Shipping_State: data.shippingState,
        Shipping_Zip: data.shippingZip,
        Shipping_Country: data.shippingCountry,
    });

    return {
        id: record.id,
        token: record.fields.Token as string,
    };
}

/**
 * Get project by token
 */
export async function getProjectByToken(token: string): Promise<AirtableProject | null> {
    const records = await base(PROJECTS_TABLE)
        .select({
            filterByFormula: `{Token} = "${token}"`,
            maxRecords: 1,
        })
        .firstPage();

    if (records.length === 0) return null;

    return records[0].fields as AirtableProject;
}

/**
 * Update project asset URLs
 */
export async function updateProjectAssets(
    token: string,
    assets: {
        sideAAudioUrl?: string;
        sideBAudioUrl?: string;
        frontArtUrl?: string;
        backArtUrl?: string;
        labelArtUrl?: string;
        innerSleeveUrl?: string;
    }
): Promise<void> {
    const records = await base(PROJECTS_TABLE)
        .select({
            filterByFormula: `{Token} = "${token}"`,
            maxRecords: 1,
        })
        .firstPage();

    if (records.length === 0) {
        throw new Error(`Project with token ${token} not found`);
    }

    const updateFields: Partial<AirtableProject> = {};
    if (assets.sideAAudioUrl) updateFields.SideA_Audio_URL = assets.sideAAudioUrl;
    if (assets.sideBAudioUrl) updateFields.SideB_Audio_URL = assets.sideBAudioUrl;
    if (assets.frontArtUrl) updateFields.Front_Art_URL = assets.frontArtUrl;
    if (assets.backArtUrl) updateFields.Back_Art_URL = assets.backArtUrl;
    if (assets.labelArtUrl) updateFields.Label_Art_URL = assets.labelArtUrl;
    if (assets.innerSleeveUrl) updateFields.Inner_Sleeve_URL = assets.innerSleeveUrl;

    await base(PROJECTS_TABLE).update(records[0].id, updateFields);
}

/**
 * Update project status
 */
export async function updateProjectStatus(
    token: string,
    status: ProjectStatus
): Promise<void> {
    const records = await base(PROJECTS_TABLE)
        .select({
            filterByFormula: `{Token} = "${token}"`,
            maxRecords: 1,
        })
        .firstPage();

    if (records.length === 0) {
        throw new Error(`Project with token ${token} not found`);
    }

    await base(PROJECTS_TABLE).update(records[0].id, {
        Status: status,
    });
}

/**
 * Update Kunaki Product ID
 */
export async function updateKunakiProductId(
    token: string,
    productId: string
): Promise<void> {
    const records = await base(PROJECTS_TABLE)
        .select({
            filterByFormula: `{Token} = "${token}"`,
            maxRecords: 1,
        })
        .firstPage();

    if (records.length === 0) {
        throw new Error(`Project with token ${token} not found`);
    }

    await base(PROJECTS_TABLE).update(records[0].id, {
        Kunaki_Product_ID: productId,
    });
}

/**
 * Log error to project
 */
export async function logProjectError(
    token: string,
    error: string
): Promise<void> {
    const records = await base(PROJECTS_TABLE)
        .select({
            filterByFormula: `{Token} = "${token}"`,
            maxRecords: 1,
        })
        .firstPage();

    if (records.length === 0) {
        throw new Error(`Project with token ${token} not found`);
    }

    const existingLog = (records[0].fields.Error_Log as string) || '';
    const newLog = `${new Date().toISOString()}: ${error}\n${existingLog}`;

    await base(PROJECTS_TABLE).update(records[0].id, {
        Error_Log: newLog,
        Status: 'action_required',
    });
}
