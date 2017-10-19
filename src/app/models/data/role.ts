interface Permissions 
{
    invoices: any;
    contacts: any;
    settings: any;
    reports: any;
    payroll: any;
    items: any;
}
  
export interface Role 
{
    id: string;
    name: string;
    short_description?: string;
    description?: string;
    permissions: Permissions
}