import { ITourDefinition } from '../../services';

export const DashboardTour: ITourDefinition = {
    id: 'dashboard-tour',
    url: '/dashboard',
    steps: [
        {
            target: 'profit-loss-widget',
            placement: 'right',
            title: 'Profit & Loss',
            content: 'Text goes here'
        },
        {
            target: 'invoices-widget',
            placement: 'left',
            title: 'Invoices',
            content: 'Text goes here'
        },
        {
            target: 'sales-widget',
            placement: 'top',
            title: 'Sales',
            content: 'Text goes here'
        },
        {
            target: 'expenses-widget',
            placement: 'top',
            title: 'Expenses',
            content: 'Text goes here'
        }
    ]
}
