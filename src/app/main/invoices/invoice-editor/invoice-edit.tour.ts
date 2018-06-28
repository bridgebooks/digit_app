import { ITourDefinition } from '../../../services/tour.service';
export const InvoicEditorTour: ITourDefinition = {
    id: 'invoice-editor-tour',
    url: 'invoices/edit',
    steps: [
        {
            target: 'contact-select',
            placement: 'top',
            title: 'Contact',
            content: 'text'
        },
        {
            target: 'due-date',
            placement: 'top',
            title: 'Due Date',
            content: 'text'
        },
        {
            target: 'tax-settings',
            placement: 'bottom',
            title: 'Tax Mode',
            content: 'text'
        },
        {
            target: 'invoice-table',
            placement: 'top',
            title: 'Invoice items',
            content: 'text'
        }
    ]
}
