import * as _ from 'lodash';

export module InvoiceUtils {
    
    export class Builder {
        private model: any = {};

        constructor() {}

        setTo(value: string): Builder {
            this.model.contact_id = value;
            return this;
        }

        setOrg(value: string): Builder {
            this.model.org_id = value;
            return this;
        }

        setDueDate(value: any): Builder {
            this.model.due_at = value.formatted ? value.formatted : null;
            return this;
        }

        setRaisedAtDate(value: string): Builder {
            this.model.raised_at = value;
            return this;
        }

        setType(value: string): Builder {
            this.model.type = value;
            return this;
        }

        setLineAmountType(value: string): Builder {
            this.model.line_amount_type = value;
            return this;
        }

        setInvoiceNo(value: string): Builder {   
            this.model.invoice_no = value;
            return this;
        }

        setInvoiceReference(value: string): Builder {
            this.model.reference = value;
            return this;
        }

        setItems(value: any[]): Builder {
            const clean = [];
            value.forEach(item => {
                clean.push({
                    row_order: item.row_order,
                    item_id: item.item_id,
                    description: item.description,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                    discount: item.discount,
                    account_id: item.account_id,
                    tax_rate_id: item.tax_rate_id,
                    amount: item.amount
                });
            });

            this.model.items = clean;

            return this;
        }

        setStatus(value: string): Builder {
            this.model.status = value;
            return this;
        }

        setSubTotal(value: number): Builder {
           this.model.sub_total = value;
           return this; 
        }

        setTaxTotal(value: number): Builder {
            this.model.tax_total = value;
            return this; 
        }

        setTotal(value: number): Builder {
            this.model.total = value;
            return this; 
         }

        get() {
            return this.model;
        }
    }
}