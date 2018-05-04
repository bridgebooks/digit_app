import { Employee } from '../data/employee';
import { PayslipItem } from '../data/payslip-item';
import { Payrun } from './payrun';

interface EmployeeData {
    data: Employee;
}

interface PayrunData {
    data: Payrun;
}

interface PayslipItemData {
    data: PayslipItem[];
}

export interface Payslip {
    id: string;
    reference: string;
    pay_run_id: string;
    payrun: PayrunData;
    employee_id: string;
    wages: number;
    deductions: number;
    tax: number;
    reimbursements: number;
    net_pay: number;
    pdf_url?: number;
    created_at: number;
    updated_at: number;
    employee: EmployeeData;
    items?: PayslipItemData;
}
