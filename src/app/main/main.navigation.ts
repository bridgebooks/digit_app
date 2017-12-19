export module MainNavigation {
    export const NavItems = [
        {
            label: 'Dashboard',
            icon: 'home',
            path: '/dashboard',
            children: null
        },
        {
            label: 'Invoices',
            icon: 'credit-card',
            path: '/invoices',
            children: [
                {
                    label: 'Sales',
                    path: '/invoices/sales',
                    queryParams: {
                        status: 'all',
                    }
                },
                {
                    label: 'Bills',
                    path: '/invoices/bills',
                    queryParams: {
                        status: 'all',
                    }
                },
                {
                    label: 'Inventory',
                    path: '/invoices/items',
                    queryParams: {}
                }
            ] 
        },
        {
            label: 'Contacts',
            icon: 'users',
            path: '/contacts',
            children: [
                {
                    label: 'Customers',
                    path: '/contacts/customer',
                    queryParams: {}
                },
                {
                    label: 'Vendors',
                    path: '/contacts/vendor',
                    queryParams: {}
                },
            ] 
        },
        {
            label: 'Payroll',
            icon: 'dollar-bill',
            path: '/payroll',
            children: [
                {
                    label: 'Employees',
                    path: '/payroll/employees',
                    queryParams: {
                        status: 'all'
                    }
                },
                {
                    label: 'Payrolls',
                    path: '/payroll/runs',
                    queryParams: {
                        status: 'all'
                    }
                }
            ]
        },
        {
            label: 'Reports',
            icon: 'bar-chart',
            path: '/reports',
            children: null
        },
    ]
}    