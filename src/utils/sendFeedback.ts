// src/utils/sendFeedback.ts
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function sendFeedback(message: string, rating: number) {
  await addDoc(collection(db, 'feedbacks'), {
    message,
    rating,
    submittedAt: new Date()
  });
}
