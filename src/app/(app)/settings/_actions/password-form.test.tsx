import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PasswordForm from '@/src/app/(app)/settings/_components/profile-section/password-form';

const mockPasswordAction = vi.fn();

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useActionState: () => [
      { success: false, message: null },
      mockPasswordAction,
      false,
    ],
  };
});

describe('PasswordForm - Lógica de Seguridad', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe empaquetar correctamente las nuevas contraseñas en el FormData', async () => {
    const user = userEvent.setup();
    render(<PasswordForm />);

    const newPasswordInput = screen.getByLabelText(/nueva contraseña/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar contraseña/i);
    const submitButton = screen.getByRole('button', {
      name: /actualizar contraseña/i,
    });

    await user.type(newPasswordInput, 'Password123!');
    await user.type(confirmPasswordInput, 'Password123!');

    await user.click(submitButton);

    expect(mockPasswordAction).toHaveBeenCalledOnce();

    const formData = mockPasswordAction.mock.calls[0][0] as FormData;

    expect(formData.get('password')).toBe('Password123!');
    expect(formData.get('confirmPassword')).toBe('Password123!');
  });
});
