import { Wand2 } from 'lucide-react';

export function FormHeader() {
  return (
    <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/50 pb-2">
      <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
        <Wand2 size={18} />
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900">
          Crear nuevo enlace
        </h2>
        <p className="text-xs text-gray-500">
          Transforma una URL larga en algo breve y memorable.
        </p>
      </div>
    </div>
  );
}
