import { useState } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { Dropdown } from "../common/Dropdown";
import { Briefcase, Building2, MapPin, DollarSign, Users, Save } from "lucide-react";
import { jobTypeOptions, experienceOptions } from "../../constants/hr/JobTypeOptions";

const JobForm = ({ onSubmit, initialData = null, loading }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    location: initialData?.location || "",
    employmentType: initialData?.employmentType || "",
    experience: initialData?.experience || "",
    description: initialData?.description || "",
  });


  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Validate required fields
  const isFormValid =
    formData.title.trim() !== "" &&
    formData.location.trim() !== "" &&
    formData.employmentType !== "" &&
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

      <Input
        label="Location"
        value={formData.location}
        onChange={(e) => handleChange("location", e.target.value)}
        placeholder="e.g., New York, Remote"
        icon={MapPin}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          label="Job Type"
          options={jobTypeOptions}
          value={formData.employmentType}
          onSelect={(value) => handleChange("employmentType", value)}
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

      <div className="flex flex-col mb-4">
        <label className="mb-2 font-medium text-gray-700">Job Description</label>
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



