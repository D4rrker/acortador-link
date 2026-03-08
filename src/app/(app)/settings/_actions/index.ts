'use server';

import { createClient as createAdminClient } from '@supabase/supabase-js';
import { createClient } from '@/src/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { profileSchema } from '@/src/app/(app)/settings/_schemas/index';

type TypeUpdateUSerProfile = {
  errors: Record<string, string[]> | undefined;
  message: string | null;
  success: boolean;
};

export const updateUserProfile = async (formData: {
  name: string;
  timezone: string;
}): Promise<TypeUpdateUSerProfile> => {
  const parsed = profileSchema.safeParse(formData);

  if (!parsed.success) {
    const fieldErrors = parsed.error.issues.reduce(
      (acc: Record<string, string[]>, issue) => {
        const path = issue.path[0] as string;

        if (!acc[path]) {
          acc[path] = [];
        }

        acc[path].push(issue.message);
        return acc;
      },
      {}
    );
    return { errors: fieldErrors, message: 'null', success: false };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    data: {
      name: parsed.data.name,
      timezone: parsed.data.timezone,
    },
  });

  if (error) {
    console.error('❌ fn[updateUserProfile] :', error.message);
    return {
      errors: undefined,
      message: 'No se pudo actualizar los datos, intente de nuevo.',
      success: false,
    };
  }

  revalidatePath('/settings');

  return {
    errors: undefined,
    message: 'Se han actualizado los datos correctamente.',
    success: true,
  };
};

export const updateUserAvatar = async (
  formData: FormData,
  email: string,
  oldAvatarUrl?: string
) => {
  const file = formData.get('avatar') as File;
  if (!file) return null;

  const supabase = await createClient();

  if (oldAvatarUrl && oldAvatarUrl.includes('/avatars/')) {
    const oldPath = oldAvatarUrl.split('/avatars/')[1];
    if (oldPath) {
      await supabase.storage.from('avatars').remove([oldPath]);
    }
  }

  const fileExt = file.name.split('.').pop();
  const filePath = `${email}-${Math.random()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error al subir:', uploadError);
    return null;
  }

  const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);

  return { publicUrl: data.publicUrl };
};

export const updateUserPassword = async (newPassword: string) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error('Error cambiando contraseña:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
};

export const deleteUserAccount = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'No autorizado' };
  }

  const avatarUrl = user.user_metadata?.avatar_url;
  if (avatarUrl) {
    try {
      const urlObj = new URL(avatarUrl);
      const avatarPath = urlObj.pathname.split('/').pop();

      if (avatarPath) {
        await supabase.storage.from('avatars').remove([avatarPath]);
      }
    } catch (err) {
      console.error('❌ Error limpiando el avatar:', err);
    }
  }

  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (error) {
    console.error('Error al borrar cuenta:', error.message);
    return { success: false, error: error.message };
  }

  await supabase.auth.signOut();
  redirect('/login');
};
