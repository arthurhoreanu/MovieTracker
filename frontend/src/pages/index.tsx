import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import MoviePosterMarquee from "@/components/MoviePosterMarquee";
import MovieCrudPanel from "@/components/MovieCrudPanel";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function Home() {
    const router = useRouter();

    return (
        <>
            <main className="min-h-screen flex flex-col items-center px-4 py-8 bg-background text-foreground">
                <header className="mb-10 text-center w-full">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        The Movie Tracker
                    </h1>
                    <p className="text-md text-gray-400 mt-2 max-w-xl mx-auto">
                        From Classics to New Releases — Sorted, Filtered, Found.
                    </p>

                    <MoviePosterMarquee />

                    <button
                        onClick={() => router.push("/catalog")}
                        className="mt-6 px-6 py-3 bg-neutral-800 text-white rounded-xl shadow hover:bg-neutral-700 transition"
                    >
                        🎬 See the entire movie catalog
                    </button>
                </header>

                <MovieCrudPanel />
            </main>
        </>
    );
}
