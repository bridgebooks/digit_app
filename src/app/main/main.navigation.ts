export module MainNavigation {
    export const NavItems = [
        {
            label: 'Dashboard',
            icon: 'home',
            path: '/dashboard',
            children: null
        },
        {
            label: 'Sales',
            icon: 'credit-card',
            path: '/sales',
            children: [
                {
                    label: 'Invoices',
                    path: '/sales/invoices',
                    queryParams: {
                        status: 'all'
                    }
                },
                {
                    label: 'Inventory',
                    path: '/sales/items',
                    queryParams: {}
                }
            ] 
        },
        {
            label: 'Purchases',
            icon: 'shopping-cart',
            path: '/purchases',
            children: [
                {
                    label: 'Bills',
                    path: '/purchases/bills',
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
                    label: 'Pay runs',
                    path: '/payroll/runs',
                    queryParams: {}
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