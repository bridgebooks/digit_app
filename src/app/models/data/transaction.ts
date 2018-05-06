
interface AccountData {
    data: Account;
};

interface TransactionSource {
    data: any;
}

export interface AccountTransaction {
    id: string;
    org_id: string;
    account_id: string;
    source_id: string;
    source_type: string;
    account?: AccountData;
    source?: TransactionSource;
    debit: number;
    credit: number;
    created_at: number;
    updated_at: number;
}
