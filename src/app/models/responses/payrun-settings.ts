export interface PayrunSettingValues {
    wages_account?: any;
    employee_tax_account?: any;
    basic_wage_item?: any;
    housing_allowance_item?: any;
    transport_allowance_item?: any;
}

export interface PayrunSettingsData {
    id: string;
    org_id: string;
    values: PayrunSettingValues;
}

export interface PayrunSettings {
    data: PayrunSettingsData;
}
