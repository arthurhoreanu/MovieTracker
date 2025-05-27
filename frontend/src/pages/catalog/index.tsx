import { useEffect, useState } from 'react';
import { Movie } from '@/types/Movie';

export default function MovieCatalog() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/movie')
            .then((res) => res.json())
            .then((data) => setMovies(data))
            .catch((err) => console.error('Failed to load movies', err));
    }, []);

    return (
        <div className="min-h-screen p-8 bg-background text-foreground">
            <h1 className="text-3xl font-bold mb-6 text-center">🎬 Movie Catalog</h1>

            <div className="flex flex-wrap gap-6 justify-center">
                {movies.map((movie) => (
                    <div key={movie.title} className="w-40 text-center cursor-pointer">
                        <img
                            src={movie.imageUrl}
                            alt={movie.title}
                            className="w-full h-60 object-cover rounded-lg shadow-md"
                        />
                        <p className="mt-2">{movie.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
