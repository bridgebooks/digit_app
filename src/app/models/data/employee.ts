export interface Employee {
    id: string;
    org_id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    full_name?: string;
    gender?: string;
    date_of_birth?: string;
    age?: number | null;
    phone?: string;
    email?: string;
    role?: string;
    address_line_1?: string;
    address_line_2?: string;
    city_town?: string;
    postal_zip?: string;
    state_region?: string;
    country?: string;
    start_date?: string;
    termination_date?: string;
    bank_id?: string;
    bank_account_name?: string;
    bank_account_no?: string;
    status: string;
    is_archived?: boolean;
}