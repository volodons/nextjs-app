import { uploadImage } from '@/utils/imageUpload';
import { validatePost } from '@/lib/validation';
import { sanitizeInput } from '@/lib/sanitize';
import { rateLimit } from '@/lib/rateLimit';
import { logger } from '@/lib/logger';

const MAX_TITLE_LENGTH = 100;
const MAX_CONTENT_LENGTH = 5000;

export class PostError extends Error {
    constructor(message, type) {
        super(message);
        this.type = type;
    }
}

export async function createPost(formData) {
    const actionId = `create-post-${Date.now()}`;

    try {
        logger.info(`Starting post creation`, { actionId });

        await rateLimit('create-post', 60, 5);

        const title = sanitizeInput(formData.get('title'));
        const content = sanitizeInput(formData.get('content'));
        const author = sanitizeInput(formData.get('author'));
        const image = formData.get('image');

        if (title.length > MAX_TITLE_LENGTH) {
            throw new PostError('Title too long', 'VALIDATION_ERROR');
        }
        if (content.length > MAX_CONTENT_LENGTH) {
            throw new PostError('Content too long', 'VALIDATION_ERROR');
        }

        validatePost({ title, content, author });

        let imageUrl = null;
        if (image?.size > 0) {
            imageUrl = await uploadImage(image);
        }

        const post = {
            id: Date.now(),
            title,
            content,
            author,
            imageUrl,
            date: new Date().toISOString(),
            status: 'published'
        };

        logger.info(`Post created successfully`, { actionId, postId: post.id });

        return {
            success: true,
            post,
            message: 'Post created successfully'
        };
    } catch (error) {
        logger.error(`Failed to create post`, {
            actionId,
            error: error.message,
            type: error.type || 'UNKNOWN_ERROR'
        });

        return {
            success: false,
            error: error.message,
            type: error.type || 'UNKNOWN_ERROR'
        };
    }
}
