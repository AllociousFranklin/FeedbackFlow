import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Star } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import toast from 'react-hot-toast';
import { getEvent, getEventFeedback, Event, Feedback } from '../utils/storage';
import { formatDate, getRatingStats } from '../utils/helpers';

const Dashboard = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [stats, setStats] = useState<{ average: number, distribution: number[] }>({
    average: 0,
    distribution: [0, 0, 0, 0, 0]
  });

  useEffect(() => {
    const loadData = async () => {
      const foundEvent = await getEvent(id || '');
      if (foundEvent) {
        setEvent(foundEvent);

        const eventFeedback = await getEventFeedback(id || '');
        setFeedback(eventFeedback);

        const ratings = eventFeedback.map((f: Feedback) => f.rating);
        setStats(getRatingStats(ratings));
      } else {
        toast.error('Event not found');
      }
    };

    loadData();
  }, [id]);

  if (!event) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const distributionData = stats.distribution.map((count, index) => ({
    rating: (index + 1).toString(),
    count
  }));

  const pieData = stats.distribution.map((count, index) => ({
    name: `${index + 1} Stars`,
    value: count
  }));

  const COLORS = ['#FE4A49', '#FED766', '#2AB7CA', '#4A8FE7', '#1CBE59'];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <Link to={`/event/${id}`} className="flex items-center text-indigo-600 hover:text-indigo-800 transition">
          <ArrowLeft size={16} className="mr-2" />
          <span>Back to Event</span>
        </Link>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{event.title} - Feedback Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mr-4">
            <MessageSquare size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Responses</p>
            <p className="text-2xl font-bold">{feedback.length}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg mr-4">
            <Star size={24} className="text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Average Rating</p>
            <p className="text-2xl font-bold">
              {stats.average.toFixed(1)} <span className="text-sm text-gray-500 dark:text-gray-400">/ 5</span>
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Event Date</p>
          <p className="text-lg font-medium">{formatDate(event.date)}</p>
        </div>
      </div>

      {feedback.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Rating Distribution</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={distributionData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="rating" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6366F1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Ratings Breakdown</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Recent Comments</h2>
            <div className="space-y-4">
              {feedback.filter(f => f.comment.trim() !== '').length > 0 ? (
                feedback
                  .filter(f => f.comment.trim() !== '')
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map(item => (
                    <div key={item.id} className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="flex space-x-1 mr-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              fill={i < item.rating ? "#FBBF24" : "none"}
                              color={i < item.rating ? "#FBBF24" : "#CBD5E1"}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{item.comment}</p>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 py-4">
                  No comments have been submitted yet.
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            No feedback has been collected yet for this event.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Share your QR code or feedback link with attendees to start collecting responses.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
