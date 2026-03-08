import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
        <Link
          href="/"
          title="Ir a la página principal"
          className="text-xl font-bold tracking-tight text-blue-950 transition-colors hover:text-blue-900"
        >
          LinkPro
        </Link>
      </div>
    </header>
  );
}
