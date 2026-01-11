import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Dropdown } from "../../components/ui/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Briefcase, UserPlus } from "lucide-react";

export const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const roleOptions = [
        { value: "hr", label: "HR Manager" },
        { value: "interviewer", label: "Interviewer" },
        { value: "candidate", label: "Candidate" },
    ];

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error for this field
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
        
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        
        if (!formData.role) newErrors.role = "Please select a role";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isFormValid = 
        formData.name.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.password.trim() !== "" &&
        formData.confirmPassword.trim() !== "" &&
        formData.role !== "" &&
        formData.password === formData.confirmPassword;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert("Signup successful! (Demo mode)");
            navigate("/login");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
            <div className="w-full max-w-md">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg mb-4">
                        <Briefcase className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Meet Hire</h1>
                    <p className="text-gray-600 mt-2">Create your account</p>
                </div>

                {/* Signup Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 space-y-6"
                >
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Started</h2>
                        <p className="text-gray-600 text-sm">Fill in your details to create an account</p>
                    </div>

                    <Input
                        label="Full Name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        icon={User}
                        error={errors.name}
                        required
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        icon={Mail}
                        error={errors.email}
                        required
                    />

                    <Dropdown
                        label="Select Role"
                        options={roleOptions}
                        value={formData.role}
                        onSelect={(value) => handleChange("role", value)}
                        placeholder="Choose your role"
                    />
                    {errors.role && <p className="text-red-600 text-sm -mt-3">{errors.role}</p>}

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        icon={Lock}
                        error={errors.password}
                        helperText="Must be at least 6 characters"
                        required
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="Re-enter your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                        icon={Lock}
                        error={errors.confirmPassword}
                        required
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        loading={loading}
                        disabled={!isFormValid || loading}
                        icon={UserPlus}
                        className="w-full"
                    >
                        Create Account
                    </Button>

                    <div className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};