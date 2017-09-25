import { TaxRate } from './tax-rate'
import { Account } from './account';

interface AccountData {
    data: Account
}

interface Tax {
    data: TaxRate
}

export interface Item {
    id: string;
    org_id: string;
    user_id: string;
    code: string;
    name: string;
    is_sold: boolean;
    is_purchased: boolean;
    sale_unit_price?: number;
    sale_account_id?: string;
    sale_account?: AccountData
    sale_tax_id?: string;
    sale_tax?: Tax;
    sale_description?: string;
    purchase_unit_price?: number;
    purchase_account_id?: string;
    purhcase_account: AccountData;
    purchase_tax_id?: string;
    purchase_tax?: Tax;
    purchase_description?: string;
}