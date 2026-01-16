/**
 * Card Component - Flexible container for content
 * Usage:
 * <Card>
 *   <CardHeader title="User Profile" subtitle="Manage your account" />
 *   <CardContent>...</CardContent>
 *   <CardFooter>...</CardFooter>
 * </Card>
 */
export const Card = ({ children, className = "", hover = false }) => {
  return (
    <div 
      className={`bg-white rounded-xl border border-blue-100 shadow-sm ${
        hover ? "hover:shadow-md transition-shadow duration-200" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle, action, className = "" }) => {
  return (
    <div className={`px-6 py-4 border-b border-blue-100 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
};

export const CardContent = ({ children, className = "" }) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = "" }) => {
  return (
    <div className={`px-6 py-4 border-t border-blue-100 bg-blue-50/30 rounded-b-xl ${className}`}>
      {children}
    </div>
  );
};
