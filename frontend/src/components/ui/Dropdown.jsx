export const Dropdown = ({ options, onSelect, label }) => {
    return (
        <div className="flex flex-col mb-4">

            {label && <label className="mb-2 font-medium">{label}</label>}
            <select
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary border-gray-300"
                onChange={(e) => onSelect(e.target.value)}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}