interface Bank {
    id: string;
    name: string;
    identifier: string;
    country: string;
}

export interface BankAccount {
    id?: string;
    name?: string;
    user_id?: string;
    org_id?: string;
    bank_id?: string;
    account_name?: string;
    account_number?: string;
    bank?: Bank;
    is_default?: boolean;
    notes?: string;
    created_at?: any;
}