import { useEffect, useState } from "react";
import LeadsTable from "./components/LeadsTable";
import LeadDetail from "./components/LeadDetail";
import Opportunities from "./components/OpportunitiesList";
import type { Lead, Opportunity } from "./types";
import Loading from "./components/UI/Loading";

function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetch("/leads.json")
        .then((res) => res.json())
        .then((data) => setLeads(data))
        .catch(() => alert("Erro ao carregar leads"))
        .finally(() => setLoading(false));
    }, 800);
  }, []);

  const convertLead = (lead: Lead) => {
    const opportunitie: Opportunity = {
      id: String(Date.now()),
      name: lead.name,
      stage: "Prospecting",
      accountName: lead.company,
    };
    setOpportunities((prev) => [...prev, opportunitie]);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        {loading ? (
          <Loading />
        ) : (
          <>
            <h1 className="font-semibold">Seller Console</h1>
            <LeadsTable
              leads={leads}
              onSelectLead={setSelectedLead}
            />
            <Opportunities opportunities={opportunities} />
          </>
        )}
      </div>

      {selectedLead && (
        <LeadDetail
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onSave={(updated) =>
            setLeads((prev) =>
              prev.map((lead) => (lead.id === updated.id ? updated : lead))
            )
          }
          onConvert={convertLead}
        />
      )}
    </div>
  );
}

export default App;
