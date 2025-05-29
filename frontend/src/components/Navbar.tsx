import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Navbar() {
    const router = useRouter();
    const [search, setSearch] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/catalog?search=${encodeURIComponent(search.trim())}`);
        }
    };

    return (
        <nav className="w-full px-6 py-4 bg-neutral-900 text-white shadow">
            <div className="flex justify-between items-center flex-wrap">
                {/* Logo */}
                <Link href="/">
                    <span className="text-xl font-bold tracking-tight cursor-pointer hover:opacity-80">
                        The Movie Tracker
                    </span>
                </Link>

                {/* Right: Search + My List */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto mt-3 sm:mt-0">
                    <form onSubmit={handleSearch} className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="px-3 py-1 rounded-md bg-neutral-800 border border-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-md text-sm"
                        >
                            Search
                        </button>
                    </form>

                    <button
                        onClick={() => router.push('/my-list')}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-md text-sm"
                    >
                        My List
                    </button>
                </div>
            </div>
        </nav>
    );
}
