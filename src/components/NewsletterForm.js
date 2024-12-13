'use client';

export default function NewsletterForm() {
    return (
        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="flex-1 p-3 border rounded-lg" required />
            <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
                Subscribe
            </button>
        </form>
    );
}
