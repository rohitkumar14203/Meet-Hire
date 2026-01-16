import { FileX } from "lucide-react";

export const Table = ({ columns = [], data = [], renderRow, emptyMessage = "No data found" }) => {
  return (
    <div className="bg-white rounded-xl border border-blue-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-6 py-4 font-semibold text-blue-900 uppercase text-xs tracking-wider"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-blue-50">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-12"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="bg-blue-50 rounded-full p-4">
                      <FileX className="w-8 h-8 text-blue-300" />
                    </div>
                    <p className="text-gray-500 font-medium">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : renderRow ? (
              data.map(renderRow)
            ) : (
              data.map((row, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-blue-50/50 transition-colors duration-150"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 text-gray-700">
                      {col.render
                        ? col.render(row[col.key], row)
                        : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
