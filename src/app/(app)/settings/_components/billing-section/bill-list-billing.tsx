import { Download } from 'lucide-react';

export default function BillList() {
  const invoices = [
    { id: 1, date: '15 Feb 2026', amount: '$12.00' },
    { id: 2, date: '15 Jan 2026', amount: '$12.00' },
  ];
  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full text-left text-sm text-gray-600 outline">
        <thead className="bg-gray-50 text-gray-500 dark:bg-zinc-900">
          <tr className="dark:text-gray-200">
            <th className="px-4 py-3 font-medium">Fecha</th>
            <th className="px-4 py-3 font-medium">Importe</th>
            <th className="px-4 py-3 text-right font-medium">Acción</th>
          </tr>
        </thead>
        <tbody className="divide-y bg-white dark:bg-zinc-800">
          {invoices.map((invoice) => (
            <tr
              key={invoice.id}
              className="hover:bg-gray-50 dark:hover:bg-transparent"
            >
              <td className="px-4 py-3 dark:text-gray-300">{invoice.date}</td>
              <td className="px-4 py-3 dark:text-gray-300">{invoice.amount}</td>
              <td className="flex justify-end px-4 py-3 text-right">
                <button
                  className="cursor-pointer text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  aria-label="Descargar factura"
                >
                  <Download size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
