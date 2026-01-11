import { Loader2 } from "lucide-react";

export const Loader = ({ size = "md", text = "Loading..." }) => {
    const sizeClasses = {
        sm: "w-6 h-6",
        md: "w-10 h-10",
        lg: "w-16 h-16",
    };

    return (
        <div className="flex flex-col items-center justify-center h-full py-12 gap-4">
            <div className="relative">
                <div className={`${sizeClasses[size]} rounded-full border-4 border-blue-100`}></div>
                <Loader2 className={`${sizeClasses[size]} text-blue-600 animate-spin absolute top-0 left-0`} />
            </div>
            {text && <p className="text-blue-600 font-medium">{text}</p>}
        </div>
    );
}