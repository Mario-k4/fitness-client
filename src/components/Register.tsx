import { useState } from "react";
import { registerUser } from "../services/registerUserService";

interface RegisterProps {
    onSuccess?: (message: string) => void;
    onError?: (message: string) => void;
}

function Register({ onSuccess, onError }: RegisterProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await registerUser(name, email, password);

            onSuccess && onSuccess("User created successfully!");

            setEmail("");
            setPassword("");
            setName("");
        } catch (err) {
            onError && onError("Failed to create user. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-sm shadow-md w-96">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Create User</h2>

            <div className="mb-4">
                <label className="block text-gray-600 text-sm font-medium mb-1">Name</label>
                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-400 rounded-sm p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-600 text-sm font-medium mb-1">Email</label>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-400 rounded-sm p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-600 text-sm font-medium mb-1">Password</label>
                <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-400 rounded-sm p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-500 text-white py-2 rounded-sm font-semibold hover:bg-blue-600 transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                {loading ? "Creating..." : "Create User"}
            </button>
        </form>
    );
};

export default Register;
