import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn, Briefcase } from "lucide-react";

export default function Login() {
    const { login, loading, error, isAuthenticated, authChecked } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isFormValid = email.trim() !== "" && password.trim() !== "";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            login({ email, password });
        }
    };

    useEffect(() => {
        if (authChecked && isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, authChecked, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
            <div className="w-full max-w-md">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg mb-4">
                        <Briefcase className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Meet Hire</h1>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>

                {/* Login Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 space-y-6"
                >
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
                        <p className="text-gray-600 text-sm">Enter your credentials to continue</p>
                    </div>

                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={Mail}
                        required
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={Lock}
                        required
                    />

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                            />
                            <span className="text-gray-600">Remember me</span>
                        </label>
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                            Forgot password?
                        </a>
                    </div>

                    {error && !isAuthenticated && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        loading={loading}
                        disabled={!isFormValid || loading}
                        icon={LogIn}
                        className="w-full"
                    >
                        Sign In
                    </Button>

                    <div className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                            Sign up
                        </Link>
                    </div>
                </form>

                {/* Demo Credentials */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm">
                    <p className="font-semibold text-blue-900 mb-2">👤 Demo Credentials:</p>
                    <p className="text-blue-700">Email: <code className="bg-white px-2 py-1 rounded">hr@test.com</code></p>
                    <p className="text-blue-700">Password: <code className="bg-white px-2 py-1 rounded">anything</code></p>
                </div>
            </div>
        </div>
    );
}
