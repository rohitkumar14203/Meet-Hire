export const Input = ({ label, type = "text", value, onChange, placeholder, error, ...props }) => {
    return (
        <div className="flex flex-col mb-4">
            {label && <label className="mb-2 font-medium">{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${error ? "border-danger" : "border-gray-300"}`}
                {...props}
            />
            {error && <span className="text-danger text-sm mt-1">{error}</span>}
        </div>
    )
}