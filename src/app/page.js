import AnimatedHero from '@/components/AnimatedHero';
import AnimatedStats from '@/components/AnimatedStats';
import NewsletterForm from '@/components/NewsletterForm';
import FeaturedPosts from '@/components/FeaturedPosts';

export default function Home() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <AnimatedHero />

            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
                <FeaturedPosts />
            </section>

            <AnimatedStats />

            <section className="bg-gray-50 p-8 rounded-lg">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
                    <p className="text-gray-600 mb-6">Get the latest posts delivered right to your inbox.</p>
                    <NewsletterForm />
                </div>
            </section>
        </div>
    );
}
