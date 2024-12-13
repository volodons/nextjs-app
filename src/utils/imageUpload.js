import { validateImage } from '@/lib/validation';

export async function uploadImage(file) {
    try {
        validateImage(file);

        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        if (!res.ok) {
            throw new Error('Upload failed');
        }

        const data = await res.json();
        return data.url;
    } catch (error) {
        console.error('Image upload error:', error);
        throw error;
    }
}
