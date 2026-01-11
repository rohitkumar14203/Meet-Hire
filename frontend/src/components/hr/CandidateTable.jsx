import { Table } from "../ui/Table";
import { StatusBadge } from "../ui/StatusBadge";
import { Button } from "../ui/Button";
import { Mail, Briefcase, Calendar, Eye } from "lucide-react";

const columns = [
  { key: "candidate", label: "Candidate" },
  { key: "role", label: "Applied Role" },
  { key: "experience", label: "Experience" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions" },
];

export const CandidateTable = ({ candidates = [] }) => {
  return (
    <Table
      columns={columns}
      data={candidates}
      renderRow={(candidate) => (
        <tr key={candidate.id} className="border-b last:border-none hover:bg-blue-50/50 transition-colors">
          {/* Candidate */}
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                {candidate.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{candidate.name}</div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Mail className="w-3 h-3" />
                  {candidate.email}
                </div>
              </div>
            </div>
          </td>

          {/* Applied Role */}
          <td className="px-6 py-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Briefcase className="w-4 h-4 text-blue-600" />
              {candidate.role}
            </div>
          </td>

          {/* Experience */}
          <td className="px-6 py-4">
            <span className="text-gray-700">{candidate.experience || "N/A"}</span>
          </td>

          {/* Status */}
          <td className="px-6 py-4">
            <StatusBadge status={candidate.status} />
          </td>

          {/* Actions */}
          <td className="px-6 py-4">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" icon={Eye}>
                View
              </Button>

              {candidate.status !== "Rejected" && (
                <Button variant="primary" size="sm" icon={Calendar}>
                  Schedule
                </Button>
              )}
            </div>
          </td>
        </tr>
      )}
    />
  );
};
