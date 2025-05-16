import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLogin = async () => {
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

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
      navigate('/my-events'); // redirect to user's dashboard
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
      console.error(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/my-events'); // redirect if already logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-6 max-w-md mx-auto px-4">
      <button
        onClick={handleGoogleLogin}
        className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700"
      >
        Sign in with Google
      </button>

      <form onSubmit={handleEmailLogin} className="w-full space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
        >
          Sign in with Email
        </button>
      </form>
    </div>
  );
};

<p className="text-sm mt-4 text-gray-600">
  Don't have an account?{' '}
  <Link to="/register" className="text-indigo-600 hover:underline">
    Register here
  </Link>
</p>


export default Login;
