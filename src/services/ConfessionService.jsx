import { Upload } from "lucide-react";
import { generateWebsiteId } from "./WebsiteIdGenerator.jsx";
import { uploadImages } from "./UploadImages.jsx";
import { addDoc } from "firebase/firestore";
import { base64ToFile } from "./FileObjectConversion.jsx";

export async function addConfession(conCollection, data) {
    const code = await generateWebsiteId();
    sessionStorage.setItem("latestconfessionCode", code);
    const imageUrl = await uploadImages([base64ToFile(data.imageSection2, "code.jpg")]);
    data.code = code;
    data.imageSection2 = imageUrl[0];
    const docRef = await addDoc(conCollection, data);
    return docRef.id;
}