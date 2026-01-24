import { db } from "../firebase";
import { addConfession } from "../services/ConfessionService";
import { collection, getDoc, doc, query, where, getDocs, addDoc } from "firebase/firestore";
const conCollection = collection(db, 'confessions');

export async function addConfessionData(data) {
    return docRef = await addConfession(conCollection, data);
}

export async function getConfession(id) {
    const snap = await getDoc(doc(conCollection, id));
    return snap.exists() ? snap.data() : null;
}

export async function getConfessionByCode(code) {
    const q = query(conCollection, where("code", "==", code));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    return snap.docs[0].data();
}