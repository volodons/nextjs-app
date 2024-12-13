'use client';

import { motion } from 'framer-motion';

export default function AnimatedStats() {
    const stats = [
        { number: '100+', label: 'Articles' },
        { number: '50k+', label: 'Readers' },
        { number: '200+', label: 'Authors' }
    ];

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center p-6 bg-gray-50 rounded-lg"
                >
                    <div className="text-4xl font-bold text-blue-500">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                </motion.div>
            ))}
        </section>
    );
}
