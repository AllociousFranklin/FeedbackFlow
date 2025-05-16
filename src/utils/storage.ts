import { db, auth } from '../firebase'; // ✅ include auth
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  query,
  where
} from 'firebase/firestore';

// Types
export interface Event {
  id?: string;
  title: string;
  description: string;
  date: string;
  createdAt: string;
  userId?: string; // ✅ add this
}

export interface Feedback {
  id?: string;
  eventId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// -----------------------------
// Events
// -----------------------------

export const saveEvent = async (event: Omit<Event, 'id'>): Promise<string> => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated'); // ✅ ensure user is logged in

  const docRef = await addDoc(collection(db, 'events'), {
    ...event,
    userId: user.uid, // ✅ attach userId to event
    createdAt: new Date().toISOString(),
  });

  return docRef.id;
};

export const getEvent = async (id: string): Promise<Event | null> => {
  const docRefRef = doc(db, 'events', id);
  const docSnap = await getDoc(docRefRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Event : null;
};

export const getEvents = async (): Promise<Event[]> => {
  const snapshot = await getDocs(collection(db, 'events'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
};

// -----------------------------
// Feedback
// -----------------------------

export const saveFeedback = async (feedback: Omit<Feedback, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'feedback'), {
    ...feedback,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
};

export const getFeedback = async (): Promise<Feedback[]> => {
  const snapshot = await getDocs(collection(db, 'feedback'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Feedback));
};

export const getEventFeedback = async (eventId: string): Promise<Feedback[]> => {
  const q = query(collection(db, 'feedback'), where('eventId', '==', eventId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Feedback));
};
