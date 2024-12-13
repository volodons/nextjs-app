import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from './constants';

export function validateImage(file) {
    if (!file) return null;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        throw new Error('Invalid file type');
    }

    if (file.size > MAX_FILE_SIZE) {
        throw new Error('File too large');
    }

    return true;
}

export function validatePost(data) {
    if (!data.title?.trim()) throw new Error('Title is required');

    if (!data.content?.trim()) throw new Error('Content is required');

    if (!data.author?.trim()) throw new Error('Author is required');

    return true;
}
