import { TaxRateComponent } from './tax-rate-component';

interface TaxRateComponents {
    data: TaxRateComponent[]
}

export interface TaxRate {
    id?: string;
    org_id?: string;
    name?: string;
    is_system?: boolean;
    value?: number;
    accounts?: number;
    components?: TaxRateComponents
}