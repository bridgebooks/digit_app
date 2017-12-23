import { Contact } from '../data/contact';
import { Employee } from '../data/employee';

export interface SearchResponse {
    total: number;
    to: number;
    from: number;
    current_page: number
    per_page: number;
    next_page_url: string;
    prev_page_url: string;
    data: any[];
}