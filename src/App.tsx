import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Main from './pages/Main';
import ForgotPassword from './pages/ForgotPassword';
import RegisterUser from './pages/RegisterUser';
import ResetPassword from './pages/ResetPassword';
import CreateWorkoutPage from './pages/CreateWorkoutPage';
import { AuthProvider } from './context/AuthContext';
import { WorkoutProvider } from './context/WorkoutContext';
import SelectExercisePage from './pages/SelectExercisesPage';
import WorkoutOverviewPage from './pages/WorkoutOverviewPage';
import ExerciseDetailPage from './pages/ExerciseDetailPage';

function App() {
  return (
    <AuthProvider>
      <WorkoutProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/create-user" element={<RegisterUser />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/create-workout" element={<CreateWorkoutPage />} />
            <Route path="/select-exercises" element={<SelectExercisePage />} />
            <Route path="/workout-overview" element={<WorkoutOverviewPage />} />
            <Route path="/workout-exercise/add-exercise-to-workout" element={<ExerciseDetailPage />} />
          </Routes>
        </Router>
      </WorkoutProvider>
    </AuthProvider>
  );
}

export default App;
