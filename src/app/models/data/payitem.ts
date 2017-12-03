import { Account } from 'app/models/data/account';

interface PayitemAccount {
    data: Account;
}

export interface Payitem {
    id?: string;
    user_id?: string;
    org_id?: string;
    name: string;
    description?: string;
    is_system: boolean;
    account_id: string;
    account?: PayitemAccount,
    default_amount: number;
    mark_default?: boolean;
    created_at: number;
    updated_at: number;
}