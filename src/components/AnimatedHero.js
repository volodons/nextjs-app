'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AnimatedHero() {
    return (
        <section className="text-center mb-16">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold mb-6"
            >
                Welcome to Our Blog
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 mb-8"
            >
                Discover stories, thinking, and expertise from writers on any topic.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <Link
                    href="/posts"
                    className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg"
                >
                    View All Posts
                </Link>
            </motion.div>
        </section>
    );
}
