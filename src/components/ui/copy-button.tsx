'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { clsx } from 'clsx';

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={clsx(
        'cursor-pointer rounded-md border p-2 transition-all duration-200',
        copied
          ? 'border-green-200 bg-green-50 text-green-600'
          : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-black'
      )}
      title="Copiar enlace"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}
