import { Link as LinkIcon, Globe } from 'lucide-react';

interface InputProps {
  error?: string[];
}

export function UrlInput({ error }: InputProps) {
  return (
    <div className="relative space-y-2 md:col-span-2">
      <label
        htmlFor="originalUrl"
        className="text-sm font-medium text-gray-700"
      >
        Destino
      </label>
      <div className="group relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <LinkIcon className="h-4 w-4 text-gray-400 group-focus-within:text-zinc-700" />
        </div>
        <input
          id="originalUrl"
          name="originalUrl"
          type="url"
          placeholder="https://ejemplo.com/articulo-largo"
          required
          className={`block w-full rounded-md border py-2.5 pr-3 pl-10 text-sm ${
            error
              ? 'border-red-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
              : 'focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none'
          } `}
        />
      </div>
    </div>
  );
}

export function SlugInput() {
  return (
    <div className="relative space-y-2 md:col-span-2">
      <label
        htmlFor="customSlug"
        className="flex justify-between text-sm font-medium text-gray-700"
      >
        <span>Alias (Opcional)</span>
      </label>
      <div className="border-border flex overflow-hidden rounded-md border focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500 focus-within:outline-none">
        <div className="flex items-center gap-2 border-r border-gray-200 bg-gray-50 px-3 py-2.5">
          <Globe size={14} className="text-gray-400" />
          <span className="text-sm font-medium text-gray-500">linkpro.li/</span>
        </div>
        <input
          id="customSlug"
          name="customSlug"
          type="text"
          placeholder="aleatorio"
          className="flex-1 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-300"
        />
      </div>
    </div>
  );
}
