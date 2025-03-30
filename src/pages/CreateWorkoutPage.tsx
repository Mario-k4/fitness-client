import { useState } from "react";
import { useWorkout } from "../context/WorkoutContext";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

export default function CreateWorkoutPage() {
    const { setWorkout } = useWorkout();
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    const handleCreateWorkout = async () => {
        if (!title.trim()) return;

        try {
            const response = await apiClient.post("/workouts/create-workout", { title });

            if (response.status !== 201) {
                throw new Error("Failed to create workout");
            }

            const createdWorkout = response.data; // ✅ Get correct workout from backend
            setWorkout(createdWorkout); // ✅ Use backend-generated ID
            navigate("/select-exercises");
        } catch (error) {
            console.error("Error creating workout:", error);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Workout</h1>
            <input
                type="text"
                placeholder="Workout Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-80 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
            />
            <button
                onClick={handleCreateWorkout}
                className="w-80 bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            >
                Next
            </button>
        </div>
    )
}