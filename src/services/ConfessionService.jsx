import { Upload } from "lucide-react";
import { generateWebsiteId } from "./WebsiteIdGenerator.jsx";
import { uploadImages } from "./UploadImages.jsx";
import { addDoc } from "firebase/firestore";
import { base64ToFile } from "./FileObjectConversion.jsx";
import { getAuth } from "firebase/auth";
export async function addConfession(conCollection, data) {
    const code = await generateWebsiteId();
    sessionStorage.setItem("latestconfessionCode", code);
    const imageUrl = await uploadImages([base64ToFile(data.imageSection2, "code.jpg")]);
    data.userId = getAuth().currentUser?.uid || null;
    data.code = code;
    data.type = "confession";
    data.imageSection2 = imageUrl[0];
    const docRef = await addDoc(conCollection, data);
    return docRef.id;
}