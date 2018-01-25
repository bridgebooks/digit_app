import { AccountType } from './account-type';

interface AccountTypeData {
    data: AccountType
}

export interface Account {
    id: string;
    org_id: string;
    name: string;
    code: string | any;
    description: string;
    account_type_id: number;
    tax_rate_id: string | null;
    ytd_balance: number;
    is_system: boolean;
    type: AccountTypeData | null;
    tax_rate: any;
}