import { ITourDefinition } from '../../../services/tour.service';

export const InventoryTour: ITourDefinition = {
    id: 'inventory-tour',
    url: '/invoices/items',
    steps: [
        {
            target: 'new-item-btn',
            title: 'Creating items',
            content: 'Generate Invoices and keep track of your items in stock, the cost price and the selling price.',
            placement: 'bottom'
        }
    ]
}
