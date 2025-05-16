import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChartBar, Clock, QrCode, ShieldCheck } from 'lucide-react';
import { getEvents, Event } from '../utils/storage';
import { formatDate } from '../utils/helpers';

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await getEvents();
      setEvents(allEvents);
    };
  
    fetchEvents();
  }, []);
  

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-20 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
          FeedbackFlow
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          Collect anonymous feedback instantly through QR codes at your events.
          Simple, real-time, and insightful.
        </p>
        
        <div className="flex justify-center">
          <Link
            to="/create"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Create Your First Event
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
        <div className="flex flex-col items-center text-center">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-xl mb-4">
            <QrCode size={32} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">QR Code Simplicity</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Generate unique QR codes for each event that attendees can scan to provide instant feedback.
          </p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-xl mb-4">
            <Clock size={32} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Real-time Insights</h3>
          <p className="text-gray-600 dark:text-gray-400">
            See feedback as it arrives in your dashboard. No waiting or manual collection needed.
          </p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-xl mb-4">
            <ShieldCheck size={32} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Complete Anonymity</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Attendees feel secure sharing honest opinions with our anonymous feedback system.
          </p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-xl mb-4">
            <ChartBar size={32} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Actionable Analytics</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Turn feedback into insights with visual analytics that help improve your future events.
          </p>
        </div>
      </div>

      {events.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Your Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <Link
                key={event.id}
                to={`/event/${event.id}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition p-6"
              >
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  {formatDate(event.date)}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {event.description}
                </p>
                <div className="flex justify-end">
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
