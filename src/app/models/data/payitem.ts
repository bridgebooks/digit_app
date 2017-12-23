import { Account } from '../data/account';

interface PayitemAccount {
    data: Account;
}

export interface Payitem {
    id?: string;
    user_id?: string;
    org_id?: string;
    name?: string;
    pay_item_type?: string;
    description?: string | null;
    is_system?: boolean;
    account_id?: string;
    account?: PayitemAccount,
    default_amount?: number;
    mark_default?: boolean;
    is_archived?: boolean;
    deleted_at?: number;
    is_new?: boolean;
    created_at?: number;
    updated_at?: number;
}