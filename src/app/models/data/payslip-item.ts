import { Payitem } from "../data/payitem";

interface PayitemData {
    data: Payitem;
}

export interface PayslipItem {
    id?: string;
    pay_slip_id?: string;
    pay_item_id: string;
    amount: number;
    item?: PayitemData;
    is_new?: boolean;
    created_at?: number;
    updated_at?: number;
}