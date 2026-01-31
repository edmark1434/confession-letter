import { db } from "../firebase";
import { collection, getDoc, doc, query, where, getDocs, setDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { ValentineService } from "../services/ValentineService";
import { sendNotification } from "./NotificationRepositories";
import { getAuth } from "firebase/auth";
const valentinesCollection = collection(db, 'valentines');

/**
 * Add a new Valentine's special page
 */
export async function addValentineData(data) {
    const userId = getAuth().currentUser.uid;
    data.userId = userId;
    return await ValentineService(valentinesCollection, data);
}

/**
 * Get a Valentine by unique code
 */
export async function getValentineByCode(code) {
    try {
        const q = query(valentinesCollection, where("code", "==", code));
        const snap = await getDocs(q);
        if (snap.empty) return null;
        return snap.docs[0].data();
    } catch (error) {
        console.error("Error getting valentine by code:", error);
        return null;
    }
}

/**
 * Save a response to a Valentine (yes/maybe/no)
 */
export async function saveValentineByCode(code, data) {
    try {
        if (!code) throw new Error("Code is required");
        const q = query(valentinesCollection, where("code", "==", code));
        const snap = await getDocs(q);
        if (snap.empty) throw new Error("Valentine not found");
        
        const docId = snap.docs[0].id;
        const userId = snap.docs[0].data().userId;
        await setDoc(doc(valentinesCollection, docId), data, { merge: true });
        const message = `Your respondent has responded: ${data.answer == 'yes' ? data.answer+" to your invitation to take her on a date!" : data.answer + " and she appreciate your effort"} `;
        await sendNotification(docId, userId, message, "valentine");
    } catch (error) {
        console.error("Error saving valentine response:", error);
        throw error;
    }
}

export async function getValentineByUser(userId) {
    try{
        const q = query(valentinesCollection, where("userId", "==", userId));
        const snap = await getDocs(q);
        if (snap.empty) return [];
        return snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }catch(error){
        console.error("Error getting valentine by user:", error);
        return [];
    }
}