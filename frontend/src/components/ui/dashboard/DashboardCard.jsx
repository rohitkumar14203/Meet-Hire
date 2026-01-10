export const DashboardCard = ({ title, value, subtitle }) => {
    return (
        <>
            <div className="bg-white shadow rounded-lg p-6 shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500">{title}</p>
                <h3 className="text-2xl font-semibold mt-1">{value}</h3>
                {subtitle && <p className="text-sm text-gray-400 mt-2">{subtitle}</p>}
            </div>
        </>
    )
}