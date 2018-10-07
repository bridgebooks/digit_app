import { BankAccount } from '../data/bank-account';

export interface BankAccountResponse {
    status: string;
    data: BankAccount;
}
