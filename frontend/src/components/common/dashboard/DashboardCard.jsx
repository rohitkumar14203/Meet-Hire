export const DashboardCard = ({ title, value, subtitle, icon: Icon, trend, trendValue, color = "blue" }) => {
    const colorClasses = {
        blue: {
            bg: "from-blue-500 to-blue-600",
            iconBg: "bg-blue-100",
            iconText: "text-blue-600",
        },
        green: {
            bg: "from-green-500 to-green-600",
            iconBg: "bg-green-100",
            iconText: "text-green-600",
        },
        purple: {
            bg: "from-purple-500 to-purple-600",
            iconBg: "bg-purple-100",
            iconText: "text-purple-600",
        },
        amber: {
            bg: "from-amber-500 to-amber-600",
            iconBg: "bg-amber-100",
            iconText: "text-amber-600",
        },
    };

    const colors = colorClasses[color] || colorClasses.blue;

    return (
        <div className="bg-white shadow-md rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
                    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
                    {trend && (
                        <div className={`text-xs font-semibold mt-2 ${
                            trend === "up" ? "text-green-600" : "text-red-600"
                        }`}>
                            {trend === "up" ? "↑" : "↓"} {trendValue}
                        </div>
                    )}
                </div>
                {Icon && (
                    <div className={`${colors.iconBg} p-3 rounded-xl`}>
                        <Icon className={`w-6 h-6 ${colors.iconText}`} />
                    </div>
                )}
            </div>
        </div>
    )
}