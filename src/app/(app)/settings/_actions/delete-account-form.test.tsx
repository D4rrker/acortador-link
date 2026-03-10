import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteAccountForm from '@/src/app/(app)/settings/_components/profile-section/delete-account-form';

const mockDeleteAction = vi.fn();

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useActionState: () => [{ success: false }, mockDeleteAction, false],
  };
});

describe('DeleteAccountForm - Lógica de Seguridad Crítica', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe enviar el formulario con la confirmación marcada', async () => {
    const user = userEvent.setup();
    render(<DeleteAccountForm />);

    const checkbox = screen.getByRole('checkbox');
    const deleteButton = screen.getByRole('button', {
      name: /eliminar cuenta/i,
    });

    await user.click(checkbox);
    await user.click(deleteButton);

    expect(mockDeleteAction).toHaveBeenCalledOnce();

    const formData = mockDeleteAction.mock.calls[0][0] as FormData;

    expect(formData.get('confirmDelete')).toBe('on');
  });

  it('no debería permitir el envío si el checkbox no está marcado', async () => {
    const user = userEvent.setup();
    render(<DeleteAccountForm />);

    const deleteButton = screen.getByRole('button', {
      name: /eliminar cuenta/i,
    });

    await user.click(deleteButton);

    expect(mockDeleteAction).not.toHaveBeenCalled();
  });
});
