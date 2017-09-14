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
    sale_tax_id?: string;
    sale_description?: string;
    purchase_unit_price?: number;
    purchase_account_id?: string;
    purchase_tax_id?: string;
    purchase_description?: string;
}