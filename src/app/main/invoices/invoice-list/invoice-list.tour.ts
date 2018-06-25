import { ITourDefinition } from '../../../services/tour.service';

export const InvoiceListTour: ITourDefinition = {
    id: 'invoice-list-tour',
    url: '/invoices',
    steps: [
        {
            target: 'new-invoice-btn',
            title: 'Creating invoices',
            content: 'text goes here',
            placement: 'bottom'
        },
        {
            target: 'invoice-list-nav',
            title: 'Your invoices',
            content: 'text goes here',
            placement: 'bottom'
        }
    ]
}
