import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Event } from '../utils/storage';
import { formatDate } from '../utils/helpers';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

const MyEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchEvents = async () => {
      const q = query(collection(db, 'events'), where('userId', '==', user.uid));
      const snapshot = await getDocs(q);
      const userEvents = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Event)
      );
      setEvents(userEvents);
    };

    fetchEvents();
  }, [navigate, user]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">My Events</h1>

      {events.length === 0 ? (
        <p className="text-gray-600">You haven't created any events yet.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Date: {formatDate(event.date)}
              </p>
              <div className="flex space-x-4">
                <Link
                  to={`/event/${event.id}`}
                  className="text-indigo-600 hover:underline"
                >
                  View QR Code
                </Link>
                <Link
                  to={`/dashboard/${event.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View Dashboard
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
