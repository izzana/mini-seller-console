import { useState } from "react";
import type { Lead } from "../types";

interface LeadDetailsProps {
  lead: Lead;
  onClose: () => void;
  onSave: (updated: Lead) => void;
  onConvert: (lead: Lead) => void;
}

export default function LeadDetail({ lead, onClose, onSave, onConvert }: LeadDetailsProps) {
  const [edited, setEdited] = useState<Lead>({ ...lead });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(edited.email)) {
      setError("Formato de e-mail inválido.");
      return;
    }
    setError(null);
    onSave(edited);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEdited({ ...lead });
    setError(null);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex sm:justify-end justify-center bg-black/40">
      {/* panel: full on mobile, 28rem on desktop */}
      <div className="h-full w-full sm:w-[28rem] bg-white shadow-xl flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-base md:text-lg font-semibold">Lead Detail</h2>
          <div className="flex items-center px-2 py-1 hover:bg-gray-200">
            <button onClick={onClose} className="text-gray-500">✕</button>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-600">Name</p>
            <p className="text-sm sm:text-base">{lead.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Company</p>
            <p className="text-sm sm:text-base">{lead.company}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600">Email</p>
            {isEditing ? (
              <input
                type="email"
                value={edited.email}
                onChange={(e) => setEdited({ ...edited, email: e.target.value })}
                className="border rounded w-full px-3 py-2"
              />
            ) : (
              <p className="text-sm sm:text-base break-all">{lead.email}</p>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <div>
            <p className="text-sm sm:text-base font-medium text-gray-600">Source</p>
            <p className="text-sm sm:text-base">{lead.source}</p>
          </div>

          <div>
            <p className="text-sm sm:text-base font-medium text-gray-600">Score</p>
            <p className="text-sm sm:text-base">{lead.score}</p>
          </div>
          <div>
            <p className="text-sm sm:text-base font-medium text-gray-600">Status</p>
            {isEditing ? (
              <select
                value={edited.status}
                onChange={(e) =>
                  setEdited({ ...edited, status: e.target.value as Lead["status"] })
                }
                className="border rounded w-full px-3 py-2"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
              </select>
            ) : (
              <span className="text-sm sm:text-base">
                {lead.status}
              </span>
            )}
          </div>
        </div>

        <div className="border-t p-3 sm:p-4 grid grid-cols-2 gap-2">
          {isEditing ? (
            <>
              <button onClick={handleCancel} className="px-3 py-2 border rounded hover:bg-gray-100">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-2 border rounded hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => onConvert(lead)}
                className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Convert Lead
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
