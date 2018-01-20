import { SubscriptionPlan } from "./subscription-plan";

export interface UserSubscription {
    id: string;
    plan_id: string;
    user_id: string;
    quantity: number;
    paystack_subscription_code?: any;
    paystack_subscription_token?: any;
    is_trial: boolean;
    is_canceled: boolean;
    is_ended: boolean;
    is_active: boolean;
    trial_ends_at: number;
    starts_at: number | null;
    ends_at?: number | null;
    canceled_at: number | null;
    created_at: number;
    updated_at: number;
    plan?: SubscriptionPlan;
}