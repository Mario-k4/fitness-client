import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/loginService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleSignUp = () => {
    navigate('/create-user');
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-sm shadow-lg w-96">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Login</h2>

      {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
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
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-400 rounded-sm p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 my-2 rounded-sm font-semibold hover:bg-blue-600 transition duration-300"
      >
        Login
      </button>

      <button
        type="button"
        onClick={handleForgotPassword}
        className="w-full text-blue-500 py-2 my-2 rounded-sm font-semibold hover:underline transition duration-300"
      >
        Forgot password?
      </button>

      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-3 text-gray-500 text-sm">OR</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 border border-gray-400 text-gray-800 py-2 rounded-sm font-semibold hover:bg-gray-100 transition duration-300"
      >
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google Logo"
          className="w-5 h-5"
        />
        Login with Google
      </button>

      <button
        type="button"
        className="mt-3 w-full flex items-center justify-center gap-2 border border-gray-400 text-gray-800 py-2 rounded-sm font-semibold hover:bg-gray-100 transition duration-300"
      >
        🔑 Other Login Methods
      </button>

      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">Don't have an account?</p>
        <button
          type="button"
          onClick={handleSignUp}
          className="text-blue-500 font-semibold hover:underline transition duration-300"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}

export default Login;
