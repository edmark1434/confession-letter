export const uploadImages = async (images) => {
    const uploadedImageUrls = [];
    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    for (const image of images) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', uploadPreset);
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        uploadedImageUrls.push(data.secure_url);
    }
    return uploadedImageUrls;
}