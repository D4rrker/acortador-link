import { describe, it, expect, vi } from 'vitest';
import {
  createLink,
  type LinkState,
} from '@/src/app/(app)/dashboard/_actions/links';
import { createClient } from '@/src/utils/supabase/server';

vi.mock('@/src/utils/supabase/server', () => ({
  createClient: vi.fn(),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('Action: createLink', () => {
  it('debe crear un enlace corto y devolver éxito', async () => {
    const mockGte = vi.fn().mockResolvedValue({ count: 0, error: null });
    const mockSelect = vi.fn().mockReturnValue({ gte: mockGte });
    const mockInsert = vi.fn().mockResolvedValue({ error: null });

    vi.mocked(createClient).mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: { id: 'usuario-falso-123' } },
          error: null,
        }),
      },
      from: vi.fn().mockReturnValue({
        select: mockSelect,
        insert: mockInsert,
      }),
    } as unknown as Awaited<ReturnType<typeof createClient>>);

    const formData = new FormData();
    formData.append('originalUrl', 'https://www.ejemplo.com/1234567890');

    const initialState: LinkState = { message: null, errors: {} };

    const response = await createLink(initialState, formData);

    expect(mockInsert).toHaveBeenCalledOnce();
    expect(response).toEqual({
      message: '¡Enlace acortado con éxito!',
      errors: undefined,
    });
  });
});
