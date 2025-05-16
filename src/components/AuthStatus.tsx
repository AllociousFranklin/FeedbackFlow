import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthStatus = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserEmail(user?.email || null);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  if (!userEmail) return null;

  return (
    <div className="fixed top-4 right-4 bg-white dark:bg-gray-800 shadow px-4 py-2 rounded-lg flex items-center space-x-4">
      <span className="text-sm text-gray-700 dark:text-gray-300">
        Logged in as <strong>{userEmail}</strong>
      </span>
      <button
        onClick={handleLogout}
        className="text-red-600 text-sm hover:underline"
      >
        Logout
      </button>
    </div>
  );
};

export default AuthStatus;

