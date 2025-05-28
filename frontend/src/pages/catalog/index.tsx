import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Movie } from '@/types/Movie';
import MovieModal from '@/components/MovieModal';

export default function MovieCatalog() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const router = useRouter();
    const rawQuery = router.query.search;
    const searchQuery =
        typeof rawQuery === 'string' && rawQuery.trim().length > 0
            ? rawQuery.toLowerCase()
            : null;

    useEffect(() => {
        setLoading(true);

        fetch('http://localhost:8080/movie')
            .then((res) => res.json())
            .then((data: Movie[]) => {
                const filtered = searchQuery
                    ? data.filter((m) =>
                        m.title.toLowerCase().includes(searchQuery)
                    )
                    : data;

                setMovies(filtered);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load movies', err);
                setLoading(false);
            });
    }, [searchQuery]);

    const handleToggleWatched = async (title: string) => {
        try {
            const response = await fetch(`http://localhost:8080/movie/${encodeURIComponent(title)}`, {
                method: 'PUT',
            });

            if (response.ok) {
                setMovies((prev) =>
                    prev.map((m) =>
                        m.title === title ? { ...m, watched: !m.watched } : m
                    )
                );

                setSelectedMovie((prev) =>
                    prev && prev.title === title
                        ? { ...prev, watched: !prev.watched }
                        : prev
                );
            }
        } catch (error) {
            console.error('Failed to update watched status:', error);
        }
    };

    return (
        <div className="min-h-screen p-8 bg-background text-foreground">
            <h1 className="text-3xl font-bold mb-6 text-center">
                {searchQuery ? `Results for "${searchQuery}"` : '🎬 Movie Catalog'}
            </h1>

            {loading ? (
                <p className="text-center text-gray-400">Loading...</p>
            ) : movies.length === 0 ? (
                <p className="text-center text-gray-400">
                    {searchQuery
                        ? 'No matching movies found.'
                        : 'No movies available yet.'}
                </p>
            ) : (
                <div className="flex flex-wrap gap-6 justify-center">
                    {movies.map((movie) => (
                        <div
                            key={movie.title}
                            className="w-40 text-center cursor-pointer"
                            onClick={() => setSelectedMovie(movie)}
                        >
                            <img
                                src={movie.imageUrl}
                                alt={movie.title}
                                className="w-full h-60 object-cover rounded-lg shadow-md"
                            />
                            <p className="mt-2">{movie.title}</p>
                        </div>
                    ))}
                </div>
            )}

            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                    onToggleWatched={handleToggleWatched}
                />
            )}
        </div>
    );
}
