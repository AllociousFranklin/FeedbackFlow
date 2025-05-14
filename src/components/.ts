await sendFeedback("Great event!", 5);
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const snapshot = await getDocs(collection(db, 'feedbacks'));
snapshot.forEach(doc => {
  console.log(doc.id, '=>', doc.data());
});
