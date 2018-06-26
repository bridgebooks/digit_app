import { ITourDefinition } from '../../services';

export const DashboardTour: ITourDefinition = {
    id: 'dashboard-tour',
    url: '/dashboard',
    steps: [
        {
            target: 'profit-loss-widget',
            placement: 'right',
            title: 'Profit & Loss',
            content: 'Your Profit and Loss Overview Shows Total Income and Expenses Over a Period of Time.'
        },
        {
            target: 'invoices-widget',
            placement: 'left',
            title: 'Invoices',
            content: 'Understand how much of your invoices are Paid, Unpaid and Overdue'
        },
        {
            target: 'sales-widget',
            placement: 'top',
            title: 'Sales',
            content: 'Watch your sales growth and keep track of your Income'
        },
        {
            target: 'expenses-widget',
            placement: 'top',
            title: 'Expenses',
            content: 'Understand how much expenses are made and what generates the most expenses over a period.'
        }
    ]
}
