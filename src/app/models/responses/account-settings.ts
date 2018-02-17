interface FinancialYear {
    day: number;
    month: number;
}

export interface AccountingSettingValues {
    accounts_payable: any;
    accounts_receivable: any;
    sales_tax: any;
    wages: any;
    financial_year: FinancialYear
}

export interface AccountingSettingsData {
    id: string;
    org_id: string;
    values: AccountingSettingValues;
}

export interface AccountingSettings {
    data: AccountingSettingsData;
}
