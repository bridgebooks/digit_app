export interface SubscriptionPlan {
  id: string;
  display_name: string;
  name: string;
  description: string;
  interval: string;
  amount: number;
  currency: string;
  paystack_plan_code: string;
  created_at: number;
  updated_at: number;
}