import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

import Loading from './loading';

export async function generateStaticParams() {
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json());

    return posts.map((post) => ({
        id: post.id.toString()
    }));
}

export async function generateMetadata({ params }) {
    const id = await params.id;
    const post = await getPost(id);

    return {
        title: post?.title || 'Post Not Found',
        description: post?.body?.slice(0, 160),
        openGraph: {
            title: post?.title,
            description: post?.body?.slice(0, 160),
            type: 'article',
            authors: [post?.author]
        }
    };
}

async function getPost(id) {
    if (!id) return null;

    try {
        const [postRes, allPostsRes] = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                next: { revalidate: 3600 }
            }),
            fetch('https://jsonplaceholder.typicode.com/posts', {
                next: { revalidate: 3600 }
            })
        ]);

        if (!postRes.ok) {
            throw new Error(`HTTP error! status: ${postRes.status}`);
        }

        const post = await postRes.json();
        const allPosts = await allPostsRes.json();
        const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
        const user = await userRes.json();

        const relatedPosts = allPosts.filter((p) => p.userId === post.userId && p.id !== post.id).slice(0, 3);

        return {
            ...post,
            author: user.name,
            date: new Date().toISOString(),
            relatedPosts
        };
    } catch (error) {
        console.error('Failed to fetch post:', error);
        return null;
    }
}

export default async function PostPage({ params }) {
    const id = await params.id;
    const post = await getPost(id);

    if (!post) {
        notFound();
    }

    return (
        <Suspense fallback={<Loading />}>
            <article className="max-w-2xl mx-auto p-6">
                <Link href="/posts" className="text-blue-500 hover:underline mb-6 block">
                    ← Back to posts
                </Link>

                <h1 className="text-3xl font-bold">{post.title}</h1>
                <div className="mt-2 text-gray-600">
                    By {post.author} • {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="mt-6 prose">{post.body}</div>

                {post.relatedPosts?.length > 0 && (
                    <Suspense fallback={<Loading />}>
                        <div className="mt-8 border-t pt-6">
                            <h2 className="text-xl font-bold mb-4">Related Posts</h2>
                            <div className="grid gap-4">
                                {post.relatedPosts.map((relatedPost) => (
                                    <Link
                                        key={relatedPost.id}
                                        href={`/posts/${relatedPost.id}`}
                                        className="block p-4 border rounded hover:shadow-md transition"
                                    >
                                        <h3 className="font-semibold">{relatedPost.title}</h3>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </Suspense>
                )}
            </article>
        </Suspense>
    );
}
