'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import { createPost } from '@/app/actions';
import { validatePost, validateImage } from '@/lib/validation';

const FormField = ({ label, name, type = 'text', placeholder, required, value, onChange, maxLength }) => (
    <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {type === 'textarea' ? (
            <div>
                <textarea
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
                {maxLength && (
                    <div className="text-xs text-gray-500 text-right">
                        {value.length}/{maxLength}
                    </div>
                )}
            </div>
        ) : (
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
        )}
    </div>
);

export default function PostForm() {
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        content: ''
    });
    const formRef = useRef();
    const fileInputRef = useRef();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);

            validatePost(formData);
            const data = new FormData(formRef.current);
            const result = await createPost(data);

            if (!result.success) {
                throw new Error(result.error);
            }

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            formRef.current?.reset();
            setFormData({ title: '', author: '', content: '' });
            setPreview(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function handleImageChange(e) {
        const file = e.target.files?.[0];
        handleFile(file);
    }

    function handleFile(file) {
        if (file) {
            try {
                validateImage(file);
                setPreview(URL.createObjectURL(file));
                setError('');
            } catch (err) {
                setError(err.message);
                fileInputRef.current.value = '';
            }
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('border-blue-500');
    }

    function handleDragLeave(e) {
        e.currentTarget.classList.remove('border-blue-500');
    }

    function handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('border-blue-500');
        const file = e.dataTransfer.files[0];
        handleFile(file);
    }

    return (
        <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-3 text-red-500 bg-red-100 rounded"
                    >
                        {error}
                    </motion.div>
                )}
                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-3 text-green-500 bg-green-100 rounded"
                    >
                        Post created successfully!
                    </motion.div>
                )}
            </AnimatePresence>

            <FormField
                label="Title"
                name="title"
                placeholder="Enter post title"
                required
                value={formData.title}
                onChange={handleChange}
                maxLength={100}
            />

            <FormField
                label="Author"
                name="author"
                placeholder="Enter author name"
                required
                value={formData.author}
                onChange={handleChange}
                maxLength={50}
            />

            <FormField
                label="Content"
                name="content"
                type="textarea"
                placeholder="Write your post content"
                required
                value={formData.content}
                onChange={handleChange}
                maxLength={1000}
            />

            <div
                className="border-2 border-dashed rounded p-4 text-center cursor-pointer"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    name="image"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
                <p>Drag and drop an image or click to select</p>
                {preview && (
                    <div className="mt-4">
                        <Image
                            src={preview}
                            width={200}
                            height={200}
                            alt="Preview"
                            className="mx-auto object-cover rounded"
                        />
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 
                         transition-colors duration-200"
            >
                {loading ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Creating...
                    </span>
                ) : (
                    'Create Post'
                )}
            </button>
        </form>
    );
}
