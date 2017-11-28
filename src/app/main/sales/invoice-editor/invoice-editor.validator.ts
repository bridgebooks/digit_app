export module InvoiceValidator {
    const rules = [
        {
            field: 'contact_id',
            required: true,
            message: 'Please select a contact for this invoice'
        },
        {
            field: 'due_at',
            required: true,
            message: 'Please enter a due date for this invoice'
        },
        {
            field: 'invoice_no',
            required: true,
            message: 'Please enter an invoice no for this invoice'
        },
        {
            field: 'reference',
            required: true,
            message: 'Please enter a reference for this invoice'
        }
    ]
    export function validate(input: Object) {
        const errors = [];

        rules.forEach(rule => {
            if (input.hasOwnProperty(rule.field) && rule.required && !input[rule.field]) {
                errors.push({
                    message: rule.message
                })
            }
        })

        return errors;
    }
}
    