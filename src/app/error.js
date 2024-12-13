'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error('Application error:', error);
    }, [error]);

    const errorDetails = process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto p-8 text-center"
        >
            <div className="mb-6">
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5 }}>
                    <svg
                        className="w-16 h-16 mx-auto text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </motion.div>
            </div>

            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>

            <p className="text-gray-600 mb-6">{errorDetails}</p>

            <div className="space-x-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    onClick={() => reset()}
                >
                    Try again
                </button>
                <button
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    onClick={() => (window.location.href = '/')}
                >
                    Go to homepage
                </button>
            </div>
        </motion.div>
    );
}
