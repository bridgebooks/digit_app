export interface SubscriptionPlan {
  id: string;
  display_name: string;
  name: string;
  description: string;
  invoice_interval: string;
  invoice_period: string;
  trial_internval: string;
  trial_period: string;
  amount: number;
  currency: string;
  paystack_plan_code: string;
  created_at: number;
  updated_at: number;
}