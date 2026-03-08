import { z } from 'zod';

export const authSchema = z.object({
  name: z
    .string()
    .min(2, { error: 'Mínimo de 2 caracteres' })
    .max(50, { error: 'Demasiado largo' }),
  email: z.email({ error: 'Email inválido' }),
  password: z
    .string()
    .min(6, { error: 'Mínimo 6 caracteres' })
    .max(100, { error: 'Demasiado largo' }),
});

export const authSchemaLogin = z.object({
  email: z.email({ error: 'Credenciales incorrectas' }),
  password: z.string({ error: 'Credenciales incorrectas' }),
});

export type AuthFormData = z.infer<typeof authSchema>;
