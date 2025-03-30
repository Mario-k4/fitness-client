import { useParams, useNavigate } from "react-router-dom";
import { useWorkout } from "../context/WorkoutContext";
import { useState } from "react";

export default function ExerciseDetailPage() {
    const { workout, updateExercise } = useWorkout();
    const { exerciseId } = useParams();
    const navigate = useNavigate();

    const exercise = workout?.exercises?.find((ex) => ex.id === exerciseId);
    const [sets, setSets] = useState(exercise?.sets || 3);
    const [reps, setReps] = useState(exercise?.reps || 10);
    const [weight, setWeight] = useState(exercise?.weight || 0);

    const handleSave = () => {
        if (sets <= 0 || reps <= 0 || weight < 0) {
            alert("Please enter valid values for sets, reps, and weight.");
            return;
        }
        updateExercise(exerciseId!, { sets, reps, weight });
        navigate("/workout-overview");
    };

    if (!exercise) {
        return <div>Exercise not found</div>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>{exercise.name}</h1>
            <div style={{ marginBottom: "10px" }}>
                <label>Sets: </label>
                <input
                    type="number"
                    value={sets}
                    onChange={(e) => setSets(Number(e.target.value))}
                    min="1"
                />
            </div>
            <div style={{ marginBottom: "10px" }}>
                <label>Reps: </label>
                <input
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(Number(e.target.value))}
                    min="1"
                />
            </div>
            <div style={{ marginBottom: "10px" }}>
                <label>Weight: </label>
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    min="0"
                />
            </div>
            <button onClick={handleSave} style={{ marginTop: "10px" }}>
                Save
            </button>
        </div>
    );
}
