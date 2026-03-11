'use server';

import { createClient } from '@/src/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { generateShortCode } from '@/src/utils/generate-code';
import { getUserPlan } from '@/src/app/(app)/dashboard/_lib/queries';
import { MONTHLY_LIMITS } from '@/src/const/index';
import { createLinkSchema } from '@/src/app/(app)/dashboard/_schema/index';
import { isDomainBlocked } from '@/src/utils/blocklist';

export type LinkState = {
  message: string | null;
  errors?: Record<string, string[]>;
};

export async function createLink(
  _prevState: LinkState | null,
  formData: FormData
): Promise<LinkState | undefined> {
  const rawData = {
    originalUrl: formData.get('originalUrl')?.toString(),
    customSlug: formData.get('customSlug')?.toString(),
  };

  const parsed = createLinkSchema.safeParse(rawData);

  const isBlocked = await isDomainBlocked(rawData.originalUrl);

  if (isBlocked) return;

  // ----------Cambiar más adelante----------
  if (!parsed.success) {
    const fieldErrors = parsed.error.issues.reduce<Record<string, string[]>>(
      (acc, issue) => {
        const path = issue.path[0];

        if (typeof path === 'string') {
          if (!acc[path]) {
            acc[path] = [];
          }
          acc[path].push(issue.message);
        }
        return acc;
      },
      {}
    );
    return { message: 'Errores de validación', errors: fieldErrors };
  }
  // ----------------------------------------

  const { originalUrl, customSlug } = parsed.data;

  const plan = await getUserPlan();

  const monthlyLimit = MONTHLY_LIMITS[plan];

  const supabase = await createClient();

  if (plan === 'free') {
    if (customSlug) {
      return {
        message: 'Actualiza a PRO para personalizar tus enlaces.',
        errors: {},
      };
    }

    const now = new Date();
    // Día 1 del mes actual a las 00:00:00
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    ).toISOString();

    const { count, error: countError } = await supabase
      .from('links')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfMonth); // Solo cuenta desde el día 1 del mes

    if (countError) {
      return {
        message: 'Error al verificar los límites.',
        errors: {},
      };
    }

    if (count !== null && count >= monthlyLimit) {
      return {
        message: `Límite mensual alcanzado (${monthlyLimit} enlaces).`,
        errors: {},
      };
    }
  }

  const finalSlug = customSlug || generateShortCode(6);

  try {
    const { error } = await supabase.from('links').insert({
      user_id: (await supabase.auth.getUser()).data.user?.id || '',
      original_url: originalUrl,
      short_code: finalSlug,
    });

    if (error) {
      // Error 23505: Unique Violation (Código duplicado)
      if (error.code === '23505') {
        const msg = customSlug
          ? 'Este alias ya está en uso.'
          : 'Error generando código, intenta de nuevo.';

        return {
          message: 'Este alias ya existe',
          errors: { customSlug: [msg] },
        };
      }
      throw error;
    }
  } catch (err) {
    console.error('❌ Error al guardar en la base de datos: ', err);
    return { message: 'Error al guardar en base de datos.', errors: {} };
  }

  revalidatePath('/dashboard');

  return { message: '¡Enlace acortado con éxito!', errors: undefined };
}
