import { ChevronDown } from "lucide-react";

export const Dropdown = ({ options, onSelect, label, value, placeholder = "Select an option" }) => {
    return (
        <div className="flex flex-col mb-4">
            {label && <label className="mb-2 font-medium text-gray-700">{label}</label>}
            <div className="relative">
                <select
                    value={value}
                    className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white hover:border-blue-300 transition-all duration-200 cursor-pointer"
                    onChange={(e) => onSelect(e.target.value)}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
        </div>
    )
}