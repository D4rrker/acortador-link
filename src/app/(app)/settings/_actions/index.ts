'use server';

import { createClient as createAdminClient } from '@supabase/supabase-js';
import { createClient } from '@/src/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  profileSchema,
  passwordSchema,
} from '@/src/app/(app)/settings/_schemas/index';

export type TypeUpdateUserProfile = {
  errors?: Record<string, string[]> | undefined;
  message?: string | null;
  success?: boolean;
  updatedData?: { name: string; timezone: string };
};

export const updateUserProfile = async (
  _prevState: TypeUpdateUserProfile,
  formData: FormData
): Promise<TypeUpdateUserProfile> => {
  const data = Object.fromEntries(formData);
  const parsed = profileSchema.safeParse(data);

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
    return {
      errors: fieldErrors,
      message: 'Error al actualizar los datos.',
      success: false,
    };
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
      message: 'No se pudo actualizar los datos, intente de nuevo.',
      success: false,
    };
  }

  await supabase.auth.refreshSession();

  revalidatePath('/settings');

  return {
    message: 'Se han actualizado los datos correctamente.',
    success: true,
    updatedData: {
      name: parsed.data.name,
      timezone: parsed.data.timezone,
    },
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

export type TypeUpdateUserPassword = {
  success: boolean;
  message?: string | null;
  errors?: Record<string, string[]>;
};

export const updateUserPassword = async (
  _prevState: TypeUpdateUserProfile,
  formData: FormData
): Promise<TypeUpdateUserPassword> => {
  const data = Object.fromEntries(formData);
  const parsed = passwordSchema.safeParse(data);

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
    return {
      errors: fieldErrors,
      message: 'Error al cambiar la contraseña.',
      success: false,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: parsed.data?.password,
  });

  if (error) {
    console.error('Error cambiando contraseña:', error.message);
    return { success: false, message: error.message };
  }

  return { success: true, message: 'Contraseña actualizada con éxito.' };
};

export type TypeDeleteUserAccount = {
  success: boolean;
  message?: string | null;
};

export const deleteUserAccount = async (
  _prevState: TypeDeleteUserAccount,
  formData: FormData
): Promise<TypeDeleteUserAccount> => {
  const confirmDelete = formData.get('confirmDelete');

  if (!confirmDelete) {
    return {
      success: false,
      message: 'Debes de confirmar que quieres eliminar la cuenta.',
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: 'No autorizado' };
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
    return { success: false, message: error.message };
  }

  await supabase.auth.signOut();
  redirect('/login');
};
