import { ITourDefinition } from '../../../services/tour.service';

export const InventoryTour: ITourDefinition = {
    id: 'inventory-tour',
    url: '/invoices/items',
    steps: [
        {
            target: 'new-item-btn',
            title: 'Creating items',
            content: 'text goes here',
            placement: 'bottom'
        }
    ]
}
