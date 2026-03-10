// src/utils/blocklist.ts
import { createClient } from '@/src/utils/supabase/server';

export async function isDomainBlocked(
  targetUrl: string | undefined
): Promise<boolean> {
  if (!targetUrl) return false;

  try {
    const { hostname } = new URL(targetUrl);
    const cleanDomain = hostname.replace(/^www\./, '');

    console.log('BlockList: ', cleanDomain);

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('blocked_domains')
      .select('id')
      .eq('domain', cleanDomain)
      .single();

    console.log('BlockList: ', data);

    if (error && error.code !== 'PGRST116') {
      console.error('Error en blocklist:', error);
      return false;
    }

    return !!data;
  } catch {
    return true;
  }
}
