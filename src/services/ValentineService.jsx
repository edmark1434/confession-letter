import { Upload } from "lucide-react";
import { generateWebsiteId } from "./WebsiteIdGenerator.jsx";
import { uploadImages } from "./UploadImages.jsx";
import { addDoc } from "firebase/firestore";
import { base64ToFile } from "./FileObjectConversion.jsx";

export async function ValentineService(conCollection, data) {
    const code = await generateWebsiteId();
    sessionStorage.setItem("latestvalentineCode", code);
    const imageList = data.memories.map((memory, idx) => {
        return base64ToFile(memory.img, `memory_${idx}.jpg`);
    });
    const imageUrl = await uploadImages(imageList);
    data.code = code;
    data.memories = imageUrl.map((url, idx) => {
        return {
            img: url,
            note: data.memories[idx].note
        };
    });
    const docRef = await addDoc(conCollection, data);
    return docRef.id;
}