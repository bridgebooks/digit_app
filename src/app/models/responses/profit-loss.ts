export interface ProfitLossReportAccount {
    id: string;
    code: string;
    name: string;
    balance: number;
}

export interface ProfitLossReportData {
    income: any;
    income_total: number;
    purchases: any;
    purchase_total: number;
    expenses: any;
    expense_total: number;
    net_profit: number;
    gross_profit: number;
}

export interface ProfitLossReport {
    data: ProfitLossReportData
}
