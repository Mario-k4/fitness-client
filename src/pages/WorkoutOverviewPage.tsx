import { useEffect } from "react";
import { useWorkout } from "../context/WorkoutContext";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

export default function WorkoutOverviewPage() {
    const { workout, setWorkout } = useWorkout();
    const navigate = useNavigate();

    useEffect(() => {
        const userId = "3b10f95e-e650-4d80-9d8a-1514212d22a3"; // Replace with actual logic to get the user ID

        async function fetchWorkout() {
            try {
                const response = await apiClient.get(`/workouts/${userId}`);
                setWorkout(response.data);
                console.log("Fetched workout:", response.data);
            } catch (error) {
                console.error("Error fetching workout:", error);
            }
        }

        fetchWorkout();
    }, [setWorkout]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{workout.title || "No Workout Found"}</h1>
            <ul className="space-y-4">
                {workout.exercises?.length > 0 ? (
                    workout.exercises.map((ex) => (
                        <li
                            key={ex.id}
                            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
                        >
                            <span className="text-gray-700">
                                {ex.name} - {ex.sets} sets x {ex.reps} reps
                            </span>
                            <button
                                className="text-blue-500 hover:text-blue-700 font-medium"
                                onClick={() => navigate(`/exercise/${ex.id}`)}
                            >
                                Edit
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No exercises added yet.</p>
                )}
            </ul>
            <div className="mt-6 flex space-x-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                    onClick={() => navigate("/select-exercises")}
                >
                    Add More Exercises
                </button>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
                    onClick={() => console.log("Send workout to backend")}
                >
                    Save Workout
                </button>
            </div>
        </div>
    );
}
