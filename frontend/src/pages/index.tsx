import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import MoviePosterMarquee from "@/components/MoviePosterMarquee";
import UpdateMovieForm from "@/components/crud/UpdateMovieForm";
import AddMovieForm from "@/components/crud/AddMovieForm";
import DeleteMovieForm from "@/components/crud/DeleteMovieForm";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import VideoBackgroundPlayer from "@/components/video/VideoBackgroundPlayer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function Home() {
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    const router = useRouter();

    return (
        <>
            <VideoBackgroundPlayer
                url="/background-video.mp4"
                className="absolute inset-0 w-full h-full object-cover"
            />

            <main className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8 bg-black/60 text-foreground">
                <header className="mb-10 text-center w-full">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        The Movie Tracker
                    </h1>
                    <p className="text-md text-gray-300 mt-2 max-w-xl mx-auto">
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

                <div className="w-full max-w-3xl mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <h2 className="text-xl font-bold">Add Movie</h2>
                        <button
                            onClick={() => setShowAddForm((prev) => !prev)}
                            className="text-white hover:opacity-80 transition"
                        >
                            {showAddForm ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                    </div>
                    {showAddForm && <AddMovieForm />}
                </div>

                <div className="w-full max-w-3xl mx-auto mt-4">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <h2 className="text-xl font-bold">Update Movie</h2>
                        <button
                            onClick={() => setShowUpdateForm((prev) => !prev)}
                            className="text-white hover:opacity-80 transition"
                        >
                            {showUpdateForm ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                    </div>
                    {showUpdateForm && <UpdateMovieForm />}
                </div>

                {/* Delete Movie */}
                <div className="w-full max-w-3xl mx-auto mt-4">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <h2 className="text-xl font-bold">Delete Movie</h2>
                        <button
                            onClick={() => setShowDeleteForm((prev) => !prev)}
                            className="text-white hover:opacity-80 transition"
                        >
                            {showDeleteForm ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                    </div>
                    {showDeleteForm && <DeleteMovieForm />}
                </div>
            </main>
        </>
    );
}
