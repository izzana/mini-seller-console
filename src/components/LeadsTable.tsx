import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Lead } from "../types";

interface Props {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
}

export default function LeadsTable({ leads, onSelectLead }: Props) {
  const [search, setSearch] = useLocalStorage("lead-search", "");
  const [status, setStatus] = useLocalStorage("lead-status", "All");
  const [sortDesc, setSortDesc] = useLocalStorage("lead-sort-desc", true);

  const filtered = leads
    .filter(
      (lead) =>
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.company.toLowerCase().includes(search.toLowerCase())
    )
    .filter((lead) => (status === "All" ? true : lead.status === status))
    .sort((a, b) => (sortDesc ? b.score - a.score : a.score - b.score));

  return (
    <section className="mb-8">
      {/* Filters */}
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 py-2 mb-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            name="search"
            type="text"
            placeholder="Search for name or company"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded w-full sm:w-64"
          />
          <div className="flex gap-2">
            <select
              className="border px-3 py-2 rounded"
              name="status"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value="All">All</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
            <button
              onClick={() => setSortDesc((s) => !s)}
              className="border px-3 py-2 rounded"
              aria-label="sort score"
              title="Order by score"
              type="button"
            >
              Sort Score {sortDesc ? "↓" : "↑"}
            </button>
          </div>
        </div>
      </div>

      {/* Cards in mobile */}
      <div data-testid="leads-mobile" className="sm:hidden space-y-3">
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm">No leads found</p>
        ) : (
          filtered.map((lead) => (
            <button
              key={lead.id}
              onClick={() => onSelectLead(lead)}
              className="w-full text-left rounded-xl border p-3 shadow-sm active:scale-[0.99] transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{lead.name}</h3>
                <span className="text-xs rounded-full bg-gray-200 px-2 py-1">
                  {lead.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">{lead.company}</p>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>{lead.source}</span>
                <span className="font-semibold">Score: {lead.score}</span>
              </div>
              <p className="mt-1 text-sm text-gray-700 truncate">{lead.email}</p>
            </button>
          ))
        )}
      </div>

      {/* Table starting at sm */}
      <div data-testid="leads-desktop" className="hidden sm:block">
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-md">No leads found</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border max-h-[70vh]">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b-2">
                <tr className="text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Company</th>
                  <th className="p-3 hidden lg:table-cell">Email</th>
                  <th className="p-3">Source</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => onSelectLead(lead)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <td className="p-3">{lead.name}</td>
                    <td className="p-3">{lead.company}</td>
                    <td className="p-3 hidden lg:table-cell">{lead.email}</td>
                    <td className="p-3">{lead.source}</td>
                    <td className="p-3 font-semibold">{lead.score}</td>
                    <td className="p-3">
                      <span className="text-sm rounded-full bg-gray-200 px-2 py-1">
                        {lead.status}
                      </span>
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
