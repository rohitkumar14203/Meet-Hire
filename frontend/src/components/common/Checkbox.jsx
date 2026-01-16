export const Checkbox = ({ label, checked, onChange, ...props }) => {
    return (
        <div className="flex items-center mb-4">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
                {...props}
            />
            {label && (
                <label className="ml-3 text-sm font-medium text-gray-700 cursor-pointer select-none">
                    {label}
                </label>
            )}
        </div>
    )
}