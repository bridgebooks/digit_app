import { Employee } from "app/models/data/employee";

interface EmployeeData {
    data: Employee;
}

export interface Payslip {
    id: string;
    pay_run_id: string;
    employee_id: string;
    wages: number;
    deductions: number; 
    tax: number;
    reimbursements: number; 
    net_pay: number;
    created_at: number; 
    updated_at: number;
    employee: EmployeeData;
}