import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Dropdown } from "../ui/Dropdown";
import { Briefcase, Building2, MapPin, DollarSign, Users, Save } from "lucide-react";

const JobForm = ({ onSubmit, initialData = {}, loading }) => {
    const [formData, setFormData] = useState({
        title: initialData.title || "",
        department: initialData.department || "",
        location: initialData.location || "",
        salary: initialData.salary || "",
        type: initialData.type || "",
        experience: initialData.experience || "",
        description: initialData.description || "",
    });

    const jobTypeOptions = [
        { value: "full-time", label: "Full Time" },
        { value: "part-time", label: "Part Time" },
        { value: "contract", label: "Contract" },
        { value: "internship", label: "Internship" },
    ];

    const experienceOptions = [
        { value: "0-1", label: "0-1 years" },
        { value: "1-3", label: "1-3 years" },
        { value: "3-5", label: "3-5 years" },
        { value: "5+", label: "5+ years" },
    ];

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const isFormValid = 
        formData.title.trim() !== "" &&
        formData.department.trim() !== "" &&
        formData.location.trim() !== "" &&
        formData.type !== "" &&
        formData.experience !== "";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <Input
                label="Job Title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g., Senior Frontend Developer"
                icon={Briefcase}
                required
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Department"
                    value={formData.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                    placeholder="e.g., Engineering"
                    icon={Building2}
                    required
                />

                <Input
                    label="Location"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="e.g., New York, Remote"
                    icon={MapPin}
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Dropdown
                    label="Job Type"
                    options={jobTypeOptions}
                    value={formData.type}
                    onSelect={(value) => handleChange("type", value)}
                    placeholder="Select job type"
                />

                <Dropdown
                    label="Experience Required"
                    options={experienceOptions}
                    value={formData.experience}
                    onSelect={(value) => handleChange("experience", value)}
                    placeholder="Select experience"
                />
            </div>

            <Input
                label="Salary Range (Optional)"
                value={formData.salary}
                onChange={(e) => handleChange("salary", e.target.value)}
                placeholder="e.g., $80,000 - $120,000"
                icon={DollarSign}
            />

            <div className="flex flex-col mb-4">
                <label className="mb-2 font-medium text-gray-700">Job Description (Optional)</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Describe the role, responsibilities, and requirements..."
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-300 transition-all duration-200"
                />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-blue-100">
                <Button 
                    type="submit" 
                    variant="primary" 
                    loading={loading}
                    disabled={!isFormValid || loading}
                    icon={Save}
                >
                    Save Job
                </Button>
            </div>
        </form>
    );
};

export default JobForm;
