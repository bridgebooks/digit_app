import * as _ from 'lodash';
import { isNumeric } from 'rxjs/util/isNumeric';

export module InvoiceUtils {

    export function generateInvoiceNo(max: number =  9999999, min = 1) {
        const now = new Date();
        const sequence = Math.floor((Math.random() * max) + min);
        const no = 'INV-' + sequence;
        return no;
    }

    export class ItemBuilder {
        private model: any = {}

        constructor() {}

        setItem(value: string) {
            this.model.item_id = value;
            return this;
        }

        setDescription(value: string) {
            this.model.description = value;
            return this;
        }

        setAccount(value: string) {
            this.model.account_id = value;
            return this;
        }

        setTaxRate(value: string) {
            this.model.tax_rate_id = value;
            return this;
        }

        setPrice(value: number) {
            this.model.price = value;
            return this;
        }

        setQuantity(value: number) {
            this.model.quantity = value;
            return this;
        }

        setDiscountRate(value: number) {
            this.model.discount_rate = value;
            return this;
        }

        setAmount(value: number) {
            this.model.amount = value;
            return this;
        }

        get() {
            return this.model;
        }
    }

    export class Builder {
        private model: any = {};

        constructor() {}

        private toDate(timestamp: number) {
            const d = new Date(timestamp);
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDay()}`
        }

        setTo(value: string): Builder {
            this.model.contact_id = value;
            return this;
        }

        setOrg(value: string): Builder {
            this.model.org_id = value;
            return this;
        }

        setDueDate(value: any): Builder {
            this.model.due_at = isNumeric(value) ? this.toDate(value) : value;
            return this;
        }

        setRaisedAtDate(value: string): Builder {
            this.model.raised_at = isNumeric(value) ? this.toDate(value) : value;
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
            value ? this.model.reference = value : delete this.model.reference;
            return this;
        }

        setItems(value: any[]): Builder {
            const clean = [];
            value.forEach(item => {
                clean.push({
                    id: item.id || null,
                    row_order: item.row_order,
                    item_id: item.item_id,
                    description: item.description,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                    discount_rate: item.discount_rate,
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

        setNotes(value: string): Builder {
            this.model.notes =  value;
            return this;
        }

        get() {
            return this.model;
        }
    }
}
