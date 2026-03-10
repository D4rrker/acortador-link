'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { signOutAction } from '@/src/actions/auth/actions';
import { LogOut, Command, ChevronsUpDown } from 'lucide-react';
import { useUser } from '@/src/context/UserContext';
import { type Path, paths } from '@/src/const/paths';
import { getDefaultAvatar } from '@/src/utils';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useUser();

  const { email, name, avatarUrl } = user || {};

  const definitiveAvatar = getDefaultAvatar(name, avatarUrl);

  return (
    <nav className="flex h-screen w-72 flex-col justify-between border-r border-gray-200 bg-gray-50 transition-all">
      <div className="p-4">
        <div className="flex items-center gap-2 rounded-xl px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white shadow-sm">
            <Command size={16} />
          </div>
          <span className="text-sm font-bold tracking-tight text-gray-900">
            LinkPro
          </span>
          <span className="ml-auto rounded-md bg-gray-200 px-1.5 py-0.5 text-[10px] font-medium text-gray-600">
            BETA
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 px-3">
        <ul className="flex flex-col gap-1">
          {paths.map((path: Path) => {
            const isActive = pathname === path.path;

            return (
              <li key={path.name}>
                <Link
                  href={path.path}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200'
                      : 'text-gray-500 hover:bg-gray-200/50 hover:text-gray-900'
                  }`}
                >
                  <path.icon
                    className={`h-4 w-4 transition-colors ${
                      isActive
                        ? 'text-black'
                        : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  />
                  <span>{path.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative m-3 border-t border-gray-200 pt-3">
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {isMenuOpen && (
          <div className="animate-in fade-in slide-in-from-bottom-2 absolute bottom-full left-0 z-20 mb-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
            <div className="border-b border-gray-100 bg-gray-50/50 px-4 py-2.5">
              <p className="text-xs font-medium text-gray-500">
                Conectado como
              </p>
              <p className="truncate text-xs font-bold text-gray-900">
                {email}
              </p>
            </div>
            <div className="p-1">
              <button
                onClick={() => signOutAction()}
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut size={15} />
                Cerrar sesión
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex w-full cursor-pointer items-center gap-3 rounded-xl p-2 transition-all duration-200 ${
            isMenuOpen
              ? 'bg-white shadow-sm ring-1 ring-gray-200'
              : 'hover:bg-gray-200/50'
          }`}
        >
          <Image
            src={definitiveAvatar}
            width={32}
            height={32}
            alt="Perfil"
            className="h-9 w-9 rounded-full border border-gray-200 bg-white object-cover p-0.5"
          />

          <div className="flex flex-1 flex-col overflow-hidden text-left">
            <span className="truncate text-sm font-medium text-gray-900">
              {name}
            </span>
          </div>

          <ChevronsUpDown size={14} className="text-gray-400" />
        </button>
      </div>
    </nav>
  );
}
