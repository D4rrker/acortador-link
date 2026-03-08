// Queries Globales
import { createClient } from '@/src/utils/supabase/server';
import type { UserData } from '@/src/types/index';

export const getUserBasicData = async (): Promise<UserData> => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.email) {
    console.error('❌ fn[getUserBasicData]: ', error);
    return {
      email: '',
      name: '',
      plan: '',
      avatarUrl: '',
      timezone: '',
    };
  }

  const [prefix, domain] = user.email.split('@');

  const visibleChars = prefix.length > 2 ? 2 : 1;

  const email = `${prefix.slice(0, visibleChars)}****@${domain}`;

  const metadata = user.user_metadata || {};

  return {
    email,
    name: metadata.name,
    plan: metadata.plan || 'free',
    avatarUrl: metadata.avatar_url,
    timezone: metadata.timezone,
  };
};
