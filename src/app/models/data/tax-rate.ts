import { TaxRateComponent } from './tax-rate-component';

export interface TaxRate {
    id?: string;
    name?: string;
    is_system?: boolean;
    value?: number;
    accounts?: number;
    components?: TaxRateComponent[]
}