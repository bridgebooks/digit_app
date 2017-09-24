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
            icon: 'dollar',
            path: '/sales',
            children: [
                {
                    label: 'Invoices',
                    path: '/sales/invoices'
                },
                {
                    label: 'Inventory',
                    path: '/sales/items'
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
                    path: '/purchases/bills'
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
                    path: '/contacts/customer'
                },
                {
                    label: 'Vendors',
                    path: '/contacts/vendor'
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
                    path: '/payroll/employees'
                },
                {
                    label: 'Pay runs',
                    paths: '/payroll/runs'
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