import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { saveEvent } from '../utils/storage';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim() || !formData.description.trim() || !formData.date) {
      toast.error('Please fill all required fields');
      return;
    }

    const newEvent = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      createdAt: new Date().toISOString()
    };

    try {
      const eventId = await saveEvent(newEvent); // ✅ Save to Firestore
      toast.success('Event created successfully!');
      navigate(`/event/${eventId}`); // ✅ Redirect using Firebase ID
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Failed to create event. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Event</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Event Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="Conference, Workshop, Meeting..."
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="date" className="block text-sm font-medium mb-2">
              Event Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <input
                type="date"
                id="date"
                name="date"
                className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Event Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="Provide details about your event..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition duration-300"
            >
              Create Event & Generate QR Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
