export const Checkbox = ({ label, checked, onChange, ...props }) => {
    return (
        <div className="flex items-center mb-4">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                {...props}
            />
            {label && <label className="ml-2 text-sm">{label}</label>}
        </div>
    )
}