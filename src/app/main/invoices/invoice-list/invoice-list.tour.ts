import { ITourDefinition } from '../../../services/tour.service';

export const InvoiceListTour: ITourDefinition = {
    id: 'invoice-list-tour',
    url: '/invoices',
    steps: [
        {
            target: 'new-invoice-btn',
            title: 'Creating invoices',
            placement: 'bottom',
            content: 'Lets Create your first invoice. Invoices allow you to generate an order which your customers can view and pay for.'
        },
        {
            target: 'invoice-list-nav',
            title: 'Your invoices',
            content: 'Get an overview of all your generated invoices',
            placement: 'bottom'
        }
    ]
}
