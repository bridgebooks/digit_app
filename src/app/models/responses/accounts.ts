import { Account } from '../data/account';

export interface AccountsResponse {
    total: number;
    to: number;
    from: number;
    current_page: number
    per_page: number;
    next_page_url: string;
    prev_page_url: string;
    data: Account[];
}