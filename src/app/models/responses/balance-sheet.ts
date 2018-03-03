export interface BalancheSheetAccount {
    id: string;
    code: string;
    name: string;
    balance: number;
}

export interface BalanceSheetReportData {
    assets: any;
    assets_total: number;
    liabilities: any;
    liabilities_tota: number;
    equity: any;
    equity_total: number;
}

export interface BalanceSheetReport {
    data: BalanceSheetReportData
}
