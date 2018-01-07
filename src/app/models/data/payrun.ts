import { Payslip } from "../data/payslip";

interface Payslips {
    data: Payslip
}

export interface Payrun {
    id: string;
    org_id: string;
    user_id: string;
    start_date: number;
    end_date: number;
    payment_date: number;
    employees: number;
    wages: number;
    deductions: number;
    tax: number;
    reimbursements: number;
    net_pay: number;
    total: number;
    status: string;
    notes: string;
    payslips: Payslips;
}