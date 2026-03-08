import { createClient } from '@/src/utils/supabase/server';
import type { GetDataUser } from '@/src/app/(app)/settings/_types/index';

export const getDataUser = async (): Promise<GetDataUser> => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.email) {
    console.error('❌ fn[getDataUser]: ', error);
    return {
      name: '',
      hiddenEmail: '',
      timezone: '',
      success: false,
    };
  }

  const [prefix, domain] = user.email.split('@');

  const visibleChars = prefix.length > 2 ? 2 : 1;

  const hiddenEmail = `${prefix.slice(0, visibleChars)}****@${domain}`;

  return {
    name: user.user_metadata.name,
    hiddenEmail,
    timezone: user.user_metadata.timezone,
    success: true,
  };
};
