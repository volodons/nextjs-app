import Link from 'next/link';

export default function FeaturedPosts() {
    const featuredPosts = [
        { id: 1, title: 'Getting Started with Next.js', excerpt: 'Learn the basics of Next.js...', author: 'John Doe' },
        { id: 2, title: 'Understanding React Hooks', excerpt: 'Deep dive into React Hooks...', author: 'Jane Smith' },
        { id: 3, title: 'Building Modern UIs', excerpt: 'Best practices for UI development...', author: 'Mike Johnson' }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
                <Link
                    key={post.id}
                    href={`/posts/${post.id}`}
                    className="block p-6 border rounded-lg hover:shadow-lg transition-shadow"
                >
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <p className="text-sm text-gray-500">By {post.author}</p>
                </Link>
            ))}
        </div>
    );
}
