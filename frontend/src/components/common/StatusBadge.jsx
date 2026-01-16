import { Clock, CheckCircle2, XCircle, AlertCircle, Calendar, UserCheck, HourglassIcon, Ban } from "lucide-react";

const statusConfig = {
    Scheduled: { 
        bg: "bg-blue-50", 
        text: "text-blue-700", 
        border: "border-blue-200",
        icon: Calendar 
    },
    Completed: { 
        bg: "bg-green-50", 
        text: "text-green-700", 
        border: "border-green-200",
        icon: CheckCircle2 
    },
    Cancelled: { 
        bg: "bg-red-50", 
        text: "text-red-700", 
        border: "border-red-200",
        icon: XCircle 
    },
    Pending: { 
        bg: "bg-amber-50", 
        text: "text-amber-700", 
        border: "border-amber-200",
        icon: Clock 
    },
    "In Progress": { 
        bg: "bg-blue-50", 
        text: "text-blue-700", 
        border: "border-blue-200",
        icon: HourglassIcon 
    },
    Shortlisted: { 
        bg: "bg-green-50", 
        text: "text-green-700", 
        border: "border-green-200",
        icon: UserCheck 
    },
    Rejected: { 
        bg: "bg-red-50", 
        text: "text-red-700", 
        border: "border-red-200",
        icon: Ban 
    },
};

export const StatusBadge = ({ status }) => {
    const config = statusConfig[status] || { 
        bg: "bg-gray-50", 
        text: "text-gray-700", 
        border: "border-gray-200",
        icon: AlertCircle 
    };
    
    const Icon = config.icon;
    
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
            <Icon className="w-3.5 h-3.5" />
            {status}
        </span>
    );
}