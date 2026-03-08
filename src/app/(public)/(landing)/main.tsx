import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import CsCard from '@/src/components/custom/Card';
import { advantage, type Advantage } from '@/src/const/advantage';

export default function Main() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-white text-slate-900">
      <main className="flex-1">
        <section className="relative flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center md:pt-40 md:pb-32">
          <h1 className="mx-auto max-w-5xl text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl">
            Acorta tus enlaces y sigue sus clics en{' '}
            <span className="text-blue-900">tiempo real</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 md:text-xl">
            Enlaces cortos potentes, estadísticas privadas y control total.
            Regístrate gratis y empieza a medir tus campañas, redes y links.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              title="Empezar gratis"
              className="rounded-md bg-blue-950 px-8 py-6 text-base font-medium text-white shadow-sm transition-all hover:bg-blue-900"
            >
              <Link href="/sign-up">Empezar gratis</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-md border-slate-300 bg-white px-8 py-6 text-base font-medium text-slate-700 transition-all hover:bg-slate-50"
            >
              <Link href="/login">Iniciar sesión</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            No requiere tarjeta de crédito.
          </p>
        </section>

        <section className="border-t border-slate-100 bg-slate-50 px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantage &&
              advantage.map((v: Advantage, index: number) => (
                <CsCard
                  key={index}
                  className="flex flex-col justify-start gap-5 p-8 text-start"
                >
                  <div className="w-fit rounded-lg bg-blue-50 p-3">
                    <v.icon className="h-6 w-6 text-blue-900" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-slate-600">
                    {v.description}
                  </p>
                </CsCard>
              ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
        <div className="flex items-center justify-center gap-4">
          <Link href="#" className="transition-colors hover:text-blue-900">
            Política de privacidad
          </Link>
          <span>•</span>
          <Link href="#" className="transition-colors hover:text-blue-900">
            Contacto
          </Link>
        </div>
      </footer>
    </div>
  );
}
