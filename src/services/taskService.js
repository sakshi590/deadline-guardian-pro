


import { db } from "../firebase/firebase";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

/* ===================================================
   Collection Reference
=================================================== */

const taskCollection = (uid) =>
  collection(db, "users", uid, "tasks");

/* ===================================================
   Add Task
=================================================== */

export const addTask = async (uid, task) => {
  const data = {
    ...task,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  delete data.id;

  return await addDoc(taskCollection(uid), data);
};

/* ===================================================
   Update Task
=================================================== */

export const updateTask = async (
  uid,
  taskId,
  updates
) => {
  const ref = doc(
    db,
    "users",
    uid,
    "tasks",
    taskId
  );

  const data = {
    ...updates,
    updatedAt: serverTimestamp(),
  };

  delete data.id;
  delete data.createdAt;

  return await updateDoc(ref, data);
};

/* ===================================================
   Delete Task
=================================================== */

export const deleteTask = async (
  uid,
  taskId
) => {
  const ref = doc(
    db,
    "users",
    uid,
    "tasks",
    taskId
  );

  return await deleteDoc(ref);
};

/* ===================================================
   Get Single Task
=================================================== */

export const getTask = async (
  uid,
  taskId
) => {
  const ref = doc(
    db,
    "users",
    uid,
    "tasks",
    taskId
  );

  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
};

/* ===================================================
   Real-time Listener
=================================================== */

export const listenTasks = (
  uid,
  callback,
  onError
) => {
  const q = query(
    taskCollection(uid),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const tasks = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));

      callback(tasks);
    },
    (error) => {
      console.error(error);

      if (onError) {
        onError(error);
      }
    }
  );
};

