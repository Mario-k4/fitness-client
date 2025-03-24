import { useNavigate } from 'react-router-dom';
import Register from '../components/Register';

const RegisterUser = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Register
        onSuccess={(msg) => {
          alert(msg);
          navigate('/login');
        }}
        onError={(msg) => alert(msg)}
      />
    </div>
  );
};

export default RegisterUser;
