export interface Beneficiary {
    id: number;
    accountNumber: string;
    accountName: string;
    bankCode: string;
    bankName: string;
    userId: number;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: any;
}

export interface Transfer {
    id: number;
    type: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    recipientPhone?: any;
    status: string;
    system_status?: any;
    medium: string;
    ip: string;
    exchangeRate?: any;
    amountToSend: number;
    amountToCharge: number;
    disburseCurrency: string;
    chargeCurrency: string;
    flutterChargeResponseCode: string;
    flutterChargeResponseMessage: string;
    flutterDisburseResponseMessage?: any;
    flutterChargeReference: string;
    flutterDisburseReference?: any;
    flutterDisburseResponseCode?: any;
    merchantCommission: number;
    moneywaveCommission: number;
    netDebitAmount: number;
    chargedFee: number;
    receiptNumber?: any;
    redirectUrl: string;
    linkingReference?: any;
    source: string;
    source_id: number;
    meta: any[];
    additionalFields?: any;
    ref: string;
    r1: number;
    r2: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: any;
    userId: number;
    merchantId: number;
    beneficiaryId: number;
    accountId?: any;
    cardId: number;
    account?: any;
    beneficiary: Beneficiary;
}

export interface InvoicePayment {
    transfer: Transfer;
    authurl?: any;
    responsehtml?: any;
    pendingValidation: boolean;
    chargeMethod: string;
}