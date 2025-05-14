// Types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  createdAt: string;
}

export interface Feedback {
  id: string;
  eventId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Events
export const getEvents = (): Event[] => {
  const events = localStorage.getItem('events');
  return events ? JSON.parse(events) : [];
};

export const saveEvent = (event: Event): void => {
  const events = getEvents();
  events.push(event);
  localStorage.setItem('events', JSON.stringify(events));
};

export const getEvent = (id: string): Event | undefined => {
  const events = getEvents();
  return events.find(event => event.id === id);
};

// Feedback
export const getFeedback = (): Feedback[] => {
  const feedback = localStorage.getItem('feedback');
  return feedback ? JSON.parse(feedback) : [];
};

export const saveFeedback = (feedback: Feedback): void => {
  const feedbackItems = getFeedback();
  feedbackItems.push(feedback);
  localStorage.setItem('feedback', JSON.stringify(feedbackItems));
};

export const getEventFeedback = (eventId: string): Feedback[] => {
  const feedback = getFeedback();
  return feedback.filter(item => item.eventId === eventId);
};
