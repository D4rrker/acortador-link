import { type Path, paths } from '@/src/const/paths';
import Link from 'next/link';

interface NavigationLinksProps {
  pathname: string;
  setIsMobileOpen: (v: boolean) => void;
}

export default function NavigationLinks({
  pathname,
  setIsMobileOpen,
}: NavigationLinksProps) {
  return (
    <ul className="flex flex-col gap-1">
      {paths.map((path: Path) => {
        const isActive = pathname === path.path;
        return (
          <li key={path.name}>
            <Link
              href={path.path}
              onClick={() => setIsMobileOpen(false)}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200'
                  : 'text-gray-500 hover:bg-gray-200/50 hover:text-gray-900'
              }`}
            >
              <path.icon
                className={`h-4 w-4 ${isActive ? 'text-black' : 'text-gray-400 group-hover:text-gray-600'}`}
              />
              <span>{path.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
