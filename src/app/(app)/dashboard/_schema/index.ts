import { z } from 'zod';

export const createLinkSchema = z.object({
  originalUrl: z.url({ message: 'La URL no es válida' }),
  customSlug: z
    .string()
    .trim()
    .transform((val) => (val === '' ? undefined : val))
    .optional(),
});

export type TypeCreateLinkSchema = z.infer<typeof createLinkSchema>;
