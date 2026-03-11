'use server';

import { createClient } from '@/src/utils/supabase/server';
import { redirect } from 'next/navigation';
import { authSchema, authSchemaLogin } from '@/src/lib/schemas/auth';

export type AuthStateSignUp = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function signUp(
  _prevState: AuthStateSignUp,
  formData: FormData
): Promise<AuthStateSignUp> {
  const data = Object.fromEntries(formData);
  const parsed = authSchema.safeParse(data);

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
    return { errors: fieldErrors, message: null };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      data: {
        name: parsed.data.name,
        plan: 'pro',
        timezone: 'Europe/Madrid',
      },
    },
  });

  if (error) {
    return { message: error.message };
  }

  redirect(`/verify-email?email=${encodeURIComponent(parsed.data.email)}`);
}

export type AuthStateLogIn = {
  message?: string | null;
};

export async function login(
  _prevState: AuthStateLogIn,
  formData: FormData
): Promise<AuthStateLogIn> {
  const data = Object.fromEntries(formData);
  const parsed = authSchemaLogin.safeParse(data);

  if (!parsed.success) {
    return { message: 'Credenciales incorrectas' };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { message: 'Credenciales incorrectas' };
  }

  redirect('/dashboard');
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

export async function userPlan(): Promise<'free' | 'pro'> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: userData } = await supabase
    .from('users')
    .select('billing_plan')
    .eq('id', user.id)
    .single();

  return userData?.billing_plan || 'free';
}
