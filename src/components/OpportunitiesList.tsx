import type { Opportunity } from "../types";

interface OpportunitiesList {
  opportunities: Opportunity[];
}

export default function OpportunitiesList({ opportunities }: OpportunitiesList) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold mb-2">Opportunities</h2>

      {/* Mobile: cards */}
      <div className="sm:hidden space-y-3">
        {opportunities.length === 0 ? (
          <p className="text-gray-500 text-sm">No opportunities created.</p>
        ) : (
          opportunities.map((opp) => (
            <div key={opp.id} className="rounded-xl border p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{opp.name}</h3>
                <span className="text-xs rounded-full bg-gray-100 px-2 py-1">
                  {opp.stage}
                </span>
              </div>
              <p className="text-sm text-gray-600">{opp.accountName}</p>
              <div className="mt-2 text-xs text-gray-500">
                <span className="font-mono">#{opp.id}</span>
                {typeof opp.amount === "number" && (
                  <span className="ml-3">Amount: R$ {opp.amount.toLocaleString()}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop: tabela */}
      <div className="hidden sm:block">
        {opportunities.length === 0 ? (
          <p className="text-gray-500 text-md">No opportunities created.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Stage</th>
                  <th className="p-3">Account</th>
                  <th className="p-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {opportunities.map((opp) => (
                  <tr key={opp.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono">{opp.id}</td>
                    <td className="p-3">{opp.name}</td>
                    <td className="p-3">{opp.stage}</td>
                    <td className="p-3">{opp.accountName}</td>
                    <td className="p-3">
                      {typeof opp.amount === "number" ? `R$ ${opp.amount.toLocaleString()}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
