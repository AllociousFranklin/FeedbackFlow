import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Send, Star } from 'lucide-react';
import { getEvent, saveFeedback } from '../utils/storage';
import { generateId } from '../utils/helpers';

const FeedbackForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (id) {
      const foundEvent = getEvent(id);
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        toast.error('Event not found');
        navigate('/');
      }
    }
  }, [id, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    if (!id) return;
    
    // Create feedback object
    const feedback = {
      id: generateId(),
      eventId: id,
      rating,
      comment,
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    saveFeedback(feedback);
    
    // Show success and reset form
    setSubmitted(true);
    toast.success('Feedback submitted successfully!');
  };

  if (!event) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading event details...</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
          <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Send size={28} />
          </div>
          <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your feedback has been submitted anonymously and will help improve future events.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Please share your anonymous feedback
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label className="block text-sm font-medium mb-4">
              How would you rate this event?
            </label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className="focus:outline-none transition"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoveredRating(value)}
                  onMouseLeave={() => setHoveredRating(null)}
                >
                  <Star
                    size={32}
                    fill={value <= (hoveredRating || rating) ? "#FBBF24" : "none"}
                    color={value <= (hoveredRating || rating) ? "#FBBF24" : "#CBD5E1"}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              Additional Comments (Optional)
            </label>
            <textarea
              id="comment"
              rows={4}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="Share your thoughts about the event..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition duration-300"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
