import { Geist, Geist_Mono } from "next/font/google";
import AddMovieButton from "@/components/AddMovieButton";
//import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import MoviePosterMarquee from "@/components/MoviePosterMarquee";

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

                {/*<section className="w-full max-w-4xl space-y-6">*/}
                {/*    <div className="bg-[#121212] p-4 rounded-2xl shadow-md border border-neutral-800">*/}
                {/*        <h2 className="text-xl font-semibold mb-2">Add a Movie</h2>*/}
                {/*        <AddMovieButton />*/}
                {/*    </div>*/}

                {/*    <div className="flex flex-wrap gap-4 items-center justify-between">*/}
                {/*        /!* <FilterControls /> *!/*/}
                {/*    </div>*/}

                {/*    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">*/}
                {/*        /!* <MovieCard /> *!/*/}
                {/*    </div>*/}
                {/*</section>*/}
            </main>
        </>
    );
}
