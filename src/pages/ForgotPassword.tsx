import { useState } from 'react';
import { forgotPassword } from '../services/forgotPasswordService';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await forgotPassword(email);
      setMessage('A password reset link has been sent to your email.');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-sm shadow-md w-96 relative">
        <button
          onClick={() => navigate('/login')}
          className="absolute left-4 top-7 text-gray-600 hover:text-gray-800"
        >
          <IoArrowBack size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Reset Password</h2>

        {message && <p className="text-green-500 text-sm text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <label className="block text-gray-600 text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-sm p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 mt-4 rounded-sm font-semibold hover:bg-blue-600 transition"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
