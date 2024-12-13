'use client';

import { useState, useEffect } from 'react';

import { initialPosts } from '@/data/posts';

export const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedPosts = localStorage.getItem('posts');
        setPosts(savedPosts ? JSON.parse(savedPosts) : initialPosts);
        setLoading(false);
    }, []);

    const addPost = (post) => {
        const newPost = {
            ...post,
            id: Date.now(),
            date: new Date().toISOString().split('T')[0]
        };
        const updatedPosts = [...posts, newPost];
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    return { posts, loading, addPost };
};
