import { createClient } from '@/src/utils/supabase/server';
import type {
  TUserPlans,
  ILinkData,
} from '@/src/app/(app)/dashboard/_types/types';

/**
 * Obtiene el plan del usuario desde la DB.
 ** Si hay un error o el usuario no existe, devuelve 'free' como fallback.
 * @returns El plan activo: `'free' | 'pro'`.
 */
export const getUserPlan = async (): Promise<TUserPlans> => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    console.error('❌ fn[getUserPlan]: ', error);
    return 'free';
  }

  const plan: TUserPlans = data.user.user_metadata?.plan || 'free';

  return plan;
};

/**
 * Obtiene los links del usuario.
 * @returns Un array de objetos con la información de los links del usuario. Si hay un error, devuelve un array vacío.
 */
export const getUserLinks = async (): Promise<ILinkData[] | []> => {
  const supabase = await createClient();

  const { data: data, error } = await supabase
    .from('links')
    .select('id, original_url, short_code, clicks, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ fn[getUserLinks]: ', error);
    return [];
  }

  const links: ILinkData[] = data;

  return links;
};

/**
 * Obtiene los eventos geográficos del usuario.
 * @returns Un array de objetos con la información de los eventos geográficos del usuario. Si hay un error, devuelve un array vacío.
 */
export const getGeoEvents = async (linkIds: number[]) => {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('get_dashboard_top_countries', {
    p_link_ids: linkIds,
  });

  if (error) {
    console.error('❌ fn[geoEvents]: ', error);
  }

  return data || [];
};

/**
 * Obtiene el timezone del usuario desde la DB.
 ** Si hay un error o el usuario no existe, devuelve 'Europe/Madrid' como fallback.
 * @returns El timezone del usuario o por defecto 'Europe/Madrid'.
 */
export const getUserTimeZone = async (): Promise<string> => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    console.error('❌ fn[getUserTimeZone]: ', error);
    return 'Europe/Madrid';
  }

  const timezone: string = data.user.user_metadata?.timezone || 'Europe/Madrid';

  return timezone;
};
