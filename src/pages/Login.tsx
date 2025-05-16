import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success('Logged in successfully!');
      navigate('/my-events'); // redirect to user's dashboard
    } catch (err) {
      toast.error('Login failed');
      console.error(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        navigate('/my-events'); // redirect if already logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleLogin}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
