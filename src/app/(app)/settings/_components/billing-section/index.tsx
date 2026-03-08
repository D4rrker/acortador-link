import Header from '@/src/app/(app)/settings/_components/billing-section/header-billing';
import BillList from '@/src/app/(app)/settings/_components/billing-section/bill-list-billing';
import Actions from '@/src/app/(app)/settings/_components/billing-section/actions-billing';

export default function BillingSection() {
  return (
    <div className="rounded-xl border bg-white shadow-sm dark:bg-zinc-950">
      <Header />

      <div className="p-6">
        <h3 className="mb-4 text-sm font-medium text-gray-900 dark:text-gray-300">
          Facturas recientes
        </h3>

        <BillList />
        <Actions />
      </div>
    </div>
  );
}
