import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, query, where, onSnapshot } from "firebase/firestore";

export const addTask = async (groupId, task) => {
  await addDoc(collection(db, 'groups', groupId, 'tasks'), task);
};

export const subscribeToTasks = (groupId, callback) => {
  const q = query(collection(db, 'groups', groupId, 'tasks'));
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(tasks);
  });
};
