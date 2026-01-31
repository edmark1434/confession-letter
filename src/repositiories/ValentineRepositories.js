import { db } from "../firebase";
import { collection, getDoc, doc, query, where, getDocs, setDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { ValentineService } from "../services/ValentineService";
const valentinesCollection = collection(db, 'valentines');

/**
 * Add a new Valentine's special page
 */
export async function addValentineData(data) {
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
        await setDoc(doc(valentinesCollection, docId), data, { merge: true });
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