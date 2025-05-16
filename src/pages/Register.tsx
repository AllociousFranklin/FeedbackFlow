// src/pages/Register.tsx
import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Account created!');
      navigate('/my-events');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-semibold">Register</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded border dark:bg-gray-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded border dark:bg-gray-900"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
