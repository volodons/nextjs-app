'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import debounce from 'lodash/debounce';

import PostForm from '@/components/PostForm';

import { usePosts } from '@/hooks/usePosts';

const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'title', label: 'Title' },
    { value: 'author', label: 'Author' }
];

export default function Posts() {
    const { posts, loading, addPost } = usePosts();
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('date');

    const debouncedSearch = useCallback(
        debounce((value) => setSearch(value), 300),
        []
    );

    const sortedAndFilteredPosts = posts
        .filter(
            (post) =>
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.content.toLowerCase().includes(search.toLowerCase()) ||
                post.author.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'author':
                    return a.author.localeCompare(b.author);
                default:
                    return new Date(b.date) - new Date(a.date);
            }
        });

    if (loading) {
        return (
            <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((n) => (
                    <div key={n} className="p-4 border rounded">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search posts..."
                    onChange={(e) => debouncedSearch(e.target.value)}
                    className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
                >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            Sort by {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <PostForm onSubmit={addPost} />

            <AnimatePresence>
                {sortedAndFilteredPosts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center p-8 border rounded bg-gray-50"
                    >
                        <p className="text-gray-500">No posts found</p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid gap-4"
                    >
                        {sortedAndFilteredPosts.map((post) => (
                            <motion.article
                                key={post.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="p-4 border rounded hover:shadow-lg transition-shadow"
                            >
                                <Link
                                    href={`/posts/${post.id}`}
                                    className="text-xl font-bold hover:text-blue-600 transition-colors"
                                >
                                    {post.title}
                                </Link>
                                <p className="text-gray-600 text-sm">
                                    Author: {post.author} | Date: {new Date(post.date).toLocaleDateString()}
                                </p>
                                <p className="mt-2 line-clamp-2">{post.content}</p>
                            </motion.article>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
