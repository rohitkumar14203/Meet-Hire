import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

const JobForm = ({ onSubmit, initialData = {}, loading }) => {
    const [title, setTitle] = useState(initialData.title || "");
    const [department, setDepartment] = useState(initialData.department || "");
    const [location, setLocation] = useState(initialData.location || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, department, location });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <Input
                label="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
            />

            <Input
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
            />

            <div className="flex justify-end gap-3 pt-4">
                <Button type="submit" variant="primary" loading={loading}>
                    Save Job
                </Button>
            </div>
        </form>
    );
};

export default JobForm;
