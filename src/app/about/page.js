'use client';

import { motion } from 'framer-motion';

const teamMembers = [
    { id: 1, name: 'John Doe', role: 'CEO', icon: '👨‍💼' },
    { id: 2, name: 'Jane Smith', role: 'CTO', icon: '👩‍💻' },
    { id: 3, name: 'Mike Johnson', role: 'Lead Developer', icon: '👨‍💻' }
];

const companyValues = [
    { title: 'Innovation', description: 'Pushing boundaries in technology' },
    { title: 'Quality', description: 'Delivering excellence in every project' },
    { title: 'Community', description: 'Building strong developer relationships' }
];

const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '100+', label: 'Projects Completed' },
    { value: '50k+', label: 'Happy Users' }
];

export default function About() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 text-gray-600">
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <h1 className="text-4xl font-bold mb-6">About Us</h1>
                <p className="text-xl">
                    We&apos;re passionate about creating amazing content and sharing knowledge with our community.
                </p>
            </motion.section>

            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            >
                {stats.map((stat, index) => (
                    <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                        <div className="text-gray-600">{stat.label}</div>
                    </div>
                ))}
            </motion.section>

            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-16"
            >
                <h2 className="text-2xl font-bold mb-6">Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.map((member) => (
                        <motion.div
                            key={member.id}
                            whileHover={{ y: -5 }}
                            className="text-center p-6 bg-gray-50 rounded-lg"
                        >
                            <div className="text-4xl mb-4">{member.icon}</div>
                            <h3 className="font-bold">{member.name}</h3>
                            <p>{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-16"
            >
                <h2 className="text-2xl font-bold mb-6">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {companyValues.map((value, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.05 }} className="p-6 bg-gray-50 rounded-lg">
                            <h3 className="font-bold mb-2">{value.title}</h3>
                            <p>{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-gray-50 p-8 rounded-lg text-center"
            >
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <p>
                    Email: contact@example.com
                    <br />
                    Phone: (555) 123-4567
                    <br />
                    Address: 123 Tech Street, San Francisco, CA 94105
                </p>
            </motion.section>
        </div>
    );
}
