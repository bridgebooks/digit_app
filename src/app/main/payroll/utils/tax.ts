export module TaxUtils {
    const NHF_VALUE = 2.5;
    const PENSION = 7.5;

    export interface TaxPayload {
        basic: number;
        housing: number;
        transport: number;
        others: number;
    }

    export interface TaxResult {
        tax: number;
        taxrate: number;
        taxable: number;
        exemption: number;
    }

    function computeRelief(income: number) {
        const annualRate = 0.2;
        const monthlyPGRate = annualRate / 12;

        const grossAnnual = 12 * income;
        const onePercentGross = 0.01 * grossAnnual;

        const consolidated = (Math.max(200000, onePercentGross)) / 12;
        const PGI = monthlyPGRate * income;

        return (consolidated + PGI).toPrecision(2);
    }

    function computeTaxrate(taxable: number) {
        const t1 = Math.min(25000, taxable) * (7 / 100);
        const t2 = (taxable >= 25000) ? Math.min(25000, taxable - 25000) * (11 / 100) : 0;
        const t3 = (taxable >= 41666) ? Math.min(41666, taxable - 41666) * (15 / 100) : 0;
        const t4 = (taxable >= 41666) ? Math.min(41666, taxable - 41666) * (19 / 100) : 0;
		const t5 = (taxable >= 133333) ? Math.min(133333, taxable - 133333) * (21 / 100) : 0;
        const t6 = (taxable >= 266666) ? (taxable - 266666) * (24 / 100) : 0;

        return t1 + t2 + t3 + t4 + t5 + t6;
    }

    export function computeTax(options: TaxPayload): TaxResult {
        let income = 0;
        let pension = 0;
        let nhf = 0;
        let tax = 0;
        let taxrate = 0;
        let exempt = 0;
        let taxable = 0;
        let relief = 0;

        income = options.basic + options.housing + options.transport + options.others;

        if (income < 0) {
        } else {
            pension = (PENSION / 100) * (options.basic + options.housing + options.transport);
            nhf = (NHF_VALUE / 100) * options.basic;
            relief = Number(computeRelief(income));

            exempt += pension;
            exempt += nhf;
            exempt += relief;

            if (income >= exempt) {
                taxable = income - exempt;
                tax = Math.round(computeTaxrate(taxable) * 100) / 100;
                taxrate = <any>((tax / income) * 100).toFixed(2);
            }

            return {
                tax,
                taxrate,
                taxable,
                exemption: exempt
            }
        }
    }
}
