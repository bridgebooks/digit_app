export interface BalancheSheetAccount {
    id: string;
    code: string;
    name: string;
    balance: number;
}

export interface BalanceSheetReportData {
    assets: any;
    liabilities: any;
    equity: any;
}

export interface BalanceSheetReport {
    data: BalanceSheetReportData
}