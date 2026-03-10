import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileForm from '@/src/app/(app)/settings/_components/profile-section/profile-form';

const mockFormAction = vi.fn();

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useActionState: () => [
      { success: false, message: null },
      mockFormAction,
      false,
    ],
  };
});

vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('ProfileForm - Lógica de Datos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps = {
    initialName: 'Kira',
    initialEmail: 'ho****@gmail.com',
    initialTimezone: 'Europe/Madrid',
  };

  it('captura las modificaciones y envía el FormData correcto', async () => {
    const user = userEvent.setup();
    render(<ProfileForm {...defaultProps} />);

    const inputName = screen.getByLabelText(/nombre/i);
    const selectTimezone = screen.getByLabelText(/zona horaria/i);
    const submitButton = screen.getByRole('button', {
      name: /guardar cambios/i,
    });

    await user.clear(inputName);
    await user.type(inputName, 'Kira Actualizada');
    await user.selectOptions(selectTimezone, 'UTC');

    await user.click(submitButton);

    expect(mockFormAction).toHaveBeenCalledOnce();

    const formDataEnviado = mockFormAction.mock.calls[0][0] as FormData;

    expect(formDataEnviado.get('name')).toBe('Kira Actualizada');
    expect(formDataEnviado.get('timezone')).toBe('UTC');
  });
});
