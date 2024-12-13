import Link from 'next/link';

export default function Header() {
    return (
        <header className="p-5 text-center">
            <nav>
                <Link href="/" className="mr-4">
                    Home
                </Link>
                <Link href="/about" className="mr-4">
                    About
                </Link>
                <Link href="/posts">Posts</Link>
            </nav>
        </header>
    );
}
