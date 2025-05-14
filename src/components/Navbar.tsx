import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';


const Navbar = () => {
  return (
    <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-indigo-600 text-white p-1.5 rounded-md">
              <MessageSquare size={20} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              FeedbackFlow
            </span>
          </Link>
          
          <div className="flex space-x-4">
            <Link 
              to="/create" 
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              Create Event
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;