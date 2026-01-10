import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white rounded-lg shadow p-6 space-y-5"
            >
                <h2 className="text-2xl font-semibold text-center">
                    Login to Interview Scheduler
                </h2>

                <Input
                    label="Email"
                    type="email"
                    placeholder="you@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && (
                    <p className="text-red-500 text-sm text-center">
                        {error}
                    </p>
                )}

                <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                    className="w-full"
                >
                    Login
                </Button>

                <p className="text-sm text-center text-gray-600">
                    Don’t have an account?{" "}
                    <span className="text-primary cursor-pointer">
                        <button onClick={() => navigate("/signup")}>Signup</button>
                    </span>
                </p>
            </form>
        </div>
    );
}
