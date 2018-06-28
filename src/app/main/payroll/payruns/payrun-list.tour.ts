import { ITourDefinition } from '../../../services/tour.service';
export const PayrunsTour: ITourDefinition = {
    id: 'payroll-list',
    url: '/payroll/runs',
    steps: [
        {
            target: 'new-payrun-btn',
            title: 'Run Payroll',
            placement: 'left',
            content: 'Keep track of how much you pay to your employees periodically'
        },
        {
            target: 'payrun-nav',
            title: 'Your payroll runs',
            placement: 'bottom',
            content: 'View all the payroll runs and the total amount spent on payroll'
        }
    ]
}
