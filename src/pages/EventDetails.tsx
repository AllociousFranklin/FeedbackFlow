import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { QRCodeSVG } from 'qrcode.react';
import { ChartBar, Download, Share2 } from 'lucide-react';
import { getEvent, getEventFeedback, Event, Feedback } from '../utils/storage';
import { formatDate } from '../utils/helpers';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [feedback, setFeedback] = useState<Feedback[]>([]);

  useEffect(() => {
    const loadEvent = async () => {
      if (!id) {
        toast.error('Invalid event ID');
        return;
      }

      const foundEvent = await getEvent(id);
      if (!foundEvent) {
        toast.error('Event not found');
        setEvent(null);
        return;
      }

      setEvent(foundEvent);

      const fb = await getEventFeedback(id);
      setFeedback(fb);
    };

    loadEvent();
  }, [id]);

  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code-canvas');
    if (!canvas) return;

    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas2 = document.createElement('canvas');
    const ctx = canvas2.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas2.width = img.width;
      canvas2.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas2.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.download = `${event?.title.replace(/\s+/g, '_')}_QR.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const copyFeedbackLink = () => {
    if (!id) return;
    const qrUrl = `https://feedbackflow-kbixj.web.app/event/${id}`;
    navigator.clipboard.writeText(qrUrl);
    toast.success('Feedback link copied to clipboard!');
  };

  if (!event) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading event details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <Link
          to={`/dashboard/${id}`}
          className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition"
        >
          <ChartBar size={18} />
          <span>View Dashboard</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Event Details</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {event.description}
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Date: {formatDate(event.date)}</p>
            <p>Created: {formatDate(event.createdAt)}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Feedback QR Code</h2>

          <div className="bg-white p-4 rounded-lg mb-4" id="qr-code-canvas">
            {id && (
              <QRCodeSVG
                id="qr-code-svg"
                value={`https://feedbackflow-kbixj.web.app/event/${id}`}
                size={200}
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="L"
                includeMargin={false}
              />
            )}
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
            Scan this QR code or share the link to collect feedback
          </div>

          <div className="flex space-x-4">
            <button
              onClick={downloadQRCode}
              className="flex items-center space-x-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              <Download size={16} />
              <span>Download</span>
            </button>

            <button
              onClick={copyFeedbackLink}
              className="flex items-center space-x-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              <Share2 size={16} />
              <span>Copy Link</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Feedback Status</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          {feedback.length > 0 ? (
            <div>
              <p className="text-2xl font-bold">{feedback.length}</p>
              <p className="text-gray-600 dark:text-gray-300">
                responses collected
              </p>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              No feedback received yet. Share your QR code to start collecting responses.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
