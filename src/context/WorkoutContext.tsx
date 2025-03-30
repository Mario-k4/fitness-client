import { useState, createContext, useContext } from 'react';

interface WorkoutExercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

interface Workout {
  id: string;
  title: string;
  exercises: WorkoutExercise[];
}

interface WorkoutContextType {
  workout: Workout;
  setWorkout: (workout: Workout) => void;
  addExercise: (exercise: WorkoutExercise) => void;
  updateExercise: (exerciseId: string, updateExercise: Partial<WorkoutExercise>) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [workout, setWorkout] = useState<Workout>({ id: '', title: '', exercises: [] }); // Initialize id

  const addExercise = (exercise: WorkoutExercise) => {
    setWorkout((prev) => {
      console.log('Previous Workout:', prev);
      console.log('New Exercise:', exercise);
      return { ...prev, exercises: [...prev.exercises, exercise] };
    });
  };

  const updateExercise = (exerciseId: string, updateExercise: Partial<WorkoutExercise>) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((exercise) =>
        exercise.id === exerciseId ? { ...exercise, ...updateExercise } : exercise
      ),
    }));
  };

  return (
    <WorkoutContext.Provider value={{ workout, setWorkout, addExercise, updateExercise }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};
