import { ITourDefinition } from '../../../services/tour.service';
export const InvoicEditorTour: ITourDefinition = {
    id: 'invoice-editor-tour',
    url: 'invoices/edit',
    steps: [
        {
            target: 'contact-select',
            placement: 'top',
            title: 'Contact',
            content: 'Select a contact where your invoice should be addressed to. You may easily add new contacts if you haven\'t already.'
        },
        {
            target: 'due-date',
            placement: 'top',
            title: 'Due Date',
            content: 'Set a date that helps to remind you about when an invoice is due for payment'
        },
        {
            target: 'tax-settings',
            placement: 'bottom',
            title: 'Tax Mode',
            content: 'Select how you want the tax amount to be added on your total invoice.'
        },
        {
            target: 'invoice-table',
            placement: 'top',
            title: 'Invoice items',
            content: 'Invoice Items show your inventory stock and the price units. Add new stock here easily.'
        }
    ]
}
