import type { BtnTheme } from '@/src/app/(app)/settings/_types/index';

export default function ButtonTheme({ theme, setTheme, data }: BtnTheme) {
  const { Icon, defaultBg, name, themeLocal } = data;
  return (
    <button
      suppressHydrationWarning
      onClick={() => setTheme(themeLocal)}
      className={`flex cursor-pointer flex-col items-center overflow-hidden rounded-xl border-2 transition-all hover:border-gray-300 dark:bg-zinc-800 ${
        theme === themeLocal
          ? 'border-gray-400 ring-1 ring-gray-400'
          : 'border-zinc-200 dark:border-zinc-600'
      }`}
    >
      <div className="flex h-32 w-full items-center justify-center bg-gray-50 p-2 dark:bg-zinc-800">
        <div
          className={`${defaultBg} flex h-full w-full items-center justify-center rounded-lg border shadow-sm`}
        >
          <Icon size={24} className="text-gray-400" />
        </div>
      </div>
      <div className="w-full p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-100">
        {name}
      </div>
    </button>
  );
}
