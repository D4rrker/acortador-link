export type ClickEvent = {
  country: string | null;
  city: string | null;
  device_type: string | null;
  created_at: string;
  referrer: string | null;
  link_id: number;
};

export type MetricResult = {
  name: string;
  value: number;
  percent: number;
};

export type UserData = {
  name: string;
  email: string;
  avatarUrl: string;
  plan: string;
  timezone: string;
};
