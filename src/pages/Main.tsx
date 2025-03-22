import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/logoutService";
import { useAuth } from "../context/AuthContext";

const Main = () => {
    const [userName] = useState("Mario");
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-md p-5 flex flex-col justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Fitness App</h1>
                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/" className="block text-gray-700 hover:text-blue-500">🏠 Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/workouts" className="block text-gray-700 hover:text-blue-500">💪 Workouts</Link>
                            </li>
                            <li>
                                <Link to="/progress" className="block text-gray-700 hover:text-blue-500">📊 Progress</Link>
                            </li>
                            <li>
                                <Link to="/settings" className="block text-gray-700 hover:text-blue-500">⚙️ Settings</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <button
                    onClick={handleLogout}
                    className="mt-6 bg-red-500 text-white py-2 w-full rounded-lg hover:bg-red-600 transition"
                >
                    🚪 Logout
                </button>
            </aside>

            <main className="flex-1 p-6">
                <h2 className="text-3xl font-semibold text-gray-900">Welcome, {userName}! 👋</h2>

                <section className="mt-6 bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Today's Workout</h3>
                    <p className="text-gray-600">You have a 45-minute strength training session scheduled.</p>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                        Start Workout
                    </button>
                </section>

                <section className="mt-6 bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Progress Overview</h3>
                    <p className="text-gray-600">You've burned 1,200 calories this week! Keep going! 🔥</p>
                </section>

                <section className="mt-6 flex gap-4">
                    <button className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition">
                        📆 Schedule Workout
                    </button>
                    <button className="flex-1 bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition">
                        📖 View History
                    </button>
                </section>
            </main>
        </div>
    );
};

export default Main;
