import Header from '@/components/Header';
import Footer from '@/components/Footer';

import './globals.css';

export const metadata = {
    title: 'My Next.js App',
    description: 'Basic Next.js application'
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main className="min-h-screen p-5">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
