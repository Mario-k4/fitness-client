import { useEffect, useState } from "react";
import { useWorkout } from "../context/WorkoutContext";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

export default function SelectExercisePage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [exercises, setExercises] = useState<{ id: string, name: string }[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const { addExercise, workout } = useWorkout();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiClient.get("/exercises/categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            fetchExercises(selectedCategory);
        }
    }, [selectedCategory]);

    const fetchExercises = async (category: string) => {
        try {
            const response = await apiClient.get(`/exercises/categories/${category}`);
            setExercises(response.data);
        } catch (error) {
            console.error("Error fetching exercises:", error)
        }
    }

    const handleSelectExercise = async (exercise: { id: string; name: string }) => {
        if (!workout || !workout.id) {
            alert("Workout is not properly initialized. Please refresh the page or start a new workout session.");
            return;
        }

        console.log("Selected Workout ID:", workout.id);

        try {
            const response = await apiClient.get(`/workout-exercises/${workout.id}`);
            console.log("Exercises for selected workout:", response.data);
        } catch (error) {
            console.error("Error fetching exercises for workout:", error);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Select Exercises</h1>
            {!selectedCategory ? (
                <div className="grid grid-cols-2 gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {exercises.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                            {exercises.map((ex) => (
                                <button
                                    key={ex.id}
                                    onClick={() => handleSelectExercise(ex)}
                                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                                >
                                    {ex.name}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No exercises found for {selectedCategory}</p>
                    )}
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
                        >
                            Back
                        </button>
                        <button
                            onClick={() => navigate("/workout-overview")}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}