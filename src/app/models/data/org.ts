import { Industry } from './industry';

export interface Org {
    id: string;
    name: string;
    business_name?: string;
    business_reg_no?: string;
    logo_url?: string;
    industry_id: string;
    address_line_1?: string;
    address_line_2?: string;
    city_town?: string;
    state_region?: string;
    postal_zip?: string;
    country?: string;
    industry?: Industry
    website?: string;
    email?: string;
    phone?: string;
    description?: string;
}
