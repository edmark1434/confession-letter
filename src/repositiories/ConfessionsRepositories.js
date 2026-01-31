import { db } from "../firebase";
import { addConfession } from "../services/ConfessionService";
import { collection, getDoc, doc, query, where, getDocs, addDoc, setDoc } from "firebase/firestore";
import { sendNotification } from "./NotificationRepositories";
import { getAuth } from "firebase/auth";
const conCollection = collection(db, 'confessions');

export async function addConfessionData(data) {
    const userId = getAuth().currentUser.uid;
    data.userId = userId;
    return await addConfession(conCollection, data);
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

// Persist a confession response by ID, merging with any existing doc
export async function saveConfessionByCode(code, data) {
    if (!code) throw new Error("saveConfessionByCode: code is required");
    const q = query(conCollection, where("code", "==", code));
    const snap = await getDocs(q);
    if (snap.empty) throw new Error("saveConfessionByCode: no document found for code " + code);
    const docId = snap.docs[0].id;
    const userId = snap.docs[0].data().userId;
    await setDoc(doc(conCollection, docId), data, { merge: true });
    const message = `Your respondent has responded website ${code}: ${data.answer == 'yes' ? data.answer+" to your invitation to take her on a date!" : data.answer + " and she appreciate your effort"} `;
    await sendNotification(docId,userId, message, "confession");
}

export async function getConfessionByUser(userId) {
    const q = query(conCollection, where("userId", "==", userId));
    const snap = await getDocs(q);
    if (snap.empty) return [];
    return snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}