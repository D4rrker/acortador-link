export default function Header() {
  return (
    <div className="flex items-start justify-between border-b p-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50">
          Facturación
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Historial de pagos y gestión de suscripción.
        </p>
      </div>
      <span className="shrink-0 rounded bg-emerald-50 px-2.5 py-1 text-[10px] font-bold tracking-widest text-emerald-600">
        PLAN PRO
      </span>
    </div>
  );
}
