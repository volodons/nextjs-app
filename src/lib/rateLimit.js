const store = new Map();

export async function rateLimit(key, seconds, limit) {
    const now = Date.now();
    const windowStart = now - seconds * 1000;

    const requests = store.get(key) || [];
    const validRequests = requests.filter((time) => time > windowStart);

    if (validRequests.length >= limit) {
        throw new Error('Rate limit exceeded');
    }

    validRequests.push(now);
    store.set(key, validRequests);
}
