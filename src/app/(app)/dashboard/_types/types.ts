export type TUserPlans = 'free' | 'pro';

export interface ILinkData {
  id: number;
  created_at: string;
  original_url: string;
  short_code: string;
  clicks: number;
}

export type TMONTHLY_LIMITS = Record<TUserPlans, number>;
