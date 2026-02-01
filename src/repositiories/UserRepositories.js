import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  serverTimestamp
} from "firebase/firestore";
import { signOut } from "firebase/auth";

import { db,auth } from "../firebase.jsx";
import { login, register} from "../services/EmailAndPasswordAuth.jsx";
const col = () => ref(database, 'users');

export async function addUser(data) {
  const docRef = await addDoc(col(), data);
  return docRef.id;
}


// create/update with known id
export async function saveUser(id, data) {
  await setDoc(doc(db, "users", id), data);
}

// partial update
export async function updateUser(id, partial) {
  await updateDoc(doc(db, "users", id), partial);
}

// read one
export async function getUser(id) {
  const snap = await getDoc(doc(db, "users", id));
  return snap.exists() ? snap.data() : null;
}

// read all
export async function listUsers() {
  const snap = await getDocs(col());

  return snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function countUsers() {
  const snap = await getDocs(col());
  if (snap.empty) return 0;
  return snap.size ?? snap.docs.length;
}

export async function loginUser(credentials) {
    try {
        return await login(credentials, auth);
    } catch (error) {
        throw error;
    } 
}

export async function registerUser(userInfo) {
  try{
    return await register(userInfo,auth,db);
  }catch(error){
    throw error;
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
}
