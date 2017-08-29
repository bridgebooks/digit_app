export interface Contact {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    website?: string;
    address_line_1?: string;
    address_line_2?: string;
    city_town?: string;
    postal_zip?: string;
    state_region?: string;
    country?: string;
    type: string;
    user_id: string;
    org_id: string;
    created_at?: object;
}